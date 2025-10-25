// "use client";
// import { createContext, useContext, useState, useEffect, ReactNode } from "react";

// type Product = {
//   id: string;
//   title: string;
//   subtitle?: string;
//   img?: string; 
//   price?: number;
//   quantity: number;
//    stock?: number;
// };

// type CartContextType = {
//   cart: Product[];
//   addToCart: (product: Product, userId?: string) => void;
//   removeFromCart: (id: string, userId?: string) => void;
//   updateQuantity: (id: string, quantity: number, userId?: string) => void;
//   clearCart: (userId?: string) => void;
//   fetchCart: (userId: string) => void;
// };

// const CartContext = createContext<CartContextType | undefined>(undefined);

// export function CartProvider({ children }: { children: ReactNode }) {
//   const [cart, setCart] = useState<Product[]>([]);
//   const [userId, setUserId] = useState<string | null>(null);

// useEffect(() => {
//   if (typeof window !== "undefined") {
//     const storedUser = localStorage.getItem("user");
//     if (storedUser) {
//       const user = JSON.parse(storedUser);
//       setUserId(user.id); // ya user._id agar aisa hai
//     }
//   }
// }, []);
//   // Load cart from localStorage for guest
// useEffect(() => {
//     const fetchCart = async () => {
//       if (userId) {
//         // ✅ Logged-in user → fetch from backend
//         try {
//           const res = await fetch(`/api/cart?userId=${userId}`);
//           const data = await res.json();
//           if (data?.cart) {
//             setCart(
//               data.cart.map((p: any) => ({
//                 id: p.productId,
//                 title: p.title,
//                 subtitle: p.subtitle,
//                 img: p.img || p.image,
//                 price: p.price,
//                 quantity: p.quantity,
//                 stock: p.stock || 0,
//               }))
//             );
//           }
//         } catch (err) {
//           console.error("Failed to fetch cart:", err);
//         }
//       } else if (typeof window !== "undefined") {
//         // 🔹 Guest user → load from localStorage
//         const stored = localStorage.getItem("cart");
//         if (stored) setCart(JSON.parse(stored));
//       }
//     };

//     fetchCart();
//   }, [userId, setCart]);

//   // Save cart to localStorage if guest
//   useEffect(() => {
//     if (!userId && typeof window !== "undefined") {
//       localStorage.setItem("cart", JSON.stringify(cart));
//     }
//   }, [cart, userId]);

// //   const addToCart = (product: Product, userId?: string) => {
// //   setCart((prev) => {
// //     const existing = prev.find((p) => p.id === product.id);
// //     const updated = existing
// //       ? prev.map((p) => 
// //           p.id === product.id 
// //           ? { ...p, quantity: p.quantity + product.quantity } 
// //           : p
// //         )
// //       : [...prev, product];

// //     if (userId) {
// //       fetch("/api/cart", {
// //         method: "POST",
// //         headers: { "Content-Type": "application/json" },
// //         body: JSON.stringify({
// //           userId,
// //           products: updated.map((p) => ({
// //             productId: p.id,
// //             title: p.title,
// //             subtitle: p.subtitle,
// //             image: p.img,
// //             price: p.price,
// //             quantity: p.quantity,
// //           })),
// //         }),
// //       }).catch(console.error);
// //     }

// //     return updated;
// //   });
// // };
// const addToCart = (product: Product, userId?: string) => {
//   if (userId) {
//   fetch("/api/cart", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({
//       userId,
//       product: {
//         id: product.id,
//         title: product.title,
//         subtitle: product.subtitle || "",
//         img: product.img,
//         price: product.price,
//         quantity: product.quantity || 1,
//         stock: product.stock || 0,
//       },
//     }),
//   }).catch(console.error);
// } else {
//     // 🛒 User not logged in → Local storage cart
//     const existingCart = JSON.parse(localStorage.getItem("cart") || "[]");

//     const existing = existingCart.find((p: Product) => p.id === product.id);
//     const updated = existing
//       ? existingCart.map((p: Product) =>
//           p.id === product.id
//             ? { ...p, quantity: p.quantity + product.quantity }
//             : p
//         )
//       : [...existingCart, product];

//     localStorage.setItem("cart", JSON.stringify(updated));
//   }
// };


// const removeFromCart = (id: string, userId?: string) => {
//   if (userId) {
//     // 🧩 User is logged in → Remove item via API only
//     fetch(`/api/cart?userId=${userId}&productId=${id}`, {
//       method: "DELETE",
//     }).catch(console.error);

//   } else {
//     // 🛒 User not logged in → Remove from localStorage
//     const existingCart = JSON.parse(localStorage.getItem("cart") || "[]");
//     const updated = existingCart.filter((p: Product) => p.id !== id);

//     localStorage.setItem("cart", JSON.stringify(updated));

//     // Optional: UI update ke liye state sync
//     setCart(updated);
//   }
// };


//   const updateQuantity = (id: string, quantity: number, userId?: string) => {
//   if (userId) {
//     // 🧩 User is logged in → update via API only
//     fetch("/api/cart", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         userId,
//         productId: id,
//         quantity,
//       }),
//     }).catch(console.error);

//   } else {
//     // 🛒 User not logged in → update in localStorage + local state
//     const existingCart = JSON.parse(localStorage.getItem("cart") || "[]");

//     const updatedCart = existingCart.map((p: Product) =>
//       p.id === id ? { ...p, quantity } : p
//     );

//     localStorage.setItem("cart", JSON.stringify(updatedCart));
//     setCart(updatedCart);
//   }
// };


//   const clearCart = (userId?: string) => {
//     setCart([]);
//     localStorage.removeItem("cart");
//     if (userId) fetch("/api/cart?userId=" + userId, { method: "DELETE" }).catch(console.error);
//   };

//   return (
//     <CartContext.Provider
//       value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, fetchCart }}
//     >
//       {children}
//     </CartContext.Provider>
//   );
// }

// export function useCart() {
//   const context = useContext(CartContext);
//   if (!context) throw new Error("useCart must be used within CartProvider");
//   return context;
// }


"use client";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Product = {
  id: string;
  title: string;
  subtitle?: string;
  img?: string; 
  price?: number;
  quantity: number;
  stock?: number;
};

type CartContextType = {
  cart: Product[];
  addToCart: (product: Product) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  // clearCart: () => void;
  fetchCart: () => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<Product[]>([]);
  const [userId, setUserId] = useState<string | null>(null);

  // 🔹 Load userId from localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        const user = JSON.parse(storedUser);
        setUserId(user.id || user._id);
      }
    }
  }, []);

  // 🔹 Load cart from backend (if logged-in) or localStorage (if guest)
  const fetchCart = async () => {
    if (userId) {
          try {
          const res = await fetch(`/api/cart?userId=${userId}`);
          const data = await res.json();
          console.log("Fetched cart data:", data);
          if (data?.cart?.products) {
            setCart(
              data.cart.products.map((p: any) => ({
                id: p.productId,
                title: p.title,
                subtitle: p.subtitle,
                img: p.img || p.image,
                price: p.price,
                quantity: p.quantity,
                stock: p.stock || 0,
              }))
            );
          }
        } catch (err) {
        console.error("Failed to fetch cart:", err);
      }
    } else if (typeof window !== "undefined") {
      const stored = localStorage.getItem("cart");
      if (stored) setCart(JSON.parse(stored));
    }
  };

  useEffect(() => {
    fetchCart();
  }, [userId]);

  // 🔹 Sync localStorage if guest
  useEffect(() => {
    if (!userId && typeof window !== "undefined") {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart, userId]);

  // 🔹 Add to cart
  const addToCart = (product: Product) => {
    if (userId) {
      // Backend API
      fetch("/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
          product: {
            id: product.id,
            title: product.title,
            subtitle: product.subtitle || "",
            img: product.img,
            price: product.price,
            quantity: product.quantity || 1,
            stock: product.stock || 0,
          },
        }),
      }).then((res) => {
  if (!res.ok) throw new Error("Failed to update cart");
  return res.json();
})
.then((data) => {
  alert("Cart has been updated");
  setCart(
    data.cart.products.map((p: any) => ({
      id: p.productId,
      title: p.title,
      subtitle: p.subtitle,
      img: p.img,
      price: p.price,
      quantity: p.quantity,
      stock: p.stock,
    }))
  );
})

    .catch((err) => {
      console.error(err);
      alert("Failed to update cart");
    });
} else {
      // LocalStorage for guest
      const existingCart: Product[] = JSON.parse(localStorage.getItem("cart") || "[]");
      const existing = existingCart.find((p) => p.id === product.id);
      const updated = existing
        ? existingCart.map((p) =>
            p.id === product.id
              ? { ...p, quantity: p.quantity + product.quantity }
              : p
          )
        : [...existingCart, product];

      localStorage.setItem("cart", JSON.stringify(updated));
      setCart(updated);
    }
  };

  const removeFromCart = (id: string) => {
    if (userId) {
      fetch(`/api/cart?userId=${userId}&productId=${id}`, {
        method: "DELETE",
      }).catch(console.error);
    } else {
      const existingCart: Product[] = JSON.parse(localStorage.getItem("cart") || "[]");
      const updated = existingCart.filter((p) => p.id !== id);
      localStorage.setItem("cart", JSON.stringify(updated));
      setCart(updated);
    }
  };

  // 🔹 Update quantity
  const updateQuantity = (id: string, quantity: number) => {
    if (userId) {
       const product = cart.find((p) => p.id === id);
       if (!product) return;
      fetch("/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
          product: { ...product, quantity },
        }),
      }).catch(console.error);
    } else {
      const existingCart: Product[] = JSON.parse(localStorage.getItem("cart") || "[]");
      const updatedCart = existingCart.map((p) =>
        p.id === id ? { ...p, quantity } : p
      );
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      setCart(updatedCart);
    }
  };

  // 🔹 Clear cart
  // const clearCart = () => {
  //   setCart([]);
  //   localStorage.removeItem("cart");
  //   if (userId) {
  //     fetch(`/api/cart?userId=${userId}`, { method: "DELETE" }).catch(console.error);
  //   }
  // };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, updateQuantity, fetchCart }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
}
