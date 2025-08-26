import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'
import '@/assets/style.css'
import ConfirmationService from 'primevue/confirmationservice'

import App from './App.vue'
import router from './router'
import 'primeicons/primeicons.css'

const app = createApp(App)
app.use(createPinia())
app.use(PrimeVue, {
  theme: {
    preset: Aura,
  },
})
app.use(router)
app.use(ConfirmationService)

app.mount('#app')
