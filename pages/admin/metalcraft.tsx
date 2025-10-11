"use client";
import { useEffect, useState } from "react";

export default function MetalCraftAdmin() {
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("/api/metalcraft")
      .then((res) => res.json())
      .then((data) => setImages(data?.images || []))
      .catch((err) => console.error("Error fetching:", err));
  }, []);

 
  const handleFileChange = async (e: any, index: number) => {
    const file = e.target.files[0];
    if (!file) return;

    setLoading(true);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "anmol_uploads"); 

    try {
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/diur6nbi7/image/upload`,
        { method: "POST", body: formData }
      );
      const data = await res.json();

      const newImages = [...images];
      newImages[index] = data.secure_url;
      setImages(newImages);
      setMessage("Image uploaded successfully ");
    } catch (error) {
      console.error(error);
      setMessage("Upload failed ");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (images.length < 2) {
      setMessage("Please upload both images!");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/metalcraft", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ images }),
      });

      const data = await res.json();
      if (data.success) setMessage("Images updated successfully");
      else setMessage("Failed to update ");
    } catch (error) {
      console.error(error);
      setMessage("Error saving images");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-2xl font-bold mb-6 text-gray-800 mt-6">
         Metal Craft Section (Admin)
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[0, 1].map((index) => (
          <div key={index} className="bg-white shadow-md rounded-lg p-4">
            <p className="font-semibold mb-2 text-black">
              Image {index + 1}
            </p>
            <div className="w-full h-64 bg-gray-100 rounded-md flex items-center justify-center overflow-hidden">
              {images[index] ? (
                <img
                  src={images[index]}
                  alt={`Preview ${index + 1}`}
                  className="object-cover w-full h-full"
                />
              ) : (
                <span className="text-black">No image uploaded</span>
              )}
            </div>
            <input
              type="file"
              accept="image/*"
              className="mt-3  text-black"
              onChange={(e) => handleFileChange(e, index)}
            />
          </div>
        ))}
      </div>

      <button
        onClick={handleSave}
        disabled={loading}
        className="mt-8 px-6 py-3 bg-black text-white rounded hover:bg-gray-800 transition"
      >
        {loading ? "Saving..." : "Save Changes"}
      </button>

      {message && (
        <p className="mt-4 text-sm text-gray-700 bg-gray-200 px-3 py-2 inline-block rounded">
          {message}
        </p>
      )}
    </div>
  );
}
