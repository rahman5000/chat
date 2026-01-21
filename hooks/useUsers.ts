"use client";
import { useState } from "react";
import { Users } from "@/types";

export function useUser() {
  const [users, setUsers] = useState<Users[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = async () => {
    try {
      const res = await fetch("api/users");
      if (!res.ok) {
        setError(await res.text());
        return;
      }
      const data = await res.json();
      setUsers(data);
    } catch (err) {
      setError(`Failed to fetch users ${err}`);
    }
  };
  return { users, error, fetchUsers };
}
