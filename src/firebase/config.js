import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBWxrWxwHlz12jINNZT63TgkRVt9cAObIk",
  authDomain: "chatme-c3122.firebaseapp.com",
  projectId: "chatme-c3122",
  storageBucket: "chatme-c3122.firebasestorage.app",
  messagingSenderId: "1082706118611",
  appId: "1:1082706118611:web:3ec680a3cb2861b6c99126",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app); // ✅ Ganti ke Firestore
export const auth = getAuth(app);