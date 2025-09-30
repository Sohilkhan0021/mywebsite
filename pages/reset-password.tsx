"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

export default function ResetPasswordPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [email, setEmail] = useState<string | null>(null);
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

 
  useEffect(() => {
    if (token) {
      fetch(`/api/reset-password?token=${token}`)
        .then((res) => res.json())
        .then((data) => setEmail(data.email));
    }
  }, [token]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (password !== confirm) return alert("Passwords do not match");

    const res = await fetch("/api/reset-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, password }),
    });
    const data = await res.json();
    alert(data.message);
    if (res.ok) window.location.href = "/login";
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FAF7F2] px-4">
      <div className="bg-[#FAF7F2] p-6 sm:p-8 w-full max-w-lg">
        <h1 className="text-center text-sm sm:text-base font-semibold tracking-wide text-[#2e2f1e] mb-2 uppercase">
          RESET ACCOUNT PASSWORD
        </h1>
        {email && (
          <p className="text-center text-xs sm:text-sm text-[#2e2f1e] mb-6">
            Enter a new password for <span className="font-medium">{email}</span>
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm text-[#2e2f1e] mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-400 bg-white focus:outline-none py-2 px-3 text-sm"
              required
            />
          </div>

          <div>
            <label className="block text-sm text-[#2e2f1e] mb-2">Confirm Password</label>
            <input
              type="password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              className="w-full border border-gray-400 bg-white focus:outline-none py-2 px-3 text-sm"
              required
            />
          </div>

          <button type="submit"
            className="bg-[#9B9B93] text-white px-6 py-2 font-semibold tracking-wider cursor-pointer hover:bg-[#46412B] text-sm">
            RESET PASSWORD
          </button>
        </form>
      </div>
    </div>
  );
}
