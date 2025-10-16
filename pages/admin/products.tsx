// "use client";
// import { useEffect, useState } from "react";
// import toast from "react-hot-toast";
// import { TrashIcon, PencilIcon } from "lucide-react";

// export default function AdminProducts() {
//   const [user, setUser] = useState<{ email: string; role?: string } | null>(null);
//   const [products, setProducts] = useState<any[]>([]);
//   const [newProduct, setNewProduct] = useState({
//     title: "",
//     subtitle: "",
//     category: "",
//     details: "",
//     price: "",
//     stock: "", 
//     file: null as File | null,
//   });


//   const allowedAdmins = ["sohil0021khan@gmail.com", "sohil2304khan@gmail.com"];

//   useEffect(() => {
//     const storedUser = localStorage.getItem("user");
//     if (storedUser) setUser(JSON.parse(storedUser));
//     loadProducts();
//   }, []);

//   async function loadProducts() {
//     try {
//       const res = await fetch("/api/products");
//       const data = await res.json();
//       setProducts(data);
//     } catch {
//       toast.error("Failed to load products");
//     }
//   }

//   async function addProduct() {
//     if (!user || !allowedAdmins.includes(user.email)) return toast.error("Not authorized");
//     if (!newProduct.file) return toast.error("Select an image");

//     const formData = new FormData();
//     formData.append("title", newProduct.title);
//     formData.append("subtitle", newProduct.subtitle);
//     formData.append("category", newProduct.category);
//     formData.append("details", newProduct.details);
//     formData.append("price", newProduct.price);
//     formData.append("email", user.email);
//     formData.append("file", newProduct.file);
//     formData.append("stock", newProduct.stock);

    

//     try {
//       const res = await fetch("/api/products", { method: "POST", body: formData });
//       if (res.ok) {
//         toast.success("Product added!");
//         setNewProduct({ title: "", subtitle: "", category: "", details: "", price: "", file: null, stock:"" });
//         loadProducts();
//       } else {
//         toast.error("Failed to add product");
//       }
//     } catch {
//       toast.error("Something went wrong");
//     }
//   }

//   async function deleteProduct(id: string) {
//     if (!user || !allowedAdmins.includes(user.email)) return toast.error("Not authorized");

//     try {
//       const res = await fetch(`/api/products?id=${id}&email=${user.email}`, { method: "DELETE" });

//       if (res.ok) {
//         toast.success("Deleted!");
//         loadProducts();
//       } else {
//         toast.error("Failed to delete");
//       }
//     } catch {
//       toast.error("Something went wrong");
//     }
//   }

//   const isAdmin = user && allowedAdmins.includes(user.email);

//   return (
//     <div className="p-6 mt-12 text-black bg-white">
//       <h1 className="text-3xl font-bold mb-6">Product List</h1>

//       {isAdmin && (
//         <div className="mb-6 bg-gray-100 p-4 rounded space-y-3">
//           <div className="flex gap-2">
//             <input
//               placeholder="Title"
//               value={newProduct.title}
//               onChange={(e) => setNewProduct({ ...newProduct, title: e.target.value })}
//               className="border p-2 flex-1"
//             />
//             <input
//               placeholder="Subtitle"
//               value={newProduct.subtitle}
//               onChange={(e) => setNewProduct({ ...newProduct, subtitle: e.target.value })}
//               className="border p-2 flex-1"
//             />


//             <select
//               value={newProduct.category}
//               onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
//               className="border p-2 flex-1"
//             >
//               <option value="">Select Category</option>
//               <option value="Home-living">Home & Living</option>
//               <option value="Metal-craft">Metal-craft</option>
//               <option value="Category">Category</option>
//               <option value="Index">index</option>
//               <option value="Slider">Slider</option>
//               <option value="Work-in-Style">WorkStyle</option>
//               <option value="Single Product">SingleProduct</option>
//             </select>
//           </div>

//           <div className="flex gap-2">
//             <input
//               placeholder="Details"
//               value={newProduct.details}
//               onChange={(e) => setNewProduct({ ...newProduct, details: e.target.value })}
//               className="border p-2 flex-1"
//             />
//             <input
//               placeholder="Price"
//               type="number"
//               value={newProduct.price}
//               onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
//               className="border p-2 w-32"
//             />
//             <input
//               type="file"
//               name="file"
//               onChange={(e) => setNewProduct({ ...newProduct, file: e.target.files?.[0] || null })}
//               className="border p-2"
//             />

//              <input
//               placeholder="Stock"
//               type="number"
//               value={newProduct.stock}
//               onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
//               className="border p-2 w-32"
//             />

//           </div>

//           <div className="flex justify-end">
//             <button
//               onClick={addProduct}
//               className="bg-blue-500 text-white px-4 py-2 rounded"
//             >
//               Add Product
//             </button>
//           </div>
//         </div>
//       )}

//       <div className="overflow-x-auto">
//         <table className="min-w-full border-collapse border border-gray-300 text-black">
//           <thead className="bg-gray-200 text-left">
//             <tr>
//               <th className="px-4 py-2">Name</th>
//               <th className="px-4 py-2">Product ID</th>
//               <th className="px-4 py-2">Category</th>
//               <th className="px-4 py-2">Price</th>
//               <th className="px-4 py-2">Stock</th>
//               <th className="px-4 py-2">Sales</th>
//               <th className="px-4 py-2">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {products.map((p, index) => (
//               <tr key={p._id} className="border-t border-gray-300 hover:bg-gray-100">
//                 <td className="px-4 py-2 flex items-center gap-2">
//                   <img src={p.img} alt={p.title} className="w-10 h-10 object-cover rounded-full" />
//                   <div>
//                     <div className="font-semibold">{p.title}</div>
//                     <div className="text-sm">{p.subtitle}</div>
//                   </div>
//                 </td>
//                 <td className="px-4 py-2">#{index + 1}</td>
//                 <td className="px-4 py-2">{p.category}</td>
//                 <td className="px-4 py-2">₹{p.price}</td>
//                 <td className="px-4 py-2">{p.stock}</td>
//                 <td className="px-4 py-2">—</td>
//                 <td className="px-4 py-2 flex gap-2">
//                   <button className="text-blue-600">
//                     <PencilIcon className="w-5 h-5" />
//                   </button>
//                   <button onClick={() => deleteProduct(p._id)} className="text-red-600">
//                     <TrashIcon className="w-5 h-5" />
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }








































"use client";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { TrashIcon, PencilIcon } from "lucide-react";

export default function AdminProducts() {
  const [user, setUser] = useState<{ email: string; role?: string } | null>(null);
  const [products, setProducts] = useState<any[]>([]);
  const [newProduct, setNewProduct] = useState({
    title: "",
    subtitle: "",
    category: "",
    details: "",
    price: "",
    stock: "",
    file: null as File | null,
  });

  const allowedAdmins = ["sohil0021khan@gmail.com", "sohil2304khan@gmail.com"];

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
    loadProducts();
  }, []);

  async function loadProducts() {
    try {
      const res = await fetch("/api/products");
      const data = await res.json();
      setProducts(data);
    } catch {
      toast.error("Failed to load products");
    }
  }

  async function addProduct() {
    if (!user || !allowedAdmins.includes(user.email))
      return toast.error("Not authorized");
    if (!newProduct.file) return toast.error("Select an image");

    const formData = new FormData();
    formData.append("title", newProduct.title);
    formData.append("subtitle", newProduct.subtitle);
    formData.append("category", newProduct.category);
    formData.append("details", newProduct.details);
    formData.append("price", newProduct.price);
    formData.append("email", user.email);
    formData.append("file", newProduct.file);
    formData.append("stock", newProduct.stock);

    try {
      const res = await fetch("/api/products", { method: "POST", body: formData });
      if (res.ok) {
        toast.success("Product added!");
        setNewProduct({
          title: "",
          subtitle: "",
          category: "",
          details: "",
          price: "",
          file: null,
          stock: "",
        });
        loadProducts();
      } else {
        toast.error("Failed to add product");
      }
    } catch {
      toast.error("Something went wrong");
    }
  }

  async function deleteProduct(id: string) {
    if (!user || !allowedAdmins.includes(user.email))
      return toast.error("Not authorized");

    try {
      const res = await fetch(`/api/products?id=${id}&email=${user.email}`, {
        method: "DELETE",
      });

      if (res.ok) {
        toast.success("Deleted!");
        loadProducts();
      } else {
        toast.error("Failed to delete");
      }
    } catch {
      toast.error("Something went wrong");
    }
  }

  const isAdmin = user && allowedAdmins.includes(user.email);

  return (
    <div className="p-4 md:p-6 mt-12 text-black bg-white min-h-screen">
      <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center md:text-left">
        Product List
      </h1>

      {isAdmin && (
        <div className="mb-6 bg-gray-100 p-4 rounded space-y-3">
    
          <div className="flex flex-col md:flex-row gap-3">
            <input
              placeholder="Title"
              value={newProduct.title}
              onChange={(e) =>
                setNewProduct({ ...newProduct, title: e.target.value })
              }
              className="border p-2 flex-1 rounded w-full"
            />
            <input
              placeholder="Subtitle"
              value={newProduct.subtitle}
              onChange={(e) =>
                setNewProduct({ ...newProduct, subtitle: e.target.value })
              }
              className="border p-2 flex-1 rounded w-full"
            />
          </div>

          <div className="flex flex-col md:flex-row gap-3">
            <select
              value={newProduct.category}
              onChange={(e) =>
                setNewProduct({ ...newProduct, category: e.target.value })
              }
              className="border p-2 flex-1 rounded w-full"
            >
              <option value="">Select Category</option>
              <option value="Home-living">Home & Living</option>
              <option value="Metal-craft">Metal-craft</option>
              <option value="Category">Category</option>
              <option value="Index">Index</option>
              <option value="Slider">Slider</option>
              <option value="Work-in-Style">WorkStyle</option>
              <option value="Single Product">SingleProduct</option>
              <option value="Resin craft">Resin craft</option>
            </select>

            <input
              placeholder="Details"
              value={newProduct.details}
              onChange={(e) =>
                setNewProduct({ ...newProduct, details: e.target.value })
              }
              className="border p-2 flex-1 rounded w-full"
            />
          </div>

          <div className="flex flex-col md:flex-row gap-3">
            <input
              placeholder="Price"
              type="number"
              value={newProduct.price}
              onChange={(e) =>
                setNewProduct({ ...newProduct, price: e.target.value })
              }
              className="border p-2 rounded w-full md:w-32"
            />

            <input
              placeholder="Stock"
              type="number"
              value={newProduct.stock}
              onChange={(e) =>
                setNewProduct({ ...newProduct, stock: e.target.value })
              }
              className="border p-2 rounded w-full md:w-32"
            />

            <input
              type="file"
              name="file"
              onChange={(e) =>
                setNewProduct({
                  ...newProduct,
                  file: e.target.files?.[0] || null,
                })
              }
              className="border p-2 rounded w-full"
            />
          </div>

          <div className="flex justify-end">
            <button
              onClick={addProduct}
              className="bg-blue-500 text-white px-4 py-2 rounded w-full md:w-auto hover:bg-blue-600 cursor-pointer"
            >
              Add Product
            </button>
          </div>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-300 text-black text-sm md:text-base">
          <thead className="bg-gray-200 text-left">
            <tr>
              <th className="px-2 md:px-4 py-2">Name</th>
              <th className="px-2 md:px-4 py-2">Product ID</th>
              <th className="px-2 md:px-4 py-2">Category</th>
              <th className="px-2 md:px-4 py-2">Price</th>
              <th className="px-2 md:px-4 py-2">Stock</th>
              <th className="px-2 md:px-4 py-2">Sales</th>
              <th className="px-2 md:px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p, index) => (
              <tr
                key={p._id}
                className="border-t border-gray-300 hover:bg-gray-100"
              >
                <td className="px-2 md:px-4 py-2 flex items-center gap-2">
                  <img
                    src={p.img}
                    alt={p.title}
                    className="w-8 h-8 md:w-10 md:h-10 object-cover rounded-full"
                  />
                  <div>
                    <div className="font-semibold text-sm md:text-base">
                      {p.title}
                    </div>
                    <div className="text-xs md:text-sm text-gray-600">
                      {p.subtitle}
                    </div>
                  </div>
                </td>
                <td className="px-2 md:px-4 py-2 text-xs md:text-sm">
                  #{index + 1}
                </td>
                <td className="px-2 md:px-4 py-2 text-xs md:text-sm">
                  {p.category}
                </td>
                <td className="px-2 md:px-4 py-2 text-xs md:text-sm">
                  ₹{p.price}
                </td>
                <td className="px-2 md:px-4 py-2 text-xs md:text-sm">
                  {p.stock}
                </td>
                <td className="px-2 md:px-4 py-2 text-xs md:text-sm">—</td>
                <td className="px-2 md:px-4 py-2 flex gap-2">
                  <button className="text-blue-600 hover:text-blue-800">
                    <PencilIcon className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => deleteProduct(p._id)}
                    className="text-red-600 hover:text-red-800 cursor-pointer"
                  >
                    <TrashIcon className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
