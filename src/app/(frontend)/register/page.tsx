"use client";

import { useState } from "react";

export default function RegisterPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/users", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          password: form.password,
        }),
      });

      if (!res.ok) throw new Error("Could not create account");

      const login = await fetch("/api/users/login", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: form.email,
          password: form.password,
        }),
      });

      if (!login.ok) throw new Error("Account created. Please log in.");

      window.location.href = "/";
    } catch (err) {
      setError(err instanceof Error ? err.message : "Registration failed");
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
            Create your account
          </h1>
          <p className="text-[12px] text-[#c0849a] mt-1.5">
            Join thousands of happy parents
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          {[
            ["name", "Full name", "text"],
            ["email", "Email address", "email"],
            ["password", "Password", "password"],
            ["confirmPassword", "Confirm password", "password"],
          ].map(([key, label, type]) => (
            <div className="mb-4" key={key}>
              <label className="text-[10.5px] uppercase tracking-[0.12em] font-semibold text-[#c0687a] block mb-2">
                {label}
              </label>
              <input
                type={type}
                value={form[key as keyof typeof form]}
                onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                required
                className="w-full px-4 py-[11px] rounded-full border border-[#f5c6d4] bg-[#fffafc] text-[13.5px] text-[#5a3a4a] outline-none focus:border-[#e8829a]"
              />
            </div>
          ))}

          {error && <p className="text-red-500 text-[12px] mb-4">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-[13px] bg-[#f9869f] hover:bg-[#f06b88] text-white font-semibold rounded-full text-[13.5px] transition-all disabled:opacity-60"
          >
            {loading ? "Creating..." : "Create account"}
          </button>
        </form>

        <p className="text-center text-[12px] text-[#d4a0b0] mt-5">
          Already have an account?{" "}
          <a href="/login" className="text-[#e8829a] font-semibold">
            Log in
          </a>
        </p>
      </div>
    </div>
  );
}
