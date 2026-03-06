"use client";

import useSWR from "swr";
import { Message } from "@/types";
import { SupabaseBroswer } from "@/lib/SupabaseBrowser";
import { useEffect } from "react";

/* ================= FETCHER ================= */

const fetcher = async (url: string) => {
  const res = await fetch(url);
  const json = await res.json();

  if (!res.ok) throw new Error(json.error);

  return json.data;
};

/* ================= HOOK ================= */

export function useMessages() {
  const { data, error, isLoading, mutate } = useSWR<Message[]>(
    "/api/messages",
    fetcher,
  );

  /* ================= SEND ================= */

  const sendMessage = async (
    message: string,
    senderId: string,
    receiverId: string,
  ) => {
    const res = await fetch("/api/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message, senderId, receiverId }),
    });

    const json = await res.json();

    if (!res.ok) {
      throw new Error(json.error);
    }
    mutate();
  };

  /* ================= UPDATE ================= */

  const updateMessage = async (id: string, message: string) => {
    const res = await fetch(`/api/messages/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message }),
    });

    const json = await res.json();

    if (!res.ok) {
      throw new Error(json.error);
    }
    mutate();
  };

  /* ================= DELETE ================= */

  const deleteMessage = async (id: string) => {
    const res = await fetch(`/api/messages/${id}`, {
      method: "DELETE",
    });

    const json = await res.json();

    if (!res.ok) {
      throw new Error(json.error);
    }
    mutate();
  };

  /* ================= REALTIME ================= */

  useEffect(() => {
    const channel = SupabaseBroswer.channel("messages-realtime")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "messages" },
        () => {
          mutate();
        },
      )
      .subscribe();

    return () => {
      SupabaseBroswer.removeChannel(channel);
    };
  }, [mutate]);

  return {
    messages: data || [],
    isLoading,
    error: error ? String(error) : null,

    sendMessage,
    updateMessage,
    deleteMessage,

    refetch: mutate,
  };
}
