// src/context/ChatContext.tsx
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface ChatMessage {
  id: string;
  sender: string;
  content: string;
  timestamp: string;
}

interface ChatContextType {
  messages: ChatMessage[];
  sendMessage: (content: string) => void;
}

const mockMessages: ChatMessage[] = [
  { id: "1", sender: "Transport Company", content: "Hello, LTT Admin!", timestamp: "2024-11-08T09:00:00" },
  { id: "2", sender: "LTT Admin", content: "Hi, how can I assist you today?", timestamp: "2024-11-08T09:05:00" },
];

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [messages, setMessages] = useState<ChatMessage[]>(mockMessages);

  const sendMessage = (content: string) => {
    const newMessage: ChatMessage = {
      id: (messages.length + 1).toString(),
      sender: "Transport Company",
      content,
      timestamp: new Date().toISOString(),
    };
    setMessages((prevMessages) => [...prevMessages, newMessage]);
  };

  return (
    <ChatContext.Provider value={{ messages, sendMessage }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChatContext = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useChatContext must be used within a ChatProvider");
  }
  return context;
};
