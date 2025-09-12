"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Heart } from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";
import { useWishlist } from "@/amitkk/context/WishlistContext";

const metalCraftProducts = [
  { id: "301", img: "/images/metal-product-img-2.webp", title: "Decorative Metal Vase", price: "₹1500" },
  { id: "302", img: "/images/metal-product-img.webp", title: "Handmade Metal Sculpture", price: "₹2200" },
  { id: "303", img: "/images/work-img-3.webp", title: "Designer Metal Bowl", price: "₹1800" },
  { id: "304", img: "/images/work-img-3.webp", title: "Designer Metal Bowl", price: "₹1800" },
  { id: "305", img: "/images/metal-product-img-2.webp", title: "Decorative Metal Vase", price: "₹1500" },
  { id: "306", img: "/images/metal-product-img.webp", title: "Handmade Metal Sculpture", price: "₹2200" },
  { id: "307", img: "/images/metal-product-img-2.webp", title: "Decorative Metal Vase", price: "₹1500" },
  { id: "308", img: "/images/metal-product-img.webp", title: "Handmade Metal Sculpture", price: "₹2200" },
  { id: "309", img: "/images/work-img-3.webp", title: "Designer Metal Bowl", price: "₹1800" },
  { id: "310", img: "/images/metal-product-img-2.webp", title: "Decorative Metal Vase", price: "₹1500" },
  { id: "311", img: "/images/metal-product-img.webp", title: "Handmade Metal Sculpture", price: "₹2200" },
  { id: "312", img: "/images/work-img-3.webp", title: "Designer Metal Bowl", price: "₹1800" },
];

export default function MetalCraft() {
  const [likedItems, setLikedItems] = useState<{ [key: string]: boolean }>({});
  const { addToWishlist, removeFromWishlist } = useWishlist();

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  const toggleLike = (product: typeof metalCraftProducts[0]) => {
    if (likedItems[product.id]) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist({
        id: product.id,
        img: product.img,
        title: product.title,
        price: Number(product.price.replace("₹", "")), 
      });
    }

    setLikedItems((prev) => ({
      ...prev,
      [product.id]: !prev[product.id],
    }));
  };

  return (
    <div className="w-[85%] mx-auto py-12">
      <h1 className="text-3xl font-bold text-[#3e402d] mb-8 text-center">
        Anmole Metal Craft Products
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 justify-items-center">
        {metalCraftProducts.map((product, index) => (
          <div
            key={product.id}
            className="overflow-hidden relative"
            data-aos="fade-down"
            data-aos-delay={index * 100}
          >
            <Link href={`/product/${product.id}`}>
              <div className="relative w-80 h-80 cursor-pointer">
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
