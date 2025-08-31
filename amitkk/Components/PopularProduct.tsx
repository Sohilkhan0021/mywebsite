"use client";

import { useRouter } from "next/navigation"; 
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import Image from "next/image";
import "swiper/css";
import "swiper/css/free-mode";


export default function AnmoleSection() {
  const router = useRouter();
  
  const images = [
    "/images-new/metal-product-img-2.webp",
    "/images-new/metal-product-img.webp",
    "/images-new/work-img-3.webp",
    "/images-new/work-img-1.webp",
    "/images-new/metal-product-img.webp",
    "/images-new/work-img-2.webp",
    "/images-new/work-img-3.webp",
  ];

  return (
    <section className="relative w-full bg-gradient-to-r from-[#fdf6ec] to-[#f5faff] py-12 sm:py-16 ">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 items-center px-4 sm:px-6 lg:px-12 gap-8">
        <div className="z-20 relative px-4 sm:px-8">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#3e402d] mb-4 sm:mb-6 leading-snug">
            Anmole Metal Craft 
          </h2>
          <p className="text-gray-700 mb-4 sm:mb-6 leading-relaxed text-base sm:text-lg">
            Discover the timeless elegance of handcrafted artistry with 
            Anmole Craft & Creation. From finely detailed metalwork to 
            intricate wooden designs, each piece is crafted to perfection. 
            Our artisans blend tradition with innovation, bringing you 
            unique creations that elevate your lifestyle.
          </p>

          <div className="flex">
            <button
            onClick={() => router.push("/Metal-craft")}
             className="bg-[#3e402d] text-white px-5 sm:px-6 py-2 font-semibold cursor-pointer shadow hover:bg-[#2c2e1e] transition">
              See All
            </button>
          </div>
        </div>
        <div className="relative w-full h-[220px] sm:h-[260px] lg:h-[320px] -ml-2 sm:-ml-6 lg:-ml-16">
          <Swiper
           modules={[Autoplay,]}
            spaceBetween={20}
            loop
            speed={800}
            autoplay={{
              delay: 2000,
              disableOnInteraction: false,
              pauseOnMouseEnter: false,
            }}
            freeMode={{ enabled: true, momentum: false }}
            className="h-full w-full rounded-2xl overflow-hidden"
            breakpoints={{
              320: { slidesPerView: 1.2 },
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
              1280: { slidesPerView: 4 },
            }}
          >
            {images.concat(images).map((src, index) => (
              <SwiperSlide key={index}>
                <div className="relative w-full h-[200px] sm:h-[240px] lg:h-[300px]">
                  <Image
                    src={src}
                    alt={`Anmole Product ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
