"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import AOS from "aos";
import "aos/dist/aos.css";

export default function MetalCraftSection() {
  const router = useRouter();
  const [showMore, setShowMore] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [section, setSection] = useState<any>(null);

  useEffect(() => {
    AOS.init({ duration: 1500, once: false, mirror: true });

    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);

    fetch("/api/metalcraft")
      .then((res) => res.json())
      .then((data) => setSection(data))
      .catch((err) => console.error("Error fetching metal craft:", err));

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const fullText = `
    Anmol CraftandCreation brings you exclusive handcrafted treasures that
    celebrate India’s rich cultural heritage. Our products are made with
    passion and precision, blending traditional artistry with a modern touch.
    Every creation from Anmol CraftandCreation tells a story of timeless
    craftsmanship, carefully designed to add elegance, authenticity, and
    uniqueness to your lifestyle.

    We take pride in supporting skilled artisans, preserving age-old
    techniques, and offering you sustainable, handmade products that carry
    the soul of true Indian craft. With Anmol CraftandCreation, you don’t
    just buy a product—you bring home a piece of art, culture, and creativity.
  `;

  const shortText = `
    Anmol CraftandCreation brings you exclusive handcrafted treasures that
    celebrate India’s rich cultural heritage. Our products are made with
    passion and precision, blending traditional artistry with a modern touch...
  `;

  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        <div className="grid grid-cols-2 gap-4 order-1 lg:order-2">
          {section?.images?.length ? (
            section.images.map((img: string, index: number) => (
              <div
                key={index}
                data-aos={index % 2 === 0 ? "fade-right" : "fade-left"}
              >
                <div className="aspect-[4/5] overflow-hidden rounded-lg">
                  <Image
                    src={img}
                    alt={`Metal craft ${index + 1}`}
                    width={400}
                    height={400}
                    onClick={() => router.push("/Home-living")}
                    className="object-cover w-full h-full cursor-pointer"
                  />
                </div>
                <p className="uppercase text-xs tracking-wider text-gray-500 mt-2 sm:mt-4">
                  Anmol Craft and Creation
                </p>
                <h3 className="text-sm sm:text-lg font-medium text-gray-900">
                  Metal Craft - {index + 1}
                </h3>
                <p className="text-sm sm:text-base font-semibold text-gray-800">
                  ₹ {(index + 1) * 1000} INR
                </p>
              </div>
            ))
          ) : (
            <p>Loading metal craft images...</p>
          )}
        </div>

        <div
          className="space-y-6 order-2 lg:order-1"
          data-aos="fade-up"
        >
          <p className="text-sm uppercase tracking-wide text-gray-600">In focus</p>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight text-gray-900">
            The world’s <br /> oldest craft form
          </h2>

          <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
            {isMobile ? (showMore ? fullText : shortText) : fullText}
            {isMobile && !showMore && (
              <span
                className="text-blue-600 cursor-pointer ml-1"
                onClick={() => setShowMore(true)}
              >
                more
              </span>
            )}
          </p>

          <button
            onClick={() => router.push("/Home-living")}
            className="px-6 py-3 border border-black cursor-pointer text-black hover:bg-black hover:text-white transition"
          >
            SHOP NOW
          </button>
        </div>
      </div>
    </section>
  );
}

