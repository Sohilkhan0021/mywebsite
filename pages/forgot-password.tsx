"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await fetch("/api/forgot-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    const data = await res.json();
    alert(data.message);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FAF7F2] px-4 sm:px-6 lg:px-8">
      <div className="bg-[#FAF7F2] border border-gray-300 p-6 sm:p-8 w-full max-w-md sm:max-w-lg shadow-sm">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-serif text-[#2e2f1e] mb-2 text-center sm:text-left">
          Reset your password
        </h1>
        <p className="text-sm sm:text-base text-[#2e2f1e] mb-6 sm:mb-8 text-center sm:text-left">
          We will send you an email to reset your password.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-xs tracking-widest text-[#2e2f1e] mb-2 sm:mb-4">
              EMAIL
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border-b border-gray-400 bg-transparent focus:outline-none py-2 text-black text-sm sm:text-base"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#9B9B93] text-white font-semibold py-2 sm:py-3 uppercase tracking-wider cursor-pointer hover:bg-[#46412B] text-sm sm:text-base"
          >
            Submit
          </button>

          <div className="text-center text-xs sm:text-sm text-[#2e2f1e]">OR</div>

          <button
            type="button"
            onClick={() => router.push("/login")}
            className="w-full bg-[#9B9B93] text-white font-semibold py-2 sm:py-3 uppercase tracking-wider cursor-pointer hover:bg-[#46412B] text-sm sm:text-base"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
}
