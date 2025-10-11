"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminDashboard() {
  const router = useRouter();
  const [user, setUser] = useState<{ email: string; role?: string } | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      if (parsedUser.role !== "admin") {
        alert("You are not an admin. Only viewing allowed.");
      }
    } else {
      router.push("/login");
    }
  }, []);

  return (
    <div className="p-6 text-black mt-12">
      <h1 className="text-3xl text-[#3E402D] font-bold mb-8">Admin Dashboard</h1>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        <div className="p-4 border">Total Sales: $182,450</div>
        <div className="p-4 border">Total Clients: 1,437</div>
        <div className="p-4 border">Total Products: 674</div>
        <div className="p-4 border">Stock: 12,845</div>
      </div>
      <div className="flex gap-4 mt-6">
        <button className="bg-gray-300 p-4 rounded cursor-pointer"  onClick={() => router.push("/admin/products")}>Products</button>
        <button  className="bg-gray-300 p-4 rounded cursor-pointer"onClick={() => router.push("/admin/clients")}>Clients</button>
        <button  className="bg-gray-300 p-4 rounded cursor-pointer"onClick={() => router.push("/admin/metalcraft")}>MetalCraft</button>
        <button  className="bg-gray-300 p-4 rounded cursor-pointer"onClick={() => router.push("admin/MetalSliderImages")}>MetalSliderImage</button>
      </div>
    </div>  
  );
}
