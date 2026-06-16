"use client";

import { useEffect, useState } from "react";
import { m, AnimatePresence } from "framer-motion";
import { ArrowUp, ArrowDown, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const TelegramIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="m20.665 3.717-17.73 6.837c-1.21.486-1.203 1.161-.222 1.462l4.552 1.42 10.532-6.645c.498-.303.953-.14.579.192l-8.533 7.701h-.002l.002.001-.314 4.692c.46 0 .663-.211.921-.46l2.211-2.15 4.599 3.397c.848.467 1.457.227 1.668-.785l3.019-14.228c.309-1.239-.473-1.8-1.282-1.434z"/>
  </svg>
);

const MaxIcon = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000">
    <path fill="currentColor" d="M512.095,308.192c-99.422-5.214-177.007,63.775-194.116,171.753 c-14.168,89.419,10.952,198.378,32.438,203.862 c9.113,2.326,31.044-14.448,46.999-29.494c3-2.829,7.536-3.305,11.053-1.154 c24.872,15.209,53.032,26.638,84.077,28.266 c102.069,5.352,192.52-74.531,197.866-176.608 C695.759,402.741,614.163,313.544,512.095,308.192z M345.605,826.578 c-3.849-2.725-9.153-1.986-12.379,1.455 c-43.12,45.99-153.474,78.25-158.529,15.48c0-49.18-11.046-90.623-23.208-136.252 c-14.895-55.885-31.465-118.049-31.465-208.398 c0-215.448,176.694-377.475,386.194-377.475S879.976,291.325,879.976,500.955 S710.49,876.337,508.201,876.337C436.434,876.337,401.607,866.228,345.605,826.578z"/>
  </svg>
);

export function FloatingNav() {
  const [isVisible, setIsVisible] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const hero = document.getElementById("hero");
      const finalForm = document.getElementById("final-form");
      
      let heroVisible = true;
      let finalVisible = false;

      // Check hero visibility
      if (hero) {
        const rect = hero.getBoundingClientRect();
        // If bottom of hero is above viewport top + some offset, hero is no longer visible
        heroVisible = rect.bottom > 100;
      } else {
        // Fallback if no hero ID
        heroVisible = window.scrollY < window.innerHeight * 0.5;
      }

      // Check final form visibility
      if (finalForm) {
        const rect = finalForm.getBoundingClientRect();
        // Visible if the top of final form is within viewport
        finalVisible = rect.top < window.innerHeight && rect.bottom > 0;
      }

      // Show floating nav if neither hero nor final form are effectively visible
      const shouldBeVisible = !heroVisible && !finalVisible;
      
      setIsVisible(shouldBeVisible);
      
      // Auto-close menu when hiding
      if (!shouldBeVisible) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    } else if (id === "hero") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (id === "final-form") {
      window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
    }
  };

  // Windows Phone "Turnstile" animation + Tilt effect
  const containerVariants = {
    hidden: { perspective: 1000 },
    visible: {
      perspective: 1000,
      transition: { staggerChildren: 0.1 }
    },
    exit: {
      perspective: 1000,
      transition: { staggerChildren: 0.05, staggerDirection: -1 }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      rotateX: -90,
      y: 40,
      transformOrigin: "bottom center"
    },
    visible: { 
      opacity: 1, 
      rotateX: 0,
      y: 0,
      transition: { 
        type: "spring",
        damping: 15,
        stiffness: 150,
        mass: 0.8
      }
    },
    exit: { 
      opacity: 0, 
      rotateX: 90,
      y: 20,
      transition: { duration: 0.2, ease: "easeIn" }
    }
  };

  const menuVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 10 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0, 
      transition: { type: "spring", damping: 20, stiffness: 300 }
    },
    exit: { opacity: 0, scale: 0.9, y: 10, transition: { duration: 0.15 } }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3 pointer-events-none">
      
      {/* Messenger Popup Menu */}
      <AnimatePresence>
        {isVisible && isMenuOpen && (
          <m.div
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="bg-white/90 backdrop-blur-md border border-border/50 shadow-2xl flex flex-col w-48 pointer-events-auto mb-2 origin-bottom-right overflow-hidden rounded-2xl"
          >
            <button className="flex items-center gap-3 w-full p-4 text-left hover:bg-muted transition-colors text-sm font-medium text-foreground border-b border-border/50 group">
              <TelegramIcon className="w-5 h-5 text-foreground group-hover:scale-110 transition-transform" />
              Telegram
            </button>
            <button className="flex items-center gap-3 w-full p-4 text-left hover:bg-muted transition-colors text-sm font-medium text-foreground group">
              <MaxIcon className="w-5 h-5 text-foreground group-hover:scale-110 transition-transform" />
              MAX
            </button>
          </m.div>
        )}
      </AnimatePresence>

      {/* Buttons */}
      <AnimatePresence>
        {isVisible && (
          <m.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="flex flex-col gap-3"
          >
            {/* Scroll Up */}
            <m.button
              variants={itemVariants}
              whileTap={{ scale: 0.9, z: -20, rotateX: 10 }}
              onClick={() => scrollToSection("hero")}
              className="w-14 h-14 rounded-full bg-white/80 backdrop-blur-md border border-border/50 shadow-lg flex items-center justify-center text-foreground hover:bg-white hover:text-[#30637A] transition-colors pointer-events-auto group"
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform" />
            </m.button>

            {/* Messenger Toggle */}
            <m.button
              variants={itemVariants}
              whileTap={{ scale: 0.9, z: -20, rotateX: 10 }}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={cn(
                "w-14 h-14 rounded-full backdrop-blur-md border border-border/50 shadow-lg flex items-center justify-center transition-colors pointer-events-auto",
                isMenuOpen ? "bg-[#30637A] text-white" : "bg-white/80 text-foreground hover:bg-white hover:text-[#30637A]"
              )}
              aria-label="Open messengers"
            >
              <MessageCircle className="w-5 h-5" />
            </m.button>

            {/* Scroll Down */}
            <m.button
              variants={itemVariants}
              whileTap={{ scale: 0.9, z: -20, rotateX: 10 }}
              onClick={() => scrollToSection("final-form")}
              className="w-14 h-14 rounded-full bg-white/80 backdrop-blur-md border border-border/50 shadow-lg flex items-center justify-center text-foreground hover:bg-white hover:text-[#30637A] transition-colors pointer-events-auto group"
              aria-label="Scroll to bottom"
            >
              <ArrowDown className="w-5 h-5 group-hover:translate-y-0.5 transition-transform" />
            </m.button>

          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
}
