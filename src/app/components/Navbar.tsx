'use client';
import Link from "next/link";
import { usePathname } from 'next/navigation';
import { FiMenu } from "react-icons/fi";

export default function Navbar() {
  const pathname = usePathname();
  const isActive = (path: string) => {
    return pathname === path || 
           (path !== '/' && pathname.startsWith(path));
  };
  return (
    <header className="absolute top-0 z-50 bg-transparent backdrop-blur-md border-b border-[#ff099b]/20 w-full">
      <div className="container mx-auto px-4 py-4 flex flex-col items-center relative">
        <Link href="/" className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#ff099b] to-[#b362f5] mb-2">
          PORTAL
        </Link>
         <nav className="md:flex space-x-6 lg:space-x-8">
      <Link 
        href="/" 
        className={`relative px-2 py-1 text-sm font-medium transition-colors ${isActive('/') ? 'text-[#ff099b]' : 'text-white hover:text-[#ff099b]'}`}
      >
        {isActive('/') && (
          <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#ff099b] rounded-full animate-[pulse_2s_infinite]"></span>
        )}
        Главная
      </Link>
      
      <Link 
        href="/ai/rick-talk" 
        className={`relative px-2 py-1 text-sm font-medium transition-colors ${isActive('/ai/rick-talk') ? 'text-[#ff099b]' : 'text-white hover:text-[#ff099b]'}`}
      >
        {isActive('/ai/rick-talk') && (
          <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#ff099b] rounded-full animate-[pulse_2s_infinite]"></span>
        )}
        Чат с Риком
      </Link>
      
      <Link 
        href="/articles" 
        className={`relative px-2 py-1 text-sm font-medium transition-colors ${isActive('/articles') ? 'text-[#ff099b]' : 'text-white hover:text-[#ff099b]'}`}
      >
        {isActive('/articles') && (
          <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#ff099b] rounded-full animate-[pulse_2s_infinite]"></span>
        )}
        Статьи
      </Link>
      
      <Link 
        href="/arts" 
        className={`relative px-2 py-1 text-sm font-medium transition-colors ${isActive('/arts') ? 'text-[#ff099b]' : 'text-white hover:text-[#ff099b]'}`}
      >
        {isActive('/arts') && (
          <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#ff099b] rounded-full animate-[pulse_2s_infinite]"></span>
        )}
        Фан Арты
      </Link>
      
      <Link 
        href="/characters" 
        className={`relative px-2 py-1 text-sm font-medium transition-colors ${isActive('/characters') ? 'text-[#ff099b]' : 'text-white hover:text-[#ff099b]'}`}
      >
        {isActive('/characters') && (
          <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#ff099b] rounded-full animate-[pulse_2s_infinite]"></span>
        )}
        Персонажи
      </Link>
      
      {/* <Link 
        href="/about" 
        className={`relative px-2 py-1 text-sm font-medium transition-colors ${isActive('/about') ? 'text-[#ff099b]' : 'text-white hover:text-[#ff099b]'}`}
      >
        {isActive('/about') && (
          <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#ff099b] rounded-full animate-[pulse_2s_infinite]"></span>
        )}
        О проекте
      </Link> */}
    </nav>
      </div>
    </header>
  );
}