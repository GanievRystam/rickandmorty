
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const funSlides = [
  {
    src: "/img/rick-portal.webp",
    alt: "Рик открывает портал",
  },
  {
    src: "/img/morty-scared.jpg",
    alt: "Перепуганный Морти",
  },
  {
    src: "/img/summer-laser.webp",
    alt: "Саммер с лазером",
  },
];

export default function SliderFun() {
  const [current, setCurrent] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Автоматическое пролистывание
  useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      handleNext();
    }, 4000);
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
    // eslint-disable-next-line
  }, [current]);

  function handlePrev() {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrent((prev) => (prev === 0 ? funSlides.length - 1 : prev - 1));
    setTimeout(() => setIsAnimating(false), 400);
  }

  function handleNext() {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrent((prev) => (prev === funSlides.length - 1 ? 0 : prev + 1));
    setTimeout(() => setIsAnimating(false), 400);
  }

  function goToSlide(idx: number) {
    if (isAnimating || idx === current) return;
    setIsAnimating(true);
    setCurrent(idx);
    setTimeout(() => setIsAnimating(false), 400);
  }

  return (
    <section className="w-full flex flex-col items-center py-12">
      <h2 className="text-3xl md:text-5xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-[#42f5a7] to-[#b362f5]">
        Фан-иллюстрации
      </h2>
      <div className="relative w-full max-w-xl aspect-[16/9] rounded-2xl overflow-hidden shadow-2xl border border-[#42f5a7]/30 bg-black/40 group">
        {/* Слайды */}
        <div className="w-full h-full relative">
          {funSlides.map((slide, idx) => (
            <div
              key={slide.src}
              className={`absolute inset-0 transition-all duration-500 ease-in-out ${
                idx === current
                  ? "opacity-100 scale-100 z-10"
                  : "opacity-0 scale-95 z-0 pointer-events-none"
              }`}
            >
              <Image
                src={slide.src}
                alt={slide.alt}
                fill
                style={{ objectFit: "cover" }}
                sizes="(max-width: 768px) 100vw, 600px"
                priority={idx === current}
                draggable={false}
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent px-6 py-4">
                <span className="text-white text-lg font-semibold drop-shadow">{slide.alt}</span>
              </div>
            </div>
          ))}
        </div>
        {/* Кнопки */}
        <button
          onClick={handlePrev}
          className="absolute left-3 top-1/2 -translate-y-1/2 z-20 bg-black/60 hover:bg-[#42f5a7]/80 text-white rounded-full p-3 transition opacity-80 hover:opacity-100 focus:outline-none"
          aria-label="Предыдущий слайд"
          tabIndex={0}
        >
          <FiChevronLeft size={28} />
        </button>
        <button
          onClick={handleNext}
          className="absolute right-3 top-1/2 -translate-y-1/2 z-20 bg-black/60 hover:bg-[#b362f5]/80 text-white rounded-full p-3 transition opacity-80 hover:opacity-100 focus:outline-none"
          aria-label="Следующий слайд"
          tabIndex={0}
        >
          <FiChevronRight size={28} />
        </button>
        {/* Индикаторы */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-3">
          {funSlides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => goToSlide(idx)}
              className={`w-4 h-4 rounded-full border-2 border-[#42f5a7] transition-all duration-300 ${
                idx === current
                  ? "bg-[#42f5a7] scale-110 shadow-lg"
                  : "bg-white/20 hover:bg-[#42f5a7]/60"
              }`}
              aria-label={`Перейти к слайду ${idx + 1}`}
              tabIndex={0}
            />
          ))}
        </div>
      </div>
      <p className="mt-4 text-gray-400 text-sm font-mono">
        Листай или жди автосмену, чтобы увидеть больше!
      </p>
    </section>
  );
}