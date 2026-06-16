"use client";

import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ReactNode, useState } from "react";
import { useModal } from "@/components/providers/modal-provider";
import { formatContact, isValidContact } from "@/lib/utils";
import { PrivacyModal } from "@/components/ui/privacy-modal";

interface HeroConsultModalProps {
  children?: ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function HeroConsultModal({ children, open, onOpenChange }: HeroConsultModalProps) {
  const { activeModal, openModal, closeModal } = useModal();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  
  const isOpen = open !== undefined ? open : activeModal === 'hero-consult';
  const handleOpenChange = onOpenChange !== undefined ? onOpenChange : (val: boolean) => {
    if (val) openModal('hero-consult');
    else closeModal();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isValidContact(phone)) {
      console.log("Submit Consult:", { name, phone, message });
      closeModal();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      {children && <DialogTrigger asChild>{children}</DialogTrigger>}
      <DialogContent className="data-open:anim-slide-up-in data-closed:anim-slide-up-out top-auto bottom-0 translate-y-0 sm:max-w-lg p-0 rounded-none border-b-0 border-t border-x border-border shadow-[0_-10px_40px_rgba(0,0,0,0.1)] outline-none bg-white">
        <form onSubmit={handleSubmit} className="pt-8 pb-10 px-8 relative">
          <DialogTitle className="text-3xl font-display font-bold mb-2 text-[#182025]">Обсудить задачу</DialogTitle>
          <p className="text-slate-500 mb-8 text-sm">Опишите ситуацию, и наш инженер свяжется с вами для консультации.</p>
          
          <div className="space-y-4 mb-8">
            <textarea 
              placeholder="Что нужно сделать или какая возникла проблема?" 
              rows={4} 
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full bg-transparent border-0 border-b border-slate-200 px-0 py-3 text-sm resize-none focus:outline-none focus:ring-0 focus:border-[#577E95] transition-colors text-[#182025] placeholder:text-slate-400"
            ></textarea>
            <div className="grid grid-cols-2 gap-4">
              <input 
                type="text" 
                placeholder="Ваше имя" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-transparent border-0 border-b border-slate-200 px-0 py-3 text-sm focus:outline-none focus:ring-0 focus:border-[#577E95] transition-colors text-[#182025] placeholder:text-slate-400" 
              />
              <input 
                type="text" 
                placeholder="Телефон или Email *" 
                value={phone}
                onChange={(e) => setPhone(formatContact(e.target.value))}
                className="w-full bg-transparent border-0 border-b border-slate-200 px-0 py-3 text-sm focus:outline-none focus:ring-0 focus:border-[#577E95] transition-colors text-[#182025] placeholder:text-slate-400"
                required
              />
            </div>
          </div>
          <div className="pt-2">
            <button 
              type="submit" 
              disabled={!isValidContact(phone)}
              className="w-full rounded-full bg-[#182025] text-white py-4 font-medium hover:bg-[#577E95] transition-colors outline-none disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Заказать звонок инженера
            </button>
            <p className="text-[11px] text-slate-400 text-center mt-4 leading-tight">
              Отправляя данные, вы соглашаетесь с <br />
              <PrivacyModal><button type="button" className="underline underline-offset-2 hover:text-[#577E95] transition-colors cursor-pointer mt-1">Политикой конфиденциальности</button></PrivacyModal>
            </p>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
