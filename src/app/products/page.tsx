import React from "react";
import Card from "../../../component/card";

const categories = ["All", "Beverages", "Snacks", "Dairy", "Fruits", "Vegetables", "Meat", "Frozen Foods"];

const productData = [
    { title: "Product 1", price: "$10", image: "/pr1.jpg" },
    { title: "Product 2", price: "$20", image: "/pr2.jpg" },
    { title: "Product 3", price: "$30", image: "/pr3.jpg" },
    { title: "Product 4", price: "$40", image: "/pr4.jpg" },
    { title: "Product 5", price: "$50", image: "/pr5.jpg" },
    { title: "Product 6", price: "$60", image: "/pr6.jpg" },
    { title: "Product 7", price: "$70", image: "/pop3.webp" },
    { title: "Product 8", price: "$80", image: "/pop4.webp" },
];
export default function ProductsPage() {
    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* Sidebar */}
            <aside className="w-64 bg-white p-4 shadow-md">
                <h2 className="text-xl font-semibold mb-4">Categories</h2>
                <ul>
                    {categories.map((category, index) => (
                        <li key={index} className="py-2 px-3 cursor-pointer hover:bg-gray-200 rounded-md">
                            {category}
                        </li>
                    ))}
                </ul>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-6">
                <h1 className="text-2xl font-bold mb-4">Products</h1>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {/* Placeholder Products */}
                    {productData.map((product, index) => (
                        <Card key={index} title={product.title} price={product.price} image={product.image} />
                    ))}
                </div>
            </main>
        </div>
    );
}
