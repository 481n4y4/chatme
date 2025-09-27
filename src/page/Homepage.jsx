import React, { useRef, useState, useEffect } from "react";

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
      <aside className="hidden md:flex w-48 bg-white border-r border-[#ececf0] flex-col min-h-0 z-20">
        <div className="h-16 flex items-center justify-center border-b border-[#ececf0]">
          <span className="font-semibold text-lg text-[#7c5fe6] tracking-tight select-none">ChatMe</span>
        </div>
        {/* Daftar chat/kontak */}
        <nav className="flex-1 overflow-y-auto px-2 py-4 space-y-1">
          {chatList.map(chat => (
            <div
              key={chat.id}
              className={`rounded-lg px-3 py-2 mb-1 cursor-pointer border border-transparent transition text-sm ${activeChat.id === chat.id ? 'bg-[#f3f2fa] text-[#7c5fe6] font-medium' : 'hover:bg-[#f7f7fa] text-[#222]'}`}
              onClick={() => handleSwitchChat(chat)}
            >
              {chat.name}
              {chat.online && <span className="ml-2 inline-block w-2 h-2 rounded-full bg-[#4ecb71] align-middle" title="Online" />}
            </div>
          ))}
        </nav>
        <div className="p-2 border-t border-[#ececf0]">
          <button className="w-full py-2 rounded-lg bg-[#ececf0] text-[#7c5fe6] font-medium hover:bg-[#e0d7c6] transition text-sm">+ Chat Baru</button>
        </div>
      </aside>

      {/* Sidebar (mobile callout/modal) */}
      {sidebarOpen && (
        <>
          <div className="fixed inset-0 bg-black/30 z-30" onClick={closeSidebar} aria-label="Tutup sidebar" />
          <aside className="fixed left-0 top-0 bottom-0 w-64 bg-white border-r border-[#ececf0] flex flex-col min-h-0 z-40 animate-slideIn">
            <div className="h-14 flex items-center justify-between border-b border-[#ececf0] px-4">
              <span className="font-semibold text-base text-[#7c5fe6] tracking-tight select-none">ChatMe</span>
              <button onClick={closeSidebar} className="ml-2 p-2 rounded hover:bg-[#f3f2fa] text-[#7c5fe6]" aria-label="Tutup sidebar">
                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M6 6l12 12M6 18L18 6"/></svg>
              </button>
            </div>
            <nav className="flex-1 overflow-y-auto px-2 py-4 space-y-1">
              {chatList.map(chat => (
                <div
                  key={chat.id}
                  className={`rounded-lg px-3 py-2 mb-1 cursor-pointer border border-transparent transition text-sm ${activeChat.id === chat.id ? 'bg-[#f3f2fa] text-[#7c5fe6] font-medium' : 'hover:bg-[#f7f7fa] text-[#222]'}`}
                  onClick={() => handleSwitchChat(chat)}
                >
                  {chat.name}
                  {chat.online && <span className="ml-2 inline-block w-2 h-2 rounded-full bg-[#4ecb71] align-middle" title="Online" />}
                </div>
              ))}
            </nav>
            <div className="p-2 border-t border-[#ececf0]">
              <button className="w-full py-2 rounded-lg bg-[#ececf0] text-[#7c5fe6] font-medium hover:bg-[#e0d7c6] transition text-sm">+ Chat Baru</button>
            </div>
          </aside>
        </>
      )}

      {/* Main Content */}
      <div className="flex flex-col flex-1 min-w-0 bg-[#fafbfc]">
        {/* Header */}
        <header className="h-14 md:h-16 bg-white border-b border-[#ececf0] flex items-center px-3 md:px-6 justify-between sticky top-0 z-10">
          <div className="flex items-center gap-3">
            {/* Sidebar toggle button (mobile only) */}
            <button className="md:hidden mr-2 p-2 rounded hover:bg-[#f3f2fa] text-[#7c5fe6]" onClick={openSidebar} aria-label="Buka sidebar">
              <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M4 6h16M4 12h16M4 18h16"/></svg>
            </button>
            <div className="w-9 h-9 rounded-full bg-[#ececf0] flex items-center justify-center font-semibold text-[#7c5fe6] text-base">{activeChat.avatar}</div>
            <div>
              <div className="font-medium text-[#222] text-base tracking-tight">{activeChat.name}</div>
              <div className="text-xs text-[#4ecb71] font-normal">{activeChat.online ? 'Online' : 'Offline'}</div>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <button className="w-9 h-9 flex items-center justify-center rounded hover:bg-[#f3f2fa] text-[#7c5fe6] transition" title="Cari" onClick={openSearch}>
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            </button>
            <button className="w-10 h-10 flex items-center justify-center rounded hover:bg-[#f3f2fa] text-[#7c5fe6] transition p-1 overflow-visible" title="Pengaturan" onClick={openSettings}>
              <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" className="overflow-visible"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 7 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 3 15.61V15a1.65 1.65 0 0 0-1-1.51A1.65 1.65 0 0 0 1 12a2 2 0 1 1 0-4c.22 0 .43.03.63.09A1.65 1.65 0 0 0 3 7V6.61a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 7 4.6c.29-.17.62-.26.95-.26h.09A1.65 1.65 0 0 0 9 3.09V3a2 2 0 1 1 4 0v.09c.32.05.66.15.95.26a1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 7c.17.29.26.62.26.95v.09c.32.05.66.15.95.26A1.65 1.65 0 0 0 21 9v.09c.32.05.66.15.95.26A1.65 1.65 0 0 0 23 12a2 2 0 1 1-2 0c-.22 0-.43-.03-.63-.09A1.65 1.65 0 0 0 21 15v.09z"/></svg>
            </button>
          </div>
        </header>
        {/* Chat Room */}
        <main ref={chatRoomRef} className="flex-1 overflow-y-auto px-2 md:px-8 py-4 space-y-4 relative">
          {messages[activeChat.id] && messages[activeChat.id].length > 0 ? (
            messages[activeChat.id].map((msg, idx) => (
              msg.from === "A" ? (
                <div className="flex items-end gap-2 justify-end" key={idx}>
                  <div className="bg-[#7c5fe6] text-white rounded-xl px-3 py-2 max-w-[70vw] md:max-w-md text-sm border border-[#ececf0]">{msg.text}</div>
                  <div className="w-7 h-7 rounded-full bg-[#ececf0] flex items-center justify-center font-semibold text-[#7c5fe6] text-xs">{msg.from}</div>
                </div>
              ) : (
                <div className="flex items-end gap-2" key={idx}>
                  <div className="w-7 h-7 rounded-full bg-[#ececf0] flex items-center justify-center font-semibold text-[#7c5fe6] text-xs">{msg.from}</div>
                  <div className="bg-white rounded-xl px-3 py-2 text-[#222] max-w-[70vw] md:max-w-md text-sm border border-[#f3f2fa]">{msg.text}</div>
                </div>
              )
            ))
          ) : (
            <div className="text-center text-gray-400 mt-8">Belum ada pesan.</div>
          )}
          {/* Scroll to bottom button */}
          {showScrollBtn && (
            <button
              onClick={scrollToBottom}
              className="fixed bottom-20 right-4 md:bottom-24 md:right-8 z-20 bg-[#7c5fe6] text-white rounded-full p-2 hover:bg-[#5a47b7] transition flex items-center"
              title="Scroll ke bawah"
              aria-label="Scroll ke bawah"
            >
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 5v14m7-7H5"/></svg>
            </button>
          )}
        </main>
        {/* Chat Input */}
        <form className="flex items-center gap-2 px-2 md:px-6 py-2 border-t border-[#ececf0] bg-white" onSubmit={handleSend}>
          <button type="button" onClick={handleEmoji} className="p-2 rounded hover:bg-[#f3f2fa] text-[#7c5fe6] transition" title="Emoji">
            <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><path d="M9 9h.01"/><path d="M15 9h.01"/></svg>
          </button>
          <button type="button" onClick={handleFile} className="p-2 rounded hover:bg-[#f3f2fa] text-[#7c5fe6] transition" title="Lampirkan File">
            <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M21 15V7a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v8"/><rect x="3" y="15" width="18" height="6" rx="2"/></svg>
          </button>
          <input
            type="text"
            placeholder="Ketik pesan..."
            value={message}
            onChange={e => setMessage(e.target.value)}
            className="flex-1 rounded border border-[#ececf0] px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#7c5fe6] bg-white text-[#222] placeholder-[#b3a7c7] text-sm"
            autoFocus
          />
          <button type="submit" className="bg-[#7c5fe6] text-white px-4 py-2 rounded font-medium hover:bg-[#5a47b7] transition text-sm">
            Kirim
          </button>
        </form>
      </div>
    </div>
  );
}

export default Homepage;
