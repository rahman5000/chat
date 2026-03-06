"use client";

import { useAuth } from "@/context/AuthContext";
import { IoEye } from "react-icons/io5";
import { IoEyeOff } from "react-icons/io5";
import { useState } from "react";

export default function SignUpPage() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { signup, error, loading } = useAuth();

  const handleSignup = async () => {
    if (!name || !password) return;

    await signup(name, password);
  };

  return (
    <div className="w-full max-w-sm rounded-xl bg-white p-6 shadow">
      <h1 className="mb-4 text-xl font-bold text-center">Sign Up</h1>

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
          placeholder="Create password"
          className="w-full border p-2 rounded pr-10"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* Toggle */}
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
        onClick={handleSignup}
        disabled={loading}
        className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600 disabled:opacity-50"
      >
        {loading ? "Creating..." : "Sign Up"}
      </button>
    </div>
  );
}
