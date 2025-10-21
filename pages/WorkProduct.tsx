"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Heart } from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";

interface Product {
  _id: string;
  img: string;
  title: string;
  price: number;
}

export default function WorkCraft() {
  const [products, setProducts] = useState<Product[]>([]);
  const [likedItems, setLikedItems] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });

    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/products");
        const data = await res.json();
        const productsArray = Array.isArray(data) ? data : data.products;

        const workProducts = productsArray.filter(
          (p: any) => p.category?.toLowerCase().includes("work")
        );

        setProducts(
          workProducts.map((p: any) => ({
            _id: p._id,
            img: typeof p.img === "string" ? p.img : p.img?.url || "/images/default.png",
            title: p.title || `Product ${p._id}`,
            price: Number(p.price) || 0,
          }))
        );
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const toggleLike = (id: string) => {
    setLikedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const getAosType = (index: number) => {
    const col = index % 3;
    if (col === 0) return "fade-left";
    if (col === 1) return "fade-down";
    return "fade-right";
  };

  return (
    <div className="w-[85%] mx-auto py-12">
      <h1 className="text-3xl font-bold text-[#3e402d] mb-8 text-center mt-4">
        Anmole Best Coice Craft Products
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 justify-items-center">
        {products.map((product, index) => (
          <div
            key={product._id}
            className="overflow-hidden relative"
            data-aos={getAosType(index)}
            data-aos-delay={(index % 3) * 150}
          >
            <Link href={`/product/${product._id}`}>
              <div className="relative w-80 h-100 cursor-pointer">
                <Image
                  src={product.img}
                  alt={product.title}
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
            </Link>

            <div
              className="absolute top-3 right-3 p-2 cursor-pointer"
              onClick={() => toggleLike(product._id)}
            >
              {likedItems[product._id] ? (
                <Heart className="w-6 h-6 fill-white text-white" />
              ) : (
                <Heart className="w-6 h-6 text-white" />
              )}
            </div>

            <div className="mt-4 px-3 pb-4 text-center">
              <h2 className="text-lg font-semibold text-black">{product.title}</h2>
              <p className="text-[#3e402d] font-bold mt-2">₹ {product.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

