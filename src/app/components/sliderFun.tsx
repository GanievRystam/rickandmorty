import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const funSlides = [
  {
    src: "/img/rick-portal.webp",
    alt: "Рик открывает портал",
    quote: "Wubba lubba dub dub!"
  },
  {
    src: "/img/morty-scared.jpg",
    alt: "Перепуганный Морти",
    quote: "Oh jeez, Rick!"
  },
  {
    src: "/img/summer-laser.webp",
    alt: "Саммер с лазером",
    quote: "Nobody messes with Summer!"
  },
];

export default function SliderFun() {
  const [current, setCurrent] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Автоматическое пролистывание с паузой при наведении
  useEffect(() => {
    const slider = document.getElementById("rick-slider");
    let isHovered = false;

    const handleMouseEnter = () => isHovered = true;
    const handleMouseLeave = () => isHovered = false;

    slider?.addEventListener("mouseenter", handleMouseEnter);
    slider?.addEventListener("mouseleave", handleMouseLeave);

    timeoutRef.current = setTimeout(() => {
      if (!isHovered) handleNext();
    }, 5000);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      slider?.removeEventListener("mouseenter", handleMouseEnter);
      slider?.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [current]);

  function handlePrev() {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrent((prev) => (prev === 0 ? funSlides.length - 1 : prev - 1));
    resetTimer();
  }

  function handleNext() {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrent((prev) => (prev === funSlides.length - 1 ? 0 : prev + 1));
    resetTimer();
  }

  function goToSlide(idx: number) {
    if (isAnimating || idx === current) return;
    setIsAnimating(true);
    setCurrent(idx);
    resetTimer();
  }

  function resetTimer() {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setTimeout(() => setIsAnimating(false), 500);
  }

  return (
    <section className="w-full flex flex-col items-center py-12 px-4 relative overflow-hidden">
      {/* Анимированный фон с "портальной энергией" */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <div className="absolute inset-0 bg-[url('/img/portal-bg-pattern.webp')] bg-cover animate-[pulse_20s_infinite]"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-[#ff099b]/10 to-[#42f5a7]/10"></div>
      </div>

      <h2 className="text-3xl md:text-5xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-[#ff099b] to-[#b362f5] relative z-10">
        <span className="text-shadow-portal">Фан-иллюстрации</span>
      </h2>

      {/* Основной контейнер слайдера */}
      <div 
        id="rick-slider"
        className="relative w-full max-w-4xl aspect-video rounded-2xl overflow-hidden shadow-[0_0_30px_rgba(255,9,155,0.3)] border-2 border-[#ff099b]/50 group"
      >
        {/* Эффект "портального свечения" по краям */}
        <div className="absolute inset-0 z-0 opacity-70">
          <div className="absolute -left-10 -top-10 w-32 h-32 rounded-full bg-[#ff099b] blur-3xl animate-[pulse_4s_infinite]"></div>
          <div className="absolute -right-10 -bottom-10 w-32 h-32 rounded-full bg-[#b362f5] blur-3xl animate-[pulse_5s_infinite_2s]"></div>
        </div>

        {/* Слайды с улучшенной анимацией */}
        <div className="w-full h-full relative">
          {funSlides.map((slide, idx) => (
            <div
              key={slide.src}
              className={`absolute inset-0 transition-all duration-700 ease-[cubic-bezier(0.68,-0.55,0.27,1.55)] ${
                idx === current
                  ? "opacity-100 scale-100 z-10"
                  : idx < current
                    ? "opacity-0 -translate-x-1/4 scale-90 z-0"
                    : "opacity-0 translate-x-1/4 scale-90 z-0"
              }`}
            >
              <Image
                src={slide.src}
                alt={slide.alt}
                fill
                className="object-cover object-center"
                sizes="(max-width: 768px) 100vw, 800px"
                priority={idx === current}
                draggable={false}
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent px-6 py-4">
                <p className="text-white text-lg md:text-xl font-bold font-['Orbitron'] tracking-wider">
                  {slide.alt}
                </p>
                <p className="text-[#ff099b] text-sm md:text-base font-mono mt-1">
                  "{slide.quote}"
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Кнопки навигации с неоновым эффектом */}
        <button
          onClick={handlePrev}
          className="absolute left-3 top-1/2 -translate-y-1/2 z-20 bg-black/70 hover:bg-[#ff099b] text-white rounded-full p-3 transition-all duration-300 opacity-90 hover:opacity-100 hover:shadow-[0_0_15px_rgba(255,9,155,0.8)] border border-[#ff099b]/50 hover:border-[#ff099b]"
          aria-label="Предыдущий слайд"
        >
          <FiChevronLeft size={28} className="hover:scale-125 transition-transform" />
        </button>
        <button
          onClick={handleNext}
          className="absolute right-3 top-1/2 -translate-y-1/2 z-20 bg-black/70 hover:bg-[#ff099b] text-white rounded-full p-3 transition-all duration-300 opacity-90 hover:opacity-100 hover:shadow-[0_0_15px_rgba(255,9,155,0.8)] border border-[#ff099b]/50 hover:border-[#ff099b]"
          aria-label="Следующий слайд"
        >
          <FiChevronRight size={28} className="hover:scale-125 transition-transform" />
        </button>

        {/* Индикаторы в стиле "пузырей" */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-3 z-20">
          {funSlides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => goToSlide(idx)}
              className={`w-3 h-3 md:w-4 md:h-4 rounded-full transition-all duration-300 ${
                idx === current
                  ? "bg-[#ff099b] scale-125 shadow-[0_0_10px_rgba(255,9,155,0.8)]"
                  : "bg-white/40 hover:bg-[#ff099b]/80"
              }`}
              aria-label={`Перейти к слайду ${idx + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Подпись с анимированным текстом */}
      <p className="mt-6 text-gray-300 text-sm md:text-base font-mono animate-[pulse_2s_infinite]">
        Листай или жди автосмену, чтобы увидеть больше!
      </p>
    </section>
  );
}