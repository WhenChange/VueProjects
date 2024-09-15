<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col-md-8 offset-md-2">
        <h2 class="text-center">Login</h2>
        <form @submit.prevent="handleLogin">
          <div class="row mb-3">
            <div class="col-md-6 col-sm-6 offset-md-3">
              <label for="username" class="form-label">Username</label>
              <input type="text" class="form-control" id="username" v-model="formData.username" />
              <!-- <div v-if="errors.username" class="text-danger">{{ errors.username }}</div> -->
            </div>
          </div>
          <!-- <div>
            <label for="username">Username:</label>
            <input type="text" v-model="username" required />
          </div> -->
          <div class="row mb-3">
            <div class="col-md-6 col-sm-6 offset-md-3">
              <label for="password" class="form-label">Password</label>
              <input
                type="password"
                class="form-control"
                id="password"
                v-model="formData.password"
              />
              <div v-if="errors.match" class="text-danger">{{ errors.match }}</div>
            </div>
          </div>

          <!-- <div>
            <label for="password">Password:</label>
            <input type="password" v-model="password" required />
          </div> -->

          <div class="text-center">
            <button type="submit" class="btn btn-primary me-2">Login</button>
            <button type="button" class="btn btn-secondary" @click="clearForm">Clear</button>
          </div>

          <!-- <button type="submit">Login</button> -->
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

const formData = ref({
  username: '',
  password: ''
})

const errors = ref({
  match: ''
})

const router = useRouter()
const store = useStore()

const handleLogin = async () => {
  const user = { username: formData.value.username, password: formData.value.password }
  if (user.username === 'Jerry' && user.password === '12345Aa!') {
    errors.value.match = ''
    console.log('User:', user);
    await store.dispatch('login', user); // store.dispatch for login action
    console.log('Redirecting to Home');
    router.push({ name: 'Home' }) // Redirect to Home after login
  } else {
    errors.value.match = 'Username or Password is wrong.'
  }
}

const clearForm = () => {
  formData.value = {
    username: '',
    password: ''
  }
  errors.value.match = ''
}
</script>


<!-- <script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

const formData = ref({
  username: '',
  password: ''
})

const errors = ref({
  match: ''
})

// const username = ref('')
// const password = ref('')

const router = useRouter()
const store = useStore()
const { login } = store

const handleLogin = () => {
  const user = { username: formData.value.username, password: formData.value.password }
  if (user.username === 'Jerry' && user.password === '12345Aa!') {
    errors.value.match = ''
    console.log('User:', user);
    login(user);
    console.log('Redirecting to Home');
    router.push({ name: 'Home' }) // Redirect to Home after login
  } else {
    errors.value.match = 'Username or Password is wrong.'
  }
}

const clearForm = () => {
  formData.value = {
    username: '',
    password: ''
  }
  errors.value.match = ''
}
</script> -->

<!-- <script>
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      username: '',
      password: '',
    };
  },
  methods: {
    ...mapActions(['login']),
    handleLogin() {
      const user = { username: this.username, password: this.password };
      this.login(user);
      this.$router.push({ name: 'Home' }); // Redirect to Home after login
    },
  },
};
</script> -->


<style></style>
