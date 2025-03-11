export default function Page() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-lg w-full bg-white p-10 shadow-lg rounded-xl">
        <div className="flex justify-center mb-6">
          <img src="/admin.png" alt="Admin" className="w-24 h-24 shadow-md" />
        </div>
        <h2 className="text-4xl font-bold text-gray-800 text-center mb-6">Add Product</h2>
        <form className="space-y-6">
          <div>
            <label className="block text-lg font-medium text-gray-700">Product Name</label>
            <input 
              type="text" 
              className="w-full p-4 text-lg border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              placeholder="Enter product name"
            />
          </div>
          <div>
            <label className="block text-lg font-medium text-gray-700">Price</label>
            <input 
              type="number" 
              className="w-full p-4 text-lg border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              placeholder="Enter product price"
            />
          </div>
          <div>
            <label className="block text-lg font-medium text-gray-700">Image</label>
            <input 
              type="file" 
              className="w-full p-4 text-lg border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>
          <button 
            type="submit" 
            className="w-full bg-blue-600 text-white py-4 text-xl rounded-md hover:bg-blue-700 transition font-semibold"
          >
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
}