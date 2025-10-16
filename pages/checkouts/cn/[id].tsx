"use client";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useCart } from "@/amitkk/context/CartContext";
import AddressForm from "../../../amitkk/Components/addressForm";
import Image from "next/image";
import toast from "react-hot-toast";

export default function CheckoutPage() {
  const router = useRouter();
  const { cart } = useCart();

  const [userAddress, setUserAddress] = useState<any>(null);
  const [loadingAddress, setLoadingAddress] = useState(true);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const id = user.id;

    const fetchAddress = async () => {
      try {
        if (!id) return;
        const res = await fetch(`/api/getAddresses?id=${id}`);
        const data = await res.json();
        if (data.success && data.user?.address) {
          setUserAddress(data.user.address);
          setOpen(false);
        } else {
          setOpen(true);
        }
      } catch (err) {
        console.error("Error fetching address:", err);
      } finally {
        setLoadingAddress(false);
      }
    };

    fetchAddress();
  }, []);

  // const subtotal = cart.reduce((sum, item) => {
  //   const price = Number(item.price) || 0;
  //   return Number(item.stock) > 0 ? sum + price : sum;
  // }, 0);

  const inStockItems = cart.filter((item) => Number(item.stock) > 0);
  const subtotal = inStockItems.reduce((sum, item) => sum + Number(item.price), 0);

  return (
    <div className="min-h-screen bg-[#EAE2D8] py-10 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="p-6 md:p-8 rounded-lg">
          <h2 className="text-3xl md:text-4xl text-black font-semibold mb-6">
            Address
          </h2>

          {open ? (
            <AddressForm setOpen={setOpen} setUserAddress={setUserAddress} />
          ) : (
            <div className="relative border rounded text-lg font-semibold mb-4 text-black w-full max-w-md min-h-28 p-4 bg-white">
              <button
                className="absolute top-2 right-2 border border-gray-400 text-sm px-3 py-1 rounded cursor-pointer hover:bg-gray-100"
                onClick={() => setOpen(true)}
              >
                Edit
              </button>
              {loadingAddress ? (
                <p>Loading address...</p>
              ) : userAddress ? (
                <div className="text-gray-700 text-sm mt-2 leading-relaxed">
                  <p>
                    {userAddress.firstName} {userAddress.lastName}
                  </p>
                  <p>
                    {userAddress.address}, {userAddress.apartment}
                  </p>
                  <p>
                    {userAddress.city}, {userAddress.state} - {userAddress.pincode}
                  </p>
                  <p>{userAddress.country}</p>
                  <p>Phone: {userAddress.phone}</p>
                </div>
              ) : (
                <p className="text-gray-500 text-sm">No address saved yet.</p>
              )}
            </div>
          )}

          {/* <AddressForm setOpen={setOpen} setUserAddress={setUserAddress} /> */}

          <div className="p-4 mt-6 bg-white rounded-lg border border-gray-200">
            <h2 className="text-lg font-semibold mb-4 text-black">Billing Address</h2>
            <div className="flex flex-col gap-2">
              <label className="flex items-center gap-2 text-black">
                <input type="radio" name="paymentMethod" value="COD" defaultChecked />
                <span>Cash on Delivery (COD)</span>
              </label>
              <label className="flex items-center gap-2 text-black">
                <input type="radio" name="paymentMethod" value="Online" />
                <span>Pay Online</span>
              </label>
            </div>
          </div>

          <button
            onClick={async () => {
              try {
                const user = JSON.parse(localStorage.getItem("user") || "{}");
                const userId = user.id;

                if (!userId) {
                  toast.error("User not logged in");
                  return;
                }

                if (!userAddress) {
                  toast.error("Please add a delivery address first.");
                  return;
                }

                // const items = cart.map((item) => ({
                //   productId: item.id,
                //   quantity: 1,
                // }));

                const items = inStockItems.map((item) => ({
                  productId: item.id,
                  quantity: 1,
                }));


                const totalAmount = subtotal;
                const paymentMethod = "COD";
                console.log("sohil11", userId,userAddress,totalAmount,paymentMethod, items);

                const res = await fetch("/api/orders", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({ userId, items, totalAmount, paymentMethod }),
                });

                const data = await res.json();

                if (data.success) {
                  toast.success("Order placed successfully ");
                  router.push("/myorders");
                } else {
                  toast.error("Failed to place order.");
                }
              } catch (err) {
                console.error("Error:", err);
                toast.error("Something went wrong.");
              }
            }}
            className="text-2xl text-white mt-8 py-4 text-center border border-black bg-[#4E5036] cursor-pointer hover:bg-[#63654f] w-full"
          >
            Pay now
          </button>
        </div>

        <div className="bg-white p-6 md:p-8 rounded-lg h-fit sticky top-10 mt-10">
          <h2 className="text-2xl font-semibold mb-6 text-black">Order Summary</h2>
          <div className="space-y-4">
            {cart.length > 0 ? (
              cart.map((item, index) => {
                const stock = Number(item.stock || 0);
                return (
                  <div key={item.id} className="flex items-center justify-between border-b pb-4">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 relative rounded overflow-hidden">
                        <Image src={item.img as string} alt={item.title} fill className="object-cover" />
                      </div>
                      <div>
                        <p className="font-medium text-black">{item.title}</p>
                        <p className="text-sm text-gray-500">
                          {stock > 0 ? "In Stock" : "Out of Stock"}
                        </p>
                      </div>
                    </div>
                    <p className={`font-semibold ${stock > 0 ? "text-black" : "text-red-500 line-through"}`}>
                      ₹{item.price}
                    </p>
                  </div>
                );
              })
            ) : (
              <p className="text-gray-600 text-black">Your cart is empty</p>
            )}
          </div>
          <div className="mt-6">
            <input
              type="text"
              placeholder="Discount code or gift card"
              className="w-full border border-gray-300 rounded px-4 py-3 mb-4 text-black"
            />
            <button className="w-full bg-[#4E5036] py-3 rounded hover:bg-[#63654f] text-white cursor-pointer">
              Apply
            </button>
          </div>
          <div className="mt-6 space-y-2 text-gray-700">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>₹{subtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span className="text-gray-500">Enter shipping address</span>
            </div>
            <div className="flex justify-between font-bold text-lg border-t pt-4">
              <span>Total</span>
              <span>INR ₹{subtotal.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}














