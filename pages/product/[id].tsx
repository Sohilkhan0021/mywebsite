"use client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useCart } from "@/amitkk/context/CartContext";

interface Product {
  _id: string;
  img: string;
  title: string;
  subtitle?: string;
  details: string;
  price: string | number;
  category: string;
  stock: number;
}

export default function ProductPage() {
  const router = useRouter();
  const { id } = router.query;
  const { addToCart } = useCart();

  const [product, setProduct] = useState<Product | null>(null);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [showFullDescription, setShowFullDescription] = useState(false);

  const user = typeof window !== "undefined" ? JSON.parse(localStorage.getItem("user") || "null") : null;
  const userId = user?.id;


  useEffect(() => {
    if (id) {
      fetch(`/api/products/${id}`)
        .then((res) => res.json())
        .then((data) => setProduct(data));

      fetch(`/api/products`)
        .then((res) => res.json())
        .then((data) => setAllProducts(data));
    }
  }, [id]);

  if (!product)
    return <p className="text-center mt-20 text-gray-600">Loading...</p>;

  const numericPrice =
    parseInt(String(product.price).replace(/[^0-9]/g, ""), 10) || 0;
  const totalPrice = numericPrice * quantity;

  const similarProducts = allProducts
    .filter((p) => p._id !== product._id && p.category === product.category)
    .slice(0, 4);

  const handleBuyNow = () => {
    const singleProduct = {
      ...product,
      price: numericPrice,
      quantity,
      id: product._id,
    };

    localStorage.setItem("checkoutProduct", JSON.stringify(singleProduct));

    const checkoutId = Math.random().toString(36).substr(2, 22);
    router.push(`/checkouts/cn/${checkoutId}?buyNow=true`);
  };

  return (
    <div className="w-[92%] sm:w-[90%] md:w-[85%] mx-auto px-3 sm:px-4 md:px-6 py-8 mt-8 text-black">
      <div className="flex flex-col md:flex-row gap-8 items-start">
        <div className="w-full md:w-1/2 flex justify-center">
          <img
            src={product.img}
            alt={product.title}
            className="w-full max-w-md md:max-w-full h-auto max-h-[500px] object-cover rounded-lg shadow-sm"
          />
        </div>

        <div className="hidden md:block md:w-1/2">
          <h2 className="text-2xl md:text-4xl font-bold text-gray-800 break-words">
            {product.title}
          </h2>

          {product.subtitle && (
            <p className="text-lg md:text-2xl text-gray-600 mt-4 break-words">
              {product.subtitle}
            </p>
          )}

          <p className="text-base md:text-lg text-gray-700 mt-6 leading-relaxed break-words">
            {product.details}
          </p>

          <div className="flex flex-wrap items-center gap-4 mt-6">
            <div className="flex items-center border border-black overflow-hidden">
              <button
                className="px-3 py-2 text-black"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              >
                -
              </button>
              <span className="px-4 py-2 text-lg">{quantity}</span>
              <button
                className="px-3 py-2 text-black"
                onClick={() => setQuantity((q) => q + 1)}
              >
                +
              </button>
            </div>
            
            <button
              className="border border-[#3e402d] px-4 py-2 text-white transition flex items-center gap-2 bg-[#3e402d] hover:bg-[#63654f] text-sm md:text-base cursor-pointer"
              onClick={() =>
                addToCart({
                   id: product._id,      
                title: product.title,
                subtitle: product.subtitle,
                img: product.img,
                price: numericPrice,
                quantity,
                stock: product.stock,
                },
                userId,
              )
              }
            >
              Add to your Cart
            </button>
          </div>

          <div className="mt-4">
            {product.stock > 0 ? (
              <span className="text-green-600 font-semibold">
                {product.stock} in stock
              </span>
            ) : (
              <span className="text-red-600 font-semibold">Out of stock</span>
            )}
          </div>

          <button
            className="border border-[#3e402d] px-12 py-2 text-white transition flex items-center gap-2 bg-[#3e402d] hover:bg-[#63654f] text-sm md:text-base cursor-pointer disabled:opacity-50"
            onClick={handleBuyNow}
            disabled={product.stock === 0}
          >
            BUY NOW AT -
            <span className="text-lg md:text-2xl font-bold">
              ₹{totalPrice.toLocaleString("en-IN")}
            </span>
          </button>
        </div>
      </div> 
      <div className="md:hidden mt-6">
        <h2 className="text-2xl font-bold text-gray-800">{product.title}</h2>
        {product.subtitle && (
          <p className="text-lg text-gray-600 mt-2">{product.subtitle}</p>
        )}
        <p className="text-base text-[#3e402d] mt-4 leading-relaxed">
          {showFullDescription
            ? product?.details
            : `${product?.details?.substring(0, 100) || ""}... `}
          <button
            className="text-blue-600 font-semibold ml-1"
            onClick={() => setShowFullDescription(!showFullDescription)}
          >
            {showFullDescription ? "Less" : "More"}
          </button>
        </p>

        <div className="flex flex-wrap items-center gap-4 mt-4">
          <div className="flex items-center border border-black overflow-hidden">
            <button
              className="px-3 py-2 text-black"
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            >
              -
            </button>
            <span className="px-4 py-2 text-lg text-black">{quantity}</span>
            <button
              className="px-3 py-2 text-black"
              onClick={() => setQuantity((q) => q + 1)}
            >
              +
            </button>
          </div>
          <button
            className="border border-[#3e402d] px-4 py-2 text-white transition flex items-center gap-2 bg-[#3e402d] hover:bg-[#63654f] text-sm cursor-pointer"
            onClick={() =>
              addToCart({
                 id: product._id,      
                title: product.title,
                subtitle: product.subtitle,
                img: product.img,
                price: numericPrice,
                quantity,
                stock: product.stock,
              },
              userId
            )
            }
          >
            Add to your Cart
          </button>
        </div>

        <div className="mt-4">
          {product.stock > 0 ? (
            <span className="text-green-600 font-semibold">
              {product.stock} in stock
            </span>
          ) : (
            <span className="text-red-600 font-semibold">Out of stock</span>
          )}
        </div>

        <button
          className="border border-[#3e402d] px-14 py-2 mt-4 text-white transition flex items-center gap-2 bg-[#3e402d] hover:bg-[#63654f] text-sm md:text-base cursor-pointer disabled:opacity-50"
          onClick={handleBuyNow}
          disabled={product.stock === 0}
        >
          BUY NOW At -
          <span className="text-lg md:text-2xl font-bold">
            ₹{totalPrice.toLocaleString("en-IN")}
          </span>
        </button>
      </div>
      {similarProducts.length > 0 && (
        <div className="mt-12">
          <h3 className="text-2xl md:text-4xl font-bold mb-6 mt-10 text-[#3e402d]">
            Similar Products
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6">
            {similarProducts.map((sp) => (
              <div
                key={sp._id}
                className="border shadow hover:shadow-lg transition p-3 sm:p-4 rounded-lg cursor-pointer bg-white"
                onClick={() => router.push(`/product/${sp._id}`)}
              >
                <img
                  src={sp.img}
                  alt={sp.title}
                  className="w-full h-auto max-h-[220px] object-cover rounded-md"
                />
                <h4 className="text-base md:text-lg font-semibold mt-3 mb-2 truncate">
                  {sp.title}
                </h4>
                {sp.subtitle && (
                  <p className="text-sm md:text-base text-gray-700 truncate">
                    {sp.subtitle}
                  </p>
                )}
                <p className="text-[#3e402d] font-bold mt-2">{sp.price}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

 