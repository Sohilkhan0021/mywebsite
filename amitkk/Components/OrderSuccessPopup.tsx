"use client";
import { motion } from "framer-motion";

interface OrderSuccessPopupProps {
  onClose: () => void;
  onGoToOrders: () => void;
}

export default function OrderSuccessPopup({
  onClose,
  onGoToOrders,
}: OrderSuccessPopupProps) {
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-2xl shadow-xl p-8 text-center w-[90%] max-w-md"
      >
        <h2 className="text-3xl font-semibold text-green-600 mb-4">
           Congratulations!
        </h2>
        <p className="text-gray-700 mb-6">
          Your order has been placed successfully.
          <br />
          Thank you for shopping with us!
        </p>
        <div className="flex flex-col gap-3">
          <button
            onClick={onGoToOrders}
            className="bg-[#4E5036] text-white py-3 rounded-lg hover:bg-[#63654f] transition"
          >
            Go to My Orders
          </button>
          <button
            onClick={onClose}
            className="text-gray-600 underline hover:text-gray-800"
          >
            Close
          </button>
        </div>
      </motion.div>
    </div>
  );
}
