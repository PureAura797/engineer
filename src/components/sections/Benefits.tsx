"use client";

import { m } from "framer-motion";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Download, ArrowDownRight } from "lucide-react";
import dynamic from "next/dynamic";

const BenefitsSlider = dynamic(() => import("./BenefitsSlider").then(mod => mod.BenefitsSlider), {
  ssr: false,
  loading: () => <div className="w-full h-[530px] flex items-center justify-center"><div className="w-8 h-8 border-4 border-primary/20 border-t-primary rounded-full animate-spin" /></div>
});
import { PrivacyModal } from "@/components/ui/privacy-modal";
import { FocusScrollBlock } from "@/components/ui/focus-scroll-block";
import { typograph, formatContact, isValidContact } from "@/lib/utils";

export function Benefits() {
  const [contact, setContact] = useState("");

  const steps = [
    { id: "01", title: "Анализ исходных\nданных", icon: "/images/process-icons/step-1.webp", scale: "scale-[1.4]", hoverScale: "group-hover:scale-[1.54]", pos: "md:-translate-y-8 md:pl-12" },
    { id: "02", title: "Обследование\nшкафа", icon: "/images/process-icons/step-2.webp", scale: "scale-[1.5]", hoverScale: "group-hover:scale-[1.65]", pos: "md:-translate-y-6 md:pl-12" },
    { id: "03", title: "Разработка\nсхемного решения", icon: "/images/process-icons/step-3.webp", scale: "scale-[1.4]", hoverScale: "group-hover:scale-[1.54]", pos: "translate-x-12 md:translate-x-0 md:-translate-y-8 md:pl-12" },
    { id: "04", title: "Подбор\nкомпонентов", icon: "/images/process-icons/step-4.webp", scale: "scale-[1.4]", hoverScale: "group-hover:scale-[1.54]", pos: "translate-x-12 md:translate-x-0 md:-translate-y-8 md:pl-12" },
    { id: "05", title: "Сборка\nшкафа", icon: "/images/process-icons/step-5.webp", scale: "scale-[1.4]", hoverScale: "group-hover:scale-[1.54]", pos: "translate-x-12 md:translate-x-0 md:-translate-y-8 md:pl-12" },
    { id: "06", title: "Программирование\nПЛК", icon: "/images/process-icons/step-6.webp", scale: "scale-[1.4]", hoverScale: "group-hover:scale-[1.54]", pos: "translate-x-12 md:translate-x-0 md:-translate-y-8 md:pl-12" },
    { id: "07", title: "Тестирование", icon: "/images/process-icons/step-7.webp", scale: "scale-[1.4]", hoverScale: "group-hover:scale-[1.54]", pos: "translate-x-12 md:translate-x-0 md:-translate-y-8 md:pl-12" },
    { id: "08", title: "Монтаж и\nподключение", icon: "/images/process-icons/step-8.webp", scale: "scale-[1.4]", hoverScale: "group-hover:scale-[1.54]", pos: "translate-x-12 md:translate-x-0 md:-translate-y-8 md:pl-12" },
    { id: "09", title: "Пусконаладка", icon: "/images/process-icons/step-9.webp", scale: "scale-[1.4]", hoverScale: "group-hover:scale-[1.54]", pos: "translate-x-12 md:translate-x-0 md:-translate-y-8 md:pl-12" },
    { id: "10", title: "Документация", icon: "/images/process-icons/step-10.webp", scale: "scale-[1.4]", hoverScale: "group-hover:scale-[1.54]", pos: "translate-x-12 md:translate-x-0 md:-translate-y-8 md:pl-12" },
  ];

  return (
    <section id="benefits" className="pt-16 md:pt-24 pb-0 bg-transparent relative z-30 border-t border-border/50">
      <div className="container mx-auto px-4 md:px-6">
        {/* Section 4: Benefits */}
        <div className="mb-24">
          <m.div 
            initial={{ opacity: 0, x: -60, rotateY: -60 }}
            whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
            viewport={{ once: true, margin: "-20px" }}
            style={{ transformOrigin: "left center", transformPerspective: 1200 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-3xl mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">
              {typograph("Что получает служба эксплуатации ")}<span className="text-[#577E95]">{typograph("после модернизации")}</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              {typograph("Хороший шкаф автоматики — это не только компоненты внутри корпуса. Для эксплуатации важнее другое: понятная логика, видимость аварий, документация, возможность обслуживания и предсказуемая работа вентиляции после запуска.")}
            </p>
          </m.div>

          {/* Lazy Loaded Coverflow Slider */}
          <BenefitsSlider />
        </div>

        {/* Section 5: Process Steps */}
        <div className="mb-24 relative py-16 -mx-4 px-4 md:-mx-8 md:px-8 lg:-mx-12 lg:px-12 overflow-hidden">

          <m.div 
            initial={{ opacity: 0, x: -60, rotateY: -60 }}
            whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
            viewport={{ once: true, margin: "-20px" }}
            style={{ transformOrigin: "left center", transformPerspective: 1200 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-3xl mb-16 relative z-10"
          >
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">
              {typograph("Что входит в работы ")}<span className="text-[#577E95]">{typograph("по шкафу автоматики")}</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              {typograph("Состав работ зависит от исходной задачи: новый шкаф по проекту, модернизация действующего решения или интеграция в диспетчеризацию. Ниже — полный набор этапов, из которых формируется проект.")}
            </p>
          </m.div>

          <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {steps.map((step, i) => (
              <m.div
                key={i}
                initial={{ opacity: 0, x: -60, rotateY: -60 }}
                whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
                viewport={{ once: true, margin: "-20px" }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1], delay: i * 0.03 }}
                className="relative p-8 border border-white/60 bg-white/40 backdrop-blur-md flex flex-col justify-between aspect-square group transition-transform duration-300 hover:-translate-y-1 glass-panel overflow-hidden"
                style={{
                  transformOrigin: "left center", 
                  transformPerspective: 1200,
                  boxShadow: "10px 10px 30px rgba(48,99,122,0.05), -10px -10px 30px rgba(255,255,255,0.8), inset 1px 1px 2px rgba(255,255,255,0.8)"
                }}
              >
                <div className="absolute inset-0 bg-white/0 group-hover:bg-white/20 transition-colors duration-500 pointer-events-none z-0" />
                
                <div className={`absolute inset-0 flex items-center justify-center pointer-events-none z-0 ${step.pos}`}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img 
                      src={step.icon} 
                      loading="lazy"
                      decoding="async"
                      className={`w-full h-full object-contain ${step.scale} ${step.hoverScale} transition-transform duration-700 ease-out max-w-none mix-blend-darken`} 
                      alt={step.title} 
                    />
                </div>
                
                {/* Fog gradient to cover the pedestal bottoms */}
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-white/90 via-white/40 to-transparent pointer-events-none z-[5]" />

                <div className="relative z-10 text-5xl font-display font-bold text-primary/40 group-hover:text-primary transition-colors tracking-tighter">
                  {step.id}
                </div>
                
                <div className="relative z-20 group-hover:bg-transparent transition-colors duration-500 pr-8">
                  <h4 className="text-lg md:text-xl font-display font-semibold leading-tight text-foreground group-hover:text-primary transition-colors whitespace-pre-line">
                    {typograph(step.title)}
                  </h4>
                  <ArrowDownRight className="absolute bottom-0 right-0 w-5 h-5 text-primary/40 group-hover:text-primary transition-all duration-300 group-hover:translate-x-1 group-hover:translate-y-1 z-10" />
                </div>
              </m.div>
            ))}
          </div>
        </div>
      </div>

      {/* Lead Magnet 2 */}
      <FocusScrollBlock bgClass="bg-[#182025]" shadowClass="shadow-[0_30px_60px_-15px_rgba(24,32,37,0.5)]">
          <div className="container mx-auto px-4 md:px-6 flex flex-col lg:flex-row items-center w-full max-w-6xl py-16 md:py-24 gap-12">
            <div className="lg:w-1/2 flex flex-col justify-center text-center lg:text-left">

              <h3 className="text-2xl md:text-4xl font-display font-bold mb-4 text-[#E6F0F4]">
                {typograph("Опросный лист для расчета шкафа автоматики")}
              </h3>
              <p className="text-[#E6F0F4] opacity-80 text-lg mb-8 leading-relaxed max-w-lg mx-auto lg:mx-0">
                {typograph("Чтобы инженер мог быстрее оценить задачу, скачайте опросный лист и заполните основные параметры вентиляционной системы. Если часть данных неизвестна — можно отправить то, что есть.")}
              </p>
            </div>
            
            <div className="lg:w-1/2 flex items-center justify-center lg:justify-end w-full">
              <div className="w-full max-w-md">
                <h4 className="text-xl font-display font-medium mb-6 text-[#E6F0F4] text-center lg:text-left">Скачать опросный лист</h4>
                <form className="space-y-4" onSubmit={(e) => {
                e.preventDefault();
                if (isValidContact(contact)) {
                  const link = document.createElement('a');
                  link.href = '/downloads/oprosnyy_list.docx';
                  link.download = 'oprosnyy_list.docx';
                  document.body.appendChild(link);
                  link.click();
                  document.body.removeChild(link);
                }
              }}>
                  <div className="space-y-4">
                    <Input placeholder="Имя" className="bg-transparent border-0 border-b border-[#577E95]/50 focus:border-[#E6F0F4] focus:ring-0 text-[#E6F0F4] placeholder:text-[#577E95] rounded-none px-0 h-12" />
                    <Input placeholder="Компания" className="bg-transparent border-0 border-b border-[#577E95]/50 focus:border-[#E6F0F4] focus:ring-0 text-[#E6F0F4] placeholder:text-[#577E95] rounded-none px-0 h-12" />
                    <Input 
                      placeholder="Телефон или Email *" 
                      required 
                      value={contact}
                      onChange={(e) => setContact(formatContact(e.target.value))}
                      className="bg-transparent border-0 border-b border-[#577E95]/50 focus:border-[#E6F0F4] focus:ring-0 text-[#E6F0F4] placeholder:text-[#577E95] rounded-none px-0 h-12" 
                    />
                  </div>
                  <div className="pt-4 flex flex-col gap-3 w-full">
                    <Button 
                      size="lg" 
                      disabled={!isValidContact(contact)}
                      className="w-full h-14 rounded-full text-base bg-[#E6F0F4] text-[#182025] hover:bg-[#FAFCFD] font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Скачать файл
                    </Button>
                    <p className="text-[11px] text-[#577E95] text-left leading-tight mt-1">
                      Скачивая файл, вы соглашаетесь с <PrivacyModal><button type="button" className="underline underline-offset-2 hover:text-[#E6F0F4] transition-colors cursor-pointer">Политикой конфиденциальности</button></PrivacyModal>
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </FocusScrollBlock>
    </section>
  );
}
