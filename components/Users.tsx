"use client";

import { useUser } from "@/hooks/useUsers";
import { RefreshCcw, Search, Newspaper } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export const Users = () => {
  const { users, error, fetchUsers, isLoading } = useUser();
  const [search, setSearch] = useState("");

  if (error) {
    return <p className="text-red-500 text-center mt-5">{error}</p>;
  }

  const filteredUsers =
    users?.filter((u) => u.name.toLowerCase().includes(search.toLowerCase())) ||
    [];

  return (
    <div className="w-full h-full bg-[#17212b] text-white flex flex-col overflow-hidden">
      {/* HEADER */}
      <div className="h-14 bg-[#1f2c38] flex items-center justify-between px-4 border-b border-gray-700">
        <h2 className="font-semibold text-lg tracking-wide">Chats</h2>

        <div className="flex items-center gap-2">
          {/* NEWS BUTTON */}
          <Link
            href="/news"
            className="p-2 rounded-full hover:bg-gray-700 transition"
          >
            <Newspaper className="w-5 h-5" />
          </Link>

          {/* REFRESH BUTTON */}
          <button
            onClick={fetchUsers}
            disabled={isLoading}
            className="p-2 rounded-full hover:bg-gray-700 transition"
          >
            <RefreshCcw
              className={`w-5 h-5 ${isLoading ? "animate-spin" : ""}`}
            />
          </button>
        </div>
      </div>

      {/* SEARCH */}
      <div className="p-3 border-b border-gray-800">
        <div className="flex items-center bg-[#202b36] rounded-lg px-3 py-2">
          <Search className="w-4 h-4 text-gray-400" />

          <input
            type="text"
            placeholder="Search chats..."
            className="bg-transparent outline-none text-sm ml-2 w-full text-white placeholder-gray-400"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* USER LIST */}
      <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700">
        {filteredUsers.length === 0 && (
          <p className="text-gray-400 text-center mt-10">No chats found</p>
        )}

        {filteredUsers.map((u) => (
          <Link
            key={u.id}
            href={`/chat/${u.id}`}
            className="flex items-center gap-3 px-4 py-3 hover:bg-[#202b36] transition border-b border-gray-800"
          >
            {/* AVATAR */}
            <div className="w-11 h-11 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center text-lg font-semibold shrink-0">
              {u.name.charAt(0).toUpperCase()}
            </div>

            {/* USER INFO */}
            <div className="flex flex-col min-w-0">
              <span className="font-medium truncate">{u.name}</span>

              <span className="text-xs text-gray-400 truncate">
                Tap to chat
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
