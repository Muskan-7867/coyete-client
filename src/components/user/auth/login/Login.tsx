"use client";

import React, { useState } from "react";
import Image from "next/image";

export default function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

async function handleSubmit(e: React.FormEvent) {
  e.preventDefault();
  setLoading(true);
  setError(null);
  setSuccess(null);

  try {
    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (!res.ok) throw new Error(data.message);

    setSuccess("Login successful!");
    localStorage.setItem("token", data.token);
    window.location.href = "/";
  } catch  {
    console.log("error")
  } finally {
    setLoading(false);
  }
}



  return (
    <main className="relative z-10 max-w-5xl w-full mx-4 p-6 md:p-8 lg:p-12">
      <div className="bg-black/40 backdrop-blur-lg rounded-2xl shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2 border border-gray-300/20">
        {/* Left - Hero with Image */}
        <section className="relative p-8 md:p-12 flex flex-col justify-between gap-6 bg-gradient-to-b from-amber-700/20 to-black/40">
          {/* Background Image */}
          <div className="absolute inset-0">
            <Image
              src="/assets/auth.png" // ✅ replace with your image path
              alt="Cricket player celebrating"
              fill
              className="object-cover object-center opacity-60"
              priority
            />
            <div className="absolute inset-0 bg-black/50" /> {/* overlay */}
          </div>

          {/* Foreground Content */}
          <div className="relative z-10">
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white">
              Welcome Back
            </h1>
            <p className="mt-3 text-white">
              Log in and continue your cricket journey — matches, scores, and
              more!
            </p>
          </div>

          <footer className="relative z-10 mt-4 text-sm text-white">
            Don&apos;t have an account?{" "}
            <a href="/register" className="underline font-medium">
              Register
            </a>
          </footer>
        </section>

        {/* Right - Form */}
        <section className="p-8 md:p-12 text-white  backdrop-blur-md">
          <h2 className="text-2xl font-bold">Login</h2>
          <p className="mt-2 text-sm">Enter your details to sign in.</p>

          <form className="mt-6 space-y-4 text-white" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium">Email</label>
              <input
                name="email"
                value={form.email}
                onChange={handleChange}
                type="email"
                required
                className="mt-1 block w-full rounded-lg border border-slate-200 px-4 py-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Password</label>
              <input
                name="password"
                value={form.password}
                onChange={handleChange}
                type="password"
                required
                minLength={6}
                className="mt-1 block w-full rounded-lg border border-slate-200 px-4 py-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
                placeholder="Enter your password"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-lg bg-amber-600 text-white font-semibold hover:bg-amber-700 transition disabled:opacity-50"
            >
              {loading ? "Logging in..." : "Login"}
            </button>

            {success && <p className="text-sm text-green-400">{success}</p>}
            {error && <p className="text-sm text-red-400">{error}</p>}
          </form>

          <div className="mt-6 text-xs text-slate-400">
            By signing in you agree to our{" "}
            <a href="#" className="underline">
              Terms
            </a>{" "}
            and{" "}
            <a href="#" className="underline">
              Privacy Policy
            </a>
            .
          </div>
        </section>
      </div>

   
    </main>
  );
}
