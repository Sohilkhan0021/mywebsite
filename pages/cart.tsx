// "use client";
// import { useCart } from "@/amitkk/context/CartContext";
// import { useRouter } from "next/navigation";

// export default function CartPage() {
//   const { cart, updateQuantity, removeFromCart } = useCart();
//   const router = useRouter();

//   if (cart.length === 0) {
//     return <h2 className="text-center text-black mt-20 text-2xl ">Your cart is empty 🛒</h2>;
//   }

//   const subtotal = cart.reduce(
//     (sum, item) => sum + Number(item.price) * item.quantity, 0);

//   return (
//     <div className="w-[85%] mx-auto py-12 flex flex-col lg:flex-row gap-12 mt-8">
//       <div className="flex-1 space-y-8">
//         {cart.map((item) => (
//           <div key={item.id} className="flex gap-6 border-b border-gray-300 pb-6">
//             <div className="w-32 h-32 flex-shrink-0">
//               <img
//                 src={item.img}
//                 alt={item.title}
//                 className="w-full h-full object-cover rounded"
//               />
//             </div>
//             <div className="flex flex-col justify-between flex-1 text-black">
//               <div>
//                 <h3 className="text-base sm:text-lg font-semibold break-words">{item.title}</h3>
//                 {item.subtitle && (
//                   <p className="text-sm text-gray-500">{item.subtitle}</p>
//                 )}
//               </div>
//               <div className="flex items-center gap-4 mt-4">
//                 <button
//                   className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
//                   onClick={() => updateQuantity(item.id, item.quantity - 1)}
//                   disabled={item.quantity <= 1}
//                 >
//                   -
//                 </button>
//                 <span className="px-2">{item.quantity}</span>
//                 <button
//                   className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
//                   onClick={() => updateQuantity(item.id, item.quantity + 1)}
//                 >
//                   +
//                 </button>
//               </div>
//             </div>
//             <div className="flex flex-col items-end justify-between">
//               <p className="text-lg font-semibold text-black">
//                 ₹{(Number(item.price) * item.quantity).toLocaleString("en-IN")}
//               </p>
//               <button
//                 onClick={() => removeFromCart(item.id)}
//                 className="text-red-500  mt-2 cursor-pointer"
//               >
//                 ✕
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//       <div className="w-full lg:w-1/3 bg-[#EAE2D8] p-8 border h-fit">
//         <div className="flex justify-between text-black mb-4">
//           <span className="text-xl">Subtotal</span>
//           <span className="text-xl">₹{subtotal.toLocaleString("en-IN")}</span>
//         </div>
//         <hr />
//         <div className="flex justify-between font-bold text-xl mt-4 text-black">
//           <span className="text-xl">Total</span>
//           <span>₹{subtotal.toLocaleString("en-IN")}</span>
//         </div>
//         <button
//           onClick={() => {
//             const checkoutId = Math.random().toString(36).substr(2, 22);
//             router.push(`/checkouts/cn/${checkoutId}`);
//           }}
//           className="w-full bg-[#3e402d] text-white py-3 rounded hover:bg-[#63654f] cursor-pointer mt-6"
//         >
//           CHECK OUT
//         </button>
//       </div>
//     </div>
//   );
// }

"use client";
import { useCart } from "@/amitkk/context/CartContext";
import { useRouter } from "next/navigation";

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart } = useCart();
  const router = useRouter();

  if (cart.length === 0) {
    return (
      <h2 className="text-center text-black mt-20 text-2xl">
        Your cart is empty 🛒
      </h2>
    );
  }

  const subtotal = cart.reduce(
    (sum, item) => sum + Number(item.price) * item.quantity,
    0
  );

  return (
    <div className="w-[90%] lg:w-[85%] mx-auto py-12 flex flex-col lg:flex-row gap-12 mt-8">
      {/* 🛒 Cart Items */}
      <div className="flex-1 space-y-8">
        {cart.map((item) => (
          <div
            key={item.id}
            className="flex flex-col sm:flex-row gap-6 border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow bg-white"
          >
            {/* Image */}
            <div className="w-full sm:w-32 h-32 flex-shrink-0">
              <img
                src={item.img}
                alt={item.title}
                className="w-full h-full object-cover rounded"
              />
            </div>

            {/* Details */}
            <div className="flex flex-col justify-between flex-1 text-black">
              <div>
                <h3 className="text-lg font-semibold break-words">
                  {item.title}
                </h3>
                {item.subtitle && (
                  <p className="text-sm text-gray-500">{item.subtitle}</p>
                )}
              </div>

              {/* Quantity Controls */}
              <div className="flex items-center gap-4 mt-4">
                <button
                  className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 text-lg font-semibold"
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  disabled={item.quantity <= 1}
                >
                  −
                </button>
                <span className="px-3 text-base">{item.quantity}</span>
                <button
                  className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 text-lg font-semibold"
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                >
                  +
                </button>
              </div>
            </div>

            {/* Price & Remove */}
            <div className="flex flex-col items-end justify-between">
              <button
                onClick={() => removeFromCart(item.id)}
                className="text-red-600 text-2xl font-bold hover:text-red-800 bg-red-100 hover:bg-red-200 rounded-full w-8 h-8 flex items-center justify-center mt-2 transition-colors"
                title="Remove item"
              >
                ✕
              </button>
              <p className="text-lg font-semibold text-black">
                ₹{(Number(item.price) * item.quantity).toLocaleString("en-IN")}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* 🧾 Summary Section */}
      <div className="w-full lg:w-1/3 bg-[#F6F3EF] p-8 border border-gray-200 rounded-lg shadow-sm h-fit">
        <h2 className="text-2xl font-semibold text-black mb-6">Order Summary</h2>
        <div className="flex justify-between text-black mb-4">
          <span className="text-lg">Subtotal</span>
          <span className="text-lg">₹{subtotal.toLocaleString("en-IN")}</span>
        </div>
        <hr className="border-gray-300 mb-4" />
        <div className="flex justify-between font-bold text-xl text-black">
          <span>Total</span>
          <span>₹{subtotal.toLocaleString("en-IN")}</span>
        </div>
        <button
          onClick={() => {
            const checkoutId = Math.random().toString(36).substr(2, 22);
            router.push(`/checkouts/cn/${checkoutId}`);
          }}
          className="w-full bg-[#3e402d] text-white py-3 rounded mt-6 hover:bg-[#5a5c44] transition-colors text-lg font-medium"
        >
          CHECK OUT
        </button>
      </div>
    </div>
  );
}
