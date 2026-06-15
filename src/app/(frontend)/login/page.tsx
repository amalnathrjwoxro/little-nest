"use client";

import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/users/login", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) throw new Error("Invalid email or password");

      window.location.href = "/";
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-[#fde8ed] flex items-center justify-center overflow-hidden p-8">
              <div className="absolute w-64 h-64 bg-[#fcd0db] rounded-full -top-16 -left-16 animate-[pulse_4s_ease-in-out_infinite]" />
        <div className="absolute w-40 h-40 bg-[#fcd0db] rounded-full top-10 right-10 animate-[pulse_3s_ease-in-out_infinite]" />
        <div className="absolute w-72 h-72 bg-[#fcd0db] rounded-full -bottom-20 -right-20 animate-[pulse_5s_ease-in-out_infinite]" />
        <div className="absolute w-20 h-20 bg-[#f9b8c8] rounded-full bottom-20 left-20 animate-[bounce_3s_ease-in-out_infinite]" />
        <div className="absolute w-10 h-10 bg-[#f498b0] rounded-full top-32 left-40 animate-[bounce_2.5s_ease-in-out_infinite]" />
        <div className="absolute w-6 h-6 bg-[#f498b0] rounded-full top-48 right-32 animate-[bounce_4s_ease-in-out_infinite]" />
        <div className="absolute w-3 h-3 bg-[#f498b0] rounded-full top-24 right-56 animate-[ping_3s_ease-in-out_infinite]" />
        <div className="absolute w-5 h-5 bg-[#f9b8c8] rounded-full bottom-32 right-24 animate-[bounce_3.5s_ease-in-out_infinite]" />
        <div className="absolute w-8 h-8 bg-[#fcd0db] rounded-full top-1/2 left-8 animate-[pulse_4.5s_ease-in-out_infinite]" />
      <div className="relative z-10 bg-white rounded-3xl p-10 w-full max-w-sm border border-[#f5d0da] shadow-sm">
        <div className="text-center mb-7">
          <h1 className="text-[20px] font-semibold text-[#3d1f2a] tracking-tight">
            Welcome back
          </h1>
          <p className="text-[12px] text-[#c0849a] mt-1.5">
            Log in to continue shopping
          </p>
        </div>

        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="text-[10.5px] uppercase tracking-[0.12em] font-semibold text-[#c0687a] block mb-2">
              Email address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-[11px] rounded-full border border-[#f5c6d4] bg-[#fffafc] text-[13.5px] text-[#5a3a4a] outline-none focus:border-[#e8829a]"
            />
          </div>

          <div className="mb-4">
            <label className="text-[10.5px] uppercase tracking-[0.12em] font-semibold text-[#c0687a] block mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-[11px] rounded-full border border-[#f5c6d4] bg-[#fffafc] text-[13.5px] text-[#5a3a4a] outline-none focus:border-[#e8829a]"
            />
          </div>

          {error && <p className="text-red-500 text-[12px] mb-4">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-[13px] bg-[#f9869f] hover:bg-[#f06b88] text-white font-semibold rounded-full text-[13.5px] transition-all disabled:opacity-60"
          >
            {loading ? "Logging in..." : "Log in"}
          </button>
        </form>

        <p className="text-center text-[12px] text-[#d4a0b0] mt-5">
          New here?{" "}
          <a href="/register" className="text-[#e8829a] font-semibold">
            Create an account
          </a>
        </p>
      </div>
    </div>
  );
}
