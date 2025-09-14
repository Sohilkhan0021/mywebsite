import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Header from "@/amitkk/Header";
import Footer from "@/amitkk/Footer";
import { CartProvider } from "@/amitkk/context/CartContext";
import { WishlistProvider } from "@/amitkk/context/WishlistContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <CartProvider>
      <WishlistProvider>
        <Header />
        <main className="w-full min-h-screen pt-4 bg-[#f9f4ee]">
          <div className=" w-full">
            <Component {...pageProps} />
          </div>
        </main>
        <Footer />
      </WishlistProvider>
    </CartProvider>
  );
}
