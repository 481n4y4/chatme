// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
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
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
