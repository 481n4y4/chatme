import React from "react";

function ChatRoom({ messages, chatId, chatRoomRef, showScrollBtn, scrollToBottom }) {
  return (
    <main ref={chatRoomRef} className="flex-1 overflow-y-auto px-2 md:px-8 py-4 space-y-4 relative">
      {messages[chatId] && messages[chatId].length > 0 ? (
        messages[chatId].map((msg, idx) => (
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
  );
}

export default ChatRoom;
