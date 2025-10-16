"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Heart } from "lucide-react";
import { useRouter } from "next/router";
import { useWishlist } from "@/amitkk/context/WishlistContext";

interface Product {
  _id: string;
  img: string;
  title: string;
  category: string;
  price: number;
}

export default function WorkInStyle() {
  const router = useRouter();
  const { addToWishlist, removeFromWishlist } = useWishlist();

  const [products, setProducts] = useState<Product[]>([]);
  const [likedItems, setLikedItems] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/products");
        const data = await res.json();
        const productsArray = Array.isArray(data) ? data : data.products;
        const workProducts = productsArray
          .filter((p: any) => p.category?.toLowerCase().includes("work"))
          .slice(0, 4); 

        setProducts(
          workProducts.map((p: any) => ({
            _id: p._id,
            img: typeof p.img === "string" ? p.img : p.img?.url || "/images/default.png",
            title: p.title || `Product ${p._id}`,
            category: p.category || "",
            price: Number(p.price) || 0,
          }))
        );
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  const toggleLike = (item: Product) => {
    setLikedItems((prev) => ({
      ...prev,
      [item._id]: !prev[item._id],
    }));

    if (likedItems[item._id]) {
      removeFromWishlist(item._id);
    } else {
      addToWishlist({
        id: item._id,
        img: item.img,
        title: item.title,
        price: item.price,
      });
    }
  };

  return (
    <section className="bg-[#fdf8f4] py-12">
      <div className="w-[85%] mx-auto">
        <div className="flex flex-row justify-between items-center mb-10 gap-2">
          <h2 className="text-xl sm:text-3xl md:text-5xl font-bold text-[#3e402d]">Work in style</h2>
          <button
            onClick={() => router.push("/WorkProduct")}
            className="border border-gray-600 text-xs sm:text-sm text-black px-3 sm:px-4 py-2 cursor-pointer hover:bg-[#313323] hover:text-white transition"
          >
            See All
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {products.map((item) => (
            <div
              key={item._id}
              className="bg-white shadow-sm rounded-lg overflow-hidden cursor-pointer"
              onClick={() => router.push(`/product/${item._id}`)}
            >
              <div className="relative w-full h-48 sm:h-56 md:h-64 lg:h-72">
                <Image src={item.img} alt={item.title} fill className="object-cover" />
                <div
                  className="absolute top-2 right-2 p-2 cursor-pointer z-10"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleLike(item);
                  }}
                >
                  {likedItems[item._id] ? (
                    <Heart className="w-6 h-6 fill-white text-white" />
                  ) : (
                    <Heart className="w-6 h-6 text-white" />
                  )}
                </div>
              </div>

              <div className="mt-4 px-3 pb-4">
                <p className="text-sm text-gray-500 tracking-wide">{item.category}</p>
                <h3 className="text-lg font-medium text-[#3e402d] mt-2">{item.title}</h3>
                <p className="text-md font-semibold text-[#3e402d] mt-2">₹ {item.price} INR</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
