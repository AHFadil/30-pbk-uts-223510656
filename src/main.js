import { createApp } from 'vue'
<<<<<<< HEAD
import './style.css'
import App from './App.vue'

createApp(App).mount('#app')
=======
import { Quasar } from 'quasar'
import { createPinia } from 'pinia'
import router from "./router";
import '@quasar/extras/material-icons/material-icons.css'
import 'quasar/src/css/index.sass'
import './style.css'
import App from './App.vue'

const pinia = createPinia();

const myApp = createApp(App);

myApp.use(Quasar, {
    plugins: {},
});

myApp.use(pinia);
myApp.use(router);

myApp.mount('#app')
>>>>>>> 61a8c7e (Perubahan Untuk UAS)
