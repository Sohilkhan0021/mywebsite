import Image from "next/image";
import { useRouter } from "next/router";

export default function Collections() {
  const router = useRouter();

  return (
    <section className="bg-[#f9f4ef] py-12 px-6 md:px-12 items-center">
      <div className="container w-[85%] mx-auto flex flex-col md:flex-row items-center justify-between gap-10 md:gap-16">
        <div className="flex-1 space-y-6 w-full">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 mb-8">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 leading-snug">
              Explore our
              <br />
              collections
            </h2>
            <button
              onClick={() => router.push("/#")}
              className="px-6 py-3 border border-black text-black cursor-pointer hover:bg-black hover:text-white  active:bg-black active:text-white  focus:bg-black focus:text-white transition"
            >
              Shop Now
            </button>
          </div>

          {/* Categories Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-8 gap-y-6 text-base sm:text-lg text-gray-700">
            <span
              onClick={() => router.push("/Women")}
              className="relative flex flex-col items-start cursor-pointer before:w-full before:h-px before:bg-gray-400 before:mb-4"
            >
              Women
            </span>
            <span
              onClick={() => router.push("/#")}
              className="relative flex flex-col items-start cursor-pointer before:w-full before:h-px before:bg-gray-400 before:mb-4"
            >
              Men
            </span>
            <span
              onClick={() => router.push("/#")}
              className="relative flex flex-col items-start cursor-pointer before:w-full before:h-px before:bg-gray-400 before:mb-4"
            >
              Kids
            </span>
           <span onClick={() => router.push("/Home-living")}
             className="relative flex flex-col items-start cursor-pointer before:w-full before:h-px before:bg-gray-400 before:mb-4 
             after:hidden md:after:block md:after:w-full md:after:h-px md:after:bg-gray-400 md:after:mt-2">
            Home & Living
          </span>

            <span
              onClick={() => router.push("/#")}
              className="relative flex flex-col items-start cursor-pointer before:w-full before:h-px before:bg-gray-400 before:mb-4 after:block after:w-full after:h-px after:bg-gray-400 after:mt-2"
            >
              Work
            </span>
            <span
              onClick={() => router.push("/#")}
              className="relative flex flex-col items-start cursor-pointer before:block before:w-full before:h-px before:bg-gray-400 before:mb-4 after:block after:w-full after:h-px after:bg-gray-400 after:mt-2"
            >
              Gifts
            </span>
          </div>
        </div>
        
        <div className="flex-1 flex justify-center w-full">
          <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg aspect-square">
            <Image
              src="/images/statue-img-1.png"
              alt="Handmade Statue"
              fill
              sizes="(max-width: 768px) 80vw,
                     (max-width: 1200px) 40vw,
                     30vw"
              className="object-contain"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
