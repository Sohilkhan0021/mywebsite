"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { useRouter } from "next/router";
import { useState } from "react";
import { Heart } from "lucide-react";
import { useWishlist } from "@/amitkk/context/WishlistContext";

export default function ImageSliderTailwind() {
  const router = useRouter();
  const { addToWishlist, removeFromWishlist, wishlist } = useWishlist();
  const [liked, setLiked] = useState<{ [key: string]: boolean }>({});

 const toggleLike = (p: { id: string; img: string; price: number }) => {
  setLiked((prev) => ({
    ...prev,
    [p.id]: !prev[p.id],
  }));

  if (liked[p.id]) {
    removeFromWishlist(p.id);
  } else {
    addToWishlist({
      id: p.id,
      img: p.img,
      title: `Product ${p.id}`,
      price: p.price, 
    });
  }
};

  const products = [
    { id: "1", img: "/images/home-page-img-1.webp" ,price:250},
    { id: "2", img: "/images/home-page-img-2.webp",price:250 },
    { id: "3", img: "/images/home-page-img-3.avif",price:250 },
    { id: "4", img: "/images/home-page-img-4.avif",price:250 },
    { id: "5", img: "/images/home-page-img-5.avif",price:250 },
    { id: "6", img: "/images/home-page-img-6.avif" ,price:250},
    { id: "201", img: "/images/hand-bag.png",price:250 },
    { id: "104", img: "/images/hand-made-jewelary.jpg",price:250 },
  ];

  return (
    <section className="w-full bg-[#fdf6ec] py-12">
      <div className="w-[85%] mx-auto text-center px-4 relative">
        <h2 className="text-3xl font-bold text-center mb-8 mt-6 text-white border border-[#3e402d] rounded-full px-6 py-2 inline-block bg-[#3e402d] cursor-pointer">
          Artisan Choice
        </h2>

        <Swiper
          modules={[Autoplay]}
          spaceBetween={20}
          loop
          autoplay={{ delay: 2000, disableOnInteraction: false }}
          breakpoints={{
            320: { slidesPerView: 2 },
            640: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
            1280: { slidesPerView: 5 },
          }}
        >
          {products.map((p) => (
            <SwiperSlide key={p.id}>
              <div
                className="bg-white rounded-lg shadow overflow-hidden mt-4 cursor-pointer relative"
                onClick={() => router.push(`/product/${p.id}`)}
              >
                <div className="relative w-full h-56 sm:h-64 md:h-72 lg:h-80">
                  <Image
                    src={p.img}
                    alt={`Product ${p.id}`}
                    fill
                    style={{ objectFit: "cover" }}
                    className="rounded-lg"
                  />
                  <div
                    className="absolute top-3 right-3 p-2 cursor-pointer z-10"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleLike(p);
                    }}
                  >
                    {liked[p.id] ? (
                      <Heart className="w-6 h-6 fill-white text-white" />
                    ) : (
                      <Heart className="w-6 h-6 text-white" />
                    )}
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
