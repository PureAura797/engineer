"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, FileText, Settings, Zap, Network, BookOpen } from "lucide-react";

const initialFeatures = [
  { id: 1, num: "01", title: "Для бизнес-центров" },
  { id: 2, num: "02", title: "Новый шкаф или модернизация" },
  { id: 3, num: "03", title: "Программирование и ПНР" },
  { id: 4, num: "04", title: "Интеграция с BMS" },
  { id: 5, num: "05", title: "Документация для эксплуатации" },
];

const extendedFeatures = [
  ...initialFeatures, 
  ...initialFeatures.map(f => ({ ...f, id: f.id + 5 }))
];

export function Hero() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex(prev => (prev + 1) % extendedFeatures.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);
  const { scrollY } = useScroll();
  const blurValue = useTransform(scrollY, [0, 600], [0, 20]);
  const opacityValue = useTransform(scrollY, [0, 600], [1, 0.2]);
  const filter = useTransform(blurValue, (v) => `blur(${v}px)`);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0,
        delayChildren: 3.8,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.1 },
    },
  };



  return (
    <section className="relative h-[100dvh] flex flex-col justify-center pt-20 overflow-hidden bg-white">
      {/* Solid Light Background */}
      <div className="absolute inset-0 z-0 bg-[#F3F7F9]" />
      
      <motion.div 
        style={{ filter, opacity: opacityValue }}
        className="container mx-auto px-4 md:px-6 z-10 flex flex-col justify-center h-full pb-12"
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="w-full my-auto"
        >
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 w-full">
            
            {/* Title Block */}
            <motion.div id="block-title" variants={itemVariants} className="md:col-span-8 border border-[#182025]/20 bg-transparent p-8 md:p-12 lg:p-16 flex flex-col justify-center text-[#182025] min-h-[40vh]">
              <h1 className="text-4xl md:text-5xl lg:text-7xl font-display font-semibold leading-[1.1] tracking-tight">
                Модернизация и сборка <br className="hidden lg:block" />
                <span className="text-[#30637A]">шкафов автоматики</span> <br className="hidden lg:block" />
                для бизнес-центров
              </h1>
            </motion.div>
            
            {/* Top Right Block */}
            <motion.div variants={itemVariants} className="md:col-span-4 flex flex-col gap-4">
              <div id="block-grid" className="border border-[#182025]/20 bg-transparent p-8 lg:p-10 flex-[0.6] flex flex-col justify-center items-start text-[#84919A]">
                <p className="text-sm md:text-base leading-relaxed">
                  Обследуем действующие шкафы, проектируем и собираем новые решения, программируем контроллеры, выполняем ПНР и подключаем вентиляцию к диспетчеризации здания.
                </p>
              </div>
              {/* CTA Box - Reversed to dark for contrast on light background */}
              <div id="block-cta" className="bg-[#182025] text-white p-8 lg:p-10 flex-[0.4] flex flex-col justify-between cursor-pointer hover:bg-[#182025]/90 transition-colors group">
                <h3 className="text-xl font-medium font-display mb-8">Отправить ТЗ инженеру</h3>
                <div className="w-10 h-10 border border-white/30 flex items-center justify-center group-hover:border-white transition-colors">
                  <ArrowRight className="w-5 h-5 transform -rotate-45 group-hover:rotate-0 transition-transform duration-300" />
                </div>
              </div>
            </motion.div>
            
            {/* Bottom Left Block */}
            <motion.div 
              id="block-blue"
              variants={itemVariants} 
              className="md:col-span-5 border border-[#30637A] bg-[#30637A] p-8 lg:p-10 flex flex-col justify-between text-white/80 cursor-pointer hover:bg-[#285366] transition-colors group/block"
            >
              <p className="text-sm md:text-base leading-relaxed mb-8">
                Работаем с готовым ТЗ, проектной документацией, схемами существующих шкафов или начинаем с обследования действующей системы.
              </p>
              <div className="font-medium mt-auto text-white flex items-center gap-4 transition-colors w-max">
                Обсудить модернизацию
                <div className="w-10 h-10 border border-white/30 flex items-center justify-center group-hover/block:border-white transition-colors">
                  <ArrowRight className="w-5 h-5 transform -rotate-45 group-hover/block:rotate-0 transition-transform duration-300 text-white" />
                </div>
              </div>
            </motion.div>
            
            {/* Bottom Right Block - Blueprint Cut Fan (Light) */}
            <motion.div id="block-steps" variants={itemVariants} className="md:col-span-7 border border-[#182025]/20 bg-transparent flex flex-col justify-center relative overflow-hidden min-h-[300px]">
              <div 
                className="w-full relative h-[312px] overflow-hidden" 
                style={{ 
                  WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)', 
                  maskImage: 'linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)' 
                }}
              >
                <div className="relative flex flex-col items-center justify-center h-full w-full">
                  {extendedFeatures.map((feature, i) => {
                    const diff = (i - activeIndex + extendedFeatures.length) % extendedFeatures.length;
                    let offset = diff;
                    if (offset > extendedFeatures.length / 2) offset -= extendedFeatures.length;

                    if (Math.abs(offset) > 2) return null;

                    const isActive = offset === 0;
                    let translateY = offset * 104;

                    return (
                      <div
                        key={feature.id}
                        className="absolute w-full h-[104px] flex items-center border-y transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]"
                        style={{
                          transform: `translateY(${translateY}px)`,
                          opacity: isActive ? 1 : 0.3,
                          backgroundColor: isActive ? 'rgba(24,32,37,0.05)' : 'transparent',
                          borderTopColor: isActive ? 'rgba(24,32,37,0.2)' : 'transparent',
                          borderBottomColor: isActive ? 'rgba(24,32,37,0.2)' : 'transparent',
                          zIndex: isActive ? 20 : 10,
                        }}
                      >
                        <div className="flex items-center gap-6 pl-8 md:pl-16 w-full">
                          <div 
                            className="text-[#182025] font-light w-8 transition-all duration-700"
                            style={{ fontSize: isActive ? '1.5rem' : '1.25rem' }} 
                          >
                            {feature.num}
                          </div>
                          <div className="flex flex-col justify-center h-full">
                            <div 
                              className="text-[10px] tracking-widest text-[#577E95] uppercase overflow-hidden transition-all duration-700"
                              style={{ 
                                opacity: isActive ? 1 : 0, 
                                height: isActive ? '14px' : 0, 
                                marginBottom: isActive ? '0.25rem' : 0 
                              }}
                            >
                              — Вариант решения
                            </div>
                            <div 
                              className="text-[#182025] leading-none transition-all duration-700"
                              style={{ 
                                fontSize: isActive ? '1.25rem' : '1.125rem',
                                fontWeight: isActive ? 500 : 400
                              }} 
                            >
                              {feature.title}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
            
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
