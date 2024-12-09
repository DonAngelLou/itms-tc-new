// src/app/page.tsx
"use client";

import React from "react";
import ChatPage from "@/components/chat/Chat";
import { ChatProvider } from "@/context/ChatContext";

export default function HomePage() {
  return (
    <ChatProvider>
      <div className="min-h-screen bg-gray-900 p-6">
        <ChatPage />
      </div>
    </ChatProvider>
  );
}
