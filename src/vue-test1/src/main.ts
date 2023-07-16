import './styles/common.scss'
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { lazyPlugin, InfinitePlugin } from './directives'
const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(lazyPlugin)
app.use(InfinitePlugin)

app.mount('#app')
