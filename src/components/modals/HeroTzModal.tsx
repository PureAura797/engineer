"use client";

import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ReactNode, useState, useRef } from "react";
import { UploadCloud, X, Loader2 } from "lucide-react";
import { useModal } from "@/components/providers/modal-provider";
import { formatContact, isValidContact } from "@/lib/utils";
import { PrivacyModal } from "@/components/ui/privacy-modal";

interface HeroTzModalProps {
  children?: ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function HeroTzModal({ children, open, onOpenChange }: HeroTzModalProps) {
  const { activeModal, openModal, closeModal } = useModal();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const isOpen = open !== undefined ? open : activeModal === 'hero-tz';
  const handleOpenChange = onOpenChange !== undefined ? onOpenChange : (val: boolean) => {
    if (val) openModal('hero-tz');
    else closeModal();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isValidContact(phone)) {
      setIsSubmitting(true);
      try {
        const formData = new FormData();
        formData.append("name", name);
        formData.append("phone", phone);
        formData.append("source", "Шторка главного экрана (ТЗ)");
        files.forEach((f) => formData.append("files", f));

        await fetch("/api/send-lead", {
          method: "POST",
          body: formData,
        });
        
        setName("");
        setPhone("");
        setFiles([]);
        closeModal();
      } catch (err) {
        console.error("Submit error", err);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      {children && <DialogTrigger render={children as any} />}
      <DialogContent className="data-open:anim-slide-up-in data-closed:anim-slide-up-out top-auto bottom-0 translate-y-0 sm:max-w-lg p-0 rounded-none border-b-0 border-t border-x border-border shadow-[0_-10px_40px_rgba(0,0,0,0.1)] outline-none bg-white">
        <form onSubmit={handleSubmit} className="pt-8 pb-10 px-8 relative">
          <DialogTitle className="text-3xl font-display font-bold mb-2 text-[#182025]">Отправить ТЗ</DialogTitle>
          
          <div 
            onClick={() => files.length === 0 && fileInputRef.current?.click()}
            className={`border-2 border-dashed rounded-none p-6 transition-colors mb-8 ${files.length > 0 ? 'border-[#577E95] bg-[#E6F0F4]/10 cursor-default text-left' : 'border-slate-200 hover:border-[#577E95] hover:bg-[#E6F0F4]/30 cursor-pointer group text-center p-8'}`}
          >
            <input 
              type="file" 
              multiple
              className="hidden" 
              ref={fileInputRef} 
              accept=".pdf,.doc,.docx,.dwg,.webp,.webp"
              onChange={(e) => {
                if (e.target.files && e.target.files.length > 0) {
                  setFiles(prev => [...prev, ...Array.from(e.target.files!)]);
                }
              }}
            />
            {files.length > 0 ? (
              <div className="flex flex-col w-full">
                <div className="flex items-center justify-between mb-4">
                  <span className="font-medium text-[#182025]">Прикрепленные файлы ({files.length}):</span>
                  <button 
                    type="button" 
                    onClick={(e) => { e.stopPropagation(); fileInputRef.current?.click(); }}
                    className="text-sm text-[#577E95] hover:underline cursor-pointer font-medium"
                  >
                    + Добавить еще
                  </button>
                </div>
                <div className="space-y-2 max-h-[150px] overflow-y-auto pr-2 custom-scrollbar">
                  {files.map((f, i) => (
                    <div key={i} className="flex items-center justify-between bg-white p-2 border border-slate-200">
                      <span className="text-sm text-[#182025] truncate mr-2">{f.name}</span>
                      <button 
                        type="button" 
                        onClick={(e) => { 
                          e.stopPropagation(); 
                          setFiles(prev => prev.filter((_, index) => index !== i)); 
                        }}
                        className="text-slate-400 hover:text-red-500 transition-colors shrink-0"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <>
                <div className="text-[#577E95] mb-3 flex justify-center group-hover:-translate-y-1 transition-transform">
                  <UploadCloud className="w-8 h-8" />
                </div>
                <p className="font-medium text-[#182025] mb-1">Загрузить файлы</p>
                <p className="text-sm text-slate-500">PDF, DOCX, DWG до 20 МБ</p>
              </>
            )}
          </div>

          <div className="space-y-4 mb-8">
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
          
          <div className="pt-2">
            <button 
              type="submit" 
              disabled={!isValidContact(phone) || isSubmitting}
              className="w-full rounded-full bg-[#182025] text-white py-4 font-medium hover:bg-[#577E95] transition-colors outline-none disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isSubmitting && <Loader2 className="w-5 h-5 animate-spin" />}
              {isSubmitting ? "Отправка..." : "Подтвердить отправку"}
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
