"use client";

import { useUser } from "@/hooks/useUsers";
import { Button } from "./ui/button";
import { ChevronRight, RefreshCcw } from "lucide-react";
import { useState } from "react";

export const Users = () => {
  const { users, error, fetchUsers, setName, isLoading } = useUser();

  const [user, setUser] = useState("");

  const handleAddUser = async () => {
    if (!user.trim()) return;

    await setName(user);
    setUser("");
    fetchUsers();
  };

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="text-2xl border border-b-amber-400 p-4 space-y-3">
      {/* Users List */}
      {users?.map((u) => (
        <div key={u.id}>{u.name}</div>
      ))}

      {/* Input */}
      <input
        type="text"
        placeholder="Enter name"
        value={user}
        onChange={(e) => setUser(e.target.value)}
        className="border px-2 py-1 rounded w-full"
      />

      {/* Buttons */}
      <div className="flex gap-2">
        <Button onClick={handleAddUser} disabled={isLoading}>
          <ChevronRight className="w-5 h-5" />
        </Button>

        <Button onClick={fetchUsers} disabled={isLoading}>
          <RefreshCcw className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
};
