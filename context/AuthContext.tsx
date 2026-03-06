"use client";

import { createContext, useContext, useEffect, useState } from "react";

import { Users } from "@/types";

/* ---------------- TYPES ---------------- */

type AuthContextType = {
  user: Users | null;
  loading: boolean;
  login: (name: string, password: string) => Promise<boolean>;
  signup: (name: string, password: string) => Promise<boolean>;
  logout: () => void;
  error: string | null;
};

/* ---------------- CONTEXT ---------------- */

const AuthContext = createContext<AuthContextType | null>(null);

/* ---------------- PROVIDER ---------------- */

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<Users | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  /* ---------------- RESTORE SESSION ---------------- */

  useEffect(() => {
    const saved = localStorage.getItem("user");

    if (saved) {
      setUser(JSON.parse(saved));
    }

    setLoading(false);
  }, []);

  /* ---------------- LOGIN ---------------- */

  const login = async (name: string, password: string) => {
    try {
      setError(null);
      setLoading(true);

      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Login failed");
        return false;
      }

      // Save user
      setUser(data.user);
      localStorage.setItem("user", JSON.stringify(data.user));

      return true;
    } catch {
      setError("Login failed");
      return false;
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- REGISTER ---------------- */

  const signup = async (name: string, password: string) => {
    try {
      setError(null);
      setLoading(true);

      const res = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Registration failed");
        return false;
      }

      const newUser = data.data[0];

      setUser(newUser);
      localStorage.setItem("user", JSON.stringify(newUser));

      return true;
    } catch {
      setError("Register failed");
      return false;
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- LOGOUT ---------------- */

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  /* ---------------- PROVIDER ---------------- */

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        signup,
        logout,
        error,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

/* ---------------- HOOK ---------------- */

export function useAuth() {
  const ctx = useContext(AuthContext);

  if (!ctx) {
    throw new Error("useAuth must be inside AuthProvider");
  }

  return ctx;
}
