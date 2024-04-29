import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import { getFirestore,} from "firebase/firestore";
import { getStorage } from "firebase/storage";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCVcJv_DY2gGgUa84zBF-RGCTk1bfYXWMg",
  authDomain: "webproject-c33f4.firebaseapp.com",
  projectId: "webproject-c33f4",
  storageBucket: "webproject-c33f4.appspot.com",
  messagingSenderId: "534460189073",
  appId: "1:534460189073:web:e7d9413b576f1ca519b230"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
export {db,storage};
export default auth;
