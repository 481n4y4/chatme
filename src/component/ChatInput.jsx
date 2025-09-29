import React from "react";

function ChatInput({ message, setMessage, handleSend, handleEmoji, handleFile }) {
  return (
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
  );
}

export default ChatInput;
