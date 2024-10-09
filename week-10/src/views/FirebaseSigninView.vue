<template>
  <div class="container mt-5 text-center">
    <div>
      <h1 class="mb-4">Sign in</h1>
      <form class="text-start" @submit.prevent="signin">
        <div class="col-md-4 offset-md-4">
          <div class="mb-3">
            <label for="email" class="form-label">Email</label>
            <input
              type="text"
              v-model="email"
              id="email"
              class="form-control"
              placeholder="Enter your email"
            />
          </div>

          <div class="mb-3">
            <label for="password" class="form-label">Password</label>
            <input
              type="password"
              v-model="password"
              id="password"
              class="form-control"
              placeholder="Enter your password"
            />
          </div>

          <div class="text-center">
            <button class="btn btn-primary mt-3 me-2" type="submit">Sign in via Firebase</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import db from '../firebase/init.js'
import { ref } from 'vue'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { useRouter } from 'vue-router'
import { doc, getDoc } from 'firebase/firestore'
import { useStore } from 'vuex'

const email = ref('')
const password = ref('')
const router = useRouter()
const auth = getAuth()
const store = useStore()

const signin = () => {
  signInWithEmailAndPassword(auth, email.value, password.value)
    .then(async (userCredential) => {
      const user = userCredential.user

      const userDocRef = doc(db, 'users', user.uid)
      const userDoc = await getDoc(userDocRef)

      if (userDoc.exists()) {
        const userData = userDoc.data()
        const userRole = userData.role

        await store.dispatch('login', userData)

        console.log('Firebase Sign in Successful!')
        console.log('User role:', userRole)
        alert('Login Successfully! Redirecting to home page...')

        if (userRole === 'admin') {
          router.push('/admin')
        } else {
          router.push('/')
        }

        console.log(auth.currentUser)
      } else {
        alert('No such document with user role found!')
        console.log('No such document with user role found!')
      }
    })
    .catch((error) => {
      alert(error.code)
      console.log(error.code)
    })
}
</script>

<style></style>
