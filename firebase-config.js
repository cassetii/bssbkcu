// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-firestore.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA7ss0mtX8EL0EGQRrq3-epoY5mdNW0lA0",
  authDomain: "bssbkcu-7e51f.firebaseapp.com",
  projectId: "bssbkcu-7e51f",
  storageBucket: "bssbkcu-7e51f.appspot.com",
  messagingSenderId: "753845824071",
  appId: "1:753845824071:web:c9b742c93c9c728738df62",
  measurementId: "G-K2C2KC5H08"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
