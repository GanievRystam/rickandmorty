import Link from "next/link";
import { FiMenu } from "react-icons/fi";

export default function Navbar() {
  return (
    <header className="absolute top-0 z-50 bg-transparent backdrop-blur-md border-b border-[#ff099b]/20 w-full">
      <div className="container mx-auto px-4 py-4 flex flex-col items-center relative">
        <Link href="/" className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#ff099b] to-[#b362f5] mb-2">
          PORTAL
        </Link>
        <nav className="hidden md:flex space-x-8 justify-center">
          <Link href="/" className="text-white hover:text-[#ff099b] transition">Главная</Link>
          <Link href="/ai/rick-talk" className="text-white hover:text-[#ff099b] transition">Чат с Риком</Link>
          <Link href="/articles" className="text-white hover:text-[#ff099b] transition">Статьи</Link>
          <Link href="/arts" className="text-white hover:text-[#ff099b] transition">Фан Арты</Link>
          <Link href="/arts" className="text-white hover:text-[#ff099b] transition">Персонаж</Link>
          <Link href="/about" className="text-white hover:text-[#ff099b] transition">О проекте</Link>
        </nav>
        <button className="md:hidden text-2xl mt-2 absolute right-4 top-4">
          <FiMenu />
        </button>
      </div>
    </header>
  );
}