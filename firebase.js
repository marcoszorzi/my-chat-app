// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBAY8jBtwWqdDXM3ipu3ZEXSJDfqpbCS0A",
  authDomain: "my-chat-app-6219f.firebaseapp.com",
  projectId: "my-chat-app-6219f",
  storageBucket: "my-chat-app-6219f.appspot.com",
  messagingSenderId: "324296332419",
  appId: "1:324296332419:web:157a1a87ce0f0ed7acb7b6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);



//Exports
const db = getFirestore(app);
const auth = getAuth(app);
export { db, auth };