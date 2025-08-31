"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Heart } from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";

const WorktProducts = [
  { id: "401", img: "/images/work-img-1.webp", title: "Decorative Metal Vase", price: "₹1500" },
  { id: "402", img: "/images/metal-product-img.webp", title: "Handmade Metal Sculpture", price: "₹2200" },
  { id: "403", img: "/images/work-img-3.webp", title: "Designer Metal Bowl", price: "₹1800" },
  { id: "404", img: "/images/work-img-3.webp", title: "Designer Metal Bowl", price: "₹1800" },
  { id: "405", img: "/images/work-img-4.webp", title: "Decorative Metal Vase", price: "₹1500" },
  { id: "406", img: "/images/work-img-2.webp", title: "Handmade Metal Sculpture", price: "₹2200" },
  { id: "407", img: "/images/metal-product-img-2.webp", title: "Decorative Metal Vase", price: "₹1500" },
  { id: "408", img: "/images/work-img-1.webp", title: "Handmade Metal Sculpture", price: "₹2200" },
  { id: "409", img: "/images/work-img-3.webp", title: "Designer Metal Bowl", price: "₹1800" },
  { id: "410", img: "/images/work-img-4.webp", title: "Decorative Metal Vase", price: "₹1500" },
  { id: "411", img: "/images/metal-product-img.webp", title: "Handmade Metal Sculpture", price: "₹2200" },
  { id: "412", img: "/images/work-img-1.webp", title: "Designer Metal Bowl", price: "₹1800" },
];

export default function WorkCraft() {
  const [likedItems, setLikedItems] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  const toggleLike = (id: string) => {
    setLikedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };
  const getAosType = (index: number) => {
    const col = index % 3; 
    if (col === 0) return "fade-left";
    if (col === 1) return "fade-down";
    return "fade-right";
  };

  return (
    <div className="w-[85%] mx-auto py-12">
      <h1 className="text-3xl font-bold text-[#3e402d] mb-8 text-center">
        Anmole Best Coice Craft Products
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 justify-items-center">
        {WorktProducts.map((product, index) => (
          <div
            key={product.id}
            className="overflow-hidden relative"
            data-aos={getAosType(index)} 
            data-aos-delay={(index % 3) * 150} 
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
              onClick={() => toggleLike(product.id)}
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
