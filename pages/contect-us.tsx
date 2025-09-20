"use client";
import Image from "next/image";
import { Phone } from "lucide-react";
import Link from "next/link";
import {
  FaFacebook,
  FaInstagram,
  FaPinterest,
  FaLinkedin,
  FaGithub,
} from "react-icons/fa";

export default function Contact() {
  return (
    <>
      <section className="bg-[#f7f0e9] py-16">
        <div className="w-[90%] md:w-[85%] mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="flex items-center gap-4 mb-8">
              <h2 className="text-4xl md:text-6xl font-bold text-[#2e2f1e]">
                Contact
              </h2>
              <div className="w-24 md:w-36 h-[2px] bg-[#a67c52] mx-auto"></div>
            </div>

            <p className="text-[#2e2f1e] text-base md:text-lg leading-[1.8] mb-6">
              We’d love to help you with an order, for general customer service
              enquiries or product questions. The best time to reach us is <br />
              <span className="font-medium">
                Mon - Sat 9.00 am - 6:00 pm (Indian Standard Time).
              </span>
            </p>
            <div className="mb-6">
              <p className="uppercase text-xs tracking-widest text-gray-600">
                Email
              </p>
              <p className="text-[#2e2f1e] text-base md:text-lg">
                contact@anmolcraftandcreation.com
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
              <div>
                <p className="uppercase text-xs tracking-widest text-gray-600 mb-1 mt-6">
                  Calling from India
                </p>
                <p className="flex items-center gap-2 text-[#2e2f1e] text-base md:text-lg mt-6">
                  <Phone size={18} /> +91 8302346860
                </p>
              </div>
              <div>
                <p className="uppercase text-xs tracking-widest text-gray-600 mb-1 mt-6">
                  Calling from Outside India
                </p>
                <p className="flex items-center gap-2 text-[#2e2f1e] text-base md:text-lg mt-6">
                  <Phone size={18} /> +91 8302346860
                </p>
              </div>
            </div>
            <div className="flex gap-4 text-black text-xl md:text-2xl">
              <Link href="#"><FaFacebook /></Link>
              <Link href="#"><FaInstagram /></Link>
              <Link href="#"><FaGithub /></Link>
              <Link href="#"><FaLinkedin /></Link>
            </div>
          </div>
          <div className="relative w-full h-[250px] sm:h-[350px] md:h-[600px]">
            <Image
              src="/images/contect-su_11.jpg"
              alt="Contact Anmol Craft and Creation"
              fill
              className="object-cover shadow-md"
            />
          </div>
        </div>
      </section>
      <section className="bg-[#f7f0e9] py-16">
        <div className="w-[90%] md:w-[85%] mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="flex items-center gap-4 mb-8">
              <h2 className="text-3xl md:text-5xl font-bold text-[#2e2f1e]">
                Let’s connect
              </h2>
              <div className="w-24 md:w-36 h-[2px] bg-[#a67c52]"></div>
            </div>

            <form className="space-y-6">
              <div>
                <label className="block text-[#2e2f1e] text-base md:text-lg mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  className="w-full border-b border-gray-400 bg-transparent focus:outline-none py-2 text-black"
                />
              </div>

              <div>
                <label className="block text-[#2e2f1e] text-base md:text-lg mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  className="w-full border-b border-gray-400 bg-transparent focus:outline-none py-2 text-black"
                />
              </div>

              <div>
                <label className="block text-[#2e2f1e] text-base md:text-lg mb-2">
                  Phone Number
                </label>
                <input
                  type="text"
                  className="w-full border-b border-gray-400 bg-transparent focus:outline-none py-2 text-black"
                />
              </div>

              <div>
                <label className="block text-[#2e2f1e] text-base md:text-lg mb-2">
                  Country
                </label>
                <input
                  type="text"
                  className="w-full border-b border-gray-400 bg-transparent focus:outline-none py-2 text-black"
                />
              </div>

              <div>
                <label className="block text-[#2e2f1e] text-base md:text-lg mb-2">
                  Tell us more about your request
                </label>
                <textarea
                  rows={3}
                  className="w-full border-b border-gray-400 bg-transparent focus:outline-none py-2 text-black"
                ></textarea>
              </div>

              <button
                type="submit"
                className="mt-4 bg-[#2e2f1e] text-white px-6 py-3 cursor-pointer hover:bg-[#4a4b2e] transition"
              >
                Submit
              </button>
            </form>
          </div>
          <div className="flex justify-center">
            <div className="relative w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 rounded-full overflow-hidden shadow-lg">
              <Image
                src="/images/satyam-img.jpg"
                alt="Let's Connect - Anmol Craft and Creation"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
