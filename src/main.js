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
import { faBookmark,faComment  } from '@fortawesome/free-regular-svg-icons'
import { faComment as fasComment, faArrowLeft } from '@fortawesome/free-solid-svg-icons'

import {registerSW} from "virtual:pwa-register"



/* add icons to the library */
library.add(faBookmark,faComment,fasComment,faArrowLeft)

registerSW({immediate:true})

const app = createApp(App)
.component('font-awesome-icon', FontAwesomeIcon)

app.use(createPinia())
app.use(router)

app.mount('#app')
