"use client";

import { motion } from "framer-motion";
import { ArrowDownRight } from "lucide-react";

export function Problems() {
  const problems = [
    {
      title: "Старый шкаф работает нестабильно",
      description: "Вентиляция запускается с перебоями, часть функций отключена, аварии появляются без понятной причины, а эксплуатация не всегда может быстро определить источник проблемы.",
    },
    {
      title: "Нет актуальной схемы или документации",
      description: "Шкаф есть, но документация устарела, неполная или не соответствует фактической сборке. Это усложняет обслуживание, ремонт и модернизацию.",
    },
    {
      title: "Вентиляция не видна в диспетчеризации",
      description: "Система работает локально: статусы, аварии, режимы и параметры не передаются в BMS или общую диспетчерскую здания.",
    },
    {
      title: "Модернизация без хаоса",
      description: "Бизнес-центр работает, арендаторы в помещениях. Нельзя надолго остановить вентиляцию и «экспериментировать».",
    },
    {
      title: "Нужен ответственный подрядчик",
      description: "Нужно собрать шкаф по проекту, запрограммировать контроллер, протестировать решение и выполнить ПНР без постоянных переделок.",
    },
    {
      title: "Подрядчики перекладывают ответственность",
      description: "Один отвечает за вентиляцию, другой за шкаф, третий за диспетчеризацию. При сбое эксплуатация остается между зонами ответственности.",
    },
  ];

  return (
    <section id="problems" className="py-16 md:py-24 bg-transparent border-t border-border/50 relative z-10 overflow-hidden">

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-3xl mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-5xl font-display font-bold mb-6"
          >
            Когда шкаф вентиляции становится <span className="text-muted-foreground">проблемой</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-lg text-muted-foreground"
          >
            В бизнес-центре вентиляция должна работать стабильно и предсказуемо. 
            Но на действующих объектах автоматика часто устаревает: шкаф работает 
            нестабильно, документация неполная, а любая модернизация кажется риском 
            для эксплуатации и арендаторов.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {problems.map((problem, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="relative p-6 border border-white/60 bg-white/40 backdrop-blur-md flex flex-col aspect-square group transition-transform duration-300 hover:-translate-y-1"
              style={{
                boxShadow: "10px 10px 30px rgba(48,99,122,0.05), -10px -10px 30px rgba(255,255,255,0.8), inset 1px 1px 2px rgba(255,255,255,0.8)"
              }}
            >
              <div className="absolute inset-0 bg-white/0 group-hover:bg-white/20 transition-colors duration-500 pointer-events-none" />
              
              <div className="relative z-10 text-4xl font-display font-bold text-muted-foreground/30 group-hover:text-primary transition-colors mb-auto">
                0{i + 1}
              </div>
              
              <div className="relative z-10">
                <h3 className="text-xl font-display font-medium mb-2 text-foreground">{problem.title}</h3>
                <p className="text-muted-foreground text-sm md:text-base leading-relaxed pr-8">{problem.description}</p>
              </div>

              <div className="absolute bottom-6 right-6 opacity-30 group-hover:opacity-100 transition-all duration-500 group-hover:-translate-y-1 group-hover:translate-x-1">
                <ArrowDownRight className="w-6 h-6 text-primary" strokeWidth={1} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
