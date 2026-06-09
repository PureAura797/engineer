"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Settings, Eye, HandIcon, FileText, CheckSquare, TrendingUp, Download, ArrowDownRight, ArrowLeft, ArrowRight } from "lucide-react";
import { PrivacyModal } from "@/components/ui/privacy-modal";
import { FocusScrollBlock } from "@/components/ui/focus-scroll-block";

export function Benefits() {
  const [activeIndex, setActiveIndex] = useState(2);
  const [contact, setContact] = useState("");

  const benefits = [
    {
      title: "Понятная логика управления",
      desc: "Режимы работы, аварийные сценарии, расписания и команды управления описаны и переданы эксплуатационной службе.",
      icon: <Settings className="w-5 h-5" />
    },
    {
      title: "Видимость статусов и аварий",
      desc: "При интеграции с диспетчеризацией эксплуатация видит состояние вентиляционной системы в едином интерфейсе здания.",
      icon: <Eye className="w-5 h-5" />
    },
    {
      title: "Меньше ручного контроля",
      desc: "Часть операций, которые раньше требовали ручной проверки или обхода, может быть переведена в автоматическое управление и мониторинг.",
      icon: <HandIcon className="w-5 h-5" />
    },
    {
      title: "Актуальная документация",
      desc: "После работ передаются схемы, спецификации, описание логики и другие материалы, необходимые для обслуживания.",
      icon: <FileText className="w-5 h-5" />
    },
    {
      title: "Проверка в реальных режимах",
      desc: "На этапе ПНР проверяются режимы работы, сигналы, аварии и взаимодействие шкафа с вентиляционным оборудованием.",
      icon: <CheckSquare className="w-5 h-5" />
    },
    {
      title: "Возможность развития",
      desc: "Шкаф можно проектировать с учетом будущей диспетчеризации, замены компонентов или расширения системы.",
      icon: <TrendingUp className="w-5 h-5" />
    }
  ];

  const steps = [
    { id: "01", title: "Анализ исходных данных" },
    { id: "02", title: "Обследование шкафа" },
    { id: "03", title: "Разработка схемного решения" },
    { id: "04", title: "Подбор компонентов" },
    { id: "05", title: "Сборка шкафа" },
    { id: "06", title: "Программирование ПЛК" },
    { id: "07", title: "Тестирование" },
    { id: "08", title: "Монтаж и подключение" },
    { id: "09", title: "Пусконаладка" },
    { id: "10", title: "Документация" },
  ];

  return (
    <section id="benefits" className="pt-24 md:pt-32 lg:pt-40 pb-0 bg-transparent relative z-30 border-t border-border/50">
      <div className="container mx-auto px-4 md:px-6">
        {/* Section 4: Benefits */}
        <div className="mb-24">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">
              Что получает служба эксплуатации <span className="text-muted-foreground">после модернизации</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              Хороший шкаф автоматики — это не только компоненты внутри корпуса. 
              Для эксплуатации важнее другое: понятная логика, видимость аварий, 
              документация, возможность обслуживания и предсказуемая работа 
              вентиляции после запуска.
            </p>
          </motion.div>

          {/* Coverflow Slider */}
          <div className="relative h-[450px] w-full flex items-center justify-center perspective-[1000px] mb-8 overflow-hidden py-10 -mx-4 px-4 md:-mx-8 md:px-8 lg:-mx-12 lg:px-12">

            {benefits.map((benefit, i) => {
              const N = benefits.length;
              const normalizedActive = ((activeIndex % N) + N) % N;
              let offset = i - normalizedActive;
              
              if (offset > N / 2) offset -= N;
              if (offset < -N / 2) offset += N;
              
              const absOffset = Math.abs(offset);
              const isActive = offset === 0;
              
              // Only render items close to active
              if (absOffset > 2) return null;

              return (
                <motion.div
                  key={i}
                  className="absolute w-[280px] sm:w-[320px] md:w-[380px] border border-white/60 bg-white/40 backdrop-blur-md p-8 cursor-pointer flex flex-col justify-center group overflow-hidden"
                  style={{ 
                    height: '320px',
                    boxShadow: "10px 10px 30px rgba(48,99,122,0.05), -10px -10px 30px rgba(255,255,255,0.8), inset 1px 1px 2px rgba(255,255,255,0.8)"
                  }}
                  animate={{
                    x: offset * (typeof window !== 'undefined' && window.innerWidth < 768 ? 80 : 180),
                    scale: 1 - absOffset * 0.15,
                    zIndex: 10 - absOffset,
                    opacity: isActive ? 1 : Math.max(0, 1 - absOffset * 0.4),
                    filter: `blur(${absOffset * 2}px)`,
                  }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  onClick={() => setActiveIndex(activeIndex + offset)}
                >
                  <div className={`w-12 h-12 flex items-center justify-center border border-border/50 mb-6 transition-colors duration-300 ${isActive ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
                    0{i + 1}
                  </div>
                  <h3 className="font-display font-medium text-xl mb-4">{benefit.title}</h3>
                  <p className="text-muted-foreground leading-relaxed text-sm md:text-base">{benefit.desc}</p>
                </motion.div>
              );
            })}
          </div>

          <div className="flex items-center gap-8 w-full">
            <div className="flex-1 h-[2px] bg-border/50 relative overflow-hidden">
              <motion.div 
                className="absolute top-0 left-0 h-full bg-primary"
                initial={false}
                animate={{ width: `${((((activeIndex % benefits.length) + benefits.length) % benefits.length) + 1) / benefits.length * 100}%` }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              />
            </div>
            <div className="flex gap-2 shrink-0">
              <Button 
                variant="outline" 
                size="icon"
                className="rounded-none border-border h-12 w-12 hover:bg-muted transition-colors"
                onClick={() => setActiveIndex(activeIndex - 1)}
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <Button 
                variant="outline" 
                size="icon"
                className="rounded-none border-border h-12 w-12 hover:bg-muted transition-colors"
                onClick={() => setActiveIndex(activeIndex + 1)}
              >
                <ArrowRight className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>

        {/* Section 5: Process Steps */}
        <div className="mb-24 relative py-16 -mx-4 px-4 md:-mx-8 md:px-8 lg:-mx-12 lg:px-12 overflow-hidden">

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mb-16 relative z-10"
          >
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">
              Что входит в работы <span className="text-muted-foreground">по шкафу автоматики</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              Состав работ зависит от исходной задачи: новый шкаф по проекту, модернизация 
              действующего решения или интеграция в диспетчеризацию. Ниже — полный набор этапов, 
              из которых формируется проект.
            </p>
          </motion.div>

          <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="relative p-6 border border-white/60 bg-white/40 backdrop-blur-md flex flex-col justify-between aspect-square group transition-transform duration-300 hover:-translate-y-1"
                style={{
                  boxShadow: "10px 10px 30px rgba(48,99,122,0.05), -10px -10px 30px rgba(255,255,255,0.8), inset 1px 1px 2px rgba(255,255,255,0.8)"
                }}
              >
                <div className="absolute inset-0 bg-white/0 group-hover:bg-white/20 transition-colors duration-500 pointer-events-none" />
                <div className="relative z-10 text-4xl font-display font-bold text-primary/40 group-hover:text-primary transition-colors">
                  {step.id}
                </div>
                <div className="relative z-10 pr-8">
                  <h4 className="font-display font-medium leading-tight text-foreground group-hover:text-primary transition-colors">
                    {step.title}
                  </h4>
                </div>
                {i < steps.length - 1 && (
                  <ArrowDownRight className="absolute bottom-4 right-4 w-5 h-5 text-primary/40 group-hover:text-primary transition-all duration-300 group-hover:translate-x-1 group-hover:translate-y-1 hidden lg:block z-10" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Lead Magnet 2 */}
      <FocusScrollBlock bgClass="bg-[#182025]" shadowClass="shadow-[0_30px_60px_-15px_rgba(24,32,37,0.5)]">
          <div className="container mx-auto px-4 md:px-12 flex flex-col lg:flex-row items-center w-full max-w-6xl pt-24 pb-4 md:pb-8 gap-12">
            <div className="lg:w-1/2 flex flex-col justify-center text-center lg:text-left">
              <div className="mb-6 w-12 h-12 flex items-center justify-center bg-[#11171A] text-[#577E95] mx-auto lg:mx-0">
                <Download className="w-5 h-5" />
              </div>
              <h3 className="text-2xl md:text-4xl font-display font-bold mb-4 text-[#E6F0F4]">
                Опросный лист для расчета шкафа автоматики
              </h3>
              <p className="text-[#E6F0F4] opacity-80 text-lg mb-8 leading-relaxed max-w-lg mx-auto lg:mx-0">
                Чтобы инженер мог быстрее оценить задачу, скачайте опросный лист и заполните основные параметры вентиляционной системы. Если часть данных неизвестна — можно отправить то, что есть.
              </p>
            </div>
            
            <div className="lg:w-1/2 flex items-center justify-center lg:justify-end w-full">
              <div className="w-full max-w-md">
                <h4 className="text-xl font-display font-medium mb-6 text-[#E6F0F4] text-center lg:text-left">Скачать опросный лист</h4>
                <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                  <div className="space-y-4">
                    <Input placeholder="Имя" className="bg-transparent border-0 border-b border-[#577E95]/50 focus:border-[#E6F0F4] focus:ring-0 text-[#E6F0F4] placeholder:text-[#577E95] rounded-none px-0 h-12" />
                    <Input placeholder="Компания" className="bg-transparent border-0 border-b border-[#577E95]/50 focus:border-[#E6F0F4] focus:ring-0 text-[#E6F0F4] placeholder:text-[#577E95] rounded-none px-0 h-12" />
                    <Input 
                      placeholder="Email или телефон *" 
                      required 
                      value={contact}
                      onChange={(e) => setContact(e.target.value)}
                      className="bg-transparent border-0 border-b border-[#577E95]/50 focus:border-[#E6F0F4] focus:ring-0 text-[#E6F0F4] placeholder:text-[#577E95] rounded-none px-0 h-12" 
                    />
                  </div>
                  <div className="pt-4">
                    <Button 
                      disabled={!contact.trim()}
                      className="w-full h-14 rounded-none text-base bg-[#E6F0F4] text-[#182025] hover:bg-[#FAFCFD] font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Скачать файл
                    </Button>
                    <p className="text-[11px] text-[#577E95] text-center mt-3 leading-tight">
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
