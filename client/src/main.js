// import 'primevue/resources/themes/aura-light-green/theme.css'
import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'


import App from './App.vue'
import router from './router'
import PrimeVue, { defaultOptions } from 'primevue/config'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(PrimeVue, {
  locale: {
    ...defaultOptions.locale,
    firstDayOfWeek: 1,
  }
})

app.mount('#app')
