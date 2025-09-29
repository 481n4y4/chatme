// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
<<<<<<< HEAD
import { getAuth } from "firebase/auth";
=======
import { getAuth, GoogleAuthProvider } from "firebase/auth";
>>>>>>> 5506e2f776cbd29b443923290e9ad0c3d6cdae86
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBWxrWxwHlz12jINNZT63TgkRVt9cAObIk",
  authDomain: "chatme-c3122.firebaseapp.com",
  projectId: "chatme-c3122",
  storageBucket: "chatme-c3122.firebasestorage.app",
  messagingSenderId: "1082706118611",
<<<<<<< HEAD
  appId: "1:1082706118611:web:3ec680a3cb2861b6c99126"
=======
  appId: "1:1082706118611:web:3ec680a3cb2861b6c99126",
>>>>>>> 5506e2f776cbd29b443923290e9ad0c3d6cdae86
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
<<<<<<< HEAD
export const auth = getAuth(app);
=======
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
>>>>>>> 5506e2f776cbd29b443923290e9ad0c3d6cdae86
