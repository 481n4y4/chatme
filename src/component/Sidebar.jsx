import React from "react";

function Sidebar({ chatList, activeChat, handleSwitchChat, onNewChat }) {
  return (
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
        <button className="w-full py-2 rounded-lg bg-[#ececf0] text-[#7c5fe6] font-medium hover:bg-[#e0d7c6] transition text-sm" onClick={onNewChat}>+ Chat Baru</button>
      </div>
    </aside>
  );
}

export default Sidebar;
