// "use client";
// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";

// interface User {
//   _id?: string;
//   name?: string;
//   email?: string;
//   country?: string;
// }

// interface Order {
//   _id: string;
//   totalAmount: number;
//   status: string;
//   paymentId: string;
//   createdAt: string;
//   items: {
//     title: string;
//     price: number;
//     img: string;
//     quantity: number;
//   }[];
// }

// export default function ProfilePage() {
//   const [user, setUser] = useState<User | null>(null);
//   const [orders, setOrders] = useState<Order[]>([]);
//   const router = useRouter();

//   useEffect(() => {
//     const storedUser = localStorage.getItem("user");
//     if (storedUser) {
//       try {
//         const parsedUser = JSON.parse(storedUser);
//         setUser({
//           _id: parsedUser.id,
//           name: parsedUser.name,
//           email: parsedUser.email,
//           country: "India",
//         });

//         fetch(`/api/getOrders?userId=${parsedUser.id}`)
//           .then((res) => res.json())
//           .then((data) => {
//             if (data.success) setOrders(data.orders);
//           });
//       } catch {
//         setUser(null);
//       }
//     }
//   }, []);

//   if (!user) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-[#FAF7F2]">
//         <p className="text-lg">Please login to view your profile.</p>
//       </div>
//     );
//   }
//   const UserDefaultAddress = ({ userId }: { userId: string }) => {
//     const [address, setAddress] = useState<any>(null);

//     useEffect(() => {
//       fetch(`/api/getAddresses?userId=${userId}`)
//         .then((res) => res.json())
//         .then((data) => {
//           if (data.success && data.addresses && data.addresses.length > 0) {
//             setAddress(data.addresses[0]);
//           }
//         });
//     }, [userId]);

//     if (!address) {
//       return <div className="text-gray-600">No address saved yet.</div>;
//     }
//     return (
//       <div>
//         <p className="text-lg text-black">{address.name}</p>
//         <p className="text-gray-700">
//           {address.street}, {address.city}, {address.state}, {address.pincode},{" "}
//           {address.country}
//         </p>
//         <p className="text-gray-700">Phone: {address.phone}</p>
//       </div>
//     );
//   };

//   return (
//     <>
//       <div className="bg-[#46412B] h-40 w-full flex justify-center items-center px-8">
//         <div className="mt-8">
//           <h1 className="text-3xl md:text-4xl font-serif text-white ">
//             Welcome {user.name}.
//           </h1>
//         </div>
//       </div>

//       <div className="min-h-screen bg-[#FAF7F2] pt-20 px-4 sm:px-6 md:px-12 lg:px-24 mx-auto w-full">
//         {/* Delivery Address Section */}
//         <section className="mb-10">
//           <h2 className="text-2xl md:text-3xl font-serif text-[#3E402D] mb-6">
//             Delivery Address
//           </h2>
//           <div className="mb-3">
//             {user && user._id && <UserDefaultAddress userId={user._id} />}
//           </div>
//           <button
//             onClick={() => router.push("/address")}
//             className="bg-[#3E402D] text-white px-6 py-2 font-medium hover:bg-[#5c5f45] transition"
//           >
//             View All Addresses
//           </button>
//           <hr className="my-6 border-gray-300" />
//         </section>
//         <section className="mb-10">
//           <h2 className="text-2xl md:text-3xl font-serif text-[#3E402D] mb-6">
//             Order History
//           </h2>

//           {orders.length === 0 ? (
//             <div className="bg-[#FAF7F2] text-gray-600 text-center py-3 px-4 border rounded-sm">
//               You haven't placed any orders yet.
//             </div>
//           ) : (
//             <div className="space-y-6">
//               {orders.map((order) => (
//                 <div
//                   key={order._id}
//                   className="border bg-white rounded-lg p-4 shadow-sm"
//                 >
//                   <div className="flex justify-between flex-wrap">
//                     <div>
//                       <p className="font-semibold text-black">
//                         Order #{order._id.slice(-6).toUpperCase()}
//                       </p>
//                       <p className="text-sm text-gray-500">
//                         Placed on:{" "}
//                         {new Date(order.createdAt).toLocaleDateString()}
//                       </p>
//                     </div>
//                     <div className="text-right">
//                       <p className="font-medium text-black">
//                         ₹{order.totalAmount.toLocaleString()}
//                       </p>
//                       <p className="text-sm text-gray-500">Status: {order.status}</p>
//                     </div>
//                   </div>

//                   <div className="mt-4 space-y-2">
//                     {order.items.map((item, idx) => (
//                       <div
//                         key={idx}
//                         className="flex justify-between items-center border-b pb-2 last:border-none"
//                       >
//                         <div className="flex items-center gap-3">
//                           <img
//                             src={item.img}
//                             alt={item.title}
//                             className="w-12 h-12 object-cover rounded"
//                           />
//                           <p className="text-sm text-black">{item.title}</p>
//                         </div>
//                         <p className="text-sm text-gray-700">₹{item.price}</p>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}

//           <hr className="my-6 border-gray-300" />
//         </section>

//         {/* Account Details Section */}
//         <section className="mb-10">
//           <h2 className="text-2xl md:text-3xl font-serif text-[#3E402D] mb-6">
//             Account Details
//           </h2>
//           <p className="text-lg text-[#3E402D]">{user.country}</p>
//           <button
//             onClick={() => router.push("/addresses")}
//             className="mt-6 bg-[#3E402D] text-white px-6 py-2 font-medium hover:bg-[#5c5f45] transition"
//           >
//             View Addresses
//           </button>
//         </section>
//       </div>
//     </>
//   );
// }

















"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface User {
  _id?: string;
  name?: string;
  email?: string;
  country?: string;
}

interface Order {
  _id: string;
  totalAmount: number;
  status: string;
  paymentId: string;
  createdAt: string;
  items: {
    title: string;
    price: number;
    img: string;
    quantity: number;
  }[];
}

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser({
          _id: parsedUser.id,
          name: parsedUser.name,
          email: parsedUser.email,
          country: "India",
        });

        fetch(`/api/getOrders?userId=${parsedUser.id}`)
          .then((res) => res.json())
          .then((data) => {
            if (data.success) setOrders(data.orders);
          });
      } catch {
        setUser(null);
      }
    }
  }, []);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAF7F2]">
        <p className="text-lg text-black">Please login to view your profile.</p>
      </div>
    );
  }

  const UserDefaultAddress = ({ userId }: { userId: string }) => {
    const [address, setAddress] = useState<any>(null);

    useEffect(() => {
      fetch(`/api/getAddresses?userId=${userId}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.success && data.addresses && data.addresses.length > 0) {
            setAddress(data.addresses[0]);
          }
        });
    }, [userId]);

    if (!address) {
      return <div className="text-gray-600">No address saved yet.</div>;
    }
    return (
      <div>
        <p className="text-lg text-black">{address.name}</p>
        <p className="text-gray-700">
          {address.street}, {address.city}, {address.state}, {address.pincode},{" "}
          {address.country}
        </p>
        <p className="text-gray-700">Phone: {address.phone}</p>
      </div>
    );
  };

  return (
    <>
      <div className="bg-[#46412B] h-40 w-full flex justify-center items-center px-8">
        <div className="mt-8">
          <h1 className="text-3xl md:text-4xl font-serif text-white ">
            Welcome {user.name}.
          </h1>
        </div>
      </div>

      <div className="min-h-screen bg-[#FAF7F2] pt-20 px-4 sm:px-6 md:px-12 lg:px-24 mx-auto w-full">
        <section className="mb-10">
          <h2 className="text-2xl md:text-3xl font-serif text-[#3E402D] mb-6">
            Delivery Address
          </h2>
          <div className="mb-3">
            {user && user._id && <UserDefaultAddress userId={user._id} />}
          </div>
          <button
            onClick={() => router.push("/address")}
            className="bg-[#3E402D] text-white px-6 py-2 font-medium hover:bg-[#5c5f45] transition"
          >
            View All Addresses
          </button>
          <hr className="my-6 border-gray-300" />
        </section>

        <section className="mb-10">
          <h2 className="text-2xl md:text-3xl font-serif text-[#3E402D] mb-6">
            Order History
          </h2>

          {orders.length === 0 ? (
            <div className="bg-[#FAF7F2] text-gray-600 text-center py-3 px-4 border rounded-sm">
              You haven't placed any orders yet.
            </div>
          ) : (
            <div className="space-y-6">
              {orders.map((order) => (
                <div
                  key={order._id}
                  className="border bg-white rounded-lg p-4 shadow-sm"
                >
                  <div className="flex justify-between flex-wrap">
                    <div>
                      <p className="font-semibold text-black">
                        Order #{order._id.slice(-6).toUpperCase()}
                      </p>
                      <p className="text-sm text-gray-500">
                        Placed on:{" "}
                        {new Date(order.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-black">
                        ₹{order.totalAmount.toLocaleString()}
                      </p>
                      <p className="text-sm text-gray-500">Status: {order.status}</p>
                    </div>
                  </div>

                  <div className="mt-4 space-y-2">
                    {order.items.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex justify-between items-center border-b pb-2 last:border-none"
                      >
                        <div className="flex items-center gap-3">
                          <img
                            src={item.img}
                            alt={item.title}
                            className="w-12 h-12 object-cover rounded"
                          />
                          <p className="text-sm text-black">{item.title}</p>
                        </div>
                        <p className="text-sm text-gray-700">₹{item.price}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          <hr className="my-6 border-gray-300" />
        </section>

        <section className="mb-10">
          <h2 className="text-2xl md:text-3xl font-serif text-[#3E402D] mb-6">
            Account Details
          </h2>
          <p className="text-lg text-[#3E402D]">{user.country}</p>
          <button
            onClick={() => router.push("/addresses")}
            className="mt-6 bg-[#3E402D] text-white px-6 py-2 font-medium hover:bg-[#5c5f45] transition"
          >
            View Addresses
          </button>
        </section>
      </div>
    </>
  );
}
