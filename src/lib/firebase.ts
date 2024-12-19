import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyCB3Q16th3EuT9eJPDtYqwg5lTZ6FBiC5E",
  authDomain: "cleannamefirefly.firebaseapp.com",
  projectId: "cleannamefirefly",
  storageBucket: "cleannamefirefly.firebasestorage.app",
  messagingSenderId: "1051480578587",
  appId: "1:1051480578587:web:48b77a1dff6287108876be"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
