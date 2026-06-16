"use client";
import { m } from "framer-motion";
import { useEffect, useState } from "react";

export function GlobalBackground() {
  // По умолчанию true, чтобы при SSR не было лишних расчетов
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    // Проверяем сразу после маунта
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <div className="sticky top-0 h-[100dvh] w-full z-0 pointer-events-none bg-background overflow-hidden">
      {/* Мягкий базовый градиент */}
      <div className="absolute inset-0 bg-gradient-to-br from-secondary/40 via-background to-primary/10 opacity-60" />
      
      {/* Анимированные блюр-пятна. На мобилках отключаем анимации и снижаем радиус blur, чтобы не плавить GPU Safari */}
      <m.div 
        className="absolute top-[10%] left-[10%] w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-primary rounded-full blur-[60px] md:blur-[120px] opacity-[0.06]"
        animate={isMobile ? undefined : {
          x: [0, 100, 0],
          y: [0, -50, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />
      
      <m.div 
        className="absolute top-[40%] right-[10%] w-[350px] md:w-[700px] h-[350px] md:h-[700px] bg-secondary rounded-full blur-[70px] md:blur-[150px] opacity-[0.08]"
        animate={isMobile ? undefined : {
          x: [0, -100, 0],
          y: [0, 100, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />
      
      <m.div 
        className="absolute bottom-[20%] left-[20%] w-[250px] md:w-[500px] h-[250px] md:h-[500px] bg-destructive rounded-full blur-[70px] md:blur-[150px] opacity-[0.03]"
        animate={isMobile ? undefined : {
          x: [0, 50, 0],
          y: [0, 50, 0],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      
      <m.div 
        className="absolute bottom-[10%] right-[30%] w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-primary rounded-full blur-[70px] md:blur-[150px] opacity-[0.05]"
        animate={isMobile ? undefined : {
          x: [0, -50, 0],
          y: [0, -50, 0],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}
