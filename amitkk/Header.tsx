"use client";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import { ShoppingCart, Heart, Search, MapPin, Menu } from "lucide-react";
import { useCart } from "@/amitkk/context/CartContext";
import { useWishlist } from "@/amitkk/context/WishlistContext";

export default function Header() {
  const [user, setUser] = useState<{ name?: string; role?: string } | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [cartSidebarOpen, setCartSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const { cart, updateQuantity } = useCart();
  const cartCount = cart.length;
  const { wishlist } = useWishlist();



useEffect(() => {
  const handleStorageChange = () => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      setUser(null);
    }
  };

  window.addEventListener("storage", handleStorageChange);
  handleStorageChange(); 

  return () => {
    window.removeEventListener("storage", handleStorageChange);
  };
}, []);


  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    router.push("/");
  };

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);
  const toggleCartSidebar = () => setCartSidebarOpen((prev) => !prev);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?query=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
    }
  };

  return (
    <>
      <header className="bg-[#F9F2EA] shadow fixed top-0 left-0 w-full z-50 ">
        <div className="max-w-[1200px] w-full mx-auto px-4 sm:px-6 md:px-2 flex justify-between items-center py-4">
          <nav className="hidden md:flex items-center lg:gap-8 md:gap-4 text-[#7a7469] font-medium">
            <Link href="/">Home</Link>
            <Link href="/">Shop</Link>
            <Link href="/Our-Story">Our Story</Link>
            <Link href="/wholesale">Wholesale</Link>
            <Link href="/contect-us">Contact</Link>
            <Link href="/offers">Offers</Link>
          </nav>

          <button onClick={toggleSidebar} className="block md:hidden text-[#4E5036]">
            <Menu className="w-6 h-6" />
          </button>
          <div className="flex items-center gap-6 text-[#4E5036]">
            {!user ? (
              <Link href="/login" className="hover:underline text-[#4E5036] cursor-pointer">
                Login
              </Link>
            ) : (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen((prev) => !prev)}
                  className="w-8 h-8 rounded-full bg-white text-[#4E5036] flex items-center justify-center font-bold cursor-pointer"
                >
                  {user.name?.charAt(0).toUpperCase() || "U"}
                </button>
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-40 bg-white text-black rounded shadow-lg z-50">
                    <button
                      onClick={() => {
                        setDropdownOpen(false);
                        router.push("/profile");
                      }}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    >
                      Your Profile
                    </button>
                    <button
                      onClick={() => {
                        setDropdownOpen(false);
                        handleLogout();
                      }}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-red-500 cursor-pointer"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}

            <MapPin className="w-5 h-5 cursor-pointer" />
            <Search className="w-5 h-5 cursor-pointer" />
             
              <div className="flex items-center gap-6">
                <Link href="/Wishlist" className="relative cursor-pointer">
                <Heart className="w-6 h-6 text-[#3e402d]" />
                {wishlist.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-[#3e402d] text-white w-5 h-5 text-xs rounded-full flex items-center justify-center">
                    {wishlist.length}
                  </span>
                )}
              </Link>
              </div>
            <button onClick={toggleCartSidebar} className="relative flex items-center cursor-pointer">
              <ShoppingCart className="w-6 h-6" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#63654f] text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>
      <div
        className={`fixed inset-0 z-40  bg-opacity-40 transition-opacity duration-300 ${
          sidebarOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setSidebarOpen(false)}
      />
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-50 transform transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center px-4 py-3 border-b border-gray-200">
          <p className="text-black text-xl font-semibold">Menu</p>
          <button  onClick={() => setSidebarOpen(false)}  className="text-gray-600 hover:text-black text-2xl font-bold cursor-pointer"> ✕ </button>
        </div>
        <nav className="p-4 space-y-4 text-[#4E5036] font-medium">
          <Link href="/" onClick={() => setSidebarOpen(false)} className="block">Home</Link>
          <Link href="/" onClick={() => setSidebarOpen(false)} className="block">Shop</Link>
          <Link href="/Our-Story" onClick={() => setSidebarOpen(false)} className="block">Our Story</Link>
          <Link href="/wholesale" onClick={() => setSidebarOpen(false)} className="block">Wholesale</Link>
          <Link href="/contect-us" onClick={() => setSidebarOpen(false)} className="block">Contact</Link>
          <Link href="/offers" onClick={() => setSidebarOpen(false)} className="block">Offers</Link>
        </nav>
      </aside>
      <div
        className={`fixed inset-0 z-40 transition-opacity duration-300 ${
          cartSidebarOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setCartSidebarOpen(false)}
      />
      <aside
        className={`fixed top-0 right-0 h-full w-[80vw] md:w-[30vw] bg-white shadow-lg z-50 transform transition-transform duration-300 ${
          cartSidebarOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center px-4 py-3 border-b border-gray-200">
          <p className="text-black text-xl font-semibold">Review your Cart</p>
          <button
            onClick={() => setCartSidebarOpen(false)}
            className="text-gray-600 hover:text-black text-2xl font-bold cursor-pointer"
          >
            ✕
          </button>
        </div>
        <div className="p-4 space-y-4 text-black h-[calc(100%-60px)] overflow-y-auto mt-2">
            {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full space-y-4">
              <p>Your cart is empty</p>
              <button
                onClick={() => {
                  setCartSidebarOpen(false);
                  router.push("/");
                }}
                className="bg-[#3e402d] text-white px-6 py-2 rounded hover:bg-[#63654f] cursor-pointer"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <>
              {cart.map((item, index) => (
                <div key={index} className="flex items-center gap-4 border-b pb-4 last:border-none">
                  <div className="w-16 h-16 relative overflow-hidden flex-shrink-0">
                    <img src={item.img} alt={item.title} className="object-cover w-full h-full" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{item.title}</p>
                    <p className="text-sm text-gray-500">₹{item.price}</p>
                    <div className="flex items-center mt-2 space-x-2">
                      <button
                        className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                      >
                        -
                      </button>
                      <span className="px-2">{item.quantity}</span>
                      <button
                        className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="font-semibold">₹{Number(item.price) * item.quantity}</div>
                </div>
              ))}
              <div className="space-y-2 mt-4">
                <button
                  onClick={() => {
                    const checkoutId = Math.random().toString(36).substr(2, 22);
                    setCartSidebarOpen(false);
                    router.push(`/checkouts/cn/${checkoutId}`);
                  }}
                  className="w-full bg-[#3e402d] text-white py-3 rounded hover:bg-[#63654f] cursor-pointer mt-4">
                  Checkout All
                </button>
                <button
                  onClick={() => {setCartSidebarOpen(false);
                    router.push("/cart");
                  }}
                  className="w-full bg-[#3e402d] text-white py-3 rounded hover:bg-[#63654f] cursor-pointer mt-2">
                  Go to Cart
                </button>
              </div>
            </>
          )}
        </div>
      </aside>
    </>
  );
}
