import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBE50-IY2rJvXZc4sdCBxAZxQIjOyQGgkg",
  authDomain: "portfolio-ad827.firebaseapp.com",
  projectId: "portfolio-ad827",
  storageBucket: "portfolio-ad827.firebasestorage.app",
  messagingSenderId: "96017797536",
  appId: "1:96017797536:web:1694df640730e8344454c5",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
