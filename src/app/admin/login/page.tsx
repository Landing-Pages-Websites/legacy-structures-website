"use client";

import { useState, FormEvent } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (res.ok) {
        router.push("/admin");
        router.refresh();
      } else {
        const body = await res.json();
        setError(body.error ?? "Incorrect email or password. Please try again.");
      }
    } catch {
      setError("Connection error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: "#f7f5f2", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
      <div style={{ background: "#fff", borderRadius: 12, padding: "48px 40px", boxShadow: "0 8px 40px rgba(26,58,92,0.12)", maxWidth: 400, width: "100%" }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <Image src="/logo.png" alt="Legacy Structures" width={80} height={76} style={{ margin: "0 auto 16px" }} />
          <h1 style={{ color: "#1a3a5c", fontSize: 22, fontWeight: 700, margin: 0 }}>Admin Portal</h1>
          <p style={{ color: "#5a6c7e", fontSize: 14, marginTop: 6 }}>Legacy Structures Inventory Management</p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div>
            <label htmlFor="admin-email" style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#1a3a5c", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.05em" }}>
              Email
            </label>
            <input
              id="admin-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@example.com"
              required
              autoComplete="email"
              style={{ width: "100%", padding: "12px 14px", border: "1.5px solid #d1d5db", borderRadius: 8, fontSize: 15, color: "#1a1a1a", outline: "none", boxSizing: "border-box" }}
            />
          </div>

          <div>
            <label htmlFor="admin-password" style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#1a3a5c", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.05em" }}>
              Password
            </label>
            <input
              id="admin-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              required
              autoComplete="current-password"
              style={{ width: "100%", padding: "12px 14px", border: "1.5px solid #d1d5db", borderRadius: 8, fontSize: 15, color: "#1a1a1a", outline: "none", boxSizing: "border-box" }}
            />
          </div>

          {error && (
            <p style={{ color: "#c0392b", fontSize: 14, margin: 0, fontWeight: 600 }}>{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{ background: "#1a3a5c", color: "#fff", fontWeight: 700, fontSize: 15, padding: "13px", borderRadius: 8, border: "none", cursor: loading ? "not-allowed" : "pointer", opacity: loading ? 0.7 : 1, textTransform: "uppercase", letterSpacing: "0.05em" }}
          >
            {loading ? "Logging in…" : "Log In"}
          </button>
        </form>

        <p style={{ textAlign: "center", color: "#9ca3af", fontSize: 12, marginTop: 24 }}>
          This page is not linked publicly. Direct URL access only.
        </p>
      </div>
    </div>
  );
}
