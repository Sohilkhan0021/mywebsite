"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function PaymentSuccess() {
  const router = useRouter();

  useEffect(() => {
    const orderData = localStorage.getItem("latestOrder");

    if (orderData) {
      const parsedOrder = JSON.parse(orderData);

      fetch("/api/saveOrder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsedOrder),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            localStorage.removeItem("cart");
            localStorage.removeItem("latestOrder");
            router.push("/myorder");
          }
        })
        .catch((err) => console.error("Error saving order:", err));
    } else {
      router.push("/myorder");
    }
  }, [router]);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-[#FAF7F2]">
      <h1 className="text-3xl font-serif text-[#3E402D]">Payment Successful 🎉</h1>
      <p className="mt-4 text-gray-700">Redirecting to your profile...</p>
    </div>
  );
}
