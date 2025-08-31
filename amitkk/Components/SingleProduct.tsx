"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import AOS from "aos";
import "aos/dist/aos.css";
import { Heart } from "lucide-react";
import { useWishlist } from "@/amitkk/context/WishlistContext";

const singleProduct = [
  {
    id: "201",
    img: "/images/hand-bag.png",
    title: "Handmade Decorative Item",
    subtitle: "Medium size craft piece",
    category: "Decor",
    price: "$250",
  },
];

export default function ProductDetails() {
  const [liked, setLiked] = useState(false);
  const { addToWishlist, removeFromWishlist } = useWishlist();

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
    });
  }, []);

  const item = singleProduct[0];

  const toggleWishlist = () => {
    if (liked) {
      removeFromWishlist(item.id);
    } else {
      addToWishlist({
        id: item.id,
        img: item.img,
        title: item.title,
        price: Number(item.price.replace("$", "")), 
      });
    }
    setLiked((prev) => !prev);
  };

  return (
    <section className="bg-[#fdf8f4] py-12">
      <div className="w-[85%] mx-auto flex flex-col md:flex-row items-center gap-8">
        
        <div className="flex-1 flex justify-center relative" data-aos="fade-right">
          <img
            src={item.img}
            alt={item.title}
            className="w-full h-150 max-w-md rounded-lg shadow-lg"
          />
          <div
            className="absolute top-2 right-23 p-2 cursor-pointer"
            onClick={toggleWishlist}
          >
            {liked ? (
              <Heart className="w-6 h-6 text-white fill-white" />
            ) : (
              <Heart className="w-6 h-6 text-white" />
            )}
          </div>
        </div>

        <div className="flex-1 text-left space-y-6" data-aos="fade-left">
          <h1 className="text-3xl font-bold text-gray-800">{item.title}</h1>
          <p className="text-gray-600 leading-relaxed">{item.subtitle}</p>
          <div className="text-2xl font-semibold text-[#3e402d]">{item.price}</div>

          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>Material: Eco-friendly Jute</li>
            <li>Size: Medium (12in x 8in)</li>
            <li>Category: {item.category}</li>
            <li>Available Colors: Brown, Black, Cream</li>
          </ul>

          <Link href={`/product/${item.id}`}>
            <button className="bg-[#3e402d] text-white px-6 py-3 font-semibold cursor-pointer shadow hover:bg-[#4b4d36] transition">
              Buy Now
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
