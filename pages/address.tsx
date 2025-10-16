"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AddressPage() {
  const router = useRouter();
  const [addresses, setAddresses] = useState([]);
  const [form, setForm] = useState<any>({
    name: "", email: "", phone: "", street: "", city: "", state: "", pincode: "", country: "India"
  });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    if (!user.id) {
      alert("Login required");
      router.push("/login");
    } else {
      fetch(`/api/getAddresses?userId=${user.id}`)
        .then(res => res.json()).then(data => setAddresses(data.addresses || []));
    }
  }, [router]);

  function handleFormChange(e: any) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }
  async function handleSubmit(e: any) {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    if (!user.id) return;
    const res = await fetch("/api/saveAddress", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, userId: user.id })
    });
    const data = await res.json();
    if (data.success) {
      setForm({ name: "", email: "", phone: "", street: "", city: "", state: "", pincode: "", country: "India" });
    //   setAddresses((prev: any) => [data.address, ...prev]);
    }
  }

  return (
    <div className="min-h-screen bg-[#FAF7F2] pt-20 px-4 mx-auto w-full max-w-4xl">
      <h2 className="text-2xl md:text-3xl font-serif text-[#3E402D] mb-8">Your Delivery Addresses</h2>
      <form className="space-y-4 mb-8" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input name="name" placeholder="Full Name" value={form.name} onChange={handleFormChange}
            className="border border-gray-300 rounded px-4 py-3 text-black bg-white" required />
          <input name="email" placeholder="Email" value={form.email} onChange={handleFormChange}
            className="border border-gray-300 rounded px-4 py-3 text-black bg-white" required type="email"/>
        </div>
        <input name="phone" placeholder="Phone" value={form.phone} onChange={handleFormChange}
          className="border border-gray-300 rounded px-4 py-3 text-black bg-white" required />
        <input name="street" placeholder="Street Address" value={form.street} onChange={handleFormChange}
          className="border border-gray-300 rounded px-4 py-3 text-black bg-white ml-2" required />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input name="city" placeholder="City" value={form.city} onChange={handleFormChange}
            className="border border-gray-300 rounded px-4 py-3 text-black bg-white" required />
          <input name="state" placeholder="State" value={form.state} onChange={handleFormChange}
            className="border border-gray-300 rounded px-4 py-3 text-black bg-white" required />
          <input name="pincode" placeholder="PIN Code" value={form.pincode} onChange={handleFormChange}
            className="border border-gray-300 rounded px-4 py-3 text-black bg-white" required />
        </div>
        <input name="country" placeholder="Country" value={form.country}
          onChange={handleFormChange}
          className="border border-gray-300 rounded px-4 py-3 text-black bg-white" required />
        <button className="bg-[#3E402D] text-white px-6 py-2 font-medium hover:bg-[#5c5f45] transition w-full">
          Add Address
        </button>
      </form>

      {/* Address List */}
      <div className="space-y-5">
        {addresses.map((addr: any) => (
          <div key={addr._id} className="p-4 bg-white rounded shadow border">
            <div className="font-bold text-black">{addr.name}</div>
            <div className="text-gray-700">{addr.street}, {addr.city}, {addr.state}, {addr.pincode}, {addr.country}</div>
            <div className="text-gray-700">Phone: {addr.phone}</div>
            <div className="text-gray-700">Email: {addr.email}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
