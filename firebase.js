// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getFirebase } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAkHTpN9OgJuGu5OqyLD-6Jp8ibCMwBeXk",
  authDomain: "saas-flashcards-f198d.firebaseapp.com",
  projectId: "saas-flashcards-f198d",
  storageBucket: "saas-flashcards-f198d.appspot.com",
  messagingSenderId: "640577879816",
  appId: "1:640577879816:web:1ebff6947f58f80563b6bd",
  measurementId: "G-9XCG2DDH3H"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)

export {db}