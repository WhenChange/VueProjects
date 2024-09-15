
import { initializeApp } from 'firebase/app';
import { getFirestore } from "firebase/firestore";  // Import Firestore from Firebase

// app.component('DataTable', DataTable)
// app.component('Column', Column)

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyD2SGRRdT-WVGo_wZzjDmnZGrMx3FX-b0o",
    authDomain: "fit5032-2024-s2.firebaseapp.com",
    projectId: "fit5032-2024-s2",
    storageBucket: "fit5032-2024-s2.appspot.com",
    messagingSenderId: "1031513411510",
    appId: "1:1031513411510:web:a2a448045a6b477c093b17"
  };
  
  // Initialize Firebase
initializeApp(firebaseConfig);
const db = getFirestore();      // Initialize Firestore
export default db;              // Export Firestore instance
