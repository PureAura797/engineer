"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { PrivacyModal } from "@/components/ui/privacy-modal";

export function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if the user has already accepted cookies
    const hasAccepted = localStorage.getItem("cookiesAccepted");
    if (!hasAccepted) {
      // Delay showing the banner slightly for better UX
      const timer = setTimeout(() => setIsVisible(true), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("cookiesAccepted", "true");
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed bottom-4 left-4 right-4 md:left-auto md:right-8 md:bottom-8 md:w-[420px] bg-[#182025]/95 backdrop-blur-xl border border-white/10 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] z-50 p-6 flex flex-col gap-5"
        >
          <div>
            <h4 className="font-display font-medium text-lg text-[#E6F0F4] mb-2">Мы используем cookie</h4>
            <p className="text-sm text-[#577E95] leading-relaxed">
              Этот сайт использует файлы cookie для обеспечения лучшего пользовательского опыта и аналитики. Продолжая навигацию по сайту, вы соглашаетесь с их использованием и нашей <PrivacyModal><button type="button" className="text-[#E6F0F4] underline underline-offset-2 hover:text-white transition-colors cursor-pointer inline p-0 h-auto">Политикой конфиденциальности</button></PrivacyModal>.
            </p>
          </div>
          <div className="flex gap-3">
            <Button 
              onClick={acceptCookies}
              className="w-full bg-[#E6F0F4] text-[#182025] hover:bg-white rounded-full h-12 font-medium transition-colors"
            >
              Понятно
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
