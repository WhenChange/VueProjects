<template>
  <div class="container mt-5 text-center">
    <div v-if="showAdd">
      <h1>Add Book</h1>
      <form @submit.prevent="addBook">
        <div class="mb-3">
          <label for="isbn">ISBN: </label><br />
          <input type="text" v-model="isbn" id="isbn" required />
        </div>
        <div>
          <label for="name">Name: </label><br />
          <input type="text" v-model="name" id="name" required />
        </div>
        <button class="mt-3 mx-2" type="submit">Add Book</button>
        <!-- <button class="mt-3" @click="showAdd = false">Switch to search</button> -->
      </form>
    </div>

    <div v-else>
      <h1 class="mb-4">Search Book</h1>
      <form class="text-start" @submit.prevent="searchBook">
        <div class="col-md-4 offset-md-4">
          <div class="mb-3">
            <label for="isbnOperator" class="form-label">ISBN</label>
            <select v-model="isbnOperator" id="isbnOperator" class="form-select">
              <option value=">">></option>
              <option value="=">=</option>
              <option value="<">&lt;</option>
            </select>
          </div>

          <div class="mb-3">
            <label for="isbnSearch" class="form-label">Value</label>
            <input
              type="text"
              v-model="isbnSearch"
              id="isbnSearch"
              class="form-control"
              placeholder=""
            />
          </div>

          <div class="mb-3">
            <label for="nameSearch" class="form-label">Name (Start from)</label>
            <input
              type="text"
              v-model="nameSearch"
              id="nameSearch"
              class="form-control"
              placeholder=""
            />
          </div>

          <div class="mb-3">
            <label for="sortOrder" class="form-label">Sort by ISBN</label>
            <select v-model="sortOrder" id="sortOrder" class="form-select">
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
          </div>

          <div class="mb-3">
            <label for="limitResults" class="form-label">Limit</label>
            <select v-model="limitResults" id="limitResults" class="form-select">
              <option value="1">1</option>
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="50">50</option>
            </select>
          </div>

          <div class="text-center">
            <button class="btn btn-primary mt-3 me-2" type="submit">Search Book</button>
            <button class="btn btn-secondary mt-3" @click="showAdd = true">Switch to Add</button>
          </div>
        </div>
      </form>
    </div>

    <BookList />
  </div>
</template>

<script>
import { ref } from 'vue'
import db from '../firebase/init.js'
import { collection, addDoc } from 'firebase/firestore'

import BookList from '../components/BookList.vue'

export default {
  setup() {
    const isbn = ref('')
    const name = ref('')
    const showAdd = ref(true)

    const addBook = async () => {
      try {
        const isbnNumber = Number(isbn.value)
        if (isNaN(isbnNumber)) {
          alert('ISBN must be a valid number')
          return
        }

        await addDoc(collection(db, 'books'), {
          isbn: isbnNumber,
          name: name.value
        })

        isbn.value = ''
        name.value = ''
        alert('Book added successfully!')

        // Refresh the page if added the book successfully.
        const event = new Event('book-added')
        window.dispatchEvent(event)
      } catch (error) {
        console.error('Error adding book: ', error)
      }
    }

    return {
      isbn,
      name,
      addBook,
      showAdd
    }
  },
  components: {
    BookList
  }
}
</script>
