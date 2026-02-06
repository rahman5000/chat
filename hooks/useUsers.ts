"use client";

import { useEffect, useState } from "react";
import { Users } from "@/types";

export function useUser() {
  const [users, setUsers] = useState<Users[] | null>(null);
  const [user, setUser] = useState<Users | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchUsers = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/users");

      if (!res.ok) {
        setError(await res.text());
        return;
      }

      const result = await res.json();
      setUsers(result.users);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch users");
    } finally {
      setIsLoading(false);
    }
  };
  const setName = async (name: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name }),
      });

      if (!res.ok) {
        setError(await res.text());
        return;
      }
    } catch (err) {
      setError(`Failed to add user ${err}`);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchUser = async (name: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch(`/api/users/${name}`);

      if (!res.ok) {
        setError(await res.text());
        return null;
      }

      const data = await res.json();
      setUser(data.user);
    } catch (err) {
      setError(`Failed to fetch user ${err}`);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return { users, isLoading, error, setName, user, fetchUsers, fetchUser };
}
