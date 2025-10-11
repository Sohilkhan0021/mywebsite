// "use client";

// import Image from "next/image";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Autoplay } from "swiper/modules";
// import "swiper/css";
// import { useRouter } from "next/router";
// import { useState, useEffect } from "react";
// import { Heart } from "lucide-react";
// import { useWishlist } from "@/amitkk/context/WishlistContext";

// interface Product {
//   _id: string;
//   img: string;
//   price: number;
//   title: string;
// }

// export default function ImageSliderTailwind() {
//   const router = useRouter();
//   const { addToWishlist, removeFromWishlist } = useWishlist();
//   const [liked, setLiked] = useState<{ [key: string]: boolean }>({});
//   const [products, setProducts] = useState<Product[]>([]);

//   useEffect(() => {
//   const fetchProducts = async () => {
//     try {
//       const res = await fetch("/api/products");
//       const data = await res.json();
//       const productsArray = Array.isArray(data) ? data : data.products;
//       const sliderProducts = productsArray.filter(
//         (p: any) => p.category?.toLowerCase() === "slider"
//       );
//       setProducts(
//   sliderProducts.map((p: any) => ({
//     _id: p._id,
//     // img: typeof p.image === "string"? p.image: p.image?.url || "/images/default.png",
//     img: typeof p.img === "string" ? p.img : p.img?.url || "/images/default.png",
//     price: p.price,
//     title: p.title || `Product ${p._id}`,
    
//   }))
  
// );

//     } catch (error) {
//       console.error("Error fetching products:", error);
//     }
//   };
//   fetchProducts();
// }, []);


//   const toggleLike = (p: Product) => {
//     setLiked((prev) => ({
//       ...prev,
//       [p._id]: !prev[p._id],
//     }));

//     if (liked[p._id]) {
//       removeFromWishlist(p._id);
//     } else {
//       addToWishlist({
//         id: p._id,
//         img: p.img,
//         title: p.title,
//         price: p.price,
//       });
//     }
//   };

//   return (
//     <section className="w-full bg-[#fdf6ec] py-12">
//       <div className="w-[85%] mx-auto text-center px-4 relative">
//         <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 mt-6 text-white border border-[#3e402d] rounded-full px-4 sm:px-6 py-2 inline-block bg-[#3e402d] cursor-pointer">
//           Artisan Choice
//         </h2>

//         <Swiper
//           modules={[Autoplay]}
//           spaceBetween={16}
//           loop
//           autoplay={{ delay: 2000, disableOnInteraction: false }}
//           breakpoints={{
//             320: { slidesPerView: 2, spaceBetween: 12 },
//             480: { slidesPerView: 2, spaceBetween: 14 },
//             640: { slidesPerView: 3, spaceBetween: 16 },
//             768: { slidesPerView: 3, spaceBetween: 16 },
//             1024: { slidesPerView: 4, spaceBetween: 20 },
//             1280: { slidesPerView: 5, spaceBetween: 24 },
//           }}
//         >
//           {products.map((p) => (
//             <SwiperSlide key={p._id}>
//               <div
//                 className="bg-white rounded-lg shadow overflow-hidden mt-4 cursor-pointer relative"
//                 onClick={() => router.push(`/product/${p._id}`)}
//               >
//                 <div className="relative w-full h-40 sm:h-52 md:h-60 lg:h-64">
//                   <Image
//                     src={p.img}
//                     alt={p.title}
//                     fill
//                     style={{ objectFit: "cover" }}
//                     className="rounded-lg"
//                   />
//                   <div
//                     className="absolute top-2 right-2 p-1 sm:p-2 cursor-pointer z-10"
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       toggleLike(p);
//                     }}
//                   >
//                     {liked[p._id] ? (
//                       <Heart className="w-5 h-5 sm:w-6 sm:h-6 fill-white text-white" />
//                     ) : (
//                       <Heart className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
//                     )}
//                   </div>
//                 </div>
//                 <div className="p-2 sm:p-3 text-left">
//                   <p className="uppercase text-[9px] sm:text-xs tracking-wide text-gray-500">
//                     Anmol Craft and Creation
//                   </p>
//                   <h3 className="text-sm sm:text-base font-medium text-gray-900">
//                     {p.title}
//                   </h3>
//                   <p className="text-sm sm:text-base font-semibold text-gray-800">
//                     ₹ {p.price} INR
//                   </p>
//                 </div>
//               </div>
//             </SwiperSlide>
//           ))}
//         </Swiper>
//       </div>
//     </section>
//   );
// }





"use client";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Heart } from "lucide-react";
import { useWishlist } from "@/amitkk/context/WishlistContext";

interface Product {
  _id: string;
  img: string;
  price: number;
  title: string;
}

export default function ImageSliderTailwind() {
  const router = useRouter();
  const { addToWishlist, removeFromWishlist } = useWishlist();
  const [liked, setLiked] = useState<{ [key: string]: boolean }>({});
  const [products, setProducts] = useState<Product[]>([]);
  const [swiperReady, setSwiperReady] = useState(false); 

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/products");
        const data = await res.json();
        const productsArray = Array.isArray(data) ? data : data.products;
        const sliderProducts = productsArray.filter(
          (p: any) => p.category?.toLowerCase() === "slider"
        );
        setProducts(
          sliderProducts.map((p: any) => ({
            _id: p._id,
            img:
              typeof p.img === "string"
                ? p.img
                : p.img?.url || "/images/default.png",
            price: p.price,
            title: p.title || `Product ${p._id}`,
          }))
        );
        setSwiperReady(true); 
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  const toggleLike = (p: Product) => {
    setLiked((prev) => ({
      ...prev,
      [p._id]: !prev[p._id],
    }));

    if (liked[p._id]) {
      removeFromWishlist(p._id);
    } else {
      addToWishlist({
        id: p._id,
        img: p.img,
        title: p.title,
        price: p.price,
      });
    }
  };

  return (
    <section className="w-full bg-[#fdf6ec] py-12">
      <div className="w-[85%] mx-auto text-center px-4 relative">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 mt-6 text-white border border-[#3e402d] rounded-full px-4 sm:px-6 py-2 inline-block bg-[#3e402d] cursor-pointer">
          Artisan Choice
        </h2>

        {swiperReady && ( 
          <Swiper
            modules={[Autoplay]}
            spaceBetween={16}
            loop={true}
            autoplay={{
              delay: 2000,
              disableOnInteraction: false,
            }}
            breakpoints={{
              320: { slidesPerView: 2, spaceBetween: 12 },
              480: { slidesPerView: 2, spaceBetween: 14 },
              640: { slidesPerView: 3, spaceBetween: 16 },
              768: { slidesPerView: 3, spaceBetween: 16 },
              1024: { slidesPerView: 4, spaceBetween: 20 },
              1280: { slidesPerView: 5, spaceBetween: 24 },
            }}
          >
            {products.map((p) => (
              <SwiperSlide key={p._id}>
                <div
                  className="bg-white rounded-lg shadow overflow-hidden mt-4 cursor-pointer relative"
                  onClick={() => router.push(`/product/${p._id}`)}
                >
                  <div className="relative w-full h-40 sm:h-52 md:h-60 lg:h-64">
                    <Image
                      src={p.img}
                      alt={p.title}
                      fill
                      style={{ objectFit: "cover" }}
                      className="rounded-lg"
                    />
                    <div
                      className="absolute top-2 right-2 p-1 sm:p-2 cursor-pointer z-10"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleLike(p);
                      }}
                    >
                      {liked[p._id] ? (
                        <Heart className="w-5 h-5 sm:w-6 sm:h-6 fill-white text-white" />
                      ) : (
                        <Heart className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                      )}
                    </div>
                  </div>
                  <div className="p-2 sm:p-3 text-left">
                    <p className="uppercase text-[9px] sm:text-xs tracking-wide text-gray-500">
                      Anmol Craft and Creation
                    </p>
                    <h3 className="text-sm sm:text-base font-medium text-gray-900">
                      {p.title}
                    </h3>
                    <p className="text-sm sm:text-base font-semibold text-gray-800">
                      ₹ {p.price} INR
                    </p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </section>
  );
}
