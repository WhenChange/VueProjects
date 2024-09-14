import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import LoginView from '../views/LoginView.vue'
import RedirectView from '../views/RedirectView.vue'
import store from '../store/store'
import FirebaseSigninView from '../views/FirebaseSigninView.vue'
import FirebaseRegisterView from '../views/FirebaseRegisterView.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView
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

const router = createRouter({
  history: createWebHistory(),
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