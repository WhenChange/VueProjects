<!-- <template>
  <div class="container mt-5 text-center">
    <h1>Create an Account</h1>
    <p><input type="text" placeholder="Email" v-model="email" /></p>
    <p><input type="password" placeholder="Password" v-model="password" /></p>
    <p>
      <select v-model="role">
        <option value="user">User</option>
        <option value="staff">Staff</option>
      </select>
    </p>
    <p><button @click="register">Save to Firebase</button></p>
  </div>
</template> -->

<template>
  <div class="container mt-5 text-center">
    <div>
      <h1 class="mb-4">Create an Account</h1>
      <form class="text-start" @submit.prevent="register">
        <div class="col-md-4 offset-md-4">
          <div class="mb-3">
            <label for="email" class="form-label">Email</label>
            <input
              type="text"
              v-model="email"
              id="email"
              class="form-control"
              placeholder="Enter your email"
              required
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
              required
            />
          </div>

          <div class="mb-3">
            <label for="role" class="form-label">Role</label>
            <select v-model="role" id="role" class="form-select" required>
              <option value="user">User</option>
              <option value="staff">Staff</option>
            </select>
          </div>

          <div class="text-center">
            <button class="btn btn-primary mt-3 me-2" type="submit">Save to Firebase</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>


<script setup>
import { ref } from 'vue'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
import { setDoc, doc } from 'firebase/firestore'
import { useRouter } from 'vue-router'
import db from '../firebase/init.js'

const email = ref('')
const password = ref('')
const role = ref('user')
const router = useRouter()
const auth = getAuth()

const register = () => {
  createUserWithEmailAndPassword(auth, email.value, password.value)
    .then(async (userCredential) => {
      const user = userCredential.user

      //  Firestore
      await setDoc(doc(db, "users", user.uid), {
        email: email.value,
        role: role.value // 
      })
      alert('Registration successful! Redirecting to login page...')
      router.push('/FireLogin')
    })
    .catch((error) => {
      console.log(error.code)

      let errorMessage = 'Registration failed! '

      switch (error.code) {
        case 'auth/email-already-in-use':
          errorMessage += 'This email is already in use.'
          break
        case 'auth/invalid-email':
          errorMessage += 'Invalid email format.'
          break
        case 'auth/weak-password':
          errorMessage += 'Password is too weak.'
          break
        default:
          errorMessage += 'An unknown error occurred.'
          
      }
      alert(errorMessage)
    })
}

// const register = () => {
//   createUserWithEmailAndPassword(auth, email.value, password.value)
//     .then((data) => {
//       console.log('Firebase Register Successful!')
//       router.push('/FireLogin')
//     })
//     .catch((error) => {
//       console.log(error.code)
//     })
// }
</script>
