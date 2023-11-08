// import './assets/main.css'
import './index.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'


import App from './App.vue'
import router from './router'


/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import { faBookmark,faComment,faEye,faEyeSlash,faCalendar,faThumbsUp as farThumbUp, faPaperPlane   } from '@fortawesome/free-regular-svg-icons'
import {
    faComment as fasComment, faArrowLeft, faUser, faHeart, faHouse, faHippo, faShieldDog, faShieldCat, faThumbsUp, faRepeat, faShare, faCircleExclamation,
    faRightFromBracket, faSortUp, faSortDown, faFilter, faMagnifyingGlass, faCamera,faGripLines,faArrowRightFromBracket
} from '@fortawesome/free-solid-svg-icons'

import {registerSW} from "virtual:pwa-register"

import FloatingVue from 'floating-vue'

import 'floating-vue/dist/style.css'

import CKEditor from '@ckeditor/ckeditor5-vue';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import { firebase } from '@/firebase/firebase.js'
import {  kajianStore } from '@/stores/counter'




/* add icons to the library */
library.add(faBookmark, faComment, fasComment, faArrowLeft, faUser, faHeart, faHouse, faHippo, faShieldDog, faShieldCat, faThumbsUp,
    faRepeat, faShare, faEye, faEyeSlash, faCircleExclamation, faRightFromBracket, faCalendar, faSortUp, faSortDown, faFilter,
    faMagnifyingGlass, faCamera, farThumbUp, faPaperPlane, faGripLines,faArrowRightFromBracket)

registerSW({immediate:true})
const app = createApp(App)
.component('font-awesome-icon', FontAwesomeIcon)
app.component('VueDatePicker', VueDatePicker);
app.use(createPinia())
app.use(FloatingVue)
app.use(CKEditor)
let isRefreshed = false
async function initDataFirebase() {
    const userStore = kajianStore()
     firebase.auth().onAuthStateChanged(async function (user) {
        if (user) {
            userStore.login(user)
        } else {
            userStore.logout()
         }
         if (!isRefreshed) {
             app.use(router)
             app.mount('#app')
            isRefreshed = true
         }
  })
}


initDataFirebase()
