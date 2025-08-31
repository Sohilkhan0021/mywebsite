import { useRouter } from "next/router";
import { useState } from "react";
import { useCart } from "@/amitkk/context/CartContext";

const products = [
  { id: "1", img: "/images-new/home-page-img-1.webp", title: "Discover Beautiful Crafts", subtitle: "Handmade with love and care", price: "₹2500",category: "Decor",details: "Handmade with love and care"  },
  { id: "2", img: "/images-new/home-page-img-2.webp", title: "New Arrivals for You", subtitle: "Explore our latest collection", price: "₹3200",category: "Decor",details: "Handmade with love and care"  },
  { id: "3", img: "/images-new/home-page-img-3.avif", title: "Craft Your Dreams", subtitle: "Decorate your space creatively", price: "₹2800",category: "Decor", details: "Handmade with love and care" },
  { id: "4", img: "/images-new/home-page-img-4.avif", title: "Exclusive Paper Crafts", subtitle: "Unique designs to inspire", price: "₹1500",category: "Decor", details: "Handmade with love and care" },
  { id: "5", img: "/images-new/home-page-img-5.avif", title: "Make Every Moment Special", subtitle: "Crafts for every occasion", price: "₹2000" ,category: "Decor",details: "Handmade with love and care" },
  { id: "6", img: "/images-new/home-page-img-6.avif", title: "Shop Handmade with Passion", subtitle: "Support local artisans", price: "₹1800",category: "Decor", details: "Handmade with love and care" },
];

const craftProducts = [
  { id: "101", img: "/images-new/home-page-img-6.avif", title: "Handmade Decorative Item", subtitle: "Medium size craft piece", category: "Decor", price: "$250", details: "Handmade with love and care"},
  { id: "102", img: "/images-new/home-page-img-5.avif", title: "Handmade Decorative Item", subtitle: "Medium size craft piece", category: "Decor", price: "$250",details: "Handmade with love and care" },
  { id: "103", img: "/images-new/home-page-img-4.avif", title: "Handmade Decorative Item", subtitle: "Medium size craft piece", category: "Decor", price: "$250",details: "Handmade with love and care" },
  { id: "104", img: "/images-new/hand-made-jewelary.jpg", title: "Handmade Decorative Item", subtitle: "Medium size craft piece", category: "Decor", price: "$250", details: "Handmade with love and care"},
];

const singleProduct = [
  { id: "201", img: "/images-new/hand-bag.png", title: "Handmade Decorative Item", subtitle: "Medium size craft piece smdnksnf", category: "Decor", price: "$250",
    details: "A beautiful and elegant table accessory that will always be appreciated for its classy appeal. Use it as a multi-utility stationery or paper Holder. Entirely handcrafted. Every little hole in this intricately carved piece has been painstakingly and expertly crafted by hand. An ancient craft originally practiced on ivory now lends itself to different kinds of wood as well"
  },
];

const metalCraftProducts = [
  { id: "301", img: "/images-new/metal-product-img-2.webp", title: "Decorative Metal Vase", subtitle: "Premium handmade metal vase", price: "₹1500",category: "Decor", details: "Handmade with love and care" },
  { id: "302", img: "/images-new/metal-product-img.webp", title: "Handmade Metal Sculpture", subtitle: "Beautiful artisan sculpture", price: "₹2200",category: "Decor",details: "Handmade with love and care"  },
  { id: "303", img: "/images-new/work-img-3.webp", title: "Designer Metal Bowl", subtitle: "Stylish bowl for decor", price: "₹1800",category: "Decor", details: "Handmade with love and care" },
  { id: "304", img: "/images-new/work-img-3.webp", title: "Designer Metal Bowl", subtitle: "Stylish bowl for decor", price: "₹1800",category: "Decor", details: "Handmade with love and care" },
  { id: "305", img: "/images-new/metal-product-img-2.webp", title: "Decorative Metal Vase", subtitle: "Premium handmade metal vase", price: "₹1500",category: "Decor", details: "Handmade with love and care" },
  { id: "306", img: "/images-new/metal-product-img.webp", title: "Handmade Metal Sculpture", subtitle: "Beautiful artisan sculpture", price: "₹2200",category: "Decor", details: "Handmade with love and care" },
  { id: "307", img: "/images-new/metal-product-img-2.webp", title: "Decorative Metal Vase", subtitle: "Premium handmade metal vase", price: "₹1500",category: "Decor", details: "Handmade with love and care" },
  { id: "308", img: "/images-new/metal-product-img.webp", title: "Handmade Metal Sculpture", subtitle: "Beautiful artisan sculpture", price: "₹2200",category: "Decor", details: "Handmade with love and care" },
  { id: "309", img: "/images-new/work-img-3.webp", title: "Designer Metal Bowl", subtitle: "Stylish bowl for decor", price: "₹1800",category: "Decor", details: "Handmade with love and care" },
  { id: "310", img: "/images-new/metal-product-img-2.webp", title: "Decorative Metal Vase", subtitle: "Premium handmade metal vase", price: "₹1500",category: "Decor", details: "Handmade with love and care" },
  { id: "311", img: "/images-new/metal-product-img.webp", title: "Handmade Metal Sculpture", subtitle: "Beautiful artisan sculpture", price: "₹2200",category: "Decor", details: "Handmade with love and care" },
  { id: "312", img: "/images-new/work-img-3.webp", title: "Designer Metal Bowl", subtitle: "Stylish bowl for decor", price: "₹1800",category: "Decor",  details: "Handmade with love and care"},
];

const WorktProducts = [
  { id: "401", img: "/images-new/work-img-1.webp", title: "Decorative Metal Vase",subtitle: "Stylish bowl for decor", price: "₹1500",category: "Decor", details: "Handmade with love and care" },
  { id: "402", img: "/images-new/metal-product-img.webp", title: "Handmade Metal Sculpture",subtitle: "Stylish bowl for decor", price: "₹2200",category: "Decor",details: "Handmade with love and care"  },
  { id: "403", img: "/images-new/work-img-3.webp", title: "Designer Metal Bowl",subtitle: "Stylish bowl for decor", price: "₹1800",category: "Decor", details: "Handmade with love and care" },
  { id: "404", img: "/images-new/work-img-3.webp", title: "Designer Metal Bowl",subtitle: "Stylish bowl for decor", price: "₹1800",category: "Decor", details: "Handmade with love and care" },
  { id: "405", img: "/images-new/work-img-4.webp", title: "Decorative Metal Vase",subtitle: "Stylish bowl for decor", price: "₹1500",category: "Decor", details: "Handmade with love and care" },
  { id: "406", img: "/images-new/work-img-2.webp", title: "Handmade Metal Sculpture",subtitle: "Stylish bowl for decor", price: "₹2200",category: "Decor", details: "Handmade with love and care" },
  { id: "407", img: "/images-new/metal-product-img-2.webp", title: "Decorative Metal Vase",subtitle: "Stylish bowl for decor", price: "₹1500",category: "Decor",details: "Handmade with love and care"  },
  { id: "408", img: "/images-new/work-img-1.webp", title: "Handmade Metal Sculpture",subtitle: "Stylish bowl for decor", price: "₹2200",category: "Decor", details: "Handmade with love and care" },
  { id: "409", img: "/images-new/work-img-3.webp", title: "Designer Metal Bowl",subtitle: "Stylish bowl for decor", price: "₹1800",category: "Decor", details: "Handmade with love and care" },
  { id: "410", img: "/images-new/work-img-4.webp", title: "Decorative Metal Vase",subtitle: "Stylish bowl for decor", price: "₹1500",category: "Decor", details: "Handmade with love and care" },
  { id: "411", img: "/images-new/metal-product-img.webp", title: "Handmade Metal Sculpture",subtitle: "Stylish bowl for decor", price: "₹2200",category: "Decor", details: "Handmade with love and care" },
  { id: "412", img: "/images-new/work-img-1.webp", title: "Designer Metal Bowl",subtitle: "Stylish bowl for decor", price: "₹1800",category: "Decor",details: "Handmade with love and care"  },
];

const WomenProducts = [
  { id: "501", img: "/images-new/Ear-rings-1.jpg", title: "Decorative Metal Vase", subtitle: "Stylish bowl for decor",price: "₹1500",category: "Decor",  details: "Handmade with love and care"},
  { id: "502", img: "/images-new/Ear-rings-2.jpg", title: "Handmade Metal Sculpture",subtitle: "Stylish bowl for decor", price: "₹2200" ,category: "Decor",details: "Handmade with love and care" },
  { id: "503", img: "/images-new/Ear-rings-3.jpg", title: "Designer Metal Bowl",subtitle: "Stylish bowl for decor", price: "₹1800" ,category: "Decor",details: "Handmade with love and care" },
  { id: "504", img: "/images-new/Ear-rings-4.jpg", title: "Designer Metal Bowl",subtitle: "Stylish bowl for decor", price: "₹1800",category: "Decor", details: "Handmade with love and care" },
  { id: "505", img: "/images-new/Ear-rings-5.jpg", title: "Decorative Metal Vase",subtitle: "Stylish bowl for decor", price: "₹1500",category: "Decor",details: "Handmade with love and care"  },
  { id: "506", img: "/images-new/Ear-rings-6.jpg", title: "Handmade Metal Sculpture",subtitle: "Stylish bowl for decor", price: "₹2200",category: "Decor",details: "Handmade with love and care"  },
  { id: "507", img: "/images-new/Ear-rings-7.jpg", title: "Decorative Metal Vase",subtitle: "Stylish bowl for decor", price: "₹1500",category: "Decor",details: "Handmade with love and care"  },
  { id: "508", img: "/images-new/Ear-rings-1.jpg", title: "Handmade Metal Sculpture",subtitle: "Stylish bowl for decor", price: "₹2200",category: "Decor", details: "Handmade with love and care" },
  { id: "509", img: "/images-new/Ear-rings-2.jpg", title: "Designer Metal Bowl",subtitle: "Stylish bowl for decor", price: "₹1800" ,category: "Decor", details: "Handmade with love and care"},
  { id: "510", img: "/images-new/Ear-rings-3.jpg", title: "Decorative Metal Vase",subtitle: "Stylish bowl for decor", price: "₹1500" ,category: "Decor",details: "Handmade with love and care" },
  { id: "511", img: "/images-new/Ear-rings-4.jpg", title: "Handmade Metal Sculpture",subtitle: "Stylish bowl for decor", price: "₹2200" ,category: "Decor",details: "Handmade with love and care" },
  { id: "512", img: "/images-new/Ear-rings-5.jpg", title: "Designer Metal Bowl",subtitle: "Stylish bowl for decor", price: "₹1800",category: "Decor",details: "Handmade with love and care"  },
];

const homelivingProducts = [
  { id: "701", img: "/images-new/frame-1.webp", title: "Decorative Metal Vase", price: "₹1500" ,category: "Decor",  subtitle: "Handmade with love and care",details: "Handmade with love and care"},
  { id: "702", img: "/images-new/frame-3.jpg", title: "Handmade Metal Sculpture", price: "₹2200" ,category: "Decor", subtitle: "Handmade with love and care",details: "Handmade with love and care" },
  { id: "703", img: "/images-new/frame-4.jpg", title: "Designer Metal Bowl", price: "₹1800",category: "Decor",  subtitle: "Handmade with love and care",details: "Handmade with love and care" },
  { id: "704", img: "/images-new/frame-3.jpg", title: "Designer Metal Bowl", price: "₹1800" ,category: "Decor", subtitle: "Handmade with love and care",details: "Handmade with love and care" },
  { id: "705", img: "/images-new/frame-1.webp", title: "Decorative Metal Vase", price: "₹1500" ,category: "Decor",  subtitle: "Handmade with love and care",details: "Handmade with love and care"},
  { id: "706", img: "/images-new/frame-4.jpg", title: "Handmade Metal Sculpture", price: "₹2200",category: "Decor",  subtitle: "Handmade with love and care",details: "Handmade with love and care" },
  { id: "707", img: "/images-new/frame-1.webp", title: "Decorative Metal Vase", price: "₹1500",category: "Decor",  subtitle: "Handmade with love and care", details: "Handmade with love and care"},
  { id: "708", img: "/images-new/frame-3.jpg", title: "Handmade Metal Sculpture", price: "₹2200" ,category: "Decor",  subtitle: "Handmade with love and care",details: "Handmade with love and care"},
  { id: "709", img: "/images-new/frame-4.jpg", title: "Designer Metal Bowl", price: "₹1800",category: "Decor",  subtitle: "Handmade with love and care", details: "Handmade with love and care"},
  { id: "710", img: "/images-new/frame-3.jpg", title: "Decorative Metal Vase", price: "₹1500" ,category: "Decor",  subtitle: "Handmade with love and care",details: "Handmade with love and care"},
  { id: "711", img: "/images-new/frame-1.webp", title: "Handmade Metal Sculpture", price: "₹2200" ,category: "Decor",  subtitle: "Handmade with love and care",details: "Handmade with love and care"},
  { id: "712", img: "/images-new/frame-4.jpg", title: "Designer Metal Bowl", price: "₹1800" ,category: "Decor",  subtitle: "Handmade with love and care",details: "Handmade with love and care"},
];

export default function ProductDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  const allProducts = [
    ...products,
    ...craftProducts,
    ...singleProduct,
    ...metalCraftProducts,
    ...WorktProducts,
    ...WomenProducts,
    ...homelivingProducts,
  ];

const product = allProducts.find((p) => p.id === id);

  if (!product) {
    return <h2 className="text-center mt-20">Product not found</h2>;
  }

  const numericPrice = parseInt(product.price.replace(/[^0-9]/g, ""), 10) || 0;
  const totalPrice = numericPrice * quantity;

  const similarProducts = allProducts
    .filter((p) => p.id !== product.id && p.category === product.category)
    .slice(0, 4);

  return (
    <div className="w-[90%] md:w-[85%] mx-auto px-4 md:px-6 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        <img
          src={product.img}
          alt={product.title}
          className="w-full md:w-1/2 max-h-[500px] object-cover rounded-lg shadow-lg"
        />
        <div>
          <h2 className="text-2xl md:text-4xl font-bold text-gray-800">{product.title}</h2>
          <p className="text-lg md:text-2xl text-gray-600 mt-4">{product.subtitle}</p>
          <p className="text-base md:text-lg text-[#3e402d] mt-6">{product.details}</p>

          <div className="flex flex-col sm:flex-row sm:items-center gap-4 mt-6">
            <div className="flex items-center border border-black overflow-hidden w-fit">
              <button
                className="px-3 py-2 text-black cursor-pointer"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              >
                -
              </button>
              <span className="px-4 py-2 text-lg text-black">{quantity}</span>
              <button
                className="px-3 py-2 text-black cursor-pointer"
                onClick={() => setQuantity((q) => q + 1)}
              >
                +
              </button>
            </div>
            <button
              className="border border-[#3e402d] px-6 py-3 text-white cursor-pointer transition flex items-center gap-2 bg-[#3e402d] hover:bg-[#63654f] text-sm md:text-base"
              onClick={() =>
                addToCart({
                  ...product,
                  price: numericPrice,
                  quantity,
                })
              }
            >
              Add to your Cart -
              <span className="text-lg md:text-2xl font-bold">
                ₹{totalPrice.toLocaleString("en-IN")}
              </span>
            </button>
          </div>
        </div>
      </div>
      {similarProducts.length > 0 && (
        <div className="mt-12">
          <h3 className="text-2xl md:text-4xl font-bold mb-6 mt-10 text-[#3e402d]">
            Similar Products
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {similarProducts.map((sp) => (
              <div
                key={sp.id}
                className="border shadow hover:shadow-lg transition cursor-pointer p-4"
                onClick={() => router.push(`/product/${sp.id}`)}
              >
                <img
                  src={sp.img}
                  alt={sp.title}
                  className="w-full h-auto max-h-[220px] object-cover rounded-md"
                />
                <h4 className="text-base md:text-lg text-black font-semibold mt-4 mb-3">{sp.title}</h4>
                <p className="text-sm md:text-base text-black">{sp.subtitle}</p>
                <p className="text-[#3e402d] font-bold mt-2">{sp.price}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>

  );
}
