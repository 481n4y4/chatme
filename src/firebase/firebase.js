import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, onAuthStateChanged } from "firebase/auth";
import { getFirestore, collection, doc } from "firebase/firestore";

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
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);

export function waitForUser() {
  return new Promise((resolve, reject) => {
    const unsub = onAuthStateChanged(auth, (user) => {
      unsub();
      if (user) resolve(user);
      else reject(new Error("User belum login"));
    });
  });
}

async function userCollection(path) {
  const user = auth.currentUser || (await waitForUser());
  return collection(db, `users/${user.uid}/${path}`);
}

async function userDoc(path, id) {
  const user = auth.currentUser || (await waitForUser());
  return doc(db, `user/${user.uid}/${path}/${id}`);
}

