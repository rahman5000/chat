"use client";
import { useEffect, useState } from "react";
import { Users } from "@/types";

export function useUser() {
  const [users, setUsers] = useState<Users[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchUsers = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch("api/users");
      if (!res.ok) {
        setError(await res.text());
        return;
      }
      const result: { users: Users[] } = await res.json();
      setUsers(result.users);
    } catch (err) {
      setError(`Failed to fetch users ${err}`);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  });
  return { users, isLoading, error, fetchUsers };
}
