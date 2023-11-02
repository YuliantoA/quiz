<template>
  <div
    class="w-full max-h-[41rem] flex flex-col flex-auto items-center relative scrollbar overflow-y-scroll overflow-x-hidden"
  >
    <div class="w-full h-[7rem]">
      <KajianTextInput
        :placeholder-text="'Judul Kajian'"
        :type-input="'text'"
        :list-error="getErrorMessages(v$.judul, 'Judul Kajian')"
        v-model="state.judul"
      ></KajianTextInput>
    </div>
    <div class="w-full h-[7rem]">
      <KajianMultiSelect
        :custom-placeholder="'Ustad'"
        v-model="state.ustad"
        @update-value="
          ({ value }) => {
            state.ustad = value
          }
        "
        :list-option="listOptionUstad"
        label="name"
        value-prop="code"
        :list-error="getErrorMessages(v$.ustad, 'Ustad')"
      ></KajianMultiSelect>
    </div>
    <div class="w-full h-[7rem]">
      <KajianDatePicker
        @date-updated="dateUpdated"
        :list-error="getErrorMessages(v$.date, 'Jadwal')"
      >
      </KajianDatePicker>
    </div>
    <div class="w-full h-[7rem] flex justify-between space-x-5">
      <div class="w-full h-full flex-col">
        <KajianMultiSelect
          :custom-placeholder="'Provinsi'"
          v-model="provinceCode"
          label="name"
          value-prop="code"
          @update-value="
            ({ value, text }) => {
              state.province = text.toLowerCase()
              provinceCode = value
            }
          "
          :list-option="listOptionProvince"
          :list-error="getErrorMessages(v$.province, 'Province')"
        ></KajianMultiSelect>
      </div>
      <div class="w-full h-full flex-col">
        <KajianMultiSelect
          :disabled="state.province.length === 0"
          :custom-placeholder="'Kota'"
          v-model="kotaCode"
          label="name"
          value-prop="code"
          @update-value="
            ({ value, text }) => {
              state.kota = text.toLowerCase()
              kotaCode = value
            }
          "
          :list-option="listOptionKota"
          :list-error="getErrorMessages(v$.kota, 'Kota')"
        ></KajianMultiSelect>
      </div>
      <div class="w-full h-full flex-col">
        <KajianMultiSelect
          :disabled="state.kota.length === 0"
          :custom-placeholder="'Kecamatan'"
          v-model="kecamatanKode"
          label="name"
          value-prop="code"
          @update-value="
            ({ value, text }) => {
              state.kecamatan = text.toLowerCase()
              kecamatanKode = value
            }
          "
          :list-option="listOptionKecamatan"
          :list-error="getErrorMessages(v$.kecamatan, 'Kecamatan')"
        ></KajianMultiSelect>
      </div>
    </div>
    <KajianDropzone
      placeholder-text="Upload Poster"
      :list-error="getErrorMessages(v$.poster, 'Poster')"
      :model-value="state.poster"
      :ext="imageExt"
      @update-poster="updatePoster"
      class="h-[8rem] w-full"
    ></KajianDropzone>
    <CkeditorInput
      :model-value="state.description"
      @update-value="updateDescription"
      :list-error="getErrorMessages(v$.description, 'Description')"
    />
  </div>
</template>

<script setup>
import KajianTextInput from '@/components/input/KajianTextInput.vue'
import KajianDatePicker from '@/components/input/KajianDatePicker.vue'
import KajianDropzone from '@/components/input/KajianDropzone.vue'
import KajianMultiSelect from '@/components/input/KajianMultiSelect.vue'
import CkeditorInput from '@/components/input/CkeditorInput.vue'
import client from '@/helpers/ApiClient'
import { imageExt } from '@/helpers/constantValue'
import { onMounted, reactive, ref, unref } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { required } from '@vuelidate/validators'
import { getErrorMessages } from '@/helpers/vuelidateHelper'
import { getAllUstad } from '@/firebase/kajianDataService.js'
import { watch } from 'vue'

const state = reactive({
  judul: '',
  ustad: '',
  date: '',
  poster: [],
  province: '',
  kota: '',
  kecamatan: '',
  description: ''
})

const rules = {
  judul: { required },
  ustad: { required },
  date: { required },
  poster: { required },
  province: { required },
  kota: { required },
  kecamatan: { required },
  description: { required }
}
defineExpose({
  validateAndGetData
})
const v$ = useVuelidate(rules, state)

function dateUpdated(value) {
  state.date = value
}

const listOptionProvince = ref([])
const listOptionKota = ref([])
const listOptionKecamatan = ref([])
const listOptionUstad = ref([])
const provinceCode = ref('')
const kotaCode = ref('')
const kecamatanKode = ref('')

onMounted(() => {
  getProvince()
  getUstad()
})

watch(
  () => state.province,
  (newValue) => {
    if (newValue.length > 0) {
      getKota()
    }
  }
)

watch(
  () => state.kota,
  (newValue) => {
    if (newValue.length > 0) {
      getKecamatan()
    }
  }
)

async function validateAndGetData() {
  unref(v$).$validate()
  return {
    valid: !v$.value.$invalid,
    formData: {
      ...state
    }
  }
}

function updatePoster(value) {
  state.poster = value
}
function updateDescription(value) {
  state.description = value
}
async function getProvince() {
  const result = await client.getAllProvince({})
  listOptionProvince.value = result.data.data
}
async function getUstad() {
  listOptionUstad.value = await getAllUstad()
}
async function getKota() {
  const result = await client.getKota({ data: provinceCode.value })
  listOptionKota.value = result.data.data
}
async function getKecamatan() {
  const result = await client.getKecamatan({ data: kotaCode.value })
  listOptionKecamatan.value = result.data.data
}
</script>
