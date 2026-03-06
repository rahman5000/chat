"use client";

import { useAuth } from "@/context/AuthContext";
import { IoEye } from "react-icons/io5";
import { IoEyeOff } from "react-icons/io5";
import { useState } from "react";

export default function LoginPage() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { login, error, loading } = useAuth();

  const handleLogin = async () => {
    if (!name || !password) return;

    await login(name, password);
  };

  return (
    <div className="w-full max-w-sm rounded-xl bg-white p-6 shadow">
      <h1 className="mb-4 text-xl font-bold text-center">Login</h1>

      {/* Username */}
      <input
        type="text"
        placeholder="Enter name"
        className="w-full border p-2 rounded mb-3"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      {/* Password */}
      <div className="relative mb-3">
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Enter password"
          className="w-full border p-2 rounded pr-10"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* Toggle Button */}
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-2 top-2 text-sm text-gray-600"
        >
          {showPassword ? (
            <IoEye className="w-5 h-5" />
          ) : (
            <IoEyeOff className="w-5 h-5" />
          )}
        </button>
      </div>

      {/* Error */}
      {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

      {/* Submit */}
      <button
        onClick={handleLogin}
        disabled={loading}
        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:opacity-50"
      >
        {loading ? "Logging in..." : "Login"}
      </button>
    </div>
  );
}
