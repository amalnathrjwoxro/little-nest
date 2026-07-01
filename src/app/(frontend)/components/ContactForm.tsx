"use client";

import { useState } from "react";

export default function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await fetch("/api/contact-form", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        throw new Error("Failed to submit form");
      }

      setSent(true);

      setForm({
        name: "",
        email: "",
        message: "",
      });

      setTimeout(() => setSent(false), 3000);

    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-20 px-6 bg-[#fde8ed]">
      <div className="max-w-md mx-auto">

        <div className="text-center mb-8">
          <h2 className="text-[22px] font-semibold text-[#3d1f2a] tracking-tight mb-2">
            Get in touch
          </h2>

          <p className="text-[12.5px] text-[#c0849a]">
            Have a question? We&apos;d love to hear from you.
          </p>
        </div>

        <div className="bg-white rounded-3xl border border-[#f5d0da] shadow-sm p-8">
          <form onSubmit={handleSubmit}>

            {/* Name */}
            <div className="mb-4">
              <label className="text-[10.5px] uppercase tracking-[0.12em] font-semibold text-[#c0687a] block mb-2">
                Your name
              </label>

              <input
                type="text"
                placeholder="Jane Smith"
                value={form.name}
                onChange={(e) =>
                  setForm({
                    ...form,
                    name: e.target.value,
                  })
                }
                required
                className="w-full px-4 py-2.75 rounded-full border border-[#f5c6d4] bg-[#fffafc] text-[13.5px] text-[#5a3a4a] placeholder-[#d4a8b4] outline-none focus:border-[#e8829a] focus:ring-2 focus:ring-[#fde0e7] transition-all"
              />
            </div>

            {/* Email */}
            <div className="mb-4">
              <label className="text-[10.5px] uppercase tracking-[0.12em] font-semibold text-[#c0687a] block mb-2">
                Email address
              </label>

              <input
                type="email"
                placeholder="hello@parent.com"
                value={form.email}
                onChange={(e) =>
                  setForm({
                    ...form,
                    email: e.target.value,
                  })
                }
                required
                className="w-full px-4 py-2.75 rounded-full border border-[#f5c6d4] bg-[#fffafc] text-[13.5px] text-[#5a3a4a] placeholder-[#d4a8b4] outline-none focus:border-[#e8829a] focus:ring-2 focus:ring-[#fde0e7] transition-all"
              />
            </div>

            {/* Message */}
            <div className="mb-6">
              <label className="text-[10.5px] uppercase tracking-[0.12em] font-semibold text-[#c0687a] block mb-2">
                Message
              </label>

              <textarea
                placeholder="Tell us how we can help..."
                rows={4}
                value={form.message}
                onChange={(e) =>
                  setForm({
                    ...form,
                    message: e.target.value,
                  })
                }
                required
                className="w-full px-4 py-3 rounded-2xl border border-[#f5c6d4] bg-[#fffafc] text-[13.5px] text-[#5a3a4a] placeholder-[#d4a8b4] outline-none focus:border-[#e8829a] focus:ring-2 focus:ring-[#fde0e7] transition-all resize-none"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3.25 font-semibold rounded-full text-[13.5px] tracking-wide transition-all active:scale-[0.98] ${
                sent
                  ? "bg-[#6dbf8a] text-white"
                  : "bg-[#f9869f] hover:bg-[#f06b88] text-white"
              }`}
            >
              {loading
                ? "Sending..."
                : sent
                ? "Message sent!"
                : "Send message"}
            </button>

          </form>
        </div>
      </div>
    </section>
  );
}
