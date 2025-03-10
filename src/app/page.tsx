"use client";
import Title from "../../component/title";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const handleClick = () => {
    router.push("/products");
  };

  const handleAdminClick = (e:any) => {
    e.stopPropagation(); 
    router.push("/admin");
  };

  return (
    <main
      className="relative flex h-screen bg-cover bg-center items-center justify-center text-center cursor-pointer"
      style={{ backgroundImage: "url('/home.jpg')" }}
      onClick={handleClick}
    >
      <div className="absolute top-4 right-4 cursor-pointer" onClick={handleAdminClick}>
        <img src="/admin.png" alt="Admin" className="w-12 h-12" />
      </div>
      <div className="text-black">
        <Title text="Food for Life" />
        <p className="text-3xl mt-2 text-black">Classic Traditional Food</p>
        <p className="text-md text-black mt-4">(Click anywhere to continue)</p>
      </div>
    </main>
  );
}
