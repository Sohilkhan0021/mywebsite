// "use client";

// import { useRouter } from "next/navigation";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Autoplay } from "swiper/modules";
// import Image from "next/image";
// import { useState } from "react";
// import "swiper/css";
// import "swiper/css/free-mode";

// export default function AnmoleSection() {
//   const router = useRouter();
//   const [showMore, setShowMore] = useState(false);

//   const images = [
//     "/images/metal-product-img-2.webp",
//     "/images/metal-product-img.webp",
//     "/images/work-img-3.webp",
//     "/images/work-img-1.webp",
//     "/images/metal-product-img.webp",
//     "/images/work-img-2.webp",
//     "/images/work-img-3.webp",
//   ];

//   const fullText = `Discover the timeless elegance of handcrafted artistry with 
//     Anmole Craft & Creation. From finely detailed metalwork to 
//     intricate wooden designs, each piece is crafted to perfection. 
//     Our artisans blend tradition with innovation, bringing you 
//     unique creations that elevate your lifestyle.`;

//   return (
//     <section className="relative w-full bg-gradient-to-r from-[#fdf6ec] to-[#f5faff] py-12 sm:py-16">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 items-center gap-8">
//         <div className="relative w-full h-[220px] sm:h-[260px] lg:h-[320px] order-1 lg:order-2">
//           <Swiper
//             modules={[Autoplay]}
//             spaceBetween={20}
//             loop
//             speed={800}
//             autoplay={{
//               delay: 2000,
//               disableOnInteraction: false,
//               pauseOnMouseEnter: false,
//             }}
//             freeMode={{ enabled: true, momentum: false }}
//             className="h-full w-full overflow-hidden"
//             breakpoints={{
//               320: { slidesPerView: 2 }, 
//               640: { slidesPerView: 2 },
//               1024: { slidesPerView: 2 },
//               1280: { slidesPerView: 2 },
//             }}
//           >
//             {images.concat(images).map((src, index) => (
//               <SwiperSlide key={index}>
//                 <div className="relative w-full h-[200px] sm:h-[240px] lg:h-[300px] rounded-xl overflow-hidden lg:rounded-xl">
//                   <Image
//                     src={src}
//                     alt={`Anmole Product ${index + 1}`}
//                     fill
//                     className="object-cover"
//                   />
//                 </div>
//               </SwiperSlide>
//             ))}
//           </Swiper>
//         </div>
//         <div className="z-20 relative px-4 sm:px-8 order-2 lg:order-1">
//           <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#3e402d] mb-4 sm:mb-6 leading-snug">
//             Anmole Metal Craft
//           </h2>
//           <p className="text-gray-700 mb-4 sm:mb-6 leading-relaxed text-base sm:text-lg">
//             <span className="block sm:hidden">
//               {showMore ? fullText : fullText.slice(0, 100) + "..."}
//               {!showMore && (
//                 <button
//                   className="text-blue-600 ml-2 underline"
//                   onClick={() => setShowMore(true)}
//                 >
//                   More
//                 </button>
//               )}
//             </span>
//             <span className="hidden sm:block">{fullText}</span>
//           </p>

//           <div className="flex">
//             <button
//               onClick={() => router.push("/Metal-craft")}
//               className="bg-[#3e402d] text-white px-5 sm:px-6 py-2 font-semibold cursor-pointer shadow hover:bg-[#2c2e1e] transition"
//             >
//               See All
//             </button>
//           </div>
//         </div>

//       </div>
//     </section>
//   );
// }























































"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import Image from "next/image";
import "swiper/css";
import "swiper/css/free-mode";

export default function AnmoleSection() {
  const router = useRouter();
  const [showMore, setShowMore] = useState(false);
  const [images, setImages] = useState<string[]>([]);

    useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await fetch("/api/metalSlider");
        if (!res.ok) throw new Error("Failed to fetch images");
        const data = await res.json();
        setImages(data.map((img: any) => img.img));
      } catch (error) {
        console.error(error);
      }
    };
    fetchImages();
  }, []);

  const fullText = `Discover the timeless elegance of handcrafted artistry with 
    Anmole Craft & Creation. From finely detailed metalwork to 
    intricate wooden designs, each piece is crafted to perfection. 
    Our artisans blend tradition with innovation, bringing you 
    unique creations that elevate your lifestyle.`;

  return (
    <section className="relative w-full bg-gradient-to-r from-[#fdf6ec] to-[#f5faff] py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 items-center gap-8">
        <div className="relative w-full h-[220px] sm:h-[260px] lg:h-[320px] order-1 lg:order-2">
          <Swiper
            modules={[Autoplay]}
            loop
            speed={800}
            autoplay={{
              delay: 2000,
              disableOnInteraction: false,
            }}
            spaceBetween={15}
            className="h-full w-full"
            breakpoints={{
              320: { slidesPerView: 2 },
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 2 },
              1280: { slidesPerView: 2 },
            }}
          >
            {images.length > 0 ? (
              images.map((src, index) => (
                <SwiperSlide key={index}>
                  <div className="relative w-full h-[200px] sm:h-[240px] lg:h-[300px] rounded-xl overflow-hidden lg:rounded-xl">
                    <Image
                      src={src}
                      alt={`Anmole Product ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                </SwiperSlide>
              ))
            ) : (
              <p className="text-center w-full">No images uploaded yet</p>
            )}
          </Swiper>
        </div>

        <div className="z-20 relative px-4 sm:px-8 order-2 lg:order-1">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#3e402d] mb-4 sm:mb-6 leading-snug">
            Anmole Metal Craft
          </h2>
          <p className="text-gray-700 mb-4 sm:mb-6 leading-relaxed text-base sm:text-lg">
            <span className="block sm:hidden">
              {showMore ? fullText : fullText.slice(0, 100) + "..."}
              {!showMore && (
                <button
                  className="text-blue-600 ml-2 underline"
                  onClick={() => setShowMore(true)}
                >
                  More
                </button>
              )}
            </span>
            <span className="hidden sm:block">{fullText}</span>
          </p>
          <div className="flex">
            <button
              onClick={() => router.push("/Metal-craft")}
              className="bg-[#3e402d] text-white px-5 sm:px-6 py-2 font-semibold cursor-pointer shadow hover:bg-[#2c2e1e] transition"
            >
              See All
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
