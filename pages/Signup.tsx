"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function SignupPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLogin, setIsLogin] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstName, lastName, email, password }),
      });

      if (res.ok) {
        toast.success("Signup successful!");
        setTimeout(() => {
          router.push("/login");
        }, 1500);
      } else {
        const data = await res.json();
        toast.error(data.message || "Signup failed. Please try again.");
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again later.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl border border-gray-300 p-6 sm:p-8 bg-[#FAF7F2] rounded-lg shadow-md">
        <div className="mb-6 sm:mb-8">
          <h2 className="text-2xl md:text-4xl text-[#3E402D] text-center sm:text-left">
            {isLogin ? "Login to your account" : "Create an account."}
          </h2>
          {!isLogin && (
            <h4 className="text-base text-[#3E402D] mt-3 text-center sm:text-left">
              To create an account, please enter your details below
            </h4>
          )}
        </div>

        {!isLogin ? (
          <>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="flex flex-col">
                <label className="text-xs tracking-widest text-[#3E402D] mb-2">
                  EMAIL ADDRESS*
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="border-b border-black focus:outline-none focus:border-[#3E402D] py-2 text-sm text-[#3E402D]"
                  required
                />
              </div>

              <div className="flex flex-col">
                <label className="text-xs tracking-widest text-[#3E402D] mb-2">
                  PASSWORD*
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="border-b border-black focus:outline-none focus:border-[#3E402D] py-2 text-sm text-[#3E402D]"
                  required
                />
              </div>

              <div className="flex flex-col">
                <label className="text-xs tracking-widest text-[#3E402D] mb-2">
                  CONFIRM PASSWORD*
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="border-b border-black focus:outline-none focus:border-[#3E402D] py-2 text-sm text-[#3E402D]"
                  required
                />
              </div>

              <div className="flex flex-col sm:flex-row sm:space-x-6">
                <div className="flex flex-col flex-1">
                  <label className="text-xs tracking-widest text-[#3E402D] mb-2">
                    FIRST NAME*
                  </label>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="border-b border-black focus:outline-none focus:border-[#3E402D] py-2 text-sm text-[#3E402D]"
                    required
                  />
                </div>

                <div className="flex flex-col flex-1 mt-4 sm:mt-0">
                  <label className="text-xs tracking-widest text-[#3E402D] mb-2">
                    LAST NAME
                  </label>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="border-b border-black focus:outline-none focus:border-[#3E402D] py-2 text-sm text-[#3E402D]"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-[#3E402D] text-white py-3 uppercase tracking-widest hover:bg-[#9B9B93] transition cursor-pointer"
              >
                Sign Up
              </button>
            </form>
          </>
        ) : (
          <p className="text-center text-sm text-[#3E402D]">
            (Login form will go here)
          </p>
        )}

        <p className="mt-6 text-center text-sm text-[#3E402D]">
          {isLogin ? "Don’t have an account?" : "Already have an account?"}{" "}
          <span
            onClick={() => router.push("/login")}
            className="text-black cursor-pointer hover:underline"
          >
            {isLogin ? "Sign Up" : "Login"}
          </span>
        </p>
      </div>
    </div>
  );
}
