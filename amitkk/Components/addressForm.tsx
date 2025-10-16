"use client";
import { useState } from "react";
import Image from "next/image";
import toast from "react-hot-toast";

interface AddressFormProps {
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  setUserAddress?: React.Dispatch<React.SetStateAction<any>>;
}

export default function CheckoutForm({ setOpen, setUserAddress }: AddressFormProps) {
  const [formData, setFormData] = useState({
    country: "India",
    firstName: "",
    lastName: "",
    address: "",
    apartment: "",
    city: "",
    state: "Rajasthan",
    pincode: "",
    phone: "",
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

 async function handleSave() {
 const user = JSON.parse(localStorage.getItem("user") || "{}");
  const id = user.id;
  if (!id) {
    alert("User id not found.");
    return;
  }
  console.log(id);
  const { firstName, lastName, address, city, pincode, phone } = formData;
  if (!firstName || !lastName || !address || !city || !pincode || !phone) {
    alert("Please fill in all required fields.");
    return;
  }

  try {
    const res = await fetch(`/api/saveAddress?id=${id}`, { 
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await res.json();
    console.log("API Response:", data);


    if (data.success) {
     toast.success("Address saved successfully!");

      setUserAddress?.(formData);
      setOpen?.(false);
    } else {
        toast.error("failed to save address");
      
    }
  } catch (error) {
    console.error("Failed to save address:", error);
    alert("Error saving address.");
  }
}

  return (
    <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
      <h2 className="text-2xl font-semibold text-black">Delivery</h2>
      <select
        className="w-full border border-gray-300 rounded px-4 py-3 text-black bg-white"
        name="country"
        value={formData.country}
        onChange={handleChange}
      >
        <option>India</option>
      </select>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input
          type="text"
          name="firstName"
          placeholder="First name"
          className="border border-gray-300 rounded px-4 py-3 text-black bg-white"
          value={formData.firstName}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="lastName"
          placeholder="Last name"
          className="border border-gray-300 rounded px-4 py-3 text-black bg-white"
          value={formData.lastName}
          onChange={handleChange}
          required

        />
      </div>

      <input
        type="text"
        name="address"
        placeholder="Address"
        className="w-full border border-gray-300 rounded px-4 py-3 text-black bg-white"
        value={formData.address}
        onChange={handleChange}
      />
      <input
        type="text"
        name="apartment"
        placeholder="Apartment, suite, etc. (optional)"
        className="w-full border border-gray-300 rounded px-4 py-3 text-black bg-white"
        value={formData.apartment}
        onChange={handleChange}
      />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <input
          type="text"
          name="city"
          placeholder="City"
          className="border border-gray-300 rounded px-4 py-3 text-black bg-white"
          value={formData.city}
          onChange={handleChange}
        />
        <select
          className="border border-gray-300 rounded px-4 py-3 text-black bg-white"
          name="state"
          value={formData.state}
          onChange={handleChange}
        >
          <option>Rajasthan</option>
        </select>
        <input
          type="text"
          name="pincode"
          placeholder="PIN code"
          className="border border-gray-300 rounded px-4 py-3 text-black bg-white"
          value={formData.pincode}
          onChange={handleChange}
        />
      </div>

      <input
        type="text"
        name="phone"
        placeholder="Phone"
        className="w-full border border-gray-300 rounded px-4 py-3 text-black bg-white"
        value={formData.phone}
        onChange={handleChange}
      />

      <button
        onClick={handleSave}
        className="bg-[#3E402D] text-white px-6 py-2 rounded hover:bg-[#5c6048] transition"
        type="submit"
      >
        Save
      </button>    
      <h2 className="text-3xl text-black mt-8">Payment</h2>
      <h3 className="text-sm text-black">
        All transactions are secure and encrypted
      </h3>

      <div className="rounded-md p-4 bg-white mt-6 border border-black">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="font-medium text-black text-center sm:text-left">
            Razorpay Secure (UPI, Cards, Wallets)
          </span>
          <div className="flex items-center space-x-2">
            <Image src="/images/visa-card.png" alt="UPI" width={40} height={20} />
            <Image src="/images/visa-card.png" alt="Visa" width={40} height={20} />
            <Image src="/images/visa-card.png" alt="Mastercard" width={40} height={20} />
            <Image src="/images/visa-card.png" alt="RuPay" width={40} height={20} />
          </div>
        </div>
        <div className="border-t border-gray-300 my-4"></div>
        <div className="mt-6 flex flex-col items-center gap-4">
          <div className="w-40 h-40 relative">
            <Image
              src="/images/payment-img.png"
              alt="Payment Redirect"
              fill
              className="object-contain"
            />
          </div>
          <p className="text-sm text-gray-700 text-center max-w-md">
            After clicking <span className="font-semibold">“Pay now”</span>, you will be redirected to <br />
            <span className="font-semibold">Razorpay Secure</span> (UPI, Cards, Wallets, NetBanking) to<br />
            complete your purchase securely.
          </p>
        </div>
      </div>
    </form>
  );
}
