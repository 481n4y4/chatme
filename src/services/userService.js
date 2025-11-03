import {
  doc,
  setDoc,
  getDoc,
  updateDoc,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { db } from "../firebase/config";

// ✅ Buat/update user profile
export const createUserProfile = async (userId, userData) => {
  try {
    const userRef = doc(db, "users", userId);
    await setDoc(userRef, {
      ...userData,
      createdAt: new Date(),
      lastSeen: new Date(),
    });
  } catch (error) {
    console.error("Error creating user profile:", error);
    throw error;
  }
};

// ✅ Get user profile
export const getUserProfile = async (userId) => {
  try {
    const userRef = doc(db, "users", userId);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      return { id: userSnap.id, ...userSnap.data() };
    }
    return null;
  } catch (error) {
    console.error("Error getting user profile:", error);
    throw error;
  }
};

// ✅ Cari user berdasarkan email atau nama
export const searchUsers = async (searchTerm) => {
  try {
    const usersRef = collection(db, "users");
    const q = query(
      usersRef,
      where("name", ">=", searchTerm),
      where("name", "<=", searchTerm + "\uf8ff")
    );

    const snapshot = await getDocs(q);
    const users = [];

    snapshot.forEach((doc) => {
      users.push({ id: doc.id, ...doc.data() });
    });

    return users;
  } catch (error) {
    console.error("Error searching users:", error);
    throw error;
  }
};
