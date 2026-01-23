"use client";

import { useUser } from "@/hooks/useUsers";
import { Button } from "./ui/button";
import { RefreshCcw } from "lucide-react";

export const Users = () => {
  const { users, error, fetchUsers } = useUser();

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  console.log(users);

  return (
    <div className="text-2xl border border-b-amber-400">
      {users?.map((u) => (
        <div key={u.id}>{u.name}</div>
      ))}
      <Button onClick={fetchUsers}>
        <RefreshCcw className="w-5 h-5" />
      </Button>
    </div>
  );
};
