"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Heart } from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";
import { useWishlist } from "@/amitkk/context/WishlistContext";

const WomenProducts = [
  { id: "501", img: "/images/Ear-rings-1.jpg", title: "Decorative Metal Vase", price: 1500 },
  { id: "502", img: "/images/Ear-rings-2.jpg", title: "Handmade Metal Sculpture", price: 2000 },
  { id: "503", img: "/images/Ear-rings-3.jpg", title: "Designer Metal Bowl", price: 18000 },
  { id: "504", img: "/images/Ear-rings-4.jpg", title: "Designer Metal Bowl", price: 1800 },
  { id: "505", img: "/images/Ear-rings-5.jpg", title: "Decorative Metal Vase", price: 1890 },
  { id: "506", img: "/images/Ear-rings-6.jpg", title: "Handmade Metal Sculpture", price: 23456 },
  { id: "507", img: "/images/Ear-rings-7.jpg", title: "Decorative Metal Vase", price:3453 },
  { id: "508", img: "/images/Ear-rings-1.jpg", title: "Handmade Metal Sculpture", price: 34567 },
  { id: "509", img: "/images/Ear-rings-2.jpg", title: "Designer Metal Bowl", price: 6543 },
  { id: "510", img: "/images/Ear-rings-3.jpg", title: "Decorative Metal Vase", price: 7654 },
  { id: "511", img: "/images/Ear-rings-4.jpg", title: "Handmade Metal Sculpture", price: 8765 },
  { id: "512", img: "/images/Ear-rings-5.jpg", title: "Designer Metal Bowl", price: 98765 },
];

export default function WomenCraft() {
  const [likedItems, setLikedItems] = useState<{ [key: string]: boolean }>({});
  const { addToWishlist, removeFromWishlist } = useWishlist();

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  const toggleLike = (product: { id: string; img: string; title: string; price: string }) => {
    setLikedItems((prev) => ({
      ...prev,
      [product.id]: !prev[product.id],
    }));

    if (likedItems[product.id]) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist({
        id: product.id,
        img: product.img,
        title: product.title,
        price: product.price,
      });
    }
  };

  return (
    <div className="w-[85%] mx-auto py-12">
      <h1 className="text-3xl font-bold text-[#3e402d] mb-8 text-center">
        Anmole Women Craft Products
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 justify-items-center">
        {WomenProducts.map((product, index) => (
          <div
            key={product.id}
            className="overflow-hidden relative"
            data-aos="fade-down"
            data-aos-delay={index * 100}
          >
            <Link href={`/product/${product.id}`}>
              <div className="relative w-80 h-100 cursor-pointer">
                <Image
                  src={product.img}
                  alt={product.title}
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
            </Link>
            <div
              className="absolute top-3 right-3 p-2 cursor-pointer"
              onClick={() => toggleLike(product)}
            >
              {likedItems[product.id] ? (
                <Heart className="w-6 h-6 fill-white text-white" />
              ) : (
                <Heart className="w-6 h-6 text-white" />
              )}
            </div>
            <div className="mt-4 px-3 pb-4 text-center">
              <h2 className="text-lg font-semibold text-black">
                {product.title}
              </h2>
              <p className="text-[#3e402d] font-bold mt-2">{product.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
