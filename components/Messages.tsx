"use client";

import { useMessages } from "@/hooks/useMessages";
import { Button } from "./ui/button";
import { RefreshCcw } from "lucide-react";
import { useState } from "react";

export const Messages = () => {
  const { messages, error, fetchMessages, sendMessage, isSending } =
    useMessages();

  const [message, setMessage] = useState("");

  const senderId = "11111111-1111-1111-1111-111111111111";

  const handleSend = async () => {
    if (!message.trim()) return;

    await sendMessage(message, senderId);
    setMessage(""); // clear input
  };

  if (error) {
    return <div className="text-center text-red-700">{error}</div>;
  }

  return (
    <div className="space-y-3">
      {/* Messages */}
      <div className="space-y-2">
        {messages?.map((m) => (
          <div key={m.id}>
            <p className="text-black">{m.message}</p>
          </div>
        ))}
      </div>

      {/* Input */}
      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message..."
        className="border p-2 rounded w-full"
      />

      {/* Buttons */}
      <div className="flex gap-2">
        <Button onClick={handleSend} disabled={isSending}>
          {isSending ? "Sending..." : "Send"}
        </Button>

        <Button onClick={fetchMessages} variant="outline">
          <RefreshCcw className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
};
