// import './assets/main.css'
// import '@/assets/style.css'
import 'bootstrap/dist/css/bootstrap.min.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/store'
import { initializeApp } from 'firebase/app';

import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'
// import DataTable from 'primevue/datatable'
// import Column from 'primevue/Column'



const app = createApp(App)
app.use(PrimeVue, { theme: { preset: Aura } })
app.use(router)
app.use(store)

// app.component('DataTable', DataTable)
// app.component('Column', Column)

app.mount('#app')

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyD2SGRRdT-WVGo_wZzjDmnZGrMx3FX-b0o",
    authDomain: "fit5032-2024-s2.firebaseapp.com",
    projectId: "fit5032-2024-s2",
    storageBucket: "fit5032-2024-s2.appspot.com",
    messagingSenderId: "1031513411510",
    appId: "1:1031513411510:web:a2a448045a6b477c093b17"
  };
  
  // Initialize Firebase
initializeApp(firebaseConfig);
