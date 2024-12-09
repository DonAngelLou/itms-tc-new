// src/app/chat/page.tsx
"use client";

import React, { useState } from "react";
import { useChatContext } from "@/context/ChatContext";

export default function ChatPage() {
  const { messages, sendMessage } = useChatContext();
  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      sendMessage(newMessage);
      setNewMessage("");
    }
  };

  return (
    <div className="p-6 bg-gray-900 rounded-lg shadow-md space-y-6">
      <h2 className="text-2xl font-semibold text-gray-100">Internal Chat</h2>
      <div className="h-80 overflow-y-auto bg-gray-800 p-4 rounded-lg space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`p-3 rounded-lg ${message.sender === "Transport Company" ? "bg-blue-600 text-white" : "bg-gray-700 text-gray-100"}`}
          >
            <p className="font-bold">{message.sender}</p>
            <p>{message.content}</p>
            <span className="text-xs text-gray-400">{new Date(message.timestamp).toLocaleString()}</span>
          </div>
        ))}
      </div>
      <div className="flex space-x-2">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 p-2 rounded bg-gray-700 text-gray-100"
        />
        <button
          onClick={handleSendMessage}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500"
        >
          Send
        </button>
      </div>
    </div>
  );
}
