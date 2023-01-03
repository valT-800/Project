import app from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'


// Optionally import the services that you want to use
//import {...} from "firebase/auth";
//import {...} from "firebase/database";
//import {...} from "firebase/firestore";
//import {...} from "firebase/functions";
//import {...} from "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAAY2VLk4RL4jZTFU-XGTyS4QV8tN8dwLs",
  authDomain: "orders-21f47.firebaseapp.com",
  databaseURL: "https://orders-21f47-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "orders-21f47",
  storageBucket: "orders-21f47.appspot.com",
  messagingSenderId: "682549752256",
  appId: "1:682549752256:web:e50d4e751ed3eca1405825",
  measurementId: "G-FQPTYNCR2F"
};

// Initialize Firebase

app.initializeApp(firebaseConfig);

export default app