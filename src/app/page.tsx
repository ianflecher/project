"use client";
import { useRouter } from "next/navigation";
import { MouseEvent } from "react";
import Image from "next/image";
import { Inter } from "next/font/google";

export default function Home() {
  const router = useRouter();

  const handleClick = () => {
    router.push("/products");
  };

  const handleAdminClick = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    router.push("/admin");
  };

  return (
    <main className="relative flex h-screen" style={{ backgroundColor: "#63B200" }}>
      {/* Admin Button (Top Right) */}
      <div className="absolute top-4 right-4 cursor-pointer" onClick={handleAdminClick}>
        <Image src="/admin.png" alt="Admin" width={48} height={48} />
      </div>

      {/* Left Section (1/3 - Image) */}
      <div 
        className="w-1/3 relative flex items-center justify-center cursor-pointer bg-cover bg-center" 
        style={{ backgroundImage: "url('/bg.png')" }}
        onClick={handleClick}
      />

      {/* Right Section (2/3 - Text) */}
      <div className="w-2/3 flex flex-col items-center justify-center p-6 text-white">
        <Image src="/ss.png" alt="Title" width={400} height={100} />
        <p className="text-3xl mt-2 labrada" style={{ color: "#D9D9D9" }}>
          Classic Traditional Food
        </p>
        <button 
          className="mt-30 px-6 py-3 bg-green-700 hover:bg-green-900 text-white text-lg rounded-full shadow-lg"
          onClick={handleClick}
        >
          Click Here to order
        </button>
      </div>
    </main>
  );
}
