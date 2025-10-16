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

export default function WhereTheHeartResides() {
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

        const resinProducts = productsArray
          .filter((p: any) => p.category?.toLowerCase().includes("resin"))
          .slice(0, 4); // first 4 products only

        setProducts(
          resinProducts.map((p: any) => ({
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
    <section className="bg-[#fdf8f4] py-6 px-0 ">
      <div className="w-[85%] mx-auto">
        <div className="flex flex-row items-center justify-between mb-4 gap-2">
          <div>
            <h2 className="text-2xl sm:text-4xl md:text-4xl  font-semibold text-[#3e402d] leading-tight">
              Where the heart resides 
            </h2>
            <h2 className="text-lg font-serif text-[#3e402d] leading-tight">
              Resin Craft ART
            </h2>
          </div>
          <button
            onClick={() => router.push("/resin-craft")}
            className="border border-gray-500 text-lg font-medium px-6 py-2 text-[#3e402d] shadow-sm hover:bg-[#3e402d] hover:text-white transition cursor-pointer"
          >
            See All
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {products.map((item) => (
            <div
              key={item._id}
              className="bg-white overflow-hidden shadow-sm hover:shadow-lg transition cursor-pointer flex flex-col"
              style={{ border: "none", minHeight: "300px", justifyContent: "flex-start" }}
              onClick={() => router.push(`/product/${item._id}`)}
            >
              <div className="relative w-full h-64">
                <Image
                  src={item.img}
                  alt={item.title}
                  fill
                  className="object-cover"
                  style={{ borderRadius: "0" }}
                  unoptimized
                />
                <div
                  className="absolute top-3 right-3 p-2 cursor-pointer z-10"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleLike(item);
                  }}
                >
                  <Heart
                    className={`w-6 h-6 ${likedItems[item._id] ? "fill-white text-white" : "text-white"}`}
                  />
                </div>
              </div>

              <div className="flex-1 flex flex-col justify-end">
                <div className="mt-6 px-3">
                  <div className="uppercase text-xs text-[#a59e8a] tracking-widest font-medium mb-2">
                    {item.category}
                  </div>
                  <h3 className="text-lg sm:text-base md:text-xl font-medium text-[#3e402d] mb-2 leading-snug">
                    {item.title}
                  </h3>
                  <div className="text-black text-lg font-semibold">
                    ₹ {item.price.toLocaleString("en-IN")} INR
                  </div>
                </div>
                <div className="h-3" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
