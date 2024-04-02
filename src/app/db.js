// Boilerplate code from firebase => project settings

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAymbWHb07x6Bg7y8gbO78b4IbvVR96pqg",
  authDomain: "swe35-c8e59.firebaseapp.com",
  projectId: "swe35-c8e59",
  storageBucket: "swe35-c8e59.appspot.com",
  messagingSenderId: "273459700532",
  appId: "1:273459700532:web:b4ce94b6dc0df49e2f3b61"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const firestore = getFirestore(app);

export {firestore};