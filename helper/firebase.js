// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAkOLHx9k8KLS9YLS0C9o8iikMLojXRUvY",
  authDomain: "vod-api-7797c.firebaseapp.com",
  projectId: "vod-api-7797c",
  storageBucket: "vod-api-7797c.appspot.com",
  messagingSenderId: "1065379328032",
  appId: "1:1065379328032:web:224540c7c2345f8bce0c45"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

export {db}