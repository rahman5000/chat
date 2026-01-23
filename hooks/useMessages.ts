"use client";
import { Message } from "@/types";
import { useState, useEffect } from "react";

export function useMessages() {
  const [messages, setMessages] = useState<Message[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

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

  useEffect(() => {
    fetchMessages();
  }, []);

  return { messages, error, isLoading, fetchMessages };
}
