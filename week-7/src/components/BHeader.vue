<template>
  <!-- Using Bootstrap's Header template (starter code) -->
  <!-- https://getbootstrap.com/docs/5.0/examples/headers/ -->
  <div class="container">
    <header class="d-flex justify-content-center py-3">
      <ul class="nav nav-pills">
        <li class="nav-item">
          <router-link to="/" class="nav-link" active-class="active" aria-current="page"
            >Home (Week 5)</router-link
          >
        </li>
        <li class="nav-item">
          <router-link to="/about" class="nav-link" active-class="active">About</router-link>
        </li>
        <!-- <li class="nav-item">
          <router-link to="/login" class="nav-link" active-class="active">Login</router-link>
        </li> -->
        <li class="nav-item">
          <!-- According to status -->
          <router-link v-if="!isLoggedIn" to="/login" class="nav-link" active-class="active">
            Login
          </router-link>
          <button v-else @click="confirmLogout" class="nav-link">Logout</button>
        </li>
      </ul>
    </header>
  </div>
  <!-- Confirm Logout -->
  <div v-if="showLogoutConfirm" class="logout-confirm">
    <p>Are you sure to logout?</p>
    <div class="button-container">
      <button class="btn btn-primary me-2" @click="logout">Yes</button>
      <button class="btn btn-secondary" @click="showLogoutConfirm = false">No</button>
    </div>
  </div>
  <div v-if="showLogoutConfirm" class="overlay"></div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

const store = useStore()
const router = useRouter()

// From Vuex get log status
const isLoggedIn = computed(() => store.state.isAuthenticated)

const showLogoutConfirm = ref(false)

const confirmLogout = () => {
  showLogoutConfirm.value = true
}

const logout = () => {
  store.dispatch('logout')
  showLogoutConfirm.value = false
  router.push({ name: 'Login' }) // Redirect to login page
}
</script>

<style scoped>
.b-example-divider {
  height: 3rem;
  background-color: rgba(0, 0, 0, 0.1);
  border: solid rgba(0, 0, 0, 0.15);
  border-width: 1px 0;
  box-shadow:
    inset 0 0.5em 1.5em rgba(0, 0, 0, 0.1),
    inset 0 0.125em 0.5em rgba(0, 0, 0, 0.15);
}

.form-control-dark {
  color: #fff;
  background-color: var(--bs-dark);
  border-color: var(--bs-gray);
}
.form-control-dark:focus {
  color: #fff;
  background-color: var(--bs-dark);
  border-color: #fff;
  box-shadow: 0 0 0 0.25rem rgba(255, 255, 255, 0.25);
}

.bi {
  vertical-align: -0.125em;
  fill: currentColor;
}

.text-small {
  font-size: 85%;
}

.dropdown-toggle {
  outline: 0;
}

.nav-link {
  cursor: pointer;
}

.logout-confirm {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 20px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  z-index: 1001;
}

.button-container {
  display: flex;
  justify-content: center;
  gap: 20px;
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
}
</style>
