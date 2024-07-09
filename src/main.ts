import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/reset.css';

import supabase from './plugin/supabase';
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)
app.config.globalProperties.$supabase = supabase;
app.use(createPinia())
app.use(router)
app.use(Antd)

app.mount('#app')
