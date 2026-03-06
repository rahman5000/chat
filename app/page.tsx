"use client";

import { Users } from "@/components/Users";
import { useAuth } from "@/context/AuthContext";
import AuthPage from "./login/page";

export default function Home() {
  const { user, loading, logout } = useAuth();

  if (loading) {
    return (
      <p className="min-h-screen flex items-center justify-center">
        Loading...
      </p>
    );
  }

  if (!user) {
    return <AuthPage />;
  }

  return (
    <div className="w-screen h-screen bg-[#0f1720] flex">
      {/* Main Layout */}
      <div className="flex w-full h-full">
        {/* Sidebar */}
        <div className="w-full md:w-[320px] bg-[#0f1720] border-r border-gray-700">
          <Users />
        </div>

        {/* Chat Area */}
        <div className="hidden md:flex flex-1 bg-[#17212b] items-center justify-center text-gray-400">
          Select a chat to start messaging
        </div>
      </div>

      {/* Logout Button */}
      <button
        onClick={logout}
        className="fixed bottom-4 right-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg shadow-lg"
      >
        Logout
      </button>
    </div>
  );
}
