// "use client";
// import { useState, useEffect } from "react";

// export default function MetalSliderImage() {
//   const [image, setImage] = useState<File | null>(null);
//   const [images, setImages] = useState<any[]>([]);

//   useEffect(() => {
//     const fetchImages = async () => {
//       try {
//         const res = await fetch("/api/metalSlider");
//         if (!res.ok) return;
//         const data = await res.json();
//         setImages(data);
//       } catch (error) {
//         console.error("Fetch failed:", error);
//       }
//     };
//     fetchImages();
//   }, []);

//   const handleUpload = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!image) return alert("Please select an image!");

//     const formData = new FormData();
//     formData.append("image", image);

//     try {
//       const res = await fetch("/api/metalSlider", {
//         method: "POST",
//         body: formData,
//       });

//       if (res.ok) {
//         const data = await res.json();
//         setImages((prev) => [data, ...prev]);
//         setImage(null);
//         alert("Image uploaded successfully!");
//       } else {
//         const err = await res.json();
//         console.error("Upload failed:", err);
//         alert("Upload failed!");
//       }
//     } catch (error) {
//       console.error("Something went wrong:", error);
//       alert("Something went wrong!");
//     }
//   };

//   return (
//     <div className="p-8 mt-8">
//       <h1 className="text-3xl font-bold mb-6 text-center text-black">Upload Metal Slider Image</h1>
//       <form onSubmit={handleUpload} className="flex flex-col items-center gap-4 text-black">
//         <input
//           type="file"
//           name="image"
//           accept="image/*"
//           onChange={(e) => setImage(e.target.files?.[0] || null)}
//           className="border border-gray-400 rounded p-2 w-64"
//         />
//         <button
//           type="submit"
//           className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
//         >
//           Upload
//         </button>
//       </form>

//       <h2 className="text-2xl font-semibold mt-10 mb-4 text-center text-black">Uploaded Images</h2>
//       <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//         {images.map((img) => (
//           <img
//             key={img._id}
//             src={img.img}
//             alt="Uploaded"
//             className="w-full h-48 object-cover rounded shadow"
//           />
//         ))}
//       </div>
//     </div>
//   );
// }
































"use client";
import { useState, useEffect } from "react";

export default function MetalSliderImage() {
  const [image, setImage] = useState<File | null>(null);
  const [images, setImages] = useState<any[]>([]);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const res = await fetch("/api/metalSlider");
      if (!res.ok) return;
      const data = await res.json();
      setImages(data);
    } catch (error) {
      console.error("Fetch failed:", error);
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!image) return alert("Please select an image!");

    const formData = new FormData();
    formData.append("image", image);

    try {
      const res = await fetch("/api/metalSlider", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        const data = await res.json();
        setImages((prev) => [data, ...prev]);
        setImage(null);
        alert("Image uploaded successfully!");
      } else {
        const err = await res.json();
        console.error("Upload failed:", err);
        alert("Upload failed!");
      }
    } catch (error) {
      console.error("Something went wrong:", error);
      alert("Something went wrong!");
    }
  };

  // ✅ DELETE handler
  const handleDelete = async (id: string, url: string) => {
    if (!confirm("Are you sure you want to delete this image?")) return;
    try {
      const res = await fetch(`/api/metalSlider?id=${id}&url=${encodeURIComponent(url)}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setImages((prev) => prev.filter((img) => img._id !== id));
        alert("Image deleted successfully!");
      } else {
        const err = await res.json();
        alert(err.message || "Delete failed!");
      }
    } catch (error) {
      console.error("Delete failed:", error);
      alert("Something went wrong!");
    }
  };

  return (
    <div className="p-8 mt-8">
      <h1 className="text-3xl font-bold mb-6 text-center text-black">
        Upload Metal Slider Image
      </h1>

      <form onSubmit={handleUpload} className="flex flex-col items-center gap-4 text-black">
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={(e) => setImage(e.target.files?.[0] || null)}
          className="border border-gray-400 rounded p-2 w-64"
        />
        <button type="submit" className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700">
          Upload
        </button>
      </form>

      <h2 className="text-2xl font-semibold mt-10 mb-4 text-center text-black">Uploaded Images</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {images.map((img) => (
          <div key={img._id} className="relative group">
            <img
              src={img.img}
              alt="Uploaded"
              className="w-full h-48 object-cover rounded shadow"
            />
            <button
              onClick={() => handleDelete(img._id, img.img)}
              className="absolute top-2 right-2 bg-red-600 text-white px-3 py-1 text-sm rounded opacity-0 group-hover:opacity-100 transition"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
