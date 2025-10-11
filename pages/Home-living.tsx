"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Heart } from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";
import { useWishlist } from "@/amitkk/context/WishlistContext";
import axios from "axios";

export default function HomeLiving() {
  const [products, setProducts] = useState<any[]>([]);
  const [likedItems, setLikedItems] = useState<{ [key: string]: boolean }>({});
  const { addToWishlist, removeFromWishlist } = useWishlist();

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get("/api/products");
      const allProducts = res.data;

      const filtered = allProducts.filter(
        (item: any) =>
          item.category &&
          item.category.toLowerCase().trim() === "home-living"
      );
      setProducts(filtered);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  };
  const toggleLike = (product: any) => {
    if (likedItems[product._id]) {
      removeFromWishlist(product._id);
    } else {
      addToWishlist({
        id: product._id,
        img: product.img,
        title: product.title,
        price: Number(product.price),
      });
    }

    setLikedItems((prev) => ({
      ...prev,
      [product._id]: !prev[product._id],
    }));
  };
  return (
    <div className="w-[85%] mx-auto py-12 mt-3">
      <h1 className="text-3xl font-bold text-[#3e402d] mb-8 text-center">
        Anmole Metal Craft Products
      </h1>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-2 lg:gap-6 justify-items-center">
        {products.map((product, index) => (
          <div
            key={product._id}
            className="flex flex-col justify-items-center mx-1"
            data-aos="fade-down"
            data-aos-delay={index * 100}
          >
            <Link href={`/product/${product._id}`}>
              <div className="overflow-hidden relative w-36 h-36 sm:w-48 sm:h-48 md:w-72 md:h-72 cursor-pointer text-center">
                <Image
                  src={product.img}
                  alt={product.title}
                  fill
                  className="object-cover rounded-lg"
                />
                <div
                  className="absolute top-2 right-2 p-1 cursor-pointer"
                  onClick={(e) => {
                    e.preventDefault();
                    toggleLike(product);
                  }}
                >
                  {likedItems[product._id] ? (
                    <Heart className="w-6 h-6 fill-white text-white" />
                  ) : (
                    <Heart className="w-6 h-6 text-white" />
                  )}
                </div>
              </div>
            </Link>
            <div className="mt-4 md:px-3 pb-4">
              <h2 className="text-lg font-semibold text-black">{product.title}</h2>
              <p className="text-[#3e402d] font-bold mt-2">₹{product.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
