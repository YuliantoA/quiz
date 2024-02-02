<template>
  <div class="w-full h-full">
    <div
      v-if="hasOverlay && loading"
      class="absolute w-screen h-screen bg-opacity-80 flex justify-center items-center bg-white top-0 left-0"
    >
      <slot name="loadingOverlay">{{ loadingMessage }} </slot>
    </div>
    <div class="w-full h-full" v-if="loading" key="v1">
      <slot name="loading"></slot>
    </div>
    <div class="w-full h-full" v-else key="v2">
      <slot v-if="isError" name="error" :retry="retry">
        <div>{{ currentErrorMessage }}</div>
        <button @click="retry">Coba Lagi</button>
      </slot>
      <template v-else-if="!!response">
        <slot name="default" :response="response"></slot>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    apiMethod: Function,
    initialData: Object,
    customErrorMessage: String,
    loadingMessage: {
      type: String,
      default: 'Memuat Data...'
    },
    showDefaultErrorMessage: {
      type: Boolean,
      default: true
    },
    autoload: {
      type: Boolean,
      default: true
    },
    hasOverlay: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    currentErrorMessage() {
      if (this.showDefaultErrorMessage) {
        return this.errorMessage
      }
      if (this.customErrorMessage) {
        return this.customErrorMessage
      }
      return null
    }
  },
  data() {
    return {
      loading: false,
      isError: false,
      response: null,
      errorMessage: ''
    }
  },
  mounted() {
    if (this.autoload) {
      this.callApi()
    }
  },
  methods: {
    retry() {
      return this.callApi()
    },
    callApi() {
      const instance = this
      if (instance.initialData) {
        instance.$emit('loadingStarted')

        instance.loading = false
        instance.isError = false

        instance.$emit('loadingEnded', {
          success: true,
          response: instance.initialData,
          message: 'Data Found. Prevent unnecessary API call'
        })
      } else {
        instance.loading = true
        instance.$emit('loadingStarted')
        instance
          .apiMethod()
          .then((response) => {
            instance.loading = false
            instance.isError = false
            let errorMessage = ''
            if (!response.errors) {
              this.response = response
              instance.$emit('loadingEnded', {
                success: true,
                response: response,
                message: 'API success'
              })
            } else {
              instance.isError = true
              errorMessage = 'Error Fetching via API: status not success'

              instance.$emit('loadingEnded', {
                success: false,
                message: errorMessage,
                error: response
              })
            }
            instance.errorMessage = errorMessage
          })
          .catch((error) => {
            instance.loading = false
            instance.isError = true
            instance.errorMessage = 'Error API response'

            instance.$emit('loadingEnded', {
              success: false,
              message: instance.errorMessage,
              error
            })
          })
      }
    }
  }
}
</script>

<style></style>
