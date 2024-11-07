// src/app/layout.tsx
"use client";

import React from "react";
import Sidebar from "@/components/Sidebar";
import "../styles/globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-gray-100">
        <Sidebar /> {/* Sidebar component */}
        <main className="flex-1 p-4 overflow-y-auto">{children}</main>
      </body>
    </html>
  );
}
