"use client";

import { Message } from "@/types";
import { useState, useEffect } from "react";

export function useMessages() {
  const [messages, setMessages] = useState<Message[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const fetchMessages = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/messages");

      if (!res.ok) {
        setError(await res.text());
        return;
      }

      const result: { data: Message[] } = await res.json();
      setMessages(result.data);
    } catch (err) {
      setError(`Failed to fetch messages: ${err}`);
    } finally {
      setIsLoading(false);
    }
  };

  const sendMessage = async (message: string, senderId: string) => {
    setIsSending(true);
    setError(null);

    try {
      const res = await fetch("/api/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message,
          senderId,
        }),
      });

      if (!res.ok) {
        setError(await res.text());
        return;
      }

      await fetchMessages();
    } catch (err) {
      console.error(err);
      setError("Failed to set message");
    } finally {
      setIsSending(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  return { messages, error, isLoading, isSending, fetchMessages, sendMessage };
}
