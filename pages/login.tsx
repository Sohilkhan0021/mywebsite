"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

interface props {
  onClose?: () => void;
}

export default function LoginPage({ onClose }: props) {
  const [islogin, setIslogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!islogin && password !== confirmpassword) {
      toast.error("Passwords do not match!");
      return;
    }

    const endpoint = islogin ? "/api/login" : "/api/signup";

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("token", data.token || "");
      toast.success(data.message || "Login successful!");
      window.dispatchEvent(new Event("storage"));
      router.push("/"); 
    } else {
        toast.error(data.message || "Login failed. Please try again.");
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again later.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8">
      <div className="border border-gray-300 w-full max-w-md sm:max-w-lg md:max-w-xl lg:w-[500px] p-6 sm:p-8 bg-[#FAF7F2] rounded-lg">
        <h2 className="text-2xl md:text-4xl font-serif text-[#3E402D] mb-6 sm:mb-8 text-center sm:text-left">
          Welcome Back
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col space-y-4 sm:space-y-6">
          <div className="flex flex-col">
            <label className="text-xs tracking-widest text-[#3E402D] mb-2">
              EMAIL ADDRESS*
            </label>
            <input type="email" value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="text-[#3E402D] border-b border-black focus:outline-none focus:border-[#3E402D] py-2 text-sm"
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
              className="text-[#3E402D] border-b border-black focus:outline-none focus:border-[#3E402D] py-2 text-sm bg-transparent"
              required
            />
            <span className="mt-2 text-xs text-[#3E402D] cursor-pointer hover:underline self-end">
              Forgot password?
            </span>
          </div>

          <button
            type="submit"
            className="bg-[#3E402D] hover:bg-[#9B9B93] text-white cursor-pointer uppercase tracking-widest py-3 mt-4 text-sm sm:text-base"
          >
            {islogin ? "Sign In" : "Sign Up"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-[#3E402D]">
          {islogin ? "Don’t have an account?" : "Already have an account?"}{" "}
          <span
            onClick={() => router.push("/Signup")}
            className="text-black cursor-pointer hover:underline"
          >
            {islogin ? "Signup" : "Login"}
          </span>
        </p>
      </div>
    </div>
  );
}
