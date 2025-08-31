"use client";

import { useWishlist } from "@/amitkk/context/WishlistContext";
import { X } from "lucide-react";
import { useRouter } from "next/router";

export default function WishlistPage() {
  const { wishlist, removeFromWishlist, clearWishlist } = useWishlist();
  const router = useRouter();

  return (
    <section className="bg-[#fdf8f4] min-h-screen py-12 px-4 md:px-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-[#2e2f1e]">
            My Wishlist
          </h1>
          <div className="flex flex-wrap gap-3">
            <button className="bg-[#3e402d] text-base md:text-xl text-white px-5 md:px-8 py-2 md:py-3">
              Share
            </button>
            <button
              onClick={clearWishlist}
              className="border border-[#3e402d] text-[#3e402d] text-base md:text-xl px-5 md:px-8 py-2 md:py-3 hover:bg-[#3e402d] hover:text-white"
            >
              Clear All
            </button>
          </div>
        </div>

        <p className="mb-8 text-gray-700 text-sm md:text-base">
          Please{" "}
          <span className="underline cursor-pointer">login</span> to save this
          Wishlist
        </p>
        {wishlist.length === 0 ? (
          <p className="text-center text-lg md:text-xl mt-12 text-black">
            Your wishlist is empty
          </p>
        ) : (
          <div className="space-y-6">
            {wishlist.map((item) => (
              <div
                key={item.id}
                className="border-b pb-6 space-y-2"
              >
                <div className="flex items-center justify-between gap-4">
                  <img
                    src={item.img}
                    alt={item.title}
                    className="w-20 h-20 object-cover rounded cursor-pointer"
                    onClick={() => router.push(`/product/${item.id}`)}
                  />
                  <div className="text-base md:text-lg font-semibold text-[#3e402d] flex-1 text-right">
                    ₹{item.price.toLocaleString("en-IN")}
                  </div>
                  <button
                    onClick={() => removeFromWishlist(item.id)}
                    className="text-gray-600 hover:text-red-500 cursor-pointer"
                  >
                    <X className="w-5 h-5 md:w-6 md:h-6" />
                  </button>
                </div>
                <h3 className="font-medium text-base md:text-lg text-[#3e402d] mt-2">
                  {item.title}
                </h3>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
