"use client";

import { useMessages } from "@/hooks/useMessages";
import { Button } from "./ui/button";
import { RefreshCcw } from "lucide-react";

export const Messages = () => {
  const { messages, error, fetchMessages } = useMessages();

  if (error) {
    return <div className="text-center text-red-700">${error}</div>;
  }

  console.log(messages);

  return (
    <div>
      {messages?.map((m) => (
        <div key={m.id} className="items-center-safe">
          <p className="text-black">${m.message}</p>
        </div>
      ))}
      <Button onClick={fetchMessages}>
        <RefreshCcw className="w-5 h-5" />
      </Button>
    </div>
  );
};
