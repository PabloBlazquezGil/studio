"use client";

import { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isClicked, setIsClicked] = useState(false);
  const [isHoveringLink, setIsHoveringLink] = useState(false);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }
    };

    const onMouseDown = () => {
      setIsClicked(true);
    };

    const onMouseUp = () => {
      setIsClicked(false);
    };

    const onMouseOver = (e: MouseEvent) => {
        if((e.target as HTMLElement).closest('a, button, [role="button"], .cursor-pointer')) {
            setIsHoveringLink(true);
        }
    }
    
    const onMouseOut = (e: MouseEvent) => {
        if((e.target as HTMLElement).closest('a, button, [role="button"], .cursor-pointer')) {
            setIsHoveringLink(false);
        }
    }

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mousedown', onMouseDown);
    document.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mouseover', onMouseOver);
    document.addEventListener('mouseout', onMouseOut);
    
    const body = document.body;
    body.style.cursor = 'none';

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mousedown', onMouseDown);
      document.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseover', onMouseOver);
      document.removeEventListener('mouseout', onMouseOut);
      body.style.cursor = 'auto';
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className={cn(
        'fixed top-0 left-0 w-8 h-8 rounded-full border border-primary pointer-events-none z-[9999] transition-all duration-150 ease-out',
        'hidden md:block',
        '-translate-x-1/2 -translate-y-1/2',
        isClicked ? 'scale-50 bg-primary/50' : '',
        isHoveringLink ? 'scale-150 bg-primary/20' : ''
      )}
    />
  );
}
