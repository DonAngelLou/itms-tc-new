// src/app/page.tsx
"use client";

import React from 'react';
import { useRouter } from 'next/navigation';

const HomePage: React.FC = () => {
  const router = useRouter();

  const handleLoginClick = () => {
    router.push('/login');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-6 bg-white rounded-lg shadow-md text-center w-full max-w-md">
        <h1 className="text-4xl font-bold mb-4">Welcome to ITMS</h1>
        <p className="text-lg mb-6">Please log in to access the interface.</p>
        <button
          onClick={handleLoginClick}
          className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Log In
        </button>
      </div>
    </div>
  );
};

export default HomePage;
