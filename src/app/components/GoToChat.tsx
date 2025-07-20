import Link from "next/link";
import { FiChevronRight } from "react-icons/fi";

export default function GoToChat() {
  return (
    <section className="relative py-20">
      <div className="container mx-auto px-4 flex flex-col items-center justify-center min-h-[60vh]">
        <div className="text-center mb-12">
          <h1 className="text-6xl md:text-8xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[#42f5a7] to-[#b362f5]">
            PORTAL
          </h1>
          <p className="text-xl text-gray-400 font-mono">AI CHAT EXPERIENCE</p>
        </div>

        <Link
          href="/ai/rick-talk"
          className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-black bg-[#42f5a7] hover:bg-[#3ae59d] rounded-lg transition-all duration-300 border-2 border-transparent hover:border-[#b362f5]"
        >
          Чат с Риком
          <FiChevronRight className="ml-2" />
        </Link>
      </div>
    </section>
  );
}