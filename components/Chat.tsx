"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import { useAuth } from "@/context/AuthContext";
import { useMessages } from "@/hooks/useMessages";

import { ChevronLeft } from "lucide-react";
import Link from "next/link";

export default function Chat() {
  /* ================= ROUTE ================= */
  const { id: receiverId } = useParams<{ id: string }>();

  /* ================= AUTH ================= */
  const { user, loading } = useAuth();

  /* ================= MESSAGES ================= */
  const {
    messages,
    error,
    isLoading,
    sendMessage,
    refetch,
    updateMessage,
    deleteMessage,
  } = useMessages();

  /* ================= STATE ================= */
  const [reactions, setReactions] = useState<
    Record<string, Record<string, number>>
  >({});
  const [text, setText] = useState("");

  const bottomRef = useRef<HTMLDivElement | null>(null);

  const router = useRouter();

  /* ================= PROTECT ROUTE ================= */
  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [loading, user, router]);

  /* ================= AUTO SCROLL ================= */
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  /* ================= FILTER CHAT ================= */
  const chatMessages = useMemo(() => {
    if (!user) return [];

    return messages.filter(
      (m) =>
        (m.senderId === user.id && m.receiverId === receiverId) ||
        (m.senderId === receiverId && m.receiverId === user.id),
    );
  }, [messages, user, receiverId]);

  /* ================= SEND ================= */
  const handleSend = async () => {
    if (!text.trim() || !user) return;

    await sendMessage(text, user.id, receiverId);

    setText("");

    // ❌ No manual fetch needed
    // Realtime handles it
  };

  /* ================= LOADING ================= */
  if (loading || isLoading) {
    return (
      <div className="flex h-screen items-center justify-center text-gray-600">
        Loading chat...
      </div>
    );
  }

  /* ================= UI ================= */
  return (
    <div className="w-full h-screen flex flex-col bg-gray-100 overflow-hidden">
      {/* ============ HEADER ============ */}
      <header className="flex items-center justify-between bg-white px-4 py-3 shadow">
        <Link href="/">
          <ChevronLeft className="w-5 h-5" />
        </Link>

        <div className="flex items-center gap-2">
          <div className="relative">
            <div className="w-9 h-9 rounded-full bg-blue-500 text-white flex items-center justify-center font-semibold">
              U
            </div>

            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white"></span>
          </div>

          <div>
            <p className="text-sm font-semibold">{user?.name || receiverId}</p>
            <p className="text-xs text-green-500">Online</p>
          </div>
        </div>

        <button
          onClick={() => refetch}
          className="text-sm text-blue-600 hover:underline"
        >
          Refresh
        </button>
      </header>

      {/* ============ MESSAGES ============ */}
      <main className="flex-1 overflow-y-auto overflow-x-hidden p-4 space-y-3">
        {chatMessages.length === 0 && (
          <p className="text-center text-gray-500 text-sm">No messages yet</p>
        )}

        {chatMessages.map((msg) => {
          const isMe = msg.senderId === user?.id;

          return (
            <div
              key={msg.id}
              className={`flex ${isMe ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-xs rounded-xl px-3 py-2 text-sm shadow
                ${isMe ? "bg-blue-500 text-white" : "bg-white text-gray-800"}`}
              >
                <p>{msg.message}</p>

                <span className="block text-[10px] opacity-70 mt-1 text-right">
                  {new Date(msg.createdAt).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>

                {/* OPTIONAL: Edit / Delete (only own message) */}
                {isMe && (
                  <div className="flex gap-2 mt-1 text-xs opacity-70">
                    <button
                      onClick={() => updateMessage(msg.id, "Edited message")}
                      className="hover:underline"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => deleteMessage(msg.id)}
                      className="hover:underline text-red-200"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}

        <div ref={bottomRef} />
      </main>

      {/* ============ ERROR ============ */}
      {error && <p className="px-4 py-1 text-sm text-red-500">{error}</p>}

      {/* ============ INPUT ============ */}
      <footer className="flex items-center gap-2 bg-white p-3 border-t">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-blue-400"
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSend();
          }}
        />

        <button
          onClick={handleSend}
          className="rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
        >
          Send
        </button>
      </footer>
    </div>
  );
}
