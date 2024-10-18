import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import LoginView from '../views/LoginView.vue'
import RedirectView from '../views/RedirectView.vue'
import store from '../store/store'
import FirebaseSigninView from '../views/FirebaseSigninView.vue'
import FirebaseRegisterView from '../views/FirebaseRegisterView.vue'
import AddBookView from '../views/AddBookView.vue'
import SearchBookView from '../views/SearchBookView.vue'
import GetBookCountView from '../views/GetBookCountView.vue'
import WeatherView from '../views/WeatherView.vue'
import CountBookAPI from '../views/CountBookAPI.vue';
import GetAllBookAPI from '../views/GetAllBookAPI.vue';



const routes = [
  {
    path: '/GetAllBookAPI',
    name: 'GetAllBookAPI',
    component: GetAllBookAPI
  },
  {
    path: '/CountBookAPI',
    name: 'CountBookAPI',
    component: CountBookAPI
  },
  {
    path: '/WeatherCheck',
    name: 'WeatherCheck',
    component: WeatherView
  },
  {
    path: '/GetBookCount',
    name: 'GetBookCount',
    component: GetBookCountView
  },
  {
    path: '/',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/addbook',
    name: 'AddBook',
    component: AddBookView
  },
  {
    path: '/searchbook',
    name: 'SearchBook',
    component: SearchBookView
  },
  {
    path: '/about',
    name: 'About',
    component: AboutView,
    // Per-route Guard
    // beforeEnter: (to, from) => {
    //   return false
    // }
    beforeEnter: (to, from, next) => {
      if (!store.state.isAuthenticated) {
        next({ name: 'Redirect' });
      } else {
        next();
      }
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginView
  },
  {
    path: '/redirect',
    name: 'Redirect',
    component: RedirectView
  },
  {
    path: '/FireLogin',
    name: 'FireLogin',
    component: FirebaseSigninView,
  },
  {
    path: '/FireRegister',
    name: 'FireRegister',
    component: FirebaseRegisterView,
  },
]

// const router = createRouter({
//   history: createWebHistory(),
//   routes
// })

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

// router.beforeEach((to, from, next) => {
//   if (!store.state.isAuthenticated && to.name !== 'Login') {
//     next({ name: 'Login' });
//   } else {
//     next();
//   }
// })

// router.beforeEach(async (to, from) => {
//   if (to.name == "About"){
//     return false;
//   }
// })

export default router;