"use client";

import { Dialog, DialogContent, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import { ReactNode } from "react";
import { Phone, Mail, MapPin, FileText, X } from "lucide-react";

interface ContactsModalProps {
  children?: ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

import { useModal } from "@/components/providers/modal-provider";

export function ContactsModal({ children, open, onOpenChange }: ContactsModalProps) {
  const { activeModal, openModal, closeModal } = useModal();
  
  const isOpen = open !== undefined ? open : activeModal === 'contacts';
  const handleOpenChange = onOpenChange !== undefined ? onOpenChange : (val: boolean) => {
    if (val) openModal('contacts');
    else closeModal();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      {children && <DialogTrigger render={children as any} />}
      <DialogContent className="max-w-lg p-8 md:p-12 rounded-none border border-border shadow-[0_20px_60px_rgba(0,0,0,0.1)] [&>button]:hidden outline-none">
        <div className="flex justify-between items-center mb-10">
          <DialogTitle className="text-3xl font-display font-bold text-[#182025]">Контакты</DialogTitle>
          <DialogClose className="w-10 h-10 rounded-full bg-transparent hover:bg-slate-100 active:bg-slate-200 text-slate-500 flex items-center justify-center transition-colors outline-none focus:ring-0">
            <X className="w-5 h-5" />
          </DialogClose>
        </div>
        
        <div className="space-y-4 mb-10">
          <a href="tel:+79258504602" className="flex items-center gap-5 p-4 rounded-full border border-border hover:border-[#577E95] hover:shadow-md bg-background transition-all group">
            <div className="w-12 h-12 rounded-full bg-[#E6F0F4] text-[#577E95] flex items-center justify-center shrink-0 group-hover:bg-[#577E95] group-hover:text-white transition-colors">
              <Phone className="w-5 h-5" />
            </div>
            <span className="text-xl font-bold text-slate-800">+7 925 850 46 02</span>
          </a>
          
          <a href="mailto:eng@mzta.ru" className="flex items-center gap-5 p-4 rounded-full border border-border hover:border-[#577E95] hover:shadow-md bg-background transition-all group">
            <div className="w-12 h-12 rounded-full bg-[#E6F0F4] text-[#577E95] flex items-center justify-center shrink-0 group-hover:bg-[#577E95] group-hover:text-white transition-colors">
              <Mail className="w-5 h-5" />
            </div>
            <span className="text-xl font-bold text-slate-800">eng@mzta.ru</span>
          </a>
        </div>
        
        <div className="pl-5 border-l-2 border-[#577E95]/40 mb-10">
          <p className="font-display text-[10px] uppercase tracking-widest text-slate-400 mb-1.5">Офис</p>
          <p className="text-lg text-slate-800 font-medium leading-relaxed max-w-[300px]">105318, Москва, ул. Мироновская, д. 33 (стр. 26, офис 202)</p>
        </div>
        
        <a href="/downloads/kartochka_organizatsii_inzhiniring.pdf" download className="w-full py-4 bg-[#182025] text-white font-medium rounded-full hover:bg-[#577E95] transition-colors flex items-center justify-center gap-2">
          <FileText className="w-5 h-5" /> Скачать реквизиты
        </a>
      </DialogContent>
    </Dialog>
  );
}
