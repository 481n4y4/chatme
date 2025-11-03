import React, { useState, useEffect, useRef } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { auth } from "../../firebase/config";
import { 
  listenToMessages, 
  sendMessage, 
  getUserProfile 
} from "../../services/chatService";

export default function ChatRoom() {
  const [user] = useAuthState(auth);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [otherUser, setOtherUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const { chatId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const messagesEndRef = useRef(null);

  const otherUserId = location.state?.otherUserId;

  // Scroll ke bawah otomatis ketika ada pesan baru
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const fetchOtherUser = async () => {
      if (otherUserId) {
        const userData = await getUserProfile(otherUserId);
        setOtherUser(userData);
      }
    };

    fetchOtherUser();
  }, [otherUserId]);

  useEffect(() => {
    if (chatId) {
      const unsubscribe = listenToMessages(chatId, (updatedMessages) => {
        setMessages(updatedMessages);
        setLoading(false);
      });

      return () => unsubscribe();
    }
  }, [chatId]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (newMessage.trim() && chatId && user) {
      try {
        await sendMessage(chatId, user.uid, newMessage.trim());
        setNewMessage("");
      } catch (error) {
        console.error("Error sending message:", error);
        alert("Gagal mengirim pesan");
      }
    }
  };

  const handleBack = () => {
    navigate(-1); // Kembali ke halaman sebelumnya
  };

  if (loading) {
    return (
      <div className="flex flex-col h-screen bg-gray-50">
        <div className="p-4 border-b bg-white">
          <div className="animate-pulse flex items-center space-x-3">
            <div className="rounded-full bg-gray-300 h-10 w-10"></div>
            <div className="h-4 bg-gray-300 rounded w-32"></div>
          </div>
        </div>
        <div className="flex-1 p-4">
          <div className="space-y-4">
            {[...Array(10)].map((_, i) => (
              <div key={i} className={`animate-pulse flex ${i % 2 === 0 ? 'justify-start' : 'justify-end'}`}>
                <div className={`h-12 bg-gray-300 rounded-lg ${i % 2 === 0 ? 'w-48' : 'w-32'}`}></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <div className="p-4 border-b bg-white shadow-sm">
        <div className="flex items-center space-x-3">
          <button 
            onClick={handleBack}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
            {otherUser?.name?.charAt(0) || 'U'}
          </div>
          
          <div>
            <h2 className="font-semibold text-gray-900">
              {otherUser?.name || 'Unknown User'}
            </h2>
            <p className="text-xs text-gray-500">
              {otherUser?.email || ''}
            </p>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center text-gray-500">
              <p>Belum ada pesan</p>
              <p className="text-sm">Mulai percakapan dengan {otherUser?.name || 'user ini'}</p>
            </div>
          </div>
        ) : (
          messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.senderId === user.uid ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                  message.senderId === user.uid
                    ? "bg-blue-500 text-white rounded-br-none"
                    : "bg-white text-gray-900 rounded-bl-none shadow"
                }`}
              >
                <p className="text-sm">{message.text}</p>
                <p
                  className={`text-xs mt-1 ${
                    message.senderId === user.uid
                      ? "text-blue-100"
                      : "text-gray-500"
                  }`}
                >
                  {message.timestamp?.toDate
                    ? new Date(message.timestamp.toDate()).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })
                    : ""}
                </p>
              </div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <form
        onSubmit={handleSendMessage}
        className="p-4 border-t bg-white"
      >
        <div className="flex space-x-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Ketik pesan..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button
            type="submit"
            disabled={!newMessage.trim()}
            className="px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
          >
            Kirim
          </button>
        </div>
      </form>
    </div>
  );
};
