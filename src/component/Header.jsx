import React from "react";

function Header({ activeChat, openSidebar, openSearch, openSettings }) {
  return (
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
  );
}

export default Header;
