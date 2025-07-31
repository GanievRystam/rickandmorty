import Link from "next/link";
import { FiChevronRight } from "react-icons/fi";
import mainImg from '../../../public/rickandmorybg.png'

export default function GoToChat() {
  return (
    <section className="relative py-24 bg-gray-900 overflow-hidden">
      <video
        className="absolute inset-0 w-full h-full object-cover"
        src="/rickandmordybg.mp4"
        autoPlay
        muted
        playsInline
        loop={false}
        onEnded={e => { e.currentTarget.currentTime = 0}}
      />
      <div className="absolute inset-0 opacity-25 animate-pulse-slow"></div>
      <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-start min-h-[70vh] relative z-10">
        <div className="md:w-1/2 w-full flex flex-col items-start md:items-start text-left mb-16 md:mb-0">
          <h1 className="text-6xl sm:text-7xl md:text-9xl font-extrabold mb-6 text-[#ff099b]">
            PORTAL
          </h1>
          <p className="text-xl sm:text-2xl text-gray-100 font-['Orbitron'] tracking-widest uppercase mb-8">
            Чат с искусственным Риком
          </p>
          <Link
            href="/ai/rick-talk"
            className="relative inline-flex items-center justify-center px-10 py-5 text-lg sm:text-xl font-bold text-white bg-[#ff099b] hover:bg-[#c1077a] rounded-full transition-all duration-300 border-4 border-[#ff099b] hover:border-[#c1077a] hover:scale-110 hover:shadow-[0_0_20px_rgba(255,9,155,0.6)]"
          >
            <span className="relative z-10">Чат с Риком</span>
            <FiChevronRight className="ml-3 text-2xl" />
            <span className="absolute inset-0 bg-gradient-to-r from-[#ff099b] to-[#c1077a] opacity-0 hover:opacity-30 rounded-full transition-opacity duration-300"></span>
          </Link>
        </div>
        {/* Можно добавить пустой блок для выравнивания или для будущего контента */}
        <div className="md:w-1/2 w-full"></div>
      </div>
    </section>
  );
}