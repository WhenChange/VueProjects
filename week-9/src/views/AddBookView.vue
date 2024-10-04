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
