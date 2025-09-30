"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface User {
  name?: string;
  email?: string;
  country?: string;
}

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser({
          name: parsedUser.name,
          email: parsedUser.email,
          country: "India",
        });
      } catch {
        setUser(null);
      }
    }
  }, []);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAF7F2]">
        <p className="text-lg">Please login to view your profile.</p>
      </div>
    );
  }

  return (
    <>
      <div className="bg-[#46412B] h-40 w-full flex justify-center items-center px-8">
        <div className="mt-8">
          <h1 className="text-3xl md:text-4xl font-serif text-white ">
          Welcome {user.name}.
        </h1>
        </div>
      </div>
    <div className="min-h-screen bg-[#FAF7F2] pt-20 px-4 sm:px-6 md:px-12 lg:px-24 mx-auto w-full">
      <section className="mb-10 ">
        <h2 className="text-2xl md:text-3xl font-serif text-[#3E402D] mb-6">
          Personal Information
        </h2>
        <div className="text-sm text-[#3E402D]">
          <div className="mt-6">
            <span className="block text-xs uppercase tracking-widest mb-1 text-gray-600">
              Your Name
            </span>
            <span className="text-lg">{user.name}</span>
          </div>
          <div className="mt-6">
            <span className="block text-xs uppercase tracking-widest mb-1 text-gray-600">
              Email Address
            </span>
            <span className="text-lg">{user.email}</span>
          </div>
        </div>
        <hr className="my-6 border-gray-300" />
      </section>
      <section className="mb-10">
        <h2 className="text-2xl md:text-3xl font-serif text-[#3E402D] mb-6">
          Order History
        </h2>
        <div className="bg-[#FAF7F2] text-gray-600 text-center py-3 px-4 border rounded-sm">
          You haven't placed any orders yet.
        </div>
        <hr className="my-6 border-gray-300" />
      </section>
      <section className="mb-10">
        <h2 className="text-2xl md:text-3xl font-serif text-[#3E402D] mb-6">
          Account Details
        </h2>
        <p className="text-lg text-[#3E402D]">{user.country}</p>
        <button
          onClick={() => router.push("/addresses")}
          className="mt-6 bg-[#3E402D] text-white px-6 py-2 font-medium hover:bg-[#5c5f45] transition"
        >
          View Addresses
        </button>
      </section>
    </div>
    </>
  );
}
