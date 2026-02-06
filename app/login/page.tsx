"use client";

import LoginPage from "@/components/auth/login";
import SignUpPage from "@/components/auth/signup";
import { useState } from "react";

export default function Login() {
  const [mode, setMode] = useState<"login" | "signup">("login");

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      {/* Card */}
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6">
        {/* Tabs */}
        <div className="flex mb-6 border-b">
          <button
            onClick={() => setMode("login")}
            className={`flex-1 py-2 text-center font-medium transition ${
              mode === "login"
                ? "border-b-2 border-blue-600 text-blue-600"
                : "text-gray-500 hover:text-blue-500"
            }`}
          >
            Login
          </button>

          <button
            onClick={() => setMode("signup")}
            className={`flex-1 py-2 text-center font-medium transition ${
              mode === "signup"
                ? "border-b-2 border-blue-600 text-blue-600"
                : "text-gray-500 hover:text-blue-500"
            }`}
          >
            Sign Up
          </button>
        </div>

        {/* Content */}
        <div>{mode === "login" ? <LoginPage /> : <SignUpPage />}</div>
      </div>
    </div>
  );
}
