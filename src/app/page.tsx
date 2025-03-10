"use client";
import Title from "../../component/title";
import { useRouter } from "next/navigation";
import Image from "next/image";

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
        <Image src="/admin.png" alt="Admin" width={48} height={48} />
      </div>
      <div className="text-black">
        <Title text="Food for Life" />
        <p className="text-3xl mt-2 text-black">Classic Traditional Food</p>
        <p className="text-md text-black mt-4">(Click anywhere to continue)</p>
      </div>
    </main>
  );
}