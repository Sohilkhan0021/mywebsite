"use client";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Heart } from "lucide-react";
import Category from "@/amitkk/Components/Category";
import Slider from "@/amitkk/Components/Slider";
import SingleProduct from "@/amitkk/Components/SingleProduct";
import MetalProduct from "@/amitkk/Components/MetalProduct";
import CraftSection from "@/amitkk/Components/CraftSection";
import WorkStyle from "@/amitkk/Components/WorkStyle";
import PopularProduct from "@/amitkk/Components/PopularProduct";
import UserForm from "@/amitkk/Components/Explor";
import Raisin from "@/amitkk/Components/Raisin";

import { useWishlist } from "@/amitkk/context/WishlistContext";

export default function HomePage() {
  const [products, setProducts] = useState<any[]>([]);
  const [liked, setLiked] = useState<{ [key: string]: boolean }>({});
  const { addToWishlist } = useWishlist();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/products");
        const data = await res.json();

        const allProducts = Array.isArray(data) ? data : data.products || [];
        const indexProducts = allProducts.filter(
          (p: { category: string }) => p.category?.toLowerCase() === "index"
        );
        setProducts(indexProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  const toggleLike = (product: any) => {
    if (!liked[product._id]) {
      addToWishlist({
        id: product._id,
        img: product.imageUrl || "/images/default.jpg",
        title: product.title,
        price: product.price,
      });
    }
    setLiked((prev) => ({ ...prev, [product._id]: !prev[product._id] }));
  };

  return (
    <>
      <section className="w-full mt-12">
        <Swiper
          modules={[Pagination, Autoplay]}
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          loop
          className="h-[40vh] sm:h-[60vh] md:h-[75vh] lg:h-[90vh]"
        >
          {products.length > 0 ? (
            products.map((product, index) => (
              <SwiperSlide key={index}>
                <div className="relative h-full w-full bg-gray-100">
                  <Image
                    src={product.img || "/images/default.jpg"}
                    alt={product.title}
                    fill
                    className="object-cover brightness-75"
                    priority
                    unoptimized
                  />
                  <div
                    className="absolute top-4 right-4 p-2 cursor-pointer z-20"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleLike(product);
                    }}
                  >
                    <Heart
                      className={`w-6 h-6 text-white transition-colors duration-300 ${
                        liked[product._id] ? "fill-white" : ""
                      }`}
                    />
                  </div>
                  <div className="absolute inset-0 flex flex-col justify-center items-center sm:items-start px-4 sm:px-8">
                    <div className="text-center sm:text-left max-w-xl">
                      <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-2 sm:mb-4 drop-shadow-lg">
                        {product.title}
                      </h2>
                      <p className="text-xs sm:text-lg md:text-xl mb-3 sm:mb-6 drop-shadow-md">
                        ₹{product.price}
                      </p>
                      <Link
                        href={`/product/${product._id}`}
                        className="inline-block bg-teal-700 hover:bg-teal-800 text-white font-semibold py-1.5 px-4 sm:py-3 sm:px-6 rounded-lg shadow-lg transition text-sm sm:text-base"
                      >
                        Shop Now
                      </Link>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))
          ) : (
            <SwiperSlide>
              <div className="flex items-center justify-center h-full text-xl font-semibold text-gray-600">
                Loading products...
              </div>
            </SwiperSlide>
          )}
        </Swiper>
      </section>

      <div className="max-w-[100%] mx-auto md:space-y-12">
        <Category />
        <PopularProduct />
        <SingleProduct />
        <MetalProduct />
        <Slider/>
        <Raisin/>
        <CraftSection/>
        <WorkStyle />
        <UserForm />
      </div>
    </>
  );
}
