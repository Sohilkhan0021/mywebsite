"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Heart } from "lucide-react";
import { useWishlist } from "@/amitkk/context/WishlistContext";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useRouter } from "next/navigation";

export default function CraftSwiper() {
  const [filter, setFilter] = useState("All");
  const [likedItems, setLikedItems] = useState<{ [key: string]: boolean }>({});
  const [craftProducts, setCraftProducts] = useState<any[]>([]);
  const { addToWishlist, removeFromWishlist } = useWishlist();
  const router = useRouter();
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/products");
        const data = await res.json();
        setCraftProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  const toggleLike = (item: any) => {
    if (likedItems[item._id]) {
      removeFromWishlist(item._id);
    } else {
      addToWishlist({
        id: item._id,
        img: item.img,
        title: item.title,
        price: Number(item.price),
      });
    }
    setLikedItems((prev) => ({ ...prev, [item._id]: !prev[item._id] }));
  };

  const filteredItems =
    filter === "All"
      ? craftProducts
      : craftProducts.filter((item) => item.category === filter);

  const categories = ["All", "Decor", "DIY Kit", "Home", "Jewelry"];

  return (
    <section className="bg-[#fdf8f4] py-8">
      <div className="max-w-[95%] sm:max-w-[90%] md:max-w-[85%] lg:max-w-[1200px] mx-auto text-center">
   
        <div className="flex flex-wrap justify-center mb-8 gap-2">
          {categories.map((name) => (
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
          modules={[Autoplay]}
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
            <SwiperSlide key={item._id}>
              <div className="relative w-full rounded-lg shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
             
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-full h-56 sm:h-72 md:h-80 lg:h-80 object-cover"
                  onClick={() => router.push(`/product/${item._id}`)}
                />
                <div
                  className="absolute top-3 right-3 p-2 cursor-pointer z-10"
                  onClick={() => toggleLike(item)}
                >
                  {likedItems[item._id] ? (
                    <Heart className="w-6 h-6 fill-white text-white" />
                  ) : (
                    <Heart className="w-6 h-6 text-white" />
                  )}
                </div>
                <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 hover:opacity-60 transition-opacity duration-300 flex flex-col md:flex hidden justify-center items-center text-white px-4">
                  <h3 className="text-sm sm:text-lg font-bold py-1 sm:py-2">
                    {item.title}
                  </h3>
                  <h2 className="text-lg sm:text-2xl mb-2">₹{item.price}</h2>
                  <Link href={`/product/${item._id}`}>
                    <button className="bg-white text-black rounded-xl px-3 sm:px-6 py-1 sm:py-2 text-xs sm:text-sm font-semibold cursor-pointer hover:bg-gray-200 transition">
                      Buy Now
                    </button>
                  </Link>
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-white bg-opacity-80 backdrop-blur-sm p-2 sm:p-3 text-black flex justify-between items-center text-xs sm:text-base transition-all duration-300">
                  <span>{item.title}</span>
                  <span>₹{item.price}</span>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
