"use client";
import { useState, useEffect } from "react";
import { FiShoppingCart, FiUsers, FiBox, FiBarChart } from "react-icons/fi";
import { useRouter } from "next/navigation";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const router = useRouter();

  const goToAddProducts = () => {
    router.push("/admin/addproducts");
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <aside className="w-64 bg-white shadow-md p-5">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Admin Panel</h2>
        <nav>
          <ul className="space-y-4">
            <li>
              <button
                className={`w-full flex items-center gap-3 p-3 text-lg rounded-lg transition ${
                  activeTab === "dashboard" ? "bg-blue-500 text-white" : "text-gray-700"
                }`}
                onClick={() => setActiveTab("dashboard")}
              >
                <FiBarChart /> Dashboard
              </button>
            </li>
            <li>
              <button
                className={`w-full flex items-center gap-3 p-3 text-lg rounded-lg transition ${
                  activeTab === "products" ? "bg-blue-500 text-white" : "text-gray-700"
                }`}
                onClick={() => setActiveTab("products")}
              >
                <FiBox /> Products
              </button>
            </li>
          </ul>
        </nav>
      </aside>

      <main className="flex-1 p-6 overflow-auto">
        {activeTab === "dashboard" && <Dashboard />}
        {activeTab === "products" && <Products goToAddProducts={goToAddProducts} />}
      </main>
    </div>
  );
}

function Dashboard() {
  return <h1 className="text-3xl font-bold">Dashboard Overview</h1>;
}

interface Product {
  id: number;
  name: string;
  price: string;
  stock: number;
  image: string;
}

interface ProductsProps {
  goToAddProducts: () => void;
}

function Products({ goToAddProducts }: ProductsProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/api/products");
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        const formattedProducts: Product[] = Array.isArray(data.products)
          ? data.products.map((product: any) => ({
              id: product.id,
              name: product.name,
              price: product.price,
              stock: product.stock || 0,
              image: product.image_url,
            }))
          : [];
        setProducts(formattedProducts);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleDelete = (productId: number) => {
    setProducts((prevProducts) => prevProducts.filter((product) => product.id !== productId));
  };

  const handleEdit = (productId: number) => {
    router.push(`/admin/editproduct/${productId}`);
  };

  if (loading) return <p>Loading products...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Manage Products</h1>
      <button onClick={goToAddProducts} className="bg-blue-500 text-white px-4 py-2 rounded-md mb-4">
        Add Products
      </button>
      <div className="bg-white p-4 shadow-md rounded-lg">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 text-left">ID</th>
              <th className="p-2 text-left">Image</th>
              <th className="p-2 text-left">Name</th>
              <th className="p-2 text-left">Price</th>
              <th className="p-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.length > 0 ? (
              products.map((product) => (
                <tr key={product.id} className="border-b">
                  <td className="p-2">{product.id}</td>
                  <td className="p-2">
                    <img src={product.image} alt={product.name} className="w-16 h-16 object-cover rounded" />
                  </td>
                  <td className="p-2">{product.name}</td>
                  <td className="p-2">{product.price}</td>
                  <td className="p-2 flex gap-2">
                    <button
                      onClick={() => handleEdit(product.id)}
                      className="bg-yellow-500 text-white px-3 py-1 rounded-md"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded-md"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="p-4 text-center text-gray-500">
                  No products available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}