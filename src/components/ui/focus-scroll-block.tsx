"use client";

import { motion } from "framer-motion";

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
    <div className="relative w-full bg-transparent z-10 -my-8 md:-my-12 lg:-my-16">
      <div className="w-full flex items-center justify-center overflow-visible">
        
        {/* Interactive plate */}
        <motion.div 
          className="relative z-10 w-full flex flex-col items-center justify-center"
          initial={{ padding: "4vw" }}
          whileInView={{ padding: "0vw" }}
          viewport={{ once: false, margin: "-15%" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div 
            className={`w-full flex flex-col items-center justify-center overflow-hidden ${bgClass} ${shadowClass}`}
          >
            <div className="w-full transform scale-[0.85] md:scale-[0.8] origin-center">
               {children}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
