import React from "react";

function SidebarMobile({ chatList, activeChat, handleSwitchChat, sidebarOpen, closeSidebar, onNewChat }) {
  if (!sidebarOpen) return null;
  return (
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
          <button className="w-full py-2 rounded-lg bg-[#ececf0] text-[#7c5fe6] font-medium hover:bg-[#e0d7c6] transition text-sm" onClick={onNewChat}>+ Chat Baru</button>
        </div>
      </aside>
    </>
  );
}

export default SidebarMobile;
