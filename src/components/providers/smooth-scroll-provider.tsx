"use client";

import { ReactLenis, useLenis } from 'lenis/react';
import { ReactNode, useEffect } from 'react';
import { LazyMotion, domAnimation } from 'framer-motion';

interface SmoothScrollProviderProps {
  children: ReactNode;
}

function LenisResizer() {
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;
    
    // Force Lenis to recalculate when body height changes (e.g. Accordions, Modals)
    const observer = new ResizeObserver(() => {
      lenis.resize();
    });
    
    observer.observe(document.body);
    
    return () => observer.disconnect();
  }, [lenis]);

  return null;
}

export function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  return (
    <ReactLenis 
      root 
      options={{ 
        lerp: 0.1, 
        duration: 1.2, 
        smoothWheel: true,
      }}
    >
      <LenisResizer />
      <LazyMotion features={domAnimation} strict>
        {children}
      </LazyMotion>
    </ReactLenis>
  );
}
