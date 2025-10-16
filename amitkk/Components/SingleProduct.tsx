"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import AOS from "aos";
import "aos/dist/aos.css";
import { Heart } from "lucide-react";
import { useWishlist } from "@/amitkk/context/WishlistContext";

interface Product {
  _id: string;
  img: string;
  title: string;
  subtitle?: string;
  category: string;
  price: number;
}

export default function ProductDetails() {
  const [liked, setLiked] = useState(false);
  const [product, setProduct] = useState<Product | null>(null);
  const { addToWishlist, removeFromWishlist } = useWishlist();

  useEffect(() => {
    AOS.init({
      duration: 1200,
      once: true,
      easing: "ease-in-out",
      mirror: false,
    });
  }, []);
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch("/api/products");
        const data = await res.json();

        const products = Array.isArray(data) ? data : data.products || [data];

        const singleProductList = products.filter(
          (p: any) => p.category?.toLowerCase() === "single product"
        );

        const latest = singleProductList[singleProductList.length - 1];

        if (latest) {
          setProduct({
            _id: latest._id,
            img:
              typeof latest.img === "string"
                ? latest.img
                : latest.img?.url || "/images/hand-bag.png",
            title: latest.title || "Handmade Decorative Item",
            subtitle: latest.subtitle || "Medium size craft piece",
            category: latest.category || "Decor",
            price: Number(latest.price) || 0,
          });
        }
      } catch (error) {
        console.error("Error fetching Single Product:", error);
      }
    };

    fetchProduct();
  }, []);

  const toggleWishlist = () => {
    if (!product) return;

    if (liked) {
      removeFromWishlist(product._id);
    } else {
      addToWishlist({
        id: product._id,
        img: product.img,
        title: product.title,
        price: product.price,
      });
    }
    setLiked((prev) => !prev);
  };

  if (!product) return null; 

  return (
    <section className="bg-[#fdf8f4] py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-12 grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        <div
          className="flex justify-start md:justify-start relative order-1 lg:order-2"
          data-aos="fade-right"
        >
          <img
            src={product.img}
            alt={product.title}
            className="w-full max-w-sm md:max-w-md h-[40vh] md:h-[350px] lg:h-[400px] object-cover rounded-lg shadow-lg"
          />
          <div
            className="absolute top-2 right-2 md:right-6 lg:right-20 z-10 cursor-pointer"
            onClick={toggleWishlist}
          >
            {liked ? (
              <Heart className="w-6 h-6 text-white fill-white" />
            ) : (
              <Heart className="w-6 h-6 text-white" />
            )}
          </div>
        </div>

        <div
          className="space-y-4 sm:space-y-6 order-2 lg:order-1"
          data-aos="fade-left"
        >
          <h1 className="text-2xl sm:text-3xl md:text-3xl font-bold text-gray-800">
            {product.title}
          </h1>
          <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
            {product.subtitle}
          </p>
          <div className="text-xl sm:text-2xl font-semibold text-[#3e402d]">
            ₹ {product.price}
          </div>

          <ul className="list-disc list-inside text-gray-700 text-sm sm:text-base space-y-1 sm:space-y-2">
            <li>Material: Eco-friendly Jute</li>
            <li>Size: Medium (12in x 8in)</li>
            <li>Category: {product.category}</li>
            <li>Available Colors: Brown, Black, Cream</li>
          </ul>

          <Link href={`/product/${product._id}`}>
            <button className="bg-[#3e402d] text-white px-5 sm:px-6 py-2 sm:py-3 font-semibold cursor-pointer shadow hover:bg-[#4b4d36] transition">
              Buy Now
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
