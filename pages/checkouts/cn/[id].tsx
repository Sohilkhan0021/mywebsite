"use client";
import { useRouter } from "next/router";
import { useState } from "react";
import { useCart } from "@/amitkk/context/CartContext";
import Image from "next/image";

export default function CheckoutPage() {
  const router = useRouter();
  const { id } = router.query;
  const { cart } = useCart();
  const [billingOption, setBillingOption] = useState("same");

  if (!id) {
    return <p className="text-center mt-20">Loading checkout...</p>;
  }

  const subtotal = cart.reduce((sum, item) => sum + (item.price || 0), 0);

  return (
    <div className="min-h-screen bg-[#EAE2D8] py-10 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="p-6 md:p-8 rounded-lg">
          <h2 className="text-3xl md:text-4xl text-black font-semibold mb-6">Contact</h2>
          <form className="space-y-6">
            <div>
              <input
                type="email"
                placeholder="Email"
                className="w-full px-4 py-3 bg-white text-black rounded border border-gray-300"
              />
              <label className="flex items-center gap-2 mt-2 text-sm text-gray-600">
                <input type="checkbox" defaultChecked />
                Email me with news and offers
              </label>
            </div>
            <h2 className="text-2xl font-semibold text-black">Delivery</h2>
            <select className="w-full border border-gray-300 rounded px-4 py-3 text-black bg-white">
              <option>India</option>
            </select>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input type="text" placeholder="First name" className="border border-gray-300 rounded px-4 py-3 text-black bg-white" />
              <input type="text" placeholder="Last name" className="border border-gray-300 rounded px-4 py-3 text-black bg-white" />
            </div>

            <input type="text" placeholder="Company (optional)" className="w-full border border-gray-300 rounded px-4 py-3 text-black bg-white" />
            <input type="text" placeholder="Address" className="w-full border border-gray-300 rounded px-4 py-3 text-black bg-white" />
            <input type="text" placeholder="Apartment, suite, etc. (optional)" className="w-full border border-gray-300 rounded px-4 py-3 text-black bg-white" />

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <input type="text" placeholder="City" className="border border-gray-300 rounded px-4 py-3 text-black bg-white" />
              <select className="border border-gray-300 rounded px-4 py-3 text-black bg-white">
                <option>Rajasthan</option>
              </select>
              <input type="text" placeholder="PIN code" className="border border-gray-300 rounded px-4 py-3 text-black bg-white" />
            </div>

            <input type="text" placeholder="Phone" className="w-full border border-gray-300 rounded px-4 py-3 text-black bg-white" />

            <label className="flex items-center gap-2 text-sm text-gray-600">
              <input type="checkbox" /> Save this information for next time
            </label>

            {/* Payment */}
            <h2 className="text-3xl text-black mt-8">Payment</h2>
            <h3 className="text-sm text-black">All transactions are secure and encrypted</h3>

            <div className="rounded-md p-4 bg-white mt-6 border border-black">
              {/* Heading */}
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

              {/* Divider */}
              <div className="border-t border-gray-300 my-4"></div>

              {/* Illustration */}
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
                  After clicking <span className="font-semibold">“Pay now”</span>, you will be redirected to <br/>{" "}
                  <span className="font-semibold">Razorpay Secure</span> (UPI, Cards, Wallets, NetBanking) to<br/>
                  complete your purchase securely.
                </p>
              </div>
            </div>
          </form>
          <div className="p-4 mt-6 bg-white rounded-lg border border-gray-200">
            <h2 className="text-lg font-semibold mb-4 text-black">Billing Address</h2>
            <div className="flex flex-col gap-2">
              <label className="flex items-center gap-2 text-black">
                <input
                  type="radio"
                  name="billing"
                  value="same"
                  checked={billingOption === "same"}
                  onChange={(e) => setBillingOption(e.target.value)}
                  className="w-4 h-4"
                />
                <span>Same as shipping address</span>
              </label>
              <label className="flex items-center gap-2 text-black">
                <input
                  type="radio"
                  name="billing"
                  value="different"
                  checked={billingOption === "different"}
                  onChange={(e) => setBillingOption(e.target.value)}
                  className="w-4 h-4"
                />
                <span>Use a different billing address</span>
              </label>
            </div>

            {billingOption === "different" && (
              <form className="mt-4 grid grid-cols-1 gap-3">
                <input type="text" placeholder="Full Name" className="border border-gray-300 p-2 rounded-md text-black bg-white" />
                <input type="text" placeholder="Street Address" className="border border-gray-300 p-2 rounded-md bg-white text-black" />
                <input type="text" placeholder="City" className="border border-gray-300 p-2 rounded-md bg-white text-black" />
                <div className="flex flex-col sm:flex-row gap-3">
                  <input type="text" placeholder="State" className="flex-1 border border-gray-300 p-2 rounded-md bg-white text-black" />
                  <input type="text" placeholder="Zip Code" className="flex-1 border border-gray-300 p-2 rounded-md bg-white text-black" />
                </div>
                <input type="text" placeholder="Country" className="border border-gray-300 p-2 rounded-md bg-white text-black" />
              </form>
            )}
          </div>
          <div className="text-2xl text-white mt-8 py-4 text-center border border-black bg-[#4E5036] cursor-pointer hover:bg-[#63654f]">Pay now</div>
        </div>
        <div className="bg-white p-6 md:p-8 rounded-lg h-fit sticky top-10 mb-12">
          <h2 className="text-2xl font-semibold mb-6 text-black">Order Summary</h2>
          <div className="space-y-4">
            {cart.length > 0 ? (
              cart.map((item, index) => (
                <div key={index} className="flex items-center justify-between border-b pb-4">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 relative rounded overflow-hidden">
                      <Image src={item.img} alt={item.title} fill className="object-cover" />
                    </div>
                    <div>
                      <p className="font-medium text-black">{item.title}</p>
                      <p className="text-sm text-gray-500">Qty: 1</p>
                    </div>
                  </div>
                  <p className="font-semibold text-black">₹{item.price}</p>
                </div>
              ))
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
