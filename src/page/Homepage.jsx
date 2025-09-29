import React, { useRef, useState, useEffect } from "react";
import Sidebar from "../component/Sidebar";
import SidebarMobile from "../component/SidebarMobile";
import Header from "../component/Header";
import ChatRoom from "../component/ChatRoom";
import ChatInput from "../component/ChatInput";

// Color palette inspired by Bearded Theme (Aquarelle Lilac/Coffee) and Firefox
// Soft lilac, coffee, and blue-gray tones
// You can further tune Tailwind config for custom colors if needed


function Homepage() {
  // Dummy chat list
  const chatList = [
    { id: 1, name: "Nama Orang", avatar: "A", online: true },
    { id: 2, name: "Budi", avatar: "B", online: false },
  ];
  // State
  const [message, setMessage] = useState("");
  const [showScrollBtn, setShowScrollBtn] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false); // for mobile sidebar
  const [activeChat, setActiveChat] = useState(chatList[0]);
  const [messages, setMessages] = useState({
    1: [
      { from: "B", text: "Halo! Ada yang bisa dibantu?" },
      { from: "A", text: "Halo! Mau tanya fitur ChatMe." },
    ],
    2: [
      { from: "B", text: "Hai, ini chat Budi." },
      { from: "A", text: "Halo Budi!" },
    ],
  });
  const [showSearch, setShowSearch] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const chatRoomRef = useRef(null);

  // Scroll to bottom handler
  const scrollToBottom = () => {
    if (chatRoomRef.current) {
      chatRoomRef.current.scrollTo({ top: chatRoomRef.current.scrollHeight, behavior: "smooth" });
    }
  };

  // Show scroll-to-bottom button if not at bottom
  useEffect(() => {
    const handleScroll = () => {
      if (!chatRoomRef.current) return;
      const { scrollTop, scrollHeight, clientHeight } = chatRoomRef.current;
      setShowScrollBtn(scrollHeight - scrollTop - clientHeight > 60);
    };
    const ref = chatRoomRef.current;
    if (ref) ref.addEventListener("scroll", handleScroll);
    return () => { if (ref) ref.removeEventListener("scroll", handleScroll); };
  }, []);

  // Send handler
  const handleSend = (e) => {
    e.preventDefault();
    if (message.trim()) {
      setMessages(prev => ({
        ...prev,
        [activeChat.id]: [
          ...(prev[activeChat.id] || []),
          { from: "A", text: message.trim() },
        ],
      }));
      setMessage("");
      setTimeout(scrollToBottom, 100);
    }
  };

  // Dummy emoji/file handlers
  const handleEmoji = () => alert("Fitur emoji coming soon!");
  const handleFile = () => alert("Fitur upload file coming soon!");

  // Chat switch handler
  const handleSwitchChat = (chat) => {
    setActiveChat(chat);
    setTimeout(scrollToBottom, 200);
    if (sidebarOpen) setSidebarOpen(false);
  };

  // Sidebar open/close handler (mobile)
  const openSidebar = () => setSidebarOpen(true);
  const closeSidebar = () => setSidebarOpen(false);

  // Search & settings modal handler
  const openSearch = () => setShowSearch(true);
  const closeSearch = () => setShowSearch(false);
  const openSettings = () => setShowSettings(true);
  const closeSettings = () => setShowSettings(false);

  return (
    <div className="flex h-screen bg-[#f7f7fa] text-[15px] relative">
      {/* Search Modal */}
      {showSearch && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
          <div className="bg-white rounded-lg shadow-lg p-6 w-80 max-w-full relative">
            <button className="absolute top-2 right-2 p-1 text-[#7c5fe6] hover:bg-[#f3f2fa] rounded" onClick={closeSearch} aria-label="Tutup">
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M6 6l12 12M6 18L18 6"/></svg>
            </button>
            <div className="font-semibold mb-2">Cari Chat</div>
            <input className="w-full border rounded px-3 py-2 mb-2 text-sm" placeholder="Cari nama/chat..." autoFocus />
            <div className="text-xs text-gray-500">Fitur pencarian coming soon.</div>
          </div>
        </div>
      )}
      {/* Settings Modal */}
      {showSettings && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
          <div className="bg-white rounded-lg shadow-lg p-6 w-80 max-w-full relative">
            <button className="absolute top-2 right-2 p-1 text-[#7c5fe6] hover:bg-[#f3f2fa] rounded" onClick={closeSettings} aria-label="Tutup">
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M6 6l12 12M6 18L18 6"/></svg>
            </button>
            <div className="font-semibold mb-2">Pengaturan</div>
            <div className="text-xs text-gray-500">Fitur pengaturan coming soon.</div>
          </div>
        </div>
      )}
      {/* Sidebar (desktop) */}
      <Sidebar
        chatList={chatList}
        activeChat={activeChat}
        handleSwitchChat={handleSwitchChat}
        onNewChat={() => alert("Fitur chat baru coming soon!")}
      />

      {/* Sidebar (mobile callout/modal) */}
      <SidebarMobile
        chatList={chatList}
        activeChat={activeChat}
        handleSwitchChat={handleSwitchChat}
        sidebarOpen={sidebarOpen}
        closeSidebar={closeSidebar}
        onNewChat={() => alert("Fitur chat baru coming soon!")}
      />

      {/* Main Content */}
      <div className="flex flex-col flex-1 min-w-0 bg-[#fafbfc]">
        {/* Header */}
        <Header
          activeChat={activeChat}
          openSidebar={openSidebar}
          openSearch={openSearch}
          openSettings={openSettings}
        />
        {/* Chat Room */}
        <ChatRoom
          messages={messages}
          chatId={activeChat.id}
          chatRoomRef={chatRoomRef}
          showScrollBtn={showScrollBtn}
          scrollToBottom={scrollToBottom}
        />
        {/* Chat Input */}
        <ChatInput
          message={message}
          setMessage={setMessage}
          handleSend={handleSend}
          handleEmoji={handleEmoji}
          handleFile={handleFile}
        />
      </div>
    </div>
  );
}

export default Homepage;
