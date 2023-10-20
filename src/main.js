// import './assets/main.css'
import './index.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'


import App from './App.vue'
import router from './router'

import "@/firebase/firebase.js"

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import { faBookmark,faComment,faEye,faEyeSlash  } from '@fortawesome/free-regular-svg-icons'
import { faComment as fasComment, faArrowLeft, faUser, faHeart,faHouse, faHippo, faShieldDog,faShieldCat,faThumbsUp, faRepeat,faShare,faCircleExclamation, faRightFromBracket  } from '@fortawesome/free-solid-svg-icons'

import {registerSW} from "virtual:pwa-register"

import FloatingVue from 'floating-vue'

import 'floating-vue/dist/style.css'

/* add icons to the library */
library.add(faBookmark,faComment,fasComment,faArrowLeft,faUser,faHeart,faHouse,faHippo, faShieldDog,faShieldCat,faThumbsUp, faRepeat,faShare,faEye,faEyeSlash,faCircleExclamation,faRightFromBracket)

registerSW({immediate:true})

const app = createApp(App)
.component('font-awesome-icon', FontAwesomeIcon)

app.use(createPinia())
app.use(router)
app.use(FloatingVue)
app.mount('#app')
