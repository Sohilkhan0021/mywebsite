"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Link from "next/link";
import { useState } from "react";
import { Heart } from "lucide-react";

import Category from "@/amitkk/Components/Category";
import Slider from "@/amitkk/Components/Slider";
import SingleProduct from "@/amitkk/Components/SingleProduct";
import MetalProduct from "@/amitkk/Components/MetalProduct";
import CraftSection from "@/amitkk/Components/CraftSection";
import WorkStyle from "@/amitkk/Components/WorkStyle";
import PopularProduct from "@/amitkk/Components/PopularProduct";
import UserForm from "@/amitkk/Components/Explor";

import { useWishlist } from "@/amitkk/context/WishlistContext";

const slides = [
  { id: "1", img: "/images-new/home-page-img-6.avif", title: "Discover Beautiful Crafts", subtitle: "Handmade with love and care" },
  { id: "2", img: "/images-new/home-page-img-2.webp", title: "New Arrivals for You", subtitle: "Explore our latest collection" },
  { id: "3", img: "/images-new/home-page-img-3.avif", title: "Craft Your Dreams", subtitle: "Decorate your space creatively" },
  { id: "4", img: "/images-new/home-page-img-4.avif", title: "Exclusive Paper Crafts", subtitle: "Unique designs to inspire" },
  { id: "5", img: "/images-new/home-page-img-5.avif", title: "Make Every Moment Special", subtitle: "Crafts for every occasion" },
  { id: "6", img: "/images-new/home-page-img-1.webp", title: "Shop Handmade with Passion", subtitle: "Support local artisans" },
];

export default function HomePage() {
  const [liked, setLiked] = useState<{ [key: string]: boolean }>({});
  const { addToWishlist } = useWishlist();

  const toggleLike = (slide: { id: string; img: string; title: string }) => {
    if (!liked[slide.id]) {
      addToWishlist({ id: slide.id, img: slide.img, title: slide.title, price: 0 });
    }
    setLiked((prev) => ({ ...prev, [slide.id]: !prev[slide.id] }));
  };

  return (
    <>
      <section className="max-w-[85%] mx-auto mt-8">
        <Swiper
          modules={[Pagination, Autoplay]}
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          loop
          className="rounded-lg overflow-hidden"
        >
          {slides.map(({ img, title, subtitle, id }, index) => (
            <SwiperSlide key={index}>
              <div className="relative h-[85vh] w-full bg-gray-100">
                <Image
                  src={img}
                  alt={title}
                  fill
                  className="object-cover brightness-75"
                  priority
                />
                <div
                  className="absolute top-5 right-5 p-2 cursor-pointer z-20"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleLike({ id, img, title });
                  }}
                >
                  {liked[id] ? (
                    <Heart className="w-6 h-6 text-white fill-white transition-colors duration-300" />
                  ) : (
                    <Heart className="w-6 h-6 text-white transition-colors duration-300" />
                  )}
                </div>
                <div className="absolute inset-0 flex flex-col justify-center items-start">
                  <div className="w-[85vw] mx-auto px-4 text-white">
                    <h2 className="text-4xl md:text-6xl font-extrabold leading-tight mb-4 drop-shadow-lg">
                      {title}
                    </h2>
                    <p className="text-lg md:text-2xl mb-8 drop-shadow-md">{subtitle}</p>
                    <Link
                      href={`/product/${id}`}
                      className="bg-teal-700 hover:bg-teal-800 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition"
                    >
                      Shop Now
                    </Link>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      <Category />
      <PopularProduct />
      <SingleProduct />
      <MetalProduct />
      <Slider />
      <CraftSection />
      <WorkStyle />
      <UserForm />
    </>
  );
}
