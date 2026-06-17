"use client";

import { m } from "framer-motion";
import { ArrowDownRight } from "lucide-react";
import Image from "next/image";
import { typograph } from "@/lib/utils";

export function Problems() {
  const problems = [
    {
      title: "Старый шкаф работает нестабильно",
      description: "Вентиляция запускается с перебоями, часть функций отключена, аварии появляются без понятной причины, а эксплуатация не всегда может быстро определить источник проблемы.",
      image: "/images/problems/1_cabinet.webp",
      imageClassName: "absolute top-4 right-6 w-48 h-48 lg:w-56 lg:h-56 mix-blend-multiply transition-transform duration-1000 ease-out group-hover:scale-[1.04] pointer-events-none z-0"
    },
    {
      title: "Нет актуальной схемы или документации",
      description: "Шкаф есть, но документация устарела, неполная или не соответствует фактической сборке. Это усложняет обслуживание, ремонт и модернизацию.",
      image: "/images/problems/2_docs.webp",
      imageClassName: "absolute top-0 right-6 w-48 h-48 lg:w-56 lg:h-56 mix-blend-multiply transition-transform duration-1000 ease-out group-hover:scale-[1.04] pointer-events-none z-0"
    },
    {
      title: "Вентиляция не видна в диспетчеризации",
      description: "Система работает локально: статусы, аварии, режимы и параметры не передаются в BMS или общую диспетчерскую здания.",
      image: "/images/problems/3_ventilation.webp",
      imageClassName: "absolute top-4 right-6 w-48 h-48 lg:w-56 lg:h-56 mix-blend-multiply transition-transform duration-1000 ease-out group-hover:scale-[1.04] pointer-events-none z-0"
    },
    {
      title: "Модернизация без хаоса",
      description: "Бизнес-центр работает, арендаторы в помещениях. Нельзя надолго остановить вентиляцию и «экспериментировать».",
      image: "/images/problems/4_process.webp",
      imageClassName: "absolute -top-4 right-6 w-48 h-48 lg:w-56 lg:h-56 mix-blend-multiply transition-transform duration-1000 ease-out group-hover:scale-[1.04] pointer-events-none z-0"
    },
    {
      title: "Нужен ответственный подрядчик",
      description: "Нужно собрать шкаф по проекту, запрограммировать контроллер, протестировать решение и выполнить ПНР без постоянных переделок.",
      image: "/images/problems/5_gears.webp",
      imageClassName: "absolute -top-2 right-6 w-48 h-48 lg:w-56 lg:h-56 mix-blend-multiply transition-transform duration-1000 ease-out group-hover:scale-[1.04] pointer-events-none z-0"
    },
    {
      title: "Подрядчики перекладывают ответственность",
      description: "Один отвечает за вентиляцию, другой за шкаф, третий за диспетчеризацию. При сбое эксплуатация остается между зонами ответственности.",
      image: "/images/problems/6_pingpong.webp",
      imageClassName: "absolute top-0 right-6 w-48 h-48 lg:w-56 lg:h-56 mix-blend-multiply transition-transform duration-1000 ease-out group-hover:scale-[1.04] pointer-events-none z-0"
    },
  ];

  return (
    <section id="problems" className="py-16 md:py-24 bg-transparent border-t border-border/50 relative z-10 overflow-hidden">

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-3xl mb-16">
          <m.h2 
            initial={{ opacity: 0, x: -60, rotateY: -60 }}
            whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
            viewport={{ once: true, margin: "-20px" }}
            style={{ transformOrigin: "left center", transformPerspective: 1200 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="text-3xl md:text-5xl font-display font-bold mb-6"
          >
            Когда шкаф вентиляции становится <span className="text-[#577E95]">проблемой</span>
          </m.h2>
          <m.p 
            initial={{ opacity: 0, x: -60, rotateY: -60 }}
            whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
            viewport={{ once: true, margin: "-20px" }}
            style={{ transformOrigin: "left center", transformPerspective: 1200 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1], delay: 0.03 }}
            className="text-lg text-muted-foreground"
          >
            {typograph("В бизнес-центре вентиляция должна работать стабильно и предсказуемо. Но на действующих объектах автоматика часто устаревает: шкаф работает нестабильно, документация неполная, а любая модернизация кажется риском для эксплуатации и арендаторов.")}
          </m.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {problems.map((problem, i) => (
            <m.div
              key={i}
              initial={{ opacity: 0, x: -60, rotateY: -60 }}
              whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
              viewport={{ once: true, margin: "-20px" }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1], delay: i * 0.03 }}
              className="relative p-6 border border-slate-100 bg-white flex flex-col md:aspect-square group transition-all duration-500 hover:-translate-y-1 hover:shadow-xl overflow-hidden min-h-[320px] md:min-h-0"
              style={{
                transformOrigin: "left center", 
                transformPerspective: 1200,
                boxShadow: "10px 10px 30px rgba(48,99,122,0.05), -10px -10px 30px rgba(255,255,255,0.8), inset 1px 1px 2px rgba(255,255,255,0.8)"
              }}
            >
              {/* 3D Image Background */}
              <div className={problem.imageClassName}>
                <Image src={problem.image} alt={problem.title} fill className="object-contain" />
              </div>

              <div className="relative z-10 text-4xl font-bold text-slate-200 group-hover:text-primary transition-colors mb-auto">
                0{i + 1}
              </div>
              
              <div className="relative z-10 mt-[180px] md:mt-0">
                <h3 className="text-xl font-medium mb-2 text-foreground">{typograph(problem.title)}</h3>
                <p className="text-muted-foreground text-sm md:text-base leading-relaxed pr-8">{typograph(problem.description)}</p>
              </div>

              <div className="absolute bottom-6 right-6 opacity-30 group-hover:opacity-100 transition-all duration-500 group-hover:-translate-y-1 group-hover:translate-x-1 z-20">
                <ArrowDownRight className="w-6 h-6 text-primary stroke-[1.5]" />
              </div>
            </m.div>
          ))}
        </div>
      </div>
    </section>
  );
}
