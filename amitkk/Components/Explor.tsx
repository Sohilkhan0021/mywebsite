import Image from "next/image";
import { useRouter } from "next/router";

export default function Collections() {
  const router = useRouter();

  return (
    <section className="bg-[#f9f4ef] py-16 px-8">
      <div className="w-[85vw] container mx-auto flex flex-col md:flex-row items-center justify-between">
        <div className="flex-1 space-y-6">
            <div className="flex justify-between items-center space-x-4 mb-8">
            <h2 className="text-5xl font-bold text-gray-800">
                Explore our 
                <br />
                collections
            </h2>
          <button onClick={() => router.push("/#")}
          className="px-6 py-3 border border-black text-black cursor-pointer hover:bg-black hover:text-white transition">
            Shop Now
          </button>
        </div>
       <div className="grid grid-cols-2 gap-x-16 gap-y-8 mt-10 text-lg text-gray-700">
      <span onClick={() => router.push("/Women")}
       className="relative flex flex-col items-start  before:w-full before:h-px before:bg-gray-400 before:mb-6 cursor-pointer">
        Women
      </span>
      <span onClick={() => router.push("/#")}
       className="relative flex flex-col items-start cursor-pointer before:w-full before:h-px before:bg-gray-400 before:mb-6">
        Men
      </span>
    <span onClick={() => router.push("/#")}
     className="relative flex flex-col items-start cursor-pointer before:w-full before:h-px before:bg-gray-400 before:mb-6">
      Kids
    </span>
    <span onClick={() => router.push("/Home-living")}
    className="relative flex flex-col items-start cursor-pointer before:w-full before:h-px before:bg-gray-400 before:mb-6">
      Home & Living
    </span>
    <span onClick={() => router.push("/#")}
    className="relative flex flex-col items-start cursor-pointer before:w-full before:h-px before:bg-gray-400 before:mb-6  after:block after:w-full after:h-px after:bg-gray-400 after:mt-4">
      Work
    </span>
    <span onClick={() => router.push("/#")}
    className="relative flex flex-col items-start cursor-pointer before:block before:w-full before:h-px before:bg-gray-400 before:mb-6  after:block after:w-full after:h-px after:bg-gray-400 after:mt-4">
      Gifts
    </span>
</div>

        </div>
        <div className="flex-1 flex justify-center mt-10 md:mt-0">
          <Image
            src="/images/statue-img-1.png"
            alt="Handmade Statue"
            width={400}
            height={400}
            className="object-contain"
          />
        </div>
      </div>
    </section>
  );
}
