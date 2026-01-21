"use client";

import { Message } from "@/types";
import { useState } from "react";

export function useMessages() {
  const [messages, setMessages] = useState<Message[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchMessages = async () => {
    try {
      const res = await fetch("/api/messages");

      if (!res.ok) {
        setError(await res.text());
        return;
      }

      const result: { data: Message[] } = await res.json();
      setMessages(result.data);
    } catch (err) {
      setError(`Failed to fetch messages ${err}`);
    }
  };

  return { messages, error, fetchMessages };
}
