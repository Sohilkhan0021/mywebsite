"use client";
import { createContext, useContext, useState, ReactNode } from "react";

type Product = {
  id: string;
  img: string;
  title: string;
  subtitle?: string;
  price: number; 
  quantity: number;
};

type CartContextType = {
  cart: Product[];
  addToCart: (product: Product) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, newQuantity: number) => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<Product[]>([]);

  const addToCart = (product: Product) => {
    const cleanProduct: Product = {
      ...product,
      price: Number(product.price),
      quantity: product.quantity || 1,
    };

    setCart((prev) => {
      const existing = prev.find((p) => p.id === cleanProduct.id);
      if (existing) {
        return prev.map((p) =>
          p.id === cleanProduct.id
            ? { ...p, quantity: p.quantity + cleanProduct.quantity }
            : p
        );
      }
      return [...prev, cleanProduct];
    });
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((p) => p.id !== id));
  };

  const updateQuantity = (id: string, newQuantity: number) => {
    setCart((prev) =>
      prev.map((p) =>
        p.id === id
          ? { ...p, quantity: newQuantity > 0 ? newQuantity : 1 }
          : p
      )
    );
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, updateQuantity }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
