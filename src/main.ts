import './assets/main.css'

import { createApp } from 'vue'

//Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import '@mdi/font/css/materialdesignicons.css'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

//Componente App
import App from './App.vue'

const vuetify = createVuetify({
    components,
    directives,
})

const app = createApp(App)

app.use(vuetify).mount('#app')
