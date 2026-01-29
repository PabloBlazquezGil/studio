"use client";

import { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { Camera } from 'lucide-react';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }
    };

    document.addEventListener('mousemove', onMouseMove);
    
    const body = document.body;
    body.style.cursor = 'none';

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      body.style.cursor = 'auto';
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className={cn(
        'fixed top-0 left-0 pointer-events-none z-[9999]',
        'hidden md:block',
        '-translate-x-1/2 -translate-y-1/2'
      )}
    >
      <Camera className="w-8 h-8 text-foreground" />
    </div>
  );
}
