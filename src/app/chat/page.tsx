// src/app/chat/page.tsx
"use client";

import React, { useState, useEffect } from "react";
import axiosInstance from "@/lib/axiosInstance";

interface Message {
  message: string;
  sender_id: number;
  receiver_id: number;
}

const ChatPage: React.FC = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [socket, setSocket] = useState<WebSocket | null>(null);

  useEffect(() => {
    const ws = new WebSocket(`ws://${window.location.host}/ws/chat/`);
    ws.onmessage = (event: MessageEvent) => {
      const data: Message = JSON.parse(event.data);
      setMessages((prev) => [...prev, data]);
    };
    setSocket(ws);
    return () => ws.close();
  }, []);

  const sendMessage = async () => {
    if (socket && message) {
      socket.send(JSON.stringify({ message, receiver_id: 1 }));  // Replace with dynamic receiver_id
      setMessage("");
    }
  };

  return (
    <div className="p-8 space-y-8">
      <h2 className="text-2xl font-semibold mb-4">Chat</h2>
      <div className="space-y-2">
        {messages.map((msg, index) => (
          <div key={index} className="p-2 rounded-lg bg-gray-100">
            <span>{msg.sender_id}: {msg.message}</span>
          </div>
        ))}
      </div>
      <input
        type="text"
        className="border p-2 rounded"
        placeholder="Type a message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={sendMessage} className="bg-blue-500 text-white p-2 rounded">Send</button>
    </div>
  );
};

export default ChatPage;
