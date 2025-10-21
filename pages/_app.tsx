import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { Toaster } from "react-hot-toast";
import Header from "@/amitkk/Header";
import Footer from "@/amitkk/Footer";
import { CartProvider } from "@/amitkk/context/CartContext";
import { WishlistProvider } from "@/amitkk/context/WishlistContext";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  // Admin routes start with "/admin"
  const isAdminRoute = router.pathname.startsWith("/admin");

  return (
    <CartProvider>
      <WishlistProvider>
        {/* Header only shows if NOT admin route */}
        {!isAdminRoute && <Header />}

        <main className={`w-full min-h-screen ${!isAdminRoute ? "pt-4 bg-[#f9f4ee]" : ""}`}>
          <Toaster position="top-right" reverseOrder={false} />
          <div className="w-full">
            <Component {...pageProps} />
          </div>
        </main>

        {/* Footer only shows if NOT admin route */}
        {!isAdminRoute && <Footer />}
      </WishlistProvider>
    </CartProvider>
  );
}
