
import { initializeApp } from 'firebase/app';
import { getFirestore } from "firebase/firestore";  // Import Firestore from Firebase

// app.component('DataTable', DataTable)
// app.component('Column', Column)

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDDBv-z9JSI4aZZ_U3555OGHTAQgNnr7_s",
  authDomain: "fit5032-2024-s2-549b2.firebaseapp.com",
  projectId: "fit5032-2024-s2-549b2",
  storageBucket: "fit5032-2024-s2-549b2.appspot.com",
  messagingSenderId: "14612887040",
  appId: "1:14612887040:web:8295103664ab57d7814ae5"
};
  
  // Initialize Firebase
initializeApp(firebaseConfig);
const db = getFirestore();      // Initialize Firestore
export default db;              // Export Firestore instance
