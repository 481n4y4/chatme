import React, { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase/config";
import { signOut } from "firebase/auth";
import { getUserChats, getUserProfile } from "../../services/chatService";

export default function ChatList() {
  const [user] = useAuthState(auth);
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchChats = async () => {
      if (user) {
        try {
          const userChats = await getUserChats(user.uid);
          
          // Enhance chat data dengan info user lain
          const enhancedChats = await Promise.all(
            userChats.map(async (chat) => {
              // Cari user lain dalam chat (bukan current user)
              const otherUserId = chat.participants.find(id => id !== user.uid);
              const otherUser = await getUserProfile(otherUserId);
              
              return {
                ...chat,
                otherUser,
                otherUserId
              };
            })
          );
          
          setChats(enhancedChats);
        } catch (error) {
          console.error("Error fetching chats:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchChats();
  }, [user]);

  const handleChatClick = (chatId, otherUserId) => {
    navigate(`/chat/${chatId}`, { 
      state: { otherUserId, chatId } 
    });
  };

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/");
  };

  if (loading) {
    return (
      <div className="p-4">
        <div className="animate-pulse">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex items-center space-x-4 mb-4">
              <div className="rounded-full bg-gray-300 h-12 w-12"></div>
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                <div className="h-3 bg-gray-300 rounded w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-4 border-b">
        <h2 className="text-xl font-semibold">Percakapan</h2>
        <button className="bg-amber-700" onClick={handleLogout}>Logout</button>
      </div>
      
      <div className="divide-y">
        {chats.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            <p>Belum ada percakapan</p>
            <p className="text-sm">Mulai chat dengan seseorang!</p>
          </div>
        ) : (
          chats.map((chat) => (
            <div
              key={chat.id}
              onClick={() => handleChatClick(chat.id, chat.otherUserId)}
              className="p-4 hover:bg-gray-50 cursor-pointer transition-colors"
            >
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
                  {chat.otherUser?.name?.charAt(0) || 'U'}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <h3 className="font-semibold text-gray-900 truncate">
                      {chat.otherUser?.name || 'Unknown User'}
                    </h3>
                    <span className="text-xs text-gray-500 whitespace-nowrap ml-2">
                      {chat.lastMessageAt?.toDate?.() 
                        ? new Date(chat.lastMessageAt.toDate()).toLocaleTimeString([], { 
                            hour: '2-digit', minute: '2-digit' 
                          })
                        : ''
                      }
                    </span>
                  </div>
                  
                  <p className="text-sm text-gray-600 truncate">
                    {chat.lastMessage || 'Mulai percakapan...'}
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
