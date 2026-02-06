"use client";

import { Users } from "@/components/Users";
import { useAuth } from "@/context/AuthContext";
import AuthPage from "./login/page";

export default function Home() {
  const { user, loading, logout } = useAuth();

  if (loading) return <p>Loading...</p>;

  return (
    <div className="min-h-screen flex items-center justify-center flex-col gap-4">
      {user ? (
        <>
          <h1 className="text-xl">Welcome, {user.name} 👋</h1>

          <Users />

          <button
            onClick={logout}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Logout
          </button>
        </>
      ) : (
        <AuthPage />
      )}
    </div>
  );
}
