"use client";
import { useState } from "react";
import Link from "next/link";
import { Heart } from "lucide-react";
import { useWishlist } from "@/amitkk/context/WishlistContext";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const craftProducts = [
  { id: 101, img: "/images/home-page-img-6.avif", titleamt: "$250", type: "Handmade Decorative Item", category: "Decor", amt: "$250" },
  { id: 102, img: "/images/home-page-img-5.avif", titleamt: "$250", type: "Handmade Decorative Item", category: "Decor", amt: "$250" },
  { id: 103, img: "/images/home-page-img-4.avif", titleamt: "$250", type: "Handmade Decorative Item", category: "Decor", amt: "$250" },
  { id: 104, img: "/images/hand-made-jewelary.jpg", titleamt: "$250", type: "Handmade Decorative Item", category: "Decor", amt: "$250" },
];

export default function CraftSwiper() {
  const [filter, setFilter] = useState("All");
  const [likedItems, setLikedItems] = useState<{ [key: number]: boolean }>({});
  const { addToWishlist, removeFromWishlist } = useWishlist();

  const toggleLike = (item: typeof craftProducts[0]) => {
    if (likedItems[item.id]) {
      removeFromWishlist(item.id.toString());
    } else {
      addToWishlist({
        id: item.id.toString(),
        img: item.img,
        title: item.type,
        price: Number(item.amt.replace("$", "")),
      });
    }
    setLikedItems((prev) => ({ ...prev, [item.id]: !prev[item.id] }));
  };

  const filteredItems =
    filter === "All"
      ? craftProducts
      : craftProducts.filter((item) => item.category === filter);

  const categories = ["All", "Decor", "DIY Kit", "Home", "Jewelry"];

  return (
    <section className="bg-[#fdf8f4] py-8">
      <div className="max-w-[95%] sm:max-w-[90%] md:max-w-[85%] lg:max-w-[1200px] mx-auto text-center">
        <div className="flex flex-wrap justify-center mb-8 gap-2 ">
          {categories.map((name, idx) => (
            <button
              key={name}
              type="button"
              onClick={() => setFilter(name)}
              className={`px-4 py-2 text-xs sm:text-sm font-medium flex items-center cursor-pointer rounded-full transition-colors duration-200 ${
                filter === name
                  ? "bg-[#3e402d] text-white"
                  : "bg-white text-[#3e402d] hover:bg-[#313323] hover:text-white"
              }`}
            >
              {name}
            </button>
          ))}
        </div>

        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          // navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          loop
          spaceBetween={20}
          breakpoints={{
            320: { slidesPerView: 2 },
            640: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
          }}
        >
          {filteredItems.map((item) => (
            <SwiperSlide key={item.id}>
              <div className="relative w-full rounded-lg shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
                <img
                  src={item.img}
                  alt={item.type}
                  className="w-full h-56 sm:h-72 md:h-80 lg:h-80 object-cover"
                />
                <div
                  className="absolute top-3 right-3 p-2 cursor-pointer z-10"
                  onClick={() => toggleLike(item)}
                >
                  {likedItems[item.id] ? (
                    <Heart className="w-6 h-6 fill-white text-white" />
                  ) : (
                    <Heart className="w-6 h-6 text-white" />
                  )}
                </div>
                <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 hover:opacity-60 transition-opacity duration-300 flex flex-col justify-center items-center text-white px-4">
                  <h3 className="text-sm sm:text-lg font-bold py-1 sm:py-2">{item.type}</h3>
                  <h2 className="text-lg sm:text-2xl mb-2">{item.amt}</h2>
                  <Link href={`/product/${item.id}`}>
                    <button className="bg-white text-black rounded-xl px-3 sm:px-6 py-1 sm:py-2 text-xs sm:text-sm font-semibold cursor-pointer hover:bg-gray-200 transition">
                      Buy Now
                    </button>
                  </Link>
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-white bg-opacity-80 backdrop-blur-sm p-2 sm:p-3 text-black flex justify-between items-center text-xs sm:text-base transition-all duration-300">
                  <span>{item.type}</span>
                  <span>{item.titleamt}</span>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
