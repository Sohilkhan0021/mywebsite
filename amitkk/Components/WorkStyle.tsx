"use client";
import Image from "next/image";
import { useState } from "react";
import { Heart } from "lucide-react";
import { useRouter } from "next/router";
import { useWishlist } from "@/amitkk/context/WishlistContext";

export default function WorkInStyle() {
  const router = useRouter();
  const { addToWishlist, removeFromWishlist } = useWishlist();

  const WorktProducts = [
    { id: 401, img: "/images/work-img-1.webp", title: "Exclusive Jaali Wood Desk Caddy", category: "JAALI WOOD", price: "₹ 4,450 INR" },
    { id: 402, img: "/images/work-img-2.webp", title: "Bidri Craft Utility Gift Set Ornate", category: "BIDRI", price: "₹ 6,360 INR" },
    { id: 403, img: "/images/work-img-3.webp", title: "Wooden Jaali Stationery Holder", category: "JAALI WOOD", price: "₹ 3,250 INR" },
    { id: 404, img: "/images/work-img-4.webp", title: "Wooden Jaali Desk Set", category: "JAALI WOOD", price: "₹ 2,650 INR" },
  ];

  const [likedItems, setLikedItems] = useState<{ [key: number]: boolean }>({});

  const toggleLike = (item: { id: number; img: string; title: string; price: string }) => {
    setLikedItems((prev) => ({
      ...prev,
      [item.id]: !prev[item.id],
    }));

    if (likedItems[item.id]) {
      removeFromWishlist(item.id.toString());
    } else {
      addToWishlist({
        id: item.id.toString(),
        img: item.img,
        title: item.title,
        price: item.price,
      });
    }
  };

  return (
    <section className="bg-[#fdf8f4] py-12">
      <div className="w-[85%] mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-10 gap-4">
          <h2 className="text-3xl md:text-5xl font-bold text-[#3e402d] text-center sm:text-left">
            Work in style
          </h2>
          <button
            onClick={() => router.push("/WorkProduct")}
            className="border border-gray-600 text-sm text-black px-4 py-2 cursor-pointer hover:bg-[#313323] hover:text-white transition"
          >
            See All
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {WorktProducts.map((item) => (
            <div
              key={item.id}
              className="bg-white shadow-sm rounded-lg overflow-hidden cursor-pointer"
              onClick={() => router.push(`/product/${item.id}`)} 
            >
              <div className="relative w-full h-64">
                <Image src={item.img} alt={item.title} fill className="object-cover" />
                <div
                  className="absolute top-3 right-3 p-2 cursor-pointer z-10"
                  onClick={(e) => {
                    e.stopPropagation(); 
                    toggleLike(item);
                  }}
                >
                  {likedItems[item.id] ? (
                    <Heart className="w-6 h-6 fill-white text-white" />
                  ) : (
                    <Heart className="w-6 h-6 text-white" />
                  )}
                </div>
              </div>

              <div className="mt-4 px-3 pb-4">
                <p className="text-sm text-gray-500 tracking-wide">{item.category}</p>
                <h3 className="text-lg font-medium text-[#3e402d] mt-2">{item.title}</h3>
                <p className="text-md font-semibold text-[#3e402d] mt-2">{item.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
