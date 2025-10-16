import React, { useEffect, useState } from "react";

interface Product {
    image: string;
    name: string;
    quantity: number;
    price: number;
}

interface UserAddress {
    fullName: string;
    firstName?: string;
    lastName?: string;
    address?: string;
    apartment?: string;
    phone: string;
    street: string;
    city: string;
    state: string;
    postalCode: string;
    pincode?: number;
    country: string;
}

interface User {
    name: string;
    //   email: string;
    phonenumber?: string;
    address?: UserAddress;

    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
}

interface Order {
    _id: string;
    userId?: User;
    status: string;
    total: number;
    paymentMethod: string;
    products: Product[];
}

const AllOrders: React.FC = () => {
    const [selectedStatus, setSelectedStatus] = useState<string>("");
    const [orders, setOrders] = useState<Order[]>([]);

    const filteredOrders = selectedStatus
        ? orders.filter((order) => order.status === selectedStatus)
        : orders;

    const token = typeof window !== "undefined" ? localStorage.getItem("admintoken") : null;





    const fetchOrders = async () => {
        try {
            // if (!token) return;

            const res = await fetch("/api/orders", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const data = await res.json();
            if (data.success) {
                const mappedOrders = data.orders.map((o: any) => ({
                    _id: o._id,
                    userId: {
                        name: `${o.userId?.firstName || ""} ${o.userId?.lastName || ""}`.trim(),
                        email: o.userId?.email || "",
                        phonenumber: o.userId?.address?.phone || "",
                        address: {
                            fullName: `${o.userId?.address?.firstName || ""} ${o.userId?.address?.lastName || ""}`.trim(),
                            phone: o.userId?.address?.phone || "",
                            street: o.userId?.address?.address || "",
                            city: o.userId?.address?.city || "",
                            state: o.userId?.address?.state || "",
                            postalCode: o.userId?.address?.pincode || "",
                            country: o.userId?.address?.country || "",
                        },
                    },
                    status: o.status,
                    total: o.totalAmount,
                    paymentMethod: o.paymentMethod,
                    products: o.items.map((item: any) => ({
                        name: item.productId?.title || "Unknown Product",
                        image: item.productId?.img || "/no-image.jpg",
                        quantity: item.quantity,
                        price: item.productId?.price || 0,
                    })),
                }));

                setOrders(mappedOrders);
            }
        } catch (error) {
            console.error("Error fetching orders:", error);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const handleStatusChange = async (orderId: string, newStatus: string) => {
        try {
            if (!token) return;

            const res = await fetch(`/api/orders/${orderId}/status`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ status: newStatus }),
            });

            if (res.ok) {
                alert("Status updated successfully");
                fetchOrders();
            } else {
                alert("Failed to update order status");
            }
        } catch (err) {
            console.error("Error updating status:", err);
            alert("Failed to update order status");
        }
    };

    return (
        <div className="max-w-6xl mx-auto mt-8 px-4">
            <div className="md:flex flex-wrap justify-between mb-6 gap-2">
                <button
                    onClick={() => setSelectedStatus("")}
                    className={`btn-border ${selectedStatus === "" ? "bg-secondary font-bold text-white" : ""}`}
                >
                    All
                </button>
                {["pending", "processing", "shipped", "delivered", "cancelled"].map((status) => (
                    <button
                        key={status}
                        onClick={() => setSelectedStatus(status)}
                        className={`btn-border ${selectedStatus === status ? "bg-secondary font-bold text-white" : ""}`}
                    >
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                    </button>
                ))}
            </div>
            {filteredOrders.length === 0 ? (
                <p>No orders found for selected status.</p>
            ) : (
                <div className="space-y-4">
                    {filteredOrders.map((ord) => (
                        <div key={ord._id} className="border p-4 rounded shadow bg-white text-black">
                            <div className="flex justify-between items-center">
                                <div>
                                    <p>
                                        <strong>Order ID:</strong> {ord._id}
                                    </p>
                                    <p>
                                        <strong>User:</strong>{" "}
                                        {ord.userId?.name || "N/A"} ({ord.userId?.email || "No Email"}){" "}
                                        {ord.userId?.phonenumber || ""}
                                    </p>

                                    {ord.userId?.address && (
                                        <p className="mt-1">
                                            <strong>Address:</strong>{" "}
                                            {`${ord.userId.address.street || ""}, ${ord.userId.address.city || ""}, ${ord.userId.address.state || ""
                                                } - ${ord.userId.address.postalCode || ""}`}
                                        </p>
                                    )}

                                    <div>
                                        <strong>Status:</strong>{" "}
                                        <select
                                            value={ord.status}
                                            onChange={(e) => handleStatusChange(ord._id, e.target.value)}
                                            className="border px-2 py-1 rounded"
                                        >
                                            <option value="pending">Pending</option>
                                            <option value="processing">Processing</option>
                                            <option value="shipped">Shipped</option>
                                            <option value="delivered">Delivered</option>
                                            <option value="cancelled">Cancelled</option>
                                        </select>
                                    </div>
                                </div>
                                <div>
                                    <p>
                                        <strong>Total:</strong> ₹{ord.total}
                                    </p>
                                    <p>
                                        <strong>Payment:</strong> {ord.paymentMethod}
                                    </p>
                                </div>
                            </div>

                            <div className="mt-4">
                                <h3 className="font-semibold">Products:</h3>
                                <ul className="mt-2 space-y-2">
                                    {ord.products.map((prod, idx) => (
                                        <li key={idx} className="flex justify-between items-center border-t pt-2">
                                            <div className="flex items-center space-x-4">
                                                <img src={prod.image} alt={prod.name} className="w-16 h-16 object-cover rounded" />
                                                <div>
                                                    <p>Qty: {prod.quantity}</p>
                                                </div>
                                            </div>
                                            <p className="font-semibold">₹{prod.price}</p>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AllOrders;
