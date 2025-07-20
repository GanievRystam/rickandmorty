import Link from "next/link";
import { FiMenu } from "react-icons/fi";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-black/80 backdrop-blur-md border-b border-[#42f5a7]/20">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#42f5a7] to-[#b362f5]">
          PORTAL
        </Link>
        
        <nav className="hidden md:flex space-x-8">
          <Link href="/" className="hover:text-[#42f5a7] transition">Главная</Link>
          <Link href="/ai/rick-talk" className="hover:text-[#42f5a7] transition">Чат с Риком</Link>
          <Link href="/articles" className="hover:text-[#42f5a7] transition">Статьи</Link>
          <Link href="/arts" className="hover:text-[#42f5a7] transition">Фан Арты</Link>
          <Link href="/arts" className="hover:text-[#42f5a7] transition">Персонаж</Link>
          <Link href="/about" className="hover:text-[#42f5a7] transition">О проекте</Link>
        </nav>

        <button className="md:hidden text-2xl">
          <FiMenu />
        </button>
      </div>
    </header>
  );
}