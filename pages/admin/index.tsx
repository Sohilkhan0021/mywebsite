import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminDashboard() {
  const router = useRouter();
  const [user, setUser] = useState<{ email: string; role?: string } | null>(null);
  const [stats, setStats] = useState({
    totalSales: 0,
    totalClients: 0,
    totalProducts: 0,
    totalStock: 0,
  });

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

    fetch("/api/admin/dashboardStats")
      .then((res) => res.json())
      .then((data) => {
        setStats(data);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="w-full bg-[#3E402D] text-white py-4 shadow-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 flex justify-between items-center">
          <h1 className="text-xl sm:text-2xl font-bold">Admin Panel</h1>
          {user && (
            <div className="flex items-center gap-4">
              <p className="text-sm sm:text-base">{user.email}</p>
              <button
                className="bg-white text-[#3E402D] px-3 py-1 rounded hover:bg-gray-200 transition cursor-pointer"
                onClick={() => {
                  localStorage.removeItem("user");
                  router.push("/login");
                }}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <div className="p-4 sm:p-6 text-black mt-6 max-w-6xl mx-auto">
        <h1 className="text-2xl sm:text-3xl text-[#3E402D] font-bold mb-6 sm:mb-8 text-center sm:text-left">
          Admin Dashboard
        </h1>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="p-4 border rounded-md text-center bg-white shadow-sm">
            <p className="text-lg font-semibold">Total Sales</p>
            <p className="text-gray-700">₹{stats.totalSales.toLocaleString()}</p>
          </div>
          <div className="p-4 border rounded-md text-center bg-white shadow-sm">
            <p className="text-lg font-semibold">Total Clients</p>
            <p className="text-gray-700">{stats.totalClients.toLocaleString()}</p>
          </div>
          <div className="p-4 border rounded-md text-center bg-white shadow-sm">
            <p className="text-lg font-semibold">Total Products</p>
            <p className="text-gray-700">{stats.totalProducts.toLocaleString()}</p>
          </div>
          <div className="p-4 border rounded-md text-center bg-white shadow-sm">
            <p className="text-lg font-semibold">Stock</p>
            <p className="text-gray-700">{stats.totalStock.toLocaleString()}</p>
          </div>
        </div>

        {/* Buttons Section */}
        <div className="flex flex-wrap gap-3 sm:gap-4 mt-6 justify-center sm:justify-start">
          <button
            className="bg-gray-300 hover:bg-gray-400 px-4 py-2 sm:px-5 sm:py-3 rounded-md cursor-pointer transition w-full sm:w-auto text-center"
            onClick={() => router.push("/admin/products")}
          >
            Products
          </button>
          <button
            className="bg-gray-300 hover:bg-gray-400 px-4 py-2 sm:px-5 sm:py-3 rounded-md cursor-pointer transition w-full sm:w-auto text-center"
            onClick={() => router.push("/admin/clients")}
          >
            Clients
          </button>
          <button
            className="bg-gray-300 hover:bg-gray-400 px-4 py-2 sm:px-5 sm:py-3 rounded-md cursor-pointer transition w-full sm:w-auto text-center"
            onClick={() => router.push("/admin/metalcraft")}
          >
            MetalCraft
          </button>
          <button
            className="bg-gray-300 hover:bg-gray-400 px-4 py-2 sm:px-5 sm:py-3 rounded-md cursor-pointer transition w-full sm:w-auto text-center"
            onClick={() => router.push("/admin/MetalSliderImages")}
          >
            MetalSliderImage
          </button>
          <button
            className="bg-gray-300 hover:bg-gray-400 px-4 py-2 sm:px-5 sm:py-3 rounded-md cursor-pointer transition w-full sm:w-auto text-center"
            onClick={() => router.push("/admin/orderAddresses")}
          >
            orderAddresses
          </button>
          <button
            className="bg-gray-300 hover:bg-gray-400 px-4 py-2 sm:px-5 sm:py-3 rounded-md cursor-pointer transition w-full sm:w-auto text-center"
            onClick={() => router.push("/admin/AllOrders")}
          >
            AllOrders
          </button>
        </div>
      </div>
    </div>
  );
}
