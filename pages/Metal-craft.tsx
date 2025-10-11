// "use client";
// import Image from "next/image";
// import Link from "next/link";
// import { useState, useEffect } from "react";
// import { Heart } from "lucide-react";
// import AOS from "aos";
// import "aos/dist/aos.css";
// import { useWishlist } from "@/amitkk/context/WishlistContext";

// export default function MetalCraft() {
//   const [likedItems, setLikedItems] = useState<{ [key: string]: boolean }>({});
//   const [products, setProducts] = useState<any[]>([]);
//   const { addToWishlist, removeFromWishlist } = useWishlist();

//   useEffect(() => {
//     async function fetchProducts() {
//       try {
//         const res = await fetch("/api/products");
//         const data = await res.json();
//         const filtered = data.filter(
//           (p: any) => p.category?.toLowerCase() === "metal-craft"
//         );

//         setProducts(filtered);
//       } catch (error) {
//         console.error("Failed to load products", error);
//       }
//     }

//     fetchProducts();

//     AOS.init({
//       duration: 1000,
//       once: true,
//     });
//   }, []);

//   const toggleLike = (product: any) => {
//     if (likedItems[product._id]) {
//       removeFromWishlist(product._id);
//     } else {
//       addToWishlist({
//         id: product._id,
//         img: product.img,
//         title: product.title,
//         price: Number(product.price),
//       });
//     }

//     setLikedItems((prev) => ({
//       ...prev,
//       [product._id]: !prev[product._id],
//     }));
//   };

//   return (
//     <div className="w-[85%] mx-auto py-12">
//       <h1 className="text-3xl font-bold text-[#3e402d] mb-8 text-center">
//         Anmole Metal Craft Products
//       </h1>

//       {products.length === 0 ? (
//         <p className="text-center text-gray-600">No Metal Craft products found.</p>
//       ) : (
//         <div className="grid grid-cols-2 md:grid-cols-3 gap-8 justify-center items-center">
//           {products.map((product, index) => (
//             <div
//               key={product._id}
//               className="w-full max-w-[250px] md:w-80 relative"
//               data-aos="fade-down"
//               data-aos-delay={index * 100}
//             >
//               <Link href={`/product/${product._id}`}>
//                 <div className="relative overflow-hidden w-full h-[180px] sm:h-64 md:h-80 cursor-pointer">
//                   <Image
//                     src={product.img}
//                     alt={product.title}
//                     width={320}
//                     height={320}
//                     className="object-cover rounded-lg"
//                   />
//                 </div>
//               </Link>
//               <div
//                 className="absolute top-3 right-3 p-2 cursor-pointer"
//                 onClick={() => toggleLike(product)}
//               >
//                 {likedItems[product._id] ? (
//                   <Heart className="w-6 h-6 fill-white text-white" />
//                 ) : (
//                   <Heart className="w-6 h-6 text-white" />
//                 )}
//               </div>

//               <div className="md:px-3 pt-1 pb-3 text-center md:mt-4">
//                 <h2 className="text-base font-semibold text-black mt-2">
//                   {product.title}
//                 </h2>
//                 <p className="text-base text-[#3e402d] font-bold mt-1">
//                   ₹{product.price}
//                 </p>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }



















"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Heart } from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";
import { useWishlist } from "@/amitkk/context/WishlistContext";

export default function MetalCraft() {
  const [likedItems, setLikedItems] = useState<{ [key: string]: boolean }>({});
  const [products, setProducts] = useState<any[]>([]);
  const { addToWishlist, removeFromWishlist } = useWishlist();

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch("/api/products");
        const data = await res.json();
        const filtered = data.filter(
          (p: any) => p.category?.toLowerCase() === "metal-craft"
        );

        setProducts(filtered);
      } catch (error) {
        console.error("Failed to load products", error);
      }
    }

    fetchProducts();

    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

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
    <div className="w-[85%] mx-auto py-12">
      <h1 className="text-3xl font-bold text-[#3e402d] mb-8 text-center">
        Anmole Metal Craft Products
      </h1>

      {products.length === 0 ? (
        <p className="text-center text-gray-600">No Metal Craft products found.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-8 justify-center items-center">
          {products.map((product, index) => (
            <div
              key={product._id}
              className="w-full max-w-[250px] md:w-80 relative"
              data-aos="fade-down"
              data-aos-delay={index * 100}
            >
              <Link href={`/product/${product._id}`}>
                <div className="relative overflow-hidden w-full aspect-square cursor-pointer">
                  <Image
                    src={product.img}
                    alt={product.title}
                    width={500}
                    height={500}
                    className="object-cover rounded-lg w-full h-full"
                  />
                </div>
              </Link>

              <div
                className="absolute top-3 right-3 p-2 cursor-pointer"
                onClick={() => toggleLike(product)}
              >
                {likedItems[product._id] ? (
                  <Heart className="w-6 h-6 fill-white text-white" />
                ) : (
                  <Heart className="w-6 h-6 text-white" />
                )}
              </div>

              <div className="md:px-3 pt-1 pb-3 text-center md:mt-4">
                <h2 className="text-base font-semibold text-black mt-2">
                  {product.title}
                </h2>
                <p className="text-base text-[#3e402d] font-bold mt-1">
                  ₹{product.price}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

