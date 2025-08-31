"use client";
import { useEffect, useRef, useState } from "react";

export default function CraftSection() {
  const [count, setCount] = useState(0);
  const target = 100;
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          let start = 0;
          const duration = 2000;
          const step = Math.ceil(duration / target);

          const interval = setInterval(() => {
            start++;
            setCount(start);
            if (start >= target) clearInterval(interval);
          }, step);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="bg-[#3e402d] text-white py-20">
      <div className="w-[85%] mx-auto flex items-center justify-between">
        <div className="max-w-[50%]">
          <h2 className="text-4xl font-bold mb-4 leading-snug">
            Explore a wide <br /> selection of craft forms
          </h2>
          <a
            href="#"
            className="text-yellow-400 font-semibold border-b border-yellow-400"
          >
            Learn More
          </a>
        </div>
        <div ref={ref} className="text-center">
          <div className="text-5xl font-bold">{count}</div>
          <span className="block mt-2 tracking-widest text-sm">
            CRAFT FORMS
          </span>
        </div>
      </div>
    </section>
  );
}
