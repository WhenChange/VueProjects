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
  apiKey: "AIzaSyDDBv-z9JSI4aZZ_U3555OGHTAQgNnr7_s",
  authDomain: "fit5032-2024-s2-549b2.firebaseapp.com",
  projectId: "fit5032-2024-s2-549b2",
  storageBucket: "fit5032-2024-s2-549b2.appspot.com",
  messagingSenderId: "14612887040",
  appId: "1:14612887040:web:8295103664ab57d7814ae5"
};
  
  // Initialize Firebase
initializeApp(firebaseConfig);
