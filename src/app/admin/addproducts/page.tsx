"use client";
import { useState } from "react";

export default function Page() {
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    if (!price.trim() || !category.trim() || !image) {
      setMessage("All fields are required!");
      return;
    }

    const formData = new FormData();
    formData.append("productName", productName);
    formData.append("price", price);
    formData.append("category", category);
    formData.append("image", image);

    try {
      const res = await fetch("/api/products", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (res.ok) {
        setMessage("Product added successfully!");
        setProductName("");
        setPrice("");
        setCategory("");
        setImage(null);
      } else {
        setMessage(data.message || "Error adding product");
      }
    } catch (error) {
      setMessage("Something went wrong");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="mt-10 max-w-md w-full bg-white p-6 shadow-lg rounded-xl">
        <div className="flex justify-center mb-4">
          <img src="/admin.png" alt="Admin" className="w-20 h-20 shadow-md" />
        </div>
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-4">Add Product</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="productName" className="block text-lg font-medium text-gray-700">
              Product Name
            </label>
            <input
              id="productName"
              type="text"
              className="w-full p-3 text-lg border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              placeholder="Enter product name"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="price" className="block text-lg font-medium text-gray-700">
              Price
            </label>
            <input
              id="price"
              type="number"
              className="w-full p-3 text-lg border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              placeholder="Enter product price"
              value={price}
              onChange={(e) => setPrice(e.target.value.replace(/[^0-9.]/g, ""))}
            />
          </div>
          <div>
            <label htmlFor="category" className="block text-lg font-medium text-gray-700">
              Category
            </label>
            <select
              id="category"
              className="w-full p-3 text-lg border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">Select a category</option>
              <option value="fruits">Fruits</option>
              <option value="vegetables">Vegetables</option>
              <option value="snacks">Snacks</option>
              <option value="beverages">Beverages</option>
              <option value="dairy">Dairy</option>
              <option value="meat">Meat & Poultry</option>
              <option value="seafood">Seafood</option>
              <option value="bakery">Bakery</option>
            </select>
          </div>
          <div>
            <label htmlFor="image" className="block text-lg font-medium text-gray-700">
              Image
            </label>
            <input
              id="image"
              type="file"
              accept="image/*"
              className="w-full p-3 text-lg border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              onChange={(e) => setImage(e.target.files?.[0] || null)}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 text-xl rounded-md hover:bg-blue-700 transition font-semibold"
          >
            Add Product
          </button>
        </form>
        {message && <p className="mt-4 text-center text-red-600">{message}</p>}
      </div>
    </div>
  );
}
