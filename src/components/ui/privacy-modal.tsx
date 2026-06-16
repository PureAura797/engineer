"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export function PrivacyModal({ children }: { children: React.ReactNode }) {
  return (
    <Dialog>
      <DialogTrigger render={children as any} />
      <DialogContent className="sm:max-w-4xl w-[95vw] max-h-[85vh] p-0 gap-0 flex flex-col bg-[#182025]/95 backdrop-blur-2xl border border-white/10 text-[#E6F0F4] rounded-none overflow-hidden shadow-[0_0_80px_rgba(0,0,0,0.8)]">
        <DialogHeader className="p-6 md:p-10 pb-4 md:pb-6 border-b border-white/5 sticky top-0 bg-[#182025]/50 backdrop-blur-md z-10">
          <DialogTitle className="text-2xl md:text-3xl font-display font-bold">Политика конфиденциальности</DialogTitle>
        </DialogHeader>
        
        <div className="flex-1 p-6 md:p-10 pt-4 md:pt-6 overflow-y-auto custom-scrollbar text-[#84A2B4] text-sm md:text-base leading-relaxed space-y-6 text-left" data-lenis-prevent>
          <p className="text-lg text-[#E6F0F4]">
            Настоящая Политика конфиденциальности (далее — Политика) действует в отношении всей информации, которую мы можем получить о Пользователе во время использования им сайта.
          </p>

          <div>
            <h4 className="text-lg font-display font-semibold text-[#E6F0F4] mb-3 flex items-center gap-2">
              <span className="text-[#577E95]">1.</span> Сбор и использование персональных данных
            </h4>
            <p className="mb-3">
              Мы собираем персональные данные (имя, номер телефона, адрес электронной почты, название компании), когда вы заполняете формы обратной связи на сайте. Эти данные используются исключительно для:
            </p>
            <ul className="list-disc pl-5 space-y-2 marker:text-[#577E95]">
              <li>Обработки ваших запросов и предоставления консультаций;</li>
              <li>Связи с вами для обсуждения деталей проекта;</li>
              <li>Улучшения качества наших услуг.</li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-display font-semibold text-[#E6F0F4] mb-3 flex items-center gap-2">
              <span className="text-[#577E95]">2.</span> Защита информации
            </h4>
            <p>
              Мы принимаем все необходимые организационные и технические меры для защиты вашей персональной информации от неправомерного или случайного доступа, уничтожения, изменения, блокирования, копирования, распространения, а также от иных неправомерных действий третьих лиц.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-display font-semibold text-[#E6F0F4] mb-3 flex items-center gap-2">
              <span className="text-[#577E95]">3.</span> Передача данных третьим лицам
            </h4>
            <p>
              Мы не передаем ваши персональные данные третьим лицам, за исключением случаев, прямо предусмотренных действующим законодательством Российской Федерации.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-display font-semibold text-[#E6F0F4] mb-3 flex items-center gap-2">
              <span className="text-[#577E95]">4.</span> Файлы Cookie
            </h4>
            <p>
              Сайт использует файлы cookie для улучшения пользовательского опыта, сбора статистики посещений и оптимизации работы интерфейса. Вы можете отключить использование cookie в настройках вашего браузера.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-display font-semibold text-[#E6F0F4] mb-3 flex items-center gap-2">
              <span className="text-[#577E95]">5.</span> Согласие пользователя
            </h4>
            <p>
              Оставляя свои данные в формах на сайте, вы подтверждаете свое согласие с настоящей Политикой конфиденциальности. Если вы не согласны с условиями Политики, вам следует воздержаться от использования сайта и передачи своих персональных данных.
            </p>
          </div>
        </div>
        
        <style dangerouslySetInnerHTML={{__html: `
          .custom-scrollbar::-webkit-scrollbar {
            width: 8px;
          }
          .custom-scrollbar::-webkit-scrollbar-track {
            background: rgba(255, 255, 255, 0.05);
            border-radius: 10px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background: rgba(255, 255, 255, 0.2);
            border-radius: 10px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background: rgba(255, 255, 255, 0.3);
          }
        `}} />
      </DialogContent>
    </Dialog>
  );
}
