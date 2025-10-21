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
  addToCart: (product: Product, userId?: string) => void;
  removeFromCart: (id: string, userId?: string) => void;
  updateQuantity: (id: string, quantity: number, userId?: string) => void;
  clearCart: (userId?: string) => void;
  fetchCart: (userId: string) => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<Product[]>([]);

  // Load cart from localStorage for guest
  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("cart");
      if (stored) setCart(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Fetch cart from backend for logged-in user
  const fetchCart = async (userId: string) => {
    const res = await fetch(`/api/cart?userId=${userId}`);
    const data = await res.json();
    if (data?.cart) {
      setCart(
        data.cart.map((p: any) => ({
          id: p.productId,
          title: p.title,
          subtitle: p.subtitle,
          img: p.image,
          price: p.price,
          quantity: p.quantity,
        }))
      );
    }
  };

  // const addToCart = (product: Product, userId?: string) => {
  //   setCart((prev) => {
  //     const existing = prev.find((p) => p.id === product.id);
  //     const updated = existing
  //       ? prev.map((p) => (p.id === product.id ? { ...p, quantity: p.quantity + product.quantity } : p))
  //       : [...prev, product];

  //     if (userId) {
  //       fetch("/api/cart", {
  //         method: "POST",
  //         headers: { "Content-Type": "application/json" },
  //         body: JSON.stringify({
  //           userId,
  //           products: updated.map((p) => ({
  //             productId: p.id,
  //             title: p.title,
  //             subtitle: p.subtitle,
  //             image: p.img,
  //             price: p.price,
  //             quantity: p.quantity,
  //           })),
  //         }),
  //       }).catch(console.error);
  //     }

  //     return updated;
  //   });
  // };





  const addToCart = (product: Product, userId?: string) => {
  setCart((prev) => {
    const existing = prev.find((p) => p.id === product.id);
    const updated = existing
      ? prev.map((p) => 
          p.id === product.id 
          ? { ...p, quantity: p.quantity + product.quantity } 
          : p
        )
      : [...prev, product];

    if (userId) {
      fetch("/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
          products: updated.map((p) => ({
            productId: p.id,
            title: p.title,
            subtitle: p.subtitle,
            image: p.img,
            price: p.price,
            quantity: p.quantity,
          })),
        }),
      }).catch(console.error);
    }

    return updated;
  });
};


  const removeFromCart = (id: string, userId?: string) => {
    setCart((prev) => {
      const updated = prev.filter((p) => p.id !== id);
      if (userId) {
        fetch("/api/cart?userId=" + userId + "&productId=" + id, { method: "DELETE" }).catch(console.error);
      }
      return updated;
    });
  };

  const updateQuantity = (id: string, quantity: number, userId?: string) => {
    setCart((prev) =>
      prev.map((p) => {
        const updatedProduct = p.id === id ? { ...p, quantity } : p;
        if (userId) {
          fetch("/api/cart", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              userId,
              products: prev.map((p) =>
                p.id === id ? { ...p, quantity } : p
              ),
            }),
          }).catch(console.error);
        }
        return updatedProduct;
      })
    );
  };

  const clearCart = (userId?: string) => {
    setCart([]);
    localStorage.removeItem("cart");
    if (userId) fetch("/api/cart?userId=" + userId, { method: "DELETE" }).catch(console.error);
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, fetchCart }}
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
