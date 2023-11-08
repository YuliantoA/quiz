import { ref, computed } from 'vue'
import { defineStore } from 'pinia'


export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  const doubleCount = computed(() => count.value * 2)
  function increment() {
    count.value++
  }

  return { count, doubleCount, increment }
})

export const useQuizStore = defineStore('scorer', () => {
  let score = ref(0)
  let activeQuestion = ref(-1)
  let themeQuestion = ref('')
  let totalQuestion = ref('')
  let formTotalQuestion = ref(0)
  let formThemeQuestion =ref('')
  function calculateScore(answer, userAnswer) {
    answer.forEach((value, index) => {
      value === userAnswer[index] ? score.value++ :''
    })
    console.log(score)
  }
  return {score,calculateScore,totalQuestion,themeQuestion,activeQuestion,formTotalQuestion,formThemeQuestion}
})

export const toastStore = defineStore('toast', () => {
  const toastMessage = ref('')
  const toastType = ref('')
  const toastFunc = ref(Function)
  const toastActive = ref(false)
  const toastRemoveAll = ref(false)
  function toastOpen({message,type,promFunc}) {
    toastMessage.value = message
    toastType.value = type
    toastActive.value = true
    toastFunc.value = promFunc
  }
  function resetToast() {
    toastMessage.value = ''
    toastType.value = ''
    toastActive.value = false
    toastFunc.value = null
  }
  return {toastActive,toastOpen,toastMessage,toastType,resetToast,toastRemoveAll,toastFunc}
})
export const kajianStore = defineStore('user', () => {
  const email = ref('')
  const displayName = ref('')
  const isLogin = ref(false)
  const uid = ref('')

  function getUid() {
    return uid
  }

 
  function login({email:userEmail, displayName:userName, uid:userID}) {
    email.value = userEmail
    displayName.value = userName
    isLogin.value = true
    uid.value = userID
  }
  function logout() {
    email.value = ''
    displayName.value = ''
    isLogin.value = false
    uid.value = ''
  }
  return {login,email,displayName,isLogin,uid,getUid,logout}
})

export const kajianFeedStore = defineStore('controlFeed', () => {
  const sortComponent = ref()
  const sortAsc = ref()
  const search = ref()
  const refetchPost = ref(false)
  const showSideBar = ref(false)

  return {sortComponent,sortAsc,search,refetchPost,showSideBar}
})


