import { useAuth } from "@/context/AuthContext";
import { useState } from "react";

export default function SignUpPage() {
  const [name, setName] = useState("");
  const { signup, error } = useAuth();

  const handleSignup = async () => {
    if (!name) return;

    await signup(name);
  };

  return (
    <div className="w-full max-w-sm rounded-xl bg-white p-6 shadow">
      <h1 className="mb-4 text-xl font-bold text-center">Simple Auth</h1>

      <input
        type="text"
        placeholder="Enter name"
        className="w-full border p-2 rounded mb-3"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

      <button
        onClick={handleSignup}
        className="w-full bg-green-500 text-white p-2 rounded"
      >
        SignUp
      </button>
    </div>
  );
}
