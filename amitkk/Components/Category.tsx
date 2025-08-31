"use client";
import { useState } from "react";
import Link from "next/link";
import { Heart } from "lucide-react";
import { useWishlist } from "@/amitkk/context/WishlistContext";

const craftProducts = [
  {
    id: 101,
    img: "/images-new/home-page-img-6.avif",
    titleamt: "$250",
    size: "Medium",
    type: "Handmade Decorative Item",
    category: "Decor",
    amt: "$250",
  },
  {
    id: 102,
    img: "/images-new/home-page-img-5.avif",
    titleamt: "$250",
    size: "Medium",
    type: "Handmade Decorative Item",
    category: "Decor",
    amt: "$250",
  },
  {
    id: 103,
    img: "/images-new/home-page-img-4.avif",
    titleamt: "$250",
    size: "Medium",
    type: "Handmade Decorative Item",
    category: "Decor",
    amt: "$250",
  },
  {
    id: 104,
    img: "/images-new/hand-made-jewelary.jpg",
    titleamt: "$250",
    size: "Medium",
    type: "Handmade Decorative Item",
    category: "Decor",
    amt: "$250",
  },
];

export default function CraftGrid() {
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

  const filteredItems = filter === "All" ? craftProducts : craftProducts.filter((item) => item.category === filter);

  const categories = ["All", "Decor", "DIY Kit", "Home", "Jewelry"];

  return (
    <section className="bg-[#fdf8f4] py-12">
      <div className="w-[85%] mx-auto text-center">
        <div className="inline-flex rounded-full overflow-hidden border border-[#3e402d] mb-8">
          {categories.map((name, idx) => (
            <button
              key={name}
              type="button"
              onClick={() => setFilter(name)}
              className={`relative px-4 py-2 font-medium flex items-center cursor-pointer ${
                filter === name
                  ? "bg-[#3e402d] text-white"
                  : "bg-white text-[#3e402d] hover:bg-[#313323] hover:text-white"
              } transition-colors duration-200 ${
                idx !== categories.length - 1 ? "border-r border-[#3e402d]" : ""
              }`}
            >
              {name}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="relative w-full max-w-xs rounded-lg shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl"
            >
              <img
                src={item.img}
                alt={item.type}
                className="w-full h-80 object-cover"
              />
              <div className="absolute top-3 right-3 p-2 cursor-pointer z-10" onClick={() => toggleLike(item)}>
                {likedItems[item.id] ? <Heart className="w-6 h-6 fill-white text-white" /> : <Heart className="w-6 h-6 text-white" />}
              </div>
              <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 hover:opacity-60 transition-opacity duration-300 flex flex-col justify-center items-center text-white px-4">
                <h3 className="text-xl font-bold py-2">{item.type}</h3>
                <h2 className="text-2xl mb-2">{item.amt}</h2>
                <Link href={`/product/${item.id}`}>
                  <button className="bg-white text-black rounded-xl px-6 py-2 font-semibold cursor-pointer hover:bg-gray-200 transition">
                    Buy Now
                  </button>
                </Link>
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-white bg-opacity-80 backdrop-blur-sm p-3 text-black flex justify-between items-center transition-all duration-300">
                <span>{item.type}</span>
                <span>{item.titleamt}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
