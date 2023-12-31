import { createApp } from 'vue'
import { createPinia } from 'pinia'

import './styles/default.css'

import App from './App.vue'
import router from './router'

// 引入全局注册
import { globalRegister } from './global'

// 引入mockjs
import './mock'

const app = createApp(App)

app.use(globalRegister)

app.use(createPinia())
app.use(router)

app.mount('#app')
