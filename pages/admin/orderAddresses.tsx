"use client";
import { useEffect, useState } from "react";

export default function AdminOrderAddress() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/orderAddresses")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setOrders(data.orders);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <p className="text-center p-6 text-gray-700">Loading...</p>;
  if (!orders.length) return <p className="text-center p-6 text-gray-700">No orders found.</p>;

  return (
    <div className="p-4 sm:p-6 bg-white min-h-screen text-black">
      <h2 className="text-xl sm:text-2xl mb-4 sm:mb-6 font-bold text-center sm:text-left">
        Orders and Delivery Addresses
      </h2>

      <div className="w-full overflow-x-auto rounded-lg border border-gray-300 shadow-sm">
        <table className="min-w-full border-collapse text-sm sm:text-base">
          <thead className="bg-[#F9F2EA] text-left">
            <tr>
              <th className="px-3 sm:px-4 py-2 whitespace-nowrap">Order ID</th>
              <th className="px-3 sm:px-4 py-2 whitespace-nowrap">Order Date</th>
              <th className="px-3 sm:px-4 py-2 whitespace-nowrap">User ID</th>
              <th className="px-3 sm:px-4 py-2 whitespace-nowrap">Total Amount</th>
              <th className="px-3 sm:px-4 py-2 whitespace-normal sm:max-w-xs">
                Delivery Address
              </th>
              <th className="px-3 sm:px-4 py-2 whitespace-nowrap">Payment ID</th>
              <th className="px-3 sm:px-4 py-2 whitespace-nowrap">Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr
                key={order._id}
                className="border-t border-gray-300 hover:bg-gray-50 transition-colors"
              >
                <td className="px-3 sm:px-4 py-2 whitespace-nowrap break-all">
                  {order._id}
                </td>
                <td className="px-3 sm:px-4 py-2 whitespace-nowrap">
                  {new Date(order.createdAt).toLocaleString()}
                </td>
                <td className="px-3 sm:px-4 py-2 whitespace-nowrap break-all">
                  {order.userId}
                </td>
                <td className="px-3 sm:px-4 py-2 whitespace-nowrap">
                  ₹{order.totalAmount.toLocaleString()}
                </td>
                <td className="px-3 sm:px-4 py-2 sm:max-w-xs break-words whitespace-normal">
                  {order.address
                    ? <>
                        {order.address?.name}, {order.address?.street}, {order.address?.city},{" "}
                        {order.address?.state}, {order.address?.pincode},{" "}
                        {order.address?.country}, Phone: {order.address?.phone}
                      </>
                    : <span className="text-gray-500 italic">No address available</span>}
                </td>

                <td className="px-3 sm:px-4 py-2 whitespace-nowrap break-all">
                  {order.paymentId}
                </td>
                <td className="px-3 sm:px-4 py-2 whitespace-nowrap">{order.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
