"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Upload, ChevronRight, Activity, Cpu, MonitorSpeaker, Radio, Shield, LayoutGrid, Zap, ArrowDownRight } from "lucide-react";
import { PrivacyModal } from "@/components/ui/privacy-modal";
import { FocusScrollBlock } from "@/components/ui/focus-scroll-block";
import { typograph } from "@/lib/utils";

function BMSElevator({ data }: { data: string[] }) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % data.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [data.length]);

  return (
    <div 
      className="relative h-[350px] overflow-hidden flex flex-col justify-center gap-4 w-full mt-4"
      style={{ maskImage: "linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)", WebkitMaskImage: "linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)" }}
    >
      <div className="relative flex flex-col items-center justify-center h-full w-full">
        {data.map((item, i) => {
          const diff = (i - activeIndex + data.length) % data.length;
          let offset = diff;
          if (offset > data.length / 2) offset -= data.length;

          if (Math.abs(offset) > 2) return null;

          const isActive = offset === 0;
          const isAdjacent = Math.abs(offset) === 1;

          let translateY = offset * 80;
          let scale = isActive ? 1 : isAdjacent ? 0.9 : 0.75;
          let opacity = isActive ? 1 : isAdjacent ? 0.3 : 0.1;
          let zIndex = isActive ? 20 : 10;

          return (
            <div
              key={i}
              className="absolute w-full max-w-sm transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] cursor-pointer"
              style={{
                transform: `translateY(${translateY}px) scale(${scale})`,
                opacity,
                zIndex,
              }}
              onClick={() => setActiveIndex(i)}
            >
              <div 
                className={`w-full h-[104px] flex items-center border-y transition-colors duration-700 ${isActive ? 'border-[#182025]/20 bg-[#182025]/5' : 'border-transparent bg-transparent'}`}
              >
                <div className="flex items-center gap-6 pl-8 w-full text-[#182025]">
                  <div 
                    className={`font-light transition-all duration-700 w-8 ${isActive ? 'text-2xl' : 'text-xl'}`}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <div className="flex flex-col justify-center h-full">
                    <div 
                      className={`text-[10px] tracking-widest text-[#577E95] uppercase overflow-hidden transition-all duration-700 ${isActive ? 'opacity-100 h-4 mb-1' : 'opacity-0 h-0 mb-0'}`}
                    >
                      — Мониторинг
                    </div>
                    <div 
                      className={`leading-tight transition-all duration-700 ${isActive ? 'text-xl font-medium' : 'text-lg font-normal'}`}
                    >
                      {item}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function Details() {
  const [activeComponent, setActiveComponent] = useState(0);
  const [contact, setContact] = useState("");

  const bmsData = [
    "состояние вентиляторов", "аварии оборудования", "режимы работы", 
    "состояние клапанов и заслонок", "сигналы датчиков", "состояние фильтров",
    "команды пуск / стоп", "параметры температуры и давления", 
    "сигналы частотных преобразователей"
  ];

  const components = [
    { title: "Контроллеры", desc: "Подбираются под количество сигналов, требуемую логику управления и необходимость обмена с диспетчеризацией.", img: "/images/components/первая.png" },
    { title: "Частотные преобразователи", desc: "Используются для управления скоростью вентиляторов и настройки режимов работы.", img: "/images/components/вторая.png" },
    { title: "Защитная автоматика", desc: "Предусматривается для защиты цепей питания, двигателей и исполнительных механизмов.", img: "/images/components/тертья.png" },
    { title: "Панели оператора", desc: "Применяются, если требуется локальное управление, индикация режимов, аварий и параметров.", img: "/images/components/четвертая.png" },
    { title: "Датчики и механизмы", desc: "Интегрируются в систему управления в зависимости от состава вентиляционного оборудования.", img: "/images/components/пятая.png" }
  ];

  const processSteps = [
    { num: "1", title: "Получаем\nисходные данные", desc: "ТЗ, схема, спецификация, фото шкафа или описание проблемы.", img: "/images/process/имг 1.png" },
    { num: "2", title: "Проводим\nанализ", desc: "Инженер оценивает состав системы, риски и предварительный сценарий.", img: "/images/process/имг 2.png" },
    { num: "3", title: "Обследуем\nобъект", desc: "Фиксируем фактическое состояние шкафа, оборудования и подключений.", img: "/images/process/имг 3.png" },
    { num: "4", title: "Предлагаем\nрешение", desc: "Модернизация, частичная замена или сборка нового шкафа.", img: "/images/process/имг 4.png" },
    { num: "5", title: "Согласуем\nсостав", desc: "Фиксируем объем, компоненты, сроки, формат ПНР и документацию.", img: "/images/process/имг 5.png" },
    { num: "6", title: "Сборка и ПЛК", desc: "Выполняем сборку, маркировку и программирование контроллера.", img: "/images/process/имг 6.png" },
    { num: "7", title: "Выполняем ПНР", desc: "Проверяем режимы работы, аварии и взаимодействие с вентиляцией.", img: "/images/process/имг 7.png" },
    { num: "8", title: "Передаем\nсистеме", desc: "Передаем документацию и объясняем логику работы.", img: "/images/process/имг 8.png" }
  ];

  return (
    <div id="details" className="bg-muted relative z-20">
      {/* Section 6: BMS */}
      <section className="py-16 md:py-24 border-t border-border/50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">
                Шкаф вентиляции как часть <span className="text-[#577E95]">диспетчеризации</span>
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                {typograph("На действующих объектах вентиляция часто работает отдельно от общей системы мониторинга. Шкаф автоматики можно спроектировать или модернизировать так, чтобы эксплуатация получала данные о состоянии оборудования в BMS.")}
              </p>
              
              <h3 className="font-display font-medium text-xl mb-4 text-foreground">{typograph("Сначала проверяем совместимость")}</h3>
              <p className="text-muted-foreground mb-8">
                {typograph("Перед тем как обещать интеграцию, нужно понять архитектуру объекта: какая BMS уже установлена, какие протоколы доступны, какие контроллеры используются. Первый шаг — анализ существующей системы.")}
              </p>

              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary" className="bg-card">Modbus</Badge>
                <Badge variant="secondary" className="bg-card">BACnet</Badge>
                <Badge variant="secondary" className="bg-card">OPC</Badge>
                <Badge variant="secondary" className="bg-card">MQTT</Badge>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="py-4"
            >
              <div className="text-[0.65rem] uppercase tracking-widest text-muted-foreground flex items-center justify-center gap-4 w-full mb-4">
                <div className="flex-1 h-[1px] bg-border/50" />
                <span className="whitespace-nowrap">ДАННЫЕ В BMS</span>
                <div className="flex-1 h-[1px] bg-border/50" />
              </div>
              <BMSElevator data={bmsData} />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section 7: Components */}
      <section className="py-16 md:py-24 bg-card/10 border-t border-border/50 overflow-hidden relative">
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">
              Компоненты <span className="text-[#577E95]">под задачу объекта</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              {typograph("Состав шкафа зависит от вентиляционной установки, количества сигналов, требований к управлению и бюджету. Мы подбираем компоненты под конкретную задачу, а не продаем универсальный шкаф «из коробки».")}
            </p>
          </motion.div>

          <div className="relative overflow-hidden py-10 -mx-4 px-4 md:-mx-8 md:px-8 lg:-mx-12 lg:px-12 mb-8">

            <div className="flex flex-col md:flex-row w-full h-[800px] sm:h-[600px] md:h-[450px] gap-4 relative z-10">
              {components.map((comp, i) => {
                const isActive = activeComponent === i;
                const imgClasses = isActive 
                    ? "opacity-100 scale-100 object-right translate-x-0" 
                    : "opacity-30 scale-100 object-right translate-x-12 md:translate-x-20 grayscale-[50%]";

                return (
                  <motion.div
                    key={i}
                    className={`relative overflow-hidden cursor-pointer flex flex-col justify-end p-6 md:p-8 border border-white/60 backdrop-blur-md transition-all duration-500 group ${isActive ? 'bg-white/60' : 'bg-white/30 hover:bg-white/40'}`}
                    style={{
                      boxShadow: "10px 10px 30px rgba(48,99,122,0.05), -10px -10px 30px rgba(255,255,255,0.8), inset 1px 1px 2px rgba(255,255,255,0.8)"
                    }}
                    initial={false}
                    animate={{
                      flex: isActive ? (typeof window !== 'undefined' ? (window.innerWidth < 768 ? 3 : 4.5) : 4.5) : 1,
                    }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    onClick={() => setActiveComponent(i)}
                  >
                    <div 
                        className="absolute top-6 left-6 md:top-8 md:left-8 z-10 pointer-events-none"
                        style={{
                          opacity: isActive ? 1 : 0,
                          transform: isActive ? 'translateY(0)' : 'translateY(10px)',
                          transition: `all 400ms ease ${isActive ? '450ms' : '0s'}`
                        }}
                    >
                        <span className="text-5xl md:text-6xl font-display font-bold text-primary/15">
                            {String(i + 1).padStart(2, '0')}
                        </span>
                    </div>

                    <div className="absolute top-2 right-0 md:top-8 flex items-start justify-end pointer-events-none z-0">
                        <img 
                            src={comp.img} 
                            className={`w-[200px] md:w-[300px] h-auto max-w-none object-contain mix-blend-darken transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${imgClasses}`} 
                            alt={comp.title} 
                        />
                    </div>
                  
                    <div className="relative z-10 w-full mt-auto">
                        <h4 className={`font-display font-medium text-lg whitespace-nowrap overflow-hidden text-ellipsis text-foreground transition-all duration-500 ${isActive ? 'opacity-100' : 'opacity-70'}`}>
                            {typograph(comp.title)}
                        </h4>
                        
                        <div 
                          className="overflow-hidden" 
                          style={{
                            maxHeight: isActive ? '200px' : '0px',
                            marginTop: isActive ? '1rem' : '0px',
                            opacity: isActive ? 1 : 0,
                            transform: isActive ? 'translateY(0)' : 'translateY(10px)',
                            transition: `all 400ms cubic-bezier(0.16, 1, 0.3, 1) ${isActive ? '200ms' : '0s'}`
                          }}
                        >
                            <p className="text-muted-foreground text-sm md:text-base leading-relaxed w-[260px] md:w-[320px]">
                                {typograph(comp.desc)}
                            </p>
                        </div>
                    </div>
                </motion.div>
              );
            })}
          </div>
        </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.4 }}
            className="p-8 border border-primary/20 bg-primary/5 flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
          >
            <div>
              <h4 className="font-display font-medium text-xl mb-2 text-primary">{typograph("Комплект документации")}</h4>
              <p className="text-muted-foreground text-sm max-w-2xl">
                {typograph("Схемы, спецификация компонентов, описание логики работы, паспорт шкафа, инструкция для эксплуатации.")}
              </p>
            </div>
            <div className="shrink-0 pt-4 md:pt-0 border-t md:border-t-0 md:border-l border-primary/20 md:pl-6 text-xs text-primary/80 uppercase tracking-widest font-medium">
              Фиксируется на этапе согласования
            </div>
          </motion.div>
        </div>
      </section>

      {/* Section 8: Process */}
      <section className="py-16 md:py-24 border-t border-border/50 relative overflow-hidden bg-transparent">

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">
              Работаем с учетом <span className="text-[#577E95]">режима бизнес-центра</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              {typograph("Модернизация автоматики вентиляции на действующем объекте требует аккуратного подхода. До начала работ нужно понять текущее состояние шкафа, доступность документации, режим работы здания и допустимые окна отключений.")}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {processSteps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="relative p-6 border border-white/60 bg-white/40 backdrop-blur-md flex flex-col justify-between aspect-[4/5] md:aspect-square group transition-transform duration-300 hover:-translate-y-1 overflow-hidden cursor-pointer"
                style={{
                  boxShadow: "10px 10px 30px rgba(48,99,122,0.05), -10px -10px 30px rgba(255,255,255,0.8), inset 1px 1px 2px rgba(255,255,255,0.8)"
                }}
              >
                <div className="absolute inset-0 bg-white/0 group-hover:bg-white/20 transition-colors duration-500 pointer-events-none z-0" />
                
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 -translate-y-4 pl-8 transition-opacity duration-500">
                  <img src={step.img} className="w-full h-full object-contain scale-[1.3] group-hover:scale-[1.4] transition-transform duration-700 ease-out max-w-none mix-blend-darken" alt="Icon" />
                </div>
                
                <div className="relative z-10 text-4xl font-display font-bold text-muted-foreground/30 group-hover:text-primary transition-colors mb-auto">
                  0{step.num}
                </div>
                
                <div className="relative z-20">
                  <h4 className="font-display font-medium text-lg mb-2 text-foreground group-hover:text-primary transition-colors min-h-[3.5rem] leading-tight">
                    {step.title.split('\n').map((line, idx, arr) => (
                      <span key={idx}>
                        {typograph(line)}
                        {idx !== arr.length - 1 && <br />}
                      </span>
                    ))}
                  </h4>
                  <p className="text-muted-foreground text-sm leading-relaxed pr-8">{typograph(step.desc)}</p>
                </div>
                
                <div className="absolute bottom-6 right-6 opacity-30 group-hover:opacity-100 transition-all duration-500 group-hover:-translate-y-1 group-hover:translate-x-1 z-20">
                  <ArrowDownRight className="w-6 h-6 text-primary" strokeWidth={1} />
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 p-6 border-l-2 border-primary bg-primary/5 text-muted-foreground"
          >
            <strong className="text-foreground">Важно:</strong> Возможность работ без длительной остановки 
            вентиляции определяется после обследования. На действующих объектах заранее согласуются 
            этапы, окна работ и порядок проверки системы.
          </motion.div>
        </div>
      </section>

      {/* Lead Magnet 3 */}
      <FocusScrollBlock bgClass="bg-[#182025]" shadowClass="shadow-[0_30px_60px_-15px_rgba(24,32,37,0.5)]">
        <div className="container mx-auto px-4 md:px-6 flex flex-col lg:flex-row w-full max-w-6xl py-16 md:py-24">
          <div className="p-8 md:p-12 lg:w-3/5 text-center lg:text-left flex flex-col items-center lg:items-start justify-center">
            <Badge variant="outline" className="mb-6 rounded-none bg-white border-none text-[#182025]">{typograph("Предварительный разбор")}</Badge>
            <h3 className="text-2xl md:text-4xl font-display font-bold mb-6 text-[#E6F0F4]">
              Инженерный разбор по фото шкафа, схеме или ТЗ
            </h3>
            <p className="text-[#E6F0F4] opacity-80 text-lg mb-6 leading-relaxed max-w-xl">
              Если вы не уверены, нужен новый шкаф или достаточно модернизации, отправьте фото текущего шкафа, схему или описание проблемы. 
            </p>
            <p className="text-[#E6F0F4] opacity-80 mb-8 max-w-xl">
              Инженер посмотрит исходные данные и подскажет, какой следующий шаг нужен: обследование, расчет, модернизация или сборка нового шкафа.
            </p>
            
            <div className="text-sm text-[#C5D6E0] p-4 bg-[#11171A] inline-block mb-8 lg:mb-0">
              Это не коммерческое предложение, а первичная оценка исходных данных.
            </div>
          </div>
          
          <div className="bg-[#11171A] p-8 md:p-12 lg:w-2/5 flex flex-col justify-center">
            <h4 className="font-display font-medium text-xl mb-6 text-[#E6F0F4]">Отправить данные инженеру</h4>
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <Input placeholder="Имя" className="bg-transparent border-0 border-b border-[#577E95]/50 focus:border-[#E6F0F4] focus:ring-0 text-[#E6F0F4] placeholder:text-[#577E95] rounded-none px-0 h-12" />
              <Input placeholder="Компания" className="bg-transparent border-0 border-b border-[#577E95]/50 focus:border-[#E6F0F4] focus:ring-0 text-[#E6F0F4] placeholder:text-[#577E95] rounded-none px-0 h-12" />
              <Input 
                placeholder="Телефон или Email *" 
                required 
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                className="bg-transparent border-0 border-b border-[#577E95]/50 focus:border-[#E6F0F4] focus:ring-0 text-[#E6F0F4] placeholder:text-[#577E95] rounded-none px-0 h-12" 
              />
              <Input placeholder="Тип объекта (например, БЦ)" className="bg-transparent border-0 border-b border-[#577E95]/50 focus:border-[#E6F0F4] focus:ring-0 text-[#E6F0F4] placeholder:text-[#577E95] rounded-none px-0 h-12" />
              
              <div className="border border-dashed border-[#577E95]/50 bg-[#182025] hover:border-[#577E95] transition-colors p-6 flex flex-col items-center justify-center cursor-pointer group mt-4">
                <Upload className="w-6 h-6 text-[#577E95] mb-2 group-hover:text-[#C5D6E0] transition-colors" />
                <span className="text-sm font-medium text-[#577E95] group-hover:text-[#C5D6E0] transition-colors">Загрузить фото/схемы/ТЗ/другое</span>
                <span className="text-xs text-[#577E95]/70 mt-1">До 10 МБ</span>
              </div>
              
              <div className="pt-6">
                <Button 
                  size="lg" 
                  disabled={!contact.trim()}
                  className="w-full rounded-full h-14 bg-[#E6F0F4] text-[#182025] hover:bg-[#FAFCFD] font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Отправить на разбор
                </Button>
                <p className="text-[11px] text-[#577E95] text-center mt-3 leading-tight">
                  Отправляя данные, вы соглашаетесь с <PrivacyModal><button type="button" className="underline underline-offset-2 hover:text-[#E6F0F4] transition-colors cursor-pointer">Политикой конфиденциальности</button></PrivacyModal>
                </p>
              </div>
            </form>
          </div>
        </div>
      </FocusScrollBlock>
    </div>
  );
}
