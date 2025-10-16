"use client";
import { useEffect, useState } from "react";
import { Search } from "lucide-react";

export default function AdminClients() {
  const [user, setUser] = useState<{ email: string; role?: string } | null>(null);
  const [clients, setClients] = useState<any[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
    loadClients();
  }, []);

  async function loadClients() {
  try {
    const res = await fetch("/api/admin/clients");
    const data = await res.json();
    setClients(data);
  } catch (err) {
    console.error("Failed to load clients", err);
  }
}


  const filteredClients = clients.filter(
    (c) =>
      c.firstName?.toLowerCase().includes(search.toLowerCase()) ||
      c.lastName?.toLowerCase().includes(search.toLowerCase()) ||
      c.email?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 mt-12 text-black bg-white min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-[#F9F2EA] p-6 rounded-xl shadow">
          <h2 className="flex items-center gap-2"> Total Clients</h2>
          <p className="text-3xl font-bold">{clients.length}</p>
        </div>
        <div className="bg-[#F9F2EA] p-6 rounded-xl shadow">
          <h2 className="flex items-center gap-2"> New Clients</h2>
          <p className="text-3xl font-bold">{clients.slice(-10).length}</p>
        </div>
        <div className="bg-[#F9F2EA] p-6 rounded-xl shadow">
          <h2 className="flex items-center gap-2"> Active Users</h2>
          <p className="text-3xl font-bold">{Math.floor(clients.length / 2)}</p>
        </div>
        <div className="bg-[#F9F2EA] p-6 rounded-xl shadow">
          <h2 className="flex items-center gap-2"> Returning Clients</h2>
          <p className="text-3xl font-bold">{Math.floor(clients.length / 3)}</p>
        </div>
      </div>

      <div className="bg-[#F9F2EA] p-6 rounded-xl shadow overflow-x-auto">
        <div className="flex flex-col sm:flex-row items-center justify-between mb-4 gap-4">
          <h2 className="text-xl font-bold">Clients</h2>
          <div className="flex items-center bg-gray-800 px-3 rounded w-full sm:w-auto">
            <Search className="text-gray-400 w-4 h-4 mr-2" />
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-transparent outline-none text-white w-full sm:w-auto"
            />
          </div>
        </div>

        <table className="min-w-full border-collapse border border-gray-700 table-auto">
          <thead className="bg-[#F9F2EA] text-left">
            <tr>
              <th className="px-4 py-2">NAME</th>
              <th className="px-4 py-2">EMAIL</th>
              <th className="px-4 py-2">PHONE NUMBERS</th>
              <th className="px-4 py-2">COUNTRY</th>
              <th className="px-4 py-2">ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {filteredClients.length > 0 ? (
              filteredClients.map((c) => (
                <tr
                  key={c._id}
                  className="border-t border-gray-700 hover:bg-gray-800"
                >
                  <td className="px-4 py-2">
                    {c.firstName} {c.lastName}
                  </td>
                  <td className="px-4 py-2">{c.email}</td>
                  <td className="px-4 py-2">{c.phone || "—"}</td>
                  <td className="px-4 py-2">{c.country || "—"}</td>
                  <td className="px-4 py-2">
                    <button className="text-blue-400 hover:underline mr-2">
                      View
                    </button>
                    <button className="text-red-400 hover:underline">Delete</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={5}
                  className="px-4 py-6 text-center text-gray-400"
                >
                  No clients found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
