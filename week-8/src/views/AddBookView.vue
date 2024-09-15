<template>
  <div class="container mt-5 text-center">
    <h1>Add Book</h1>
    <form @submit.prevent="addBook">
      <div class="mb-3">
        <label for="isbn">ISBN: </label><br>
        <input type="text" v-model="isbn" id="isbn" required />
      </div>
      <div>
        <label for="name">Name: </label><br>
        <input type="text" v-model="name" id="name" required />
      </div>
      <button class="mt-3" type="submit">Add Book</button>
    </form>
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
      addBook
    }
  },
  components: {
    BookList
  }
}
</script>
