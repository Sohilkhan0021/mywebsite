"use client";

export default function OurStory() {
  return (
    <>
      {/* Top Section */}
      <section className="bg-[#3e402d] text-white py-20">
        <div className="w-[85%] mx-auto">
          <div className="max-w-full md:max-w-[50%]">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 leading-snug">
              Our Story
            </h2>
            <hr className="w-[100px] border-t-2 border-white mb-6" />
          </div>
        </div>
      </section>

      {/* Middle Section */}
      <section className="bg-[#f7f0e9] py-16">
        <div className="w-[85vw] mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl md:text-6xl font-bold leading-tight text-[#2e2f1e]">
              A social <br /> enterprise.
              An authentic <br />
              platform for pure <br />
              craft.
            </h2>
          </div>
          <div className="mt-6 md:mt-12">
            <div className="w-35 h-[2px] bg-[#a67c52] mb-6"></div>
            <p className="text-[#2e2f1e] text-base md:text-lg leading-[1.8] md:leading-[2.5]">
              Anmol Craft and Creation is a digital platform celebrating some of
              the world’s oldest and most exquisite craft forms. We began this
              journey nearly a decade ago with a mission to preserve, showcase,
              and share the exceptional talent of India’s artisans with a global
              audience. Our goal is to uplift the dignity of Indian artisans and
              spark appreciation for a rich legacy of craft that has flourished
              for centuries across the country. Through our carefully curated
              collection, we bring traditional art and craft to life in a range
              of beautiful, contemporary products, making timeless artistry
              accessible to all.
            </p>
          </div>
        </div>
      </section>

      {/* Bottom Section */}
      <section className="bg-[#F8FCE6] py-16">
        <div className="w-[85vw] mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold leading-tight text-[#2e2f1e]">
              Driven by a belief.
              <br />
              Let’s choose to make <br /> the difference
            </h2>

            <p className="text-[#2e2f1e] text-base md:text-lg leading-[1.8] mt-6">
              We at <span className="font-semibold">Anmol Craft and Creation</span> are people who bring diverse things
              together. Timelessness and modernity. Indigenous crafts and world
              trends. Artisans and business. Incomes and fair trade. Freedom and
              protection. Love and commerce.
            </p>

            <p className="text-[#2e2f1e] text-base md:text-lg leading-[1.8] mt-6">
              At <span className="font-semibold">Anmol Craft and Creation</span>, we strive to preserve India’s artisan
              heritage while adapting it to modern needs. Our mission is to
              empower artisans by connecting their skills to contemporary
              markets without losing authenticity.
            </p>

            <p className="text-[#2e2f1e] text-base md:text-lg leading-[1.8] mt-6">
              We believe in fair trade, sustainable practices, and celebrating
              the incredible artistry that India has nurtured for generations.
              Each product carries not just design, but also the story of
              dedication, culture, and community.
            </p>

            <p className="text-[#2e2f1e] text-base md:text-lg leading-[1.8] mt-6">
              By supporting <span className="font-semibold">Anmol Craft and Creation</span>, you become a part of this
              movement — a movement to value handmade traditions, protect artisan
              livelihoods, and choose conscious consumerism.
            </p>
          </div>

          <div className="flex justify-center md:justify-center">
            <img
              src="/images/satyam-img.jpg"
              alt="Our Story Image"
              className="w-48 h-48 md:w-64 md:h-64 rounded-full object-cover"
            />
          </div>
        </div>
      </section>
    </>
  );
}
