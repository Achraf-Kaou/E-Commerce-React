import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import { getFirestore,} from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDZ78tI6hUmoLeVQjzrQwPxHhVXF0rCc8I",
  authDomain: "myfirstapp-ffeab.firebaseapp.com",
  projectId: "myfirstapp-ffeab",
  storageBucket: "myfirstapp-ffeab.appspot.com",
  messagingSenderId: "642671543886",
  appId: "1:642671543886:web:73d1a8629cc8945fed651f",
  measurementId: "G-2845PGK60K"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
export {db,storage};
export default auth;
