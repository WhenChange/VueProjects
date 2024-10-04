<template>
  <div class="container mt-5 text-center">
    <h1>Books with ISBN</h1>
    <ul class="book">
      <li v-for="book in books" :key="book.id">
        {{ book.name }} - ISBN: {{ book.isbn }}
        <button @click="openEditModal(book)" class="btn btn-primary mx-2">Edit</button>
        <button @click="deleteBook(book.id)" class="btn btn-danger">Delete</button>
      </li>
    </ul>

    <!-- Edit modal for books -->
    <div v-if="showEditModal" class="edit-confirm">
      <h3>Edit Book</h3>
      <div class="form-group">
        <label for="bookName">Name:</label>
        <input type="text" v-model="editedBook.name" id="bookName" class="form-control" />
      </div>
      <div class="form-group">
        <label for="bookIsbn">ISBN:</label>
        <input type="text" v-model="editedBook.isbn" id="bookIsbn" class="form-control" />
      </div>
      <div class="button-container mt-3">
        <button class="btn btn-primary me-2" @click="saveChanges">Yes</button>
        <button class="btn btn-secondary" @click="closeEditModal">No</button>
      </div>
    </div>
    <div v-if="showEditModal" class="overlay"></div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import db from '../firebase/init.js'
import {
  collection,
  onSnapshot,
  query,
  where,
  getDocs,
  deleteDoc,
  doc,
  updateDoc
} from 'firebase/firestore'

export default {
  setup() {
    const books = ref([])
    const showEditModal = ref(false)
    const editedBook = ref({})

    const fetchBooks = async () => {
      const q = query(collection(db, 'books'))
      onSnapshot(
        q,
        (querySnapshot) => {
          const booksArray = []
          querySnapshot.forEach((doc) => {
            booksArray.push({ id: doc.id, ...doc.data() })
          })
          books.value = booksArray
        },
        (error) => {
          console.error('Error fetching books: ', error)
        }
      )
    }

    // delete
    const deleteBook = async (id) => {
      try {
        await deleteDoc(doc(db, 'books', id))
        fetchBooks()
      } catch (error) {
        console.error('Error deleting book: ', error)
      }
    }

    // show
    const openEditModal = (book) => {
      editedBook.value = { ...book } //
      showEditModal.value = true //
    }

    // save
    const saveChanges = async () => {
      try {
        const bookDoc = doc(db, 'books', editedBook.value.id)
        await updateDoc(bookDoc, {
          name: editedBook.value.name,
          isbn: Number(editedBook.value.isbn)
        })
        showEditModal.value = false //
        fetchBooks() //
      } catch (error) {
        console.error('Error updating book: ', error)
      }
    }

    // close
    const closeEditModal = () => {
      showEditModal.value = false //
    }

    onMounted(() => {
      fetchBooks()
    })

    return {
      books,
      showEditModal,
      editedBook,
      deleteBook,
      openEditModal,
      saveChanges,
      closeEditModal
    }
  }
}
</script>

<style>
ul.book {
  padding-left: 0;
  list-style-position: inside;
  font-size: x-large;
}

.edit-confirm {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 20px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  z-index: 1001;
  width: 300px;
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
