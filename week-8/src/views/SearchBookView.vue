<template>
  <div class="container mt-5 text-center">
    <div>
      <h1 class="mb-4">Search Book</h1>
      <form class="text-start" @submit.prevent="searchBook">
        <div class="col-md-4 offset-md-4">
          <div class="mb-3">
            <label for="isbnOperator" class="form-label">ISBN</label>
            <select v-model="isbnOperator" id="isbnOperator" class="form-select">
              <option value=">">></option>
              <option value="==">=</option>
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
            <label for="sortField" class="form-label">Sort by</label>
            <select v-model="sortField" id="sortField" class="form-select">
              <option value="isbn">ISBN</option>
              <option value="name">Name</option> 
            </select>
          </div>

          <div class="mb-3">
            <label for="sortOrder" class="form-label">Sort Order</label>
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
          </div>
        </div>
      </form>
    </div>

    <div>
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
  </div>
</template>

<script>
import { ref, onMounted,  } from 'vue'
import db from '../firebase/init.js'
import { collection, query, where, getDocs, deleteDoc, doc, updateDoc, orderBy, limit } from 'firebase/firestore'

export default {
  setup() {
    const books = ref([])
    const showEditModal = ref(false)
    const editedBook = ref({})

    const fetchBooks = async () => {
      try {
        const q = query(collection(db, 'books'))
        const querySnapshot = await getDocs(q)
        const booksArray = []
        querySnapshot.forEach((doc) => {
          booksArray.push({ id: doc.id, ...doc.data() })
        })
        books.value = booksArray
      } catch (error) {
        console.error('Error fetching books: ', error)
      }
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
        searchBook()
    })

    const isbnSearch = ref('')    
    const isbnOperator = ref('')
    const sortField = ref('isbn')
    const sortOrder = ref('asc')
    const limitResults = ref(5)

    const searchBook = async () => {
      try {
        const booksRef = collection(db, 'books')
        const conditions = []

        // Add ISBN condition if provided
        if (isbnSearch.value) {
          conditions.push(where('isbn', isbnOperator.value, Number(isbnSearch.value)))
        }
        
        // Build the query with the selected conditions, order, and limit
        let q = query(
          booksRef,
          ...conditions,
          orderBy(sortField.value, sortOrder.value), 
          limit(Number(limitResults.value))
        )

        const querySnapshot = await getDocs(q)
        const booksArray = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))

        books.value = booksArray
        console.log('Books:', booksArray)
        // You can now handle the fetched books (e.g., display them in your template)
      } catch (error) {
        console.error('Error searching books:', error)
        books.value = null
      }
    }

    return {
      books,
      showEditModal,
      editedBook,
      deleteBook,
      openEditModal,
      saveChanges,
      closeEditModal,
      searchBook,
      isbnSearch,
      sortField,
      isbnOperator,
      sortOrder,
      limitResults,
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
