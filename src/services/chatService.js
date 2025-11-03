import { 
  collection, 
  addDoc, 
  query, 
  where, 
  orderBy, 
  onSnapshot, 
  doc, 
  updateDoc,
  getDocs,
  serverTimestamp 
} from 'firebase/firestore';
import { db } from '../firebase/config';

export const getUserProfile = async (userId) => {
  try {
    const userRef = doc(db, 'users', userId);
    const userSnap = await getDocs(userRef);
    
    if (userSnap.exists()) {
      return { id: userSnap.id, ...userSnap.data() };
    }
    return null;
  } catch (error) {
    console.error('Error getting user profile:', error);
    throw error;
  }
};

// ✅ Buat chat baru antara dua user
export const createChat = async (currentUserId, otherUserId) => {
  try {
    const chatRef = await addDoc(collection(db, 'chats'), {
      participants: [currentUserId, otherUserId],
      createdAt: serverTimestamp(),
      lastMessage: '',
      lastMessageAt: serverTimestamp()
    });
    
    return chatRef.id;
  } catch (error) {
    console.error('Error creating chat:', error);
    throw error;
  }
};

// ✅ Kirim pesan ke chat tertentu
export const sendMessage = async (chatId, senderId, text) => {
  try {
    const messagesRef = collection(db, 'messages', chatId, 'messages');
    
    await addDoc(messagesRef, {
      text,
      senderId,
      timestamp: serverTimestamp(),
      readBy: [senderId]
    });

    // Update last message di chat
    const chatRef = doc(db, 'chats', chatId);
    await updateDoc(chatRef, {
      lastMessage: text,
      lastMessageAt: serverTimestamp()
    });

  } catch (error) {
    console.error('Error sending message:', error);
    throw error;
  }
};

// ✅ Listen untuk real-time messages
export const listenToMessages = (chatId, callback) => {
  const messagesRef = collection(db, 'messages', chatId, 'messages');
  const q = query(messagesRef, orderBy('timestamp', 'asc'));
  
  return onSnapshot(q, (snapshot) => {
    const messages = [];
    snapshot.forEach((doc) => {
      messages.push({ id: doc.id, ...doc.data() });
    });
    callback(messages);
  });
};

// ✅ Dapatkan semua chat user
export const getUserChats = async (userId) => {
  try {
    const chatsRef = collection(db, 'chats');
    const q = query(chatsRef, where('participants', 'array-contains', userId));
    
    const snapshot = await getDocs(q);
    const chats = [];
    
    snapshot.forEach((doc) => {
      chats.push({ id: doc.id, ...doc.data() });
    });
    
    return chats;
  } catch (error) {
    console.error('Error getting user chats:', error);
    throw error;
  }
};

// ✅ Cari chat yang sudah ada antara dua user
export const findExistingChat = async (userId1, userId2) => {
  try {
    const chatsRef = collection(db, 'chats');
    const q = query(
      chatsRef, 
      where('participants', 'array-contains', userId1)
    );
    
    const snapshot = await getDocs(q);
    
    for (const doc of snapshot.docs) {
      const chat = doc.data();
      if (chat.participants.includes(userId2)) {
        return { id: doc.id, ...chat };
      }
    }
    
    return null;
  } catch (error) {
    console.error('Error finding existing chat:', error);
    throw error;
  }
};