"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

export function Preloader() {
  const [mounted, setMounted] = useState(false);
  const [isFlipping, setIsFlipping] = useState(false);
  const [isDone, setIsDone] = useState(false);
  
  useEffect(() => {
    setMounted(true);
    
    // Prevent scrolling while preloader is active, but compensate for scrollbar to avoid layout shift
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.paddingRight = `${scrollbarWidth}px`;
    document.body.style.overflow = 'hidden';
    
    // Force scroll to top so fixed layout matches absolute layout
    window.scrollTo(0, 0);
    
    const timeout = setTimeout(() => {
      // Start FLIP
      const dummies = [
        document.getElementById('dummy-1'),
        document.getElementById('dummy-2'),
        document.getElementById('dummy-3'),
        document.getElementById('dummy-4'),
        document.getElementById('dummy-5')
      ];
      
      const realBlocks = [
        document.getElementById('block-title'),
        document.getElementById('block-grid'),
        document.getElementById('block-blue'),
        document.getElementById('block-cta'),
        document.getElementById('block-steps')
      ];
      
      // Calculate real rects first
      const realRects = realBlocks.map(b => b ? b.getBoundingClientRect() : null);
      
      // Get dummy rects while they are still in flex container
      const dummyRects = dummies.map(d => d ? d.getBoundingClientRect() : null);
      
      // Lock dummy blocks to fixed absolute positions precisely where they currently are
      dummies.forEach((d, i) => {
        if (!d || !dummyRects[i]) return;
        
        // Remove transform and scale so it doesn't mess with fixed positioning
        d.style.transform = 'none';
        d.className = d.className.replace(/anim-box/g, '').trim();
        d.style.animation = 'none';
        
        d.style.position = 'fixed';
        d.style.top = dummyRects[i]!.top + 'px';
        d.style.left = dummyRects[i]!.left + 'px';
        d.style.width = dummyRects[i]!.width + 'px';
        d.style.height = dummyRects[i]!.height + 'px';
        d.style.flexGrow = 'unset';
        d.style.margin = '0';
        d.style.zIndex = '1000'; // Ensure they stay on top
        
        // Move to body so they are not hidden when we hide the container
        document.body.appendChild(d);
      });
      
      setIsFlipping(true);
      
      // Trigger CSS transition by updating coordinates to real blocks
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          dummies.forEach((d, i) => {
            if (!d || !realRects[i] || !realBlocks[i]) return;
            d.style.top = realRects[i]!.top + 'px';
            d.style.left = realRects[i]!.left + 'px';
            d.style.width = realRects[i]!.width + 'px';
            d.style.height = realRects[i]!.height + 'px';
            d.style.borderRadius = getComputedStyle(realBlocks[i]!).borderRadius;
          });
          
          // Wait for 0.8s morph to finish
          setTimeout(() => {
            // Restore overflow and padding
            document.body.style.paddingRight = '';
            document.body.style.overflow = '';
            
            // Fade out dummies
            dummies.forEach(d => {
              if (d) {
                d.style.transition = 'opacity 0.8s ease-in-out';
                d.style.opacity = '0';
                setTimeout(() => {
                  if (d.parentNode) d.parentNode.removeChild(d);
                }, 1000);
              }
            });
            
            setIsDone(true);
          }, 800);
        });
      });
      
    }, 3000); // Wait for entrance and matrix
    
    return () => clearTimeout(timeout);
  }, []);
  
  if (isDone || !mounted) return null;
  
  return createPortal(
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center bg-white"
      style={{
        transition: "background-color 1s cubic-bezier(0.85, 0, 0.15, 1)",
        backgroundColor: isFlipping ? "transparent" : "#ffffff",
        pointerEvents: isFlipping ? "none" : "auto"
      }}
    >
      <div 
        className="flex gap-2 w-[140px] h-[160px]"
        style={{ display: isFlipping ? "none" : "flex" }}
      >
        <div className="anim-col left-col flex flex-col gap-2" style={{ flexGrow: 1 }}>
          <div id="dummy-1" className="dummy-box anim-box dummy-white cd-1" style={{ flexGrow: 2 }}></div>
          <div id="dummy-3" className="dummy-box anim-box dummy-blue cd-3" style={{ flexGrow: 1 }}></div>
        </div>
        <div className="anim-col right-col flex flex-col gap-2" style={{ flexGrow: 0.8 }}>
          <div id="dummy-2" className="dummy-box anim-box dummy-white cd-2" style={{ flexGrow: 0.8 }}></div>
          <div id="dummy-4" className="dummy-box anim-box dummy-dark cd-4" style={{ flexGrow: 1 }}></div>
          <div id="dummy-5" className="dummy-box anim-box dummy-white cd-5" style={{ flexGrow: 1.5 }}></div>
        </div>
      </div>
    </div>,
    document.body
  );
}
