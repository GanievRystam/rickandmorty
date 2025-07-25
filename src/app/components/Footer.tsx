import Link from "next/link";

export default function Footer() {
  return (
    <footer className="py-12 border-t border-[#ff099b]/20 bg-[black]">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#42f5a7] to-[#b362f5]">
              PORTAL
            </h3>
            <p className="text-gray-400 text-sm mt-2">Мультивселенная C-137</p>
          </div>
          
          <div className="flex space-x-6">
            <Link href="/terms" className="text-gray-400 hover:text-[#42f5a7] text-sm">Условия</Link>
            <Link href="/privacy" className="text-gray-400 hover:text-[#42f5a7] text-sm">Конфиденциальность</Link>
            <Link href="/contact" className="text-gray-400 hover:text-[#42f5a7] text-sm">Контакты</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}