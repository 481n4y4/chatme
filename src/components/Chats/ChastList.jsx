import React, { useState, useEffect, useRef } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { auth } from "../../firebase/config";
import {
  listenToMessages,
  sendMessage,
  getUserProfile,
} from "../../services/chatService";

// Font Awesome Imports
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faPaperPlane,
  faFaceSmile,
  faPaperclip,
  faPhone,
  faVideo,
  faCircleInfo,
  faUser,
  faClock,
} from "@fortawesome/free-solid-svg-icons";
import { faCircle } from "@fortawesome/free-regular-svg-icons";

export default function ChatRoom() {
  const [user] = useAuthState(auth);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [otherUser, setOtherUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isOnline, setIsOnline] = useState(true); // Mock online status

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
        // Mock online status - in real app, you'd listen to presence
        setIsOnline(Math.random() > 0.3); // 70% chance online
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
    navigate(-1);
  };

  const handleAttachment = () => {
    alert("Fitur attachment akan segera hadir!");
  };

  const handleEmoji = () => {
    alert("Fitur emoji picker akan segera hadir!");
  };

  const formatMessageTime = (timestamp) => {
    if (!timestamp?.toDate) return "";

    const messageDate = timestamp.toDate();
    const now = new Date();
    const diffInHours = (now - messageDate) / (1000 * 60 * 60);

    if (diffInHours < 24) {
      return messageDate.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
    } else {
      return messageDate.toLocaleDateString([], {
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        {/* Header Skeleton */}
        <div className="p-4 border-b bg-white shadow-sm">
          <div className="animate-pulse flex items-center space-x-3">
            <div className="rounded-full bg-gray-300 h-10 w-10"></div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-300 rounded w-32"></div>
              <div className="h-3 bg-gray-300 rounded w-24"></div>
            </div>
          </div>
        </div>

        {/* Messages Skeleton */}
        <div className="flex-1 p-4 space-y-4">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className={`animate-pulse flex ${
                i % 2 === 0 ? "justify-start" : "justify-end"
              }`}
            >
              <div
                className={`h-16 bg-gray-300 rounded-2xl ${
                  i % 2 === 0 ? "w-48 rounded-bl-none" : "w-40 rounded-br-none"
                }`}
              ></div>
            </div>
          ))}
        </div>

        {/* Input Skeleton */}
        <div className="p-4 border-t bg-white">
          <div className="animate-pulse h-12 bg-gray-300 rounded-full"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="p-4 border-b bg-white shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={handleBack}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200 text-gray-600 hover:text-gray-800"
            >
              <FontAwesomeIcon icon={faArrowLeft} className="w-5 h-5" />
            </button>

            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center text-white font-bold text-lg shadow-lg">
                {otherUser?.name?.charAt(0)?.toUpperCase() || "U"}
              </div>
              <div
                className={`absolute -bottom-1 -right-1 w-4 h-4 border-2 border-white rounded-full ${
                  isOnline ? "bg-green-500" : "bg-gray-400"
                }`}
              ></div>
            </div>

            <div className="flex-1">
              <h2 className="font-semibold text-gray-900 text-lg">
                {otherUser?.name || "Unknown User"}
              </h2>
              <div className="flex items-center space-x-1">
                <FontAwesomeIcon
                  icon={isOnline ? faCircle : faClock}
                  className={`text-xs ${
                    isOnline ? "text-green-500" : "text-gray-400"
                  }`}
                />
                <p className="text-sm text-gray-500">
                  {isOnline ? "Online" : "Offline"}
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button className="p-3 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors duration-200">
              <FontAwesomeIcon icon={faPhone} className="w-5 h-5" />
            </button>
            <button className="p-3 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors duration-200">
              <FontAwesomeIcon icon={faVideo} className="w-5 h-5" />
            </button>
            <button className="p-3 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors duration-200">
              <FontAwesomeIcon icon={faCircleInfo} className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <div className="w-24 h-24 mb-4 bg-white rounded-3xl shadow-lg flex items-center justify-center">
              <FontAwesomeIcon
                icon={faUser}
                className="w-12 h-12 text-gray-400"
              />
            </div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              Mulai Percakapan
            </h3>
            <p className="text-gray-500 max-w-sm">
              Kirim pesan pertama Anda kepada {otherUser?.name || "user ini"}{" "}
              dan mulailah berkomunikasi.
            </p>
          </div>
        ) : (
          messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.senderId === user.uid ? "justify-end" : "justify-start"
              }`}
            >
              <div className="flex flex-col max-w-xs lg:max-w-md">
                <div
                  className={`px-4 py-3 rounded-2xl shadow-sm ${
                    message.senderId === user.uid
                      ? "bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-br-none"
                      : "bg-white text-gray-900 rounded-bl-none border border-gray-200"
                  }`}
                >
                  <p className="text-sm leading-relaxed">{message.text}</p>
                </div>
                <div
                  className={`flex items-center space-x-1 mt-1 px-1 ${
                    message.senderId === user.uid
                      ? "justify-end"
                      : "justify-start"
                  }`}
                >
                  <FontAwesomeIcon
                    icon={faClock}
                    className={`text-xs ${
                      message.senderId === user.uid
                        ? "text-blue-200"
                        : "text-gray-400"
                    }`}
                  />
                  <span
                    className={`text-xs ${
                      message.senderId === user.uid
                        ? "text-blue-200"
                        : "text-gray-500"
                    }`}
                  >
                    {formatMessageTime(message.timestamp)}
                  </span>
                </div>
              </div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <form onSubmit={handleSendMessage} className="p-4 border-t bg-white">
        <div className="flex items-end space-x-3">
          {/* Attachment Buttons */}
          <div className="flex space-x-1">
            <button
              type="button"
              onClick={handleAttachment}
              className="p-3 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors duration-200"
            >
              <FontAwesomeIcon icon={faPaperclip} className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={handleEmoji}
              className="p-3 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors duration-200"
            >
              <FontAwesomeIcon icon={faFaceSmile} className="w-5 h-5" />
            </button>
          </div>

          {/* Message Input */}
          <div className="flex-1 relative">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Ketik pesan..."
              className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
            />
          </div>

          {/* Send Button */}
          <button
            type="submit"
            disabled={!newMessage.trim()}
            className={`p-3 rounded-full transition-all duration-200 ${
              newMessage.trim()
                ? "bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg hover:shadow-xl transform hover:scale-105"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            <FontAwesomeIcon
              icon={faPaperPlane}
              className={`w-5 h-5 ${
                newMessage.trim() ? "text-white" : "text-gray-400"
              }`}
            />
          </button>
        </div>
      </form>
    </div>
  );
}
