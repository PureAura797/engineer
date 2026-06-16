"use client";

import { m } from "framer-motion";

interface FocusScrollBlockProps {
  children: React.ReactNode;
  bgClass?: string;
  shadowClass?: string;
}

export function FocusScrollBlock({ 
  children, 
  bgClass = "bg-[#182025]", 
  shadowClass = "" 
}: FocusScrollBlockProps) {
  return (
    <div className="relative w-full bg-transparent z-10">
      <div className="w-full flex items-center justify-center overflow-visible">
        {/* Wrapper to maintain consistent layout height */}
        <div className="relative z-10 w-full flex flex-col items-center justify-center">
          {/* Interactive plate - now uses safe transform: scale instead of layout-altering padding */}
          <m.div 
            className={`w-full flex flex-col items-center justify-center overflow-hidden origin-center ${bgClass} ${shadowClass}`}
            initial={{ scale: 0.92 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: false, margin: "-15%" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="w-full transform scale-[0.85] md:scale-[0.8] origin-center">
               {children}
            </div>
          </m.div>
        </div>
      </div>
    </div>
  );
}
