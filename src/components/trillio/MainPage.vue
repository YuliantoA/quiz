<script setup>
const listFacility = [
  'Close to the beach',
  'Breakfast included',
  'Free airport shuttle',
  'Free wifi in all rooms',
  'Air conditioning and heating',
  'Pets allowed',
  'We speak all languages',
  'Perfect for families'
]

const recomendationPerson = [
  {
    name: 'Lucy',
    picture: 'http://placekitten.com/g/200/300'
  },
  {
    name: 'john',
    picture: 'http://placekitten.com/200/300'
  },
  {
    name: 'john',
    picture: 'http://placekitten.com/g/200/300'
  },
  {
    name: 'john',
    picture: 'http://placekitten.com/200/300'
  }
]

const listComment = [
  {
    name: 'nick smith',
    date: 'Feb 23rd, 2017',
    score: '7.8',
    picture: 'http://placekitten.com/g/200/300',
    comment:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fuga doloremque architecto dicta animi, totam, itaque officia ex.'
  },
  {
    name: 'mary thomas',
    date: 'Sept 13th, 2017',
    score: '9.3',
    picture: 'http://placekitten.com/200/300',
    comment:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fuga doloremque architecto dicta animi.'
  }
]
</script>

<template>
  <div class="flex flex-col flex-auto bg-[#f4f2f2] w-10/12">
    <div class="picture h-2/6">
      <div class="flex justify-around h-3/4">
        <div class="w-1/3">
          <img class="object-fill h-full w-full" src="../../assets/hotel-1.jpg" />
        </div>
        <div class="w-1/3">
          <img class="object-fill h-full w-full" src="../../assets/hotel-2.jpg" />
        </div>
        <div class="w-1/3">
          <img class="object-fill h-full w-full" src="../../assets/hotel-3.jpg" />
        </div>
      </div>
      <div class="hotelName h-1/4 bg-white flex justify-between items-center">
        <div class="uppercase font-light pl-5 text-2xl">hotel las palmas</div>
        <div class="rating flex h-full">
          <div
            class="flex items-center justify-center mr-5 font-light text-sm underline underline-offset-8 text-[#ff3366] hover:text-black cursor-pointer"
          >
            Albufeira, Portugal
          </div>
          <div class="flex flex-col items-center justify-center px-5 text-white bg-[#ff3366]">
            <div class="text-3xl">8.6</div>
            <div class="text-xs">429 votes</div>
          </div>
        </div>
      </div>
    </div>

    <div class="hotelDescription h-full bg-[#f4f2f2] flex">
      <div class="w-8/12 h-full">
        <div class="card bg-white h-5/6 m-10 flex flex-col justify-start items-center p-8">
          <div class="h-1/4 border-b-2 font-light">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi nisi dignissimos debitis
            ratione sapiente saepe. Accusantium cumque, quas, ut corporis incidunt deserunt quae
            architecto voluptate. Accusantium cumque, quas, ut corporis incidunt deserunt quae
            architecto voluptate delectus, inventore iure aliquid aliquam.
          </div>
          <div class="h-1/4 flex mt-5 w-full flex-wrap border-b-2 pb-5 px-5">
            <template v-for="(facility, index) in listFacility" :key="facility">
              <div class="w-2/4 font-light">{{ facility }}</div>
              <hr class="w-full border-none" v-if="index % 2 == 1" />
            </template>
          </div>
          <div class="h-2/4 flex justify-between w-full pt-5">
            <div class="font-light text-sm">
              <template v-if="recomendationPerson.length > 0">
                {{ recomendationPerson[0]?.name }} and {{ recomendationPerson.length - 1 }} other
                friends recommend this hotel.
              </template>
              <template v-else> be the first person to recommend this hotel </template>
            </div>
            <div class="relative">
              <div
                v-for="{ name, picture } in recomendationPerson"
                :key="name"
                class="inline-block -ml-4 relative"
              >
                <img
                  :src="picture"
                  class="rounded-full h-14 w-14 object-cover border-white border border-4"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="flex flex-col pt-10 w-4/12 pr-8">
        <template v-for="(comment, index) in listComment" :key="comment.name">
          <div
            v-if="index < 2"
            class="commentCard bg-white h-2/5 mb-5 p-8 flex flex-col justify-around relative"
          >
            <font-awesome-icon
              class="absolute -top-7 right-0 text-6xl"
              icon="fa-solid fa-comment"
              size="2xl"
              style="color: #d8dce4"
            />

            <div class="font-light">{{ comment.comment }}</div>
            <div class="flex">
              <div>
                <img class="rounded-full w-20 h-20 object-cover" :src="comment.picture" />
              </div>
              <div class="flex flex-col justify-evenly ml-5 w-16">
                <div class="capitalize text-sm font-medium">{{ comment.name }}</div>
                <div class="text-xs font-light">{{ comment.date }}</div>
              </div>
              <div class="flex items-center justify-center text-3xl ml-3 text-[#ff3366]">
                {{ comment.score }}
              </div>
            </div>
          </div>
        </template>
        <div class="flex items-center justify-center">
          <span
            class="text-[#ff3366] hover:text-black cursor-pointer capitalize btn-inline border-b-2 border-b-[#ff3366]"
          >
            show All <span class="panah transition-all duration-300 ease-out">→</span>
          </span>
        </div>
      </div>
    </div>
    <div class="book h-1/6 flex flex-col justify-center items-center">
      <div class="uppercase text-xl font-light text-gray-500 w-3/12 text-center">
        GOOD NEWS! WE HAVE 4 FREE ROOMS FOR YOUR SELECTED DATES!
      </div>
      <button
        class="relative rounded-full my-8 py-2 px-16 block bg-gradient-to-br from-[#FF3366] to-[#BA265D] text-white btn-book"
      >
        <span
          class="text-white absolute -top-6 left-4 uppercase opacity-0 transition-all duration-200 ease-out"
          >only 4 room left</span
        >
        <div
          class="uppercase w-full text-center flex flex-col items-center justify-center transition-all duration-200 ease-in"
        >
          <span class=""> book </span>
          <span class=""> now </span>
        </div>
      </button>
    </div>
  </div>
</template>

<style scoped>
.textThemeRed {
  color: #ff3366;
}
.btn-inline:hover .panah {
  margin-left: 10px;
}

.btn-inline:hover {
  border-bottom-color: black;
}

.btn-book:hover > span {
  opacity: 1;
  transform: translateY(2.7rem);
}
.btn-book:hover > div {
  transform: translateY(2.7rem);
  opacity: 0;
}
</style>
