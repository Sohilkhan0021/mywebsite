"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Heart } from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";
import { useWishlist } from "@/amitkk/context/WishlistContext";

const homelivingProducts = [
  { id: "701", img: "/images/frame-1.webp", title: "Decorative Metal Vase", price: "₹1500" },
  { id: "702", img: "/images/frame-3.jpg", title: "Handmade Metal Sculpture", price: "₹2200" },
  { id: "703", img: "/images/frame-4.jpg", title: "Designer Metal Bowl", price: "₹1800" },
  { id: "704", img: "/images/frame-3.jpg", title: "Designer Metal Bowl", price: "₹1800" },
  { id: "705", img: "/images/frame-1.webp", title: "Decorative Metal Vase", price: "₹1500" },
  { id: "706", img: "/images/frame-4.jpg", title: "Handmade Metal Sculpture", price: "₹2200" },
  { id: "707", img: "/images/frame-1.webp", title: "Decorative Metal Vase", price: "₹1500" },
  { id: "708", img: "/images/frame-3.jpg", title: "Handmade Metal Sculpture", price: "₹2200" },
  { id: "709", img: "/images/frame-4.jpg", title: "Designer Metal Bowl", price: "₹1800" },
  { id: "710", img: "/images/frame-3.jpg", title: "Decorative Metal Vase", price: "₹1500" },
  { id: "711", img: "/images/frame-1.webp", title: "Handmade Metal Sculpture", price: "₹2200" },
  { id: "712", img: "/images/frame-4.jpg", title: "Designer Metal Bowl", price: "₹1800" },
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

  const toggleLike = (product: typeof homelivingProducts[0]) => {
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
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-2 lg:gap-6 justify-items-center">
        {homelivingProducts.map((product, index) => (
          <div
            key={product.id}
            className="flex flex-col justify-items-center mx-1"
            data-aos="fade-down"
            data-aos-delay={index * 100}
          >
            <Link href={`/product/${product.id}`}>
              <div className="overflow-hidden relative w-36 h-36 sm:w-48 sm:h-48 md:w-72 md:h-72 cursor-pointer text-center">
                <Image
                  src={product.img}
                  alt={product.title}
                  fill
                  className="object-cover rounded-lg"
                />
                {/* Heart inside image container */}
                <div
                  className="absolute top-2 right-2 p-1 cursor-pointer"
                  onClick={(e) => {
                    e.preventDefault(); // prevent link trigger
                    toggleLike(product);
                  }}
                >
                  {likedItems[product.id] ? (
                    <Heart className="w-6 h-6 fill-white text-white" />
                  ) : (
                    <Heart className="w-6 h-6 text-white" />
                  )}
                </div>
              </div>
            </Link>

            <div className="mt-4 md:px-3 pb-4 ">
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
