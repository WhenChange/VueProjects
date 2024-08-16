<!-- <template>
    <div class="form">
    <h1>User Information Form / Credentials</h1>
        <form>
            <label for="username">Username:</label><br>
            <input type="text" id="username" name="username"><br>
            
            <label for="password">Password:</label><br>
            <input type="password" id="password" name="password"><br>
            
            <label for="isAustralian">Australian Resident?</label><br>
            <input type="checkbox" id="isAustralian" name="isAustralian"><br>
            
            <label for="reason">Reason For Joining:</label><br>
            <textarea id="reason" name="reason" rows="3"></textarea><br>
            
            <label for="gender">Gender</label><br>
            <select id="gender">
                <option value="female">Female</option>
                <option value="male">Male</option>
                <option value="other">Other</option>
            </select>
        </form>
    </div>
</template> -->

<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col-md-8 offset-md-2">
        <!-- <div class="col-6 col-sm-8 col-md-8 col-lg-8 col-xl-8 offset-md-2"> -->
        <h1 class="text-center">User Information Form</h1>
        <form @submit.prevent="submitForm">
          <div class="row mb-3">
            <!-- <div class="col-md-6"> -->
            <div class="col-6 col-sm-6">
              <label for="username" class="form-label">Username</label>
              <input
                type="text"
                class="form-control"
                id="username"
                @blur="() => validateName(true)"
                @input="() => validateName(false)"
                v-model="formData.username"
              />

              <div v-if="errors.username" class="text-danger">{{ errors.username }}</div>
            </div>
            <!-- <div class="col-md-6"> -->
            <div class="col-6 col-sm-6">
              <label for="password" class="form-label">Password</label>
              <input
                type="password"
                class="form-control"
                id="password"
                @blur="() => validatePassword(true)"
                @input="() => validatePassword(false)"
                v-model="formData.password"
              />
              <div v-if="errors.password" class="text-danger">{{ errors.password }}</div>
            </div>
          </div>
          <div class="row mb-3">
            <!-- <div class="col-md-6"> -->
            <div class="col-6 col-sm-6">
              <div class="form-check">
                <input
                  type="checkbox"
                  class="form-check-input"
                  id="isAustralian"
                  v-model="formData.isAustralian"
                />
                <label class="form-check-label" for="isAustralian">Australian Resident?</label>
              </div>
            </div>
            <!-- <label class="form-check-label" for="isAustralian">Australian Resident?</label>
              <div class="form-check form-check-inline">
                <input type="radio" class="form-check-input" id="australianYes" value="yes" required
                  v-model="formData.isAustralian" />
                <label class="form-check-label" for="australianYes">Yes</label>
              </div>
              <div class="form-check form-check-inline">
                <input type="radio" class="form-check-input" id="australianNo" value="no" required
                  v-model="formData.isAustralian" />
                <label class="form-check-label" for="australianNo">No</label>
              </div> -->
            <!-- <div class="col-md-6"> -->
            <div class="col-6 col-sm-6">
              <label for="gender" class="form-label">Gender</label>
              <select
                class="form-select"
                id="gender"
                v-model="formData.gender"
                @blur="() => validateGender(true)"
                @input="() => validateGender(false)"
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
              <div v-if="errors.gender" class="text-danger">{{ errors.gender }}</div>
            </div>
          </div>
          <div class="mb-3">
            <label for="reason" class="form-label">Reason for joining</label>
            <textarea
              class="form-control"
              id="reason"
              rows="3"
              v-model="formData.reason"
              @blur="() => validateReason(true)"
              @input="() => validateReason(false)"
            ></textarea>
            <div v-if="errors.reason" class="text-danger">{{ errors.reason }}</div>
          </div>
          <div class="text-center">
            <button type="submit" class="btn btn-primary me-2">Submit</button>
            <button type="button" class="btn btn-secondary" @click="clearForm">Clear</button>
          </div>
        </form>
      </div>
    </div>
  </div>
  <!-- new -->
  <!-- <div class="row mt-5" v-if="submittedCards.length">
    <div class="d-flex flex-wrap justify-content-start">
      <div
        v-for="(card, index) in submittedCards"
        :key="index"
        class="card m-2"
        style="width: 18rem"
      >
        <div class="card-header">User Information</div>
        <ul class="list-group list-group-flush">
          <li class="list-group-item">Username: {{ card.username }}</li>
          <li class="list-group-item">Password: {{ card.password }}</li>
          <li class="list-group-item">
            Australian Resident: {{ card.isAustralian ? 'Yes' : 'No' }}
          </li>
          <li class="list-group-item">Gender: {{ card.gender }}</li>
          <li class="list-group-item">Reason: {{ card.reason }}</li>
        </ul>
      </div>
    </div>
  </div> -->

  <!-- PrimeVue -->
  <div class="mt-5" v-if="submittedCards.length">
    <DataTable :value="submittedCards" responsiveLayout="scroll">
      <Column field="username" header="Username"></Column>
      <Column field="password" header="Password"></Column>
      <Column field="isAustralian" header="Australian Resident" :body="residentTemplate"></Column>
      <Column field="gender" header="Gender"></Column>
      <Column field="reason" header="Reason"></Column>
    </DataTable>
  </div>
</template>

<script setup>
// Our logic will go here
import { ref } from 'vue'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'

const formData = ref({
  username: '',
  password: '',
  isAustralian: false,
  reason: '',
  gender: ''
})

const submittedCards = ref([])

const submitForm = () => {
  validateName(true)
  validatePassword(true)
  validateGender(true)
  validateReason(true)

  if (
    !errors.value.username &&
    !errors.value.password &&
    !errors.value.gender &&
    !errors.value.reason
  ) {
    submittedCards.value.push({ ...formData.value })
    // clearForm()
  }
}

// const submitForm = () => {
//   submittedCards.value.push({
//     ...formData.value
//   })
// }

const clearForm = () => {
  // Default Form
  formData.value = {
    username: '',
    password: '',
    isAustralian: false,
    reason: '',
    gender: ''
  }
  // Clear Form
  // submittedCards.value = []
}

const errors = ref({
  username: null,
  password: null,
  resident: null,
  gender: null,
  reason: null
})

const validateName = (blur) => {
  if (formData.value.username.length < 3) {
    if (blur) errors.value.username = 'Name must be at least 3 characters'
  } else {
    errors.value.username = null
  }
}

const validatePassword = (blur) => {
  const password = formData.value.password
  const minLength = 8
  const hasUppercase = /[A-Z]/.test(password)
  const hasLowercase = /[a-z]/.test(password)
  const hasNumber = /\d/.test(password)
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password)

  if (password.length < minLength) {
    if (blur) errors.value.password = `Password must be at least ${minLength} characters long.`
  } else if (!hasUppercase) {
    if (blur) errors.value.password = 'Password must contain at least one uppercase letter.'
  } else if (!hasLowercase) {
    if (blur) errors.value.password = 'Password must contain at least one lowercase letter.'
  } else if (!hasNumber) {
    if (blur) errors.value.password = 'Password must contain at least one number.'
  } else if (!hasSpecialChar) {
    if (blur) errors.value.password = 'Password must contain at least one special character.'
  } else {
    errors.value.password = null
  }
}

const validateGender = (blur) => {
  const validOptions = ['male', 'female', 'other']
  if (!validOptions.includes(formData.value.gender)) {
    if (blur) errors.value.gender = 'Gender must be one of the three options.'
  } else {
    errors.value.gender = null
  }
}

const validateReason = (blur) => {
  if (!formData.value.reason) {
    if (blur) errors.value.reason = 'Reason can not be empty.'
  } else {
    errors.value.reason = null
  }
}
</script>

<style scoped>
/* // Our logic will go here */
.card {
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.card-header {
  background-color: #275fda;
  color: white;
  padding: 10px;
  border-radius: 10px 10px 0 0;
}

.list-group-item {
  padding: 10px;
}
</style>
