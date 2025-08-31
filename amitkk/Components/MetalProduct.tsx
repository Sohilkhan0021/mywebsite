"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation"; 
import Image from "next/image";
import AOS from "aos";
import "aos/dist/aos.css";

export default function MetalCraftSection() {
  const router = useRouter();
  useEffect(() => {
    AOS.init({
      duration: 1500,
      once: false,
      mirror: true,
    });
  }, []);

  return (
    <section className="py-12 bg-white gap-8">
      <div className="w-[85%] mx-auto grid grid-cols-12 gap-8 items-start">
        <div
          className="col-span-12 md:col-span-6 space-y-6"
          data-aos="fade-up"
        >
          <p className="text-sm uppercase tracking-wide text-gray-600">In focus</p>
          <h2 className="text-4xl md:text-5xl font-bold leading-tight text-gray-900">
            The world’s <br /> oldest craft form
          </h2>
          <p className="text-gray-700 leading-relaxed">
            Anmol CraftandCreation brings you exclusive handcrafted treasures that
            celebrate India’s rich cultural heritage. Our products are made with
            passion and precision, blending traditional artistry with a modern touch.
            Every creation from Anmol CraftandCreation tells a story of timeless
            craftsmanship, carefully designed to add elegance, authenticity, and
            uniqueness to your lifestyle.
            <br />
            <br />
            We take pride in supporting skilled artisans, preserving age-old
            techniques, and offering you sustainable, handmade products that carry
            the soul of true Indian craft. With Anmol CraftandCreation, you don’t
            just buy a product—you bring home a piece of art, culture, and creativity.
          </p>
          <button  onClick={() => router.push("/Home-living")}
          className="px-6 py-3 border border-black cursor-pointer text-black hover:bg-black hover:text-white transition">
            SHOP NOW
          </button>
        </div>
        <div className="col-span-12 md:col-span-6 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div data-aos="fade-right">
            <Image
              src="/images/metal-product-img.webp"
              alt="Dhokra Craft Curio - The Horse"
              width={400}
              height={400}
              className="w-full h-auto object-cover rounded-lg"
            />
            <p className="uppercase text-xs tracking-wider text-gray-500 mt-4">
              Anmol Craft and Creation
            </p>
            <h3 className="text-lg font-medium text-gray-900">
              Anmol Craft and Creation - THE HORSE
            </h3>
            <p className="text-base font-semibold text-gray-800">₹ 3,350 INR</p>
          </div>
          <div data-aos="fade-left">
            <Image
              src="/images/metal-product-img-2.webp"
              alt="Dhokra Metal Craft Wall Hanger - Fish"
              width={400}
              height={400}
              className="w-full h-auto object-cover rounded-lg"
            />
            <p className="uppercase text-xs tracking-wider text-gray-500 mt-4">
              Anmol Craft and Creation
            </p>
            <h3 className="text-lg font-medium text-gray-900">
              Anmol Craft and Creation Wall Hanger - Fish
            </h3>
            <p className="text-base font-semibold text-gray-800">₹ 1,780 INR</p>
          </div>
        </div>
      </div>
    </section>
  );
}
