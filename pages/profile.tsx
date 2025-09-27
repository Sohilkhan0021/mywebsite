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
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg">Please login to view your profile.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF7F2] pt-24 px-4 sm:px-6 md:px-12 lg:px-24">
        <div className="bg-[#46412B]">
            <h1 className="text-3xl md:text-4xl font-serif text-white mb-8">
                Welcome {user.name}.
            </h1>
        </div>

    
      <section className="mb-8">
        <h2 className="text-xl text-[#3E402D] font-semibold mb-4">Personal Information</h2>
        <div className="text-sm text-[#3E402D] space-y-2">
          <div className="mt-8">
            <span className="block text-xs tracking-widest mb-1">YOUR NAME</span>
            <span className="text-xl font-semibold">{user.name}</span>
          </div>
          <div className="mt-8">
            <span className="block text-xs tracking-widest mb-1">EMAIL ADDRESS</span>
            <span className="text-xl font-semibold">{user.email}</span>
          </div>
        </div>
        <hr className="my-6 border-gray-300" />
      </section>

   
      <section className="mb-8">
        <h2 className="text-xl text-[#3E402D] font-semibold mb-4">Order History</h2>
        <div className="bg-[#FAF7F2] text-gray-600 text-center py-2 px-4 rounded">
          You haven't placed any orders yet.
        </div>
        <hr className="my-6 border-gray-300" />
      </section>
      <section className="mb-8">
        <h2 className="text-xl text-[#3E402D] font-semibold mb-4">Account Details</h2>
        <p className="text-[#3E402D]">{user.country}</p>
        <button
          onClick={() => router.push("/addresses")}
          className="mt-4 bg-[#3E402D] text-white px-4 py-2 rounded hover:bg-[#63654f]"
        >
          View Addresses 1
        </button>
      </section>
    </div>
  );
}
