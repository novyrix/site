"use client";

import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface TargetCursorProps {
  spinDuration?: number;
  hideDefaultCursor?: boolean;
  parallaxOn?: boolean;
  className?: string;
}

export default function TargetCursor({
  spinDuration = 2,
  hideDefaultCursor = true,
  parallaxOn = true,
  className = "",
}: TargetCursorProps) {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if device is mobile
    const checkMobile = () => {
      setIsMobile(/iPhone|iPad|iPod|Android/i.test(navigator.userAgent));
    };
    checkMobile();

    if (isMobile) return; // Don't run on mobile

    const handleMouseMove = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isTargetElement = target.closest(".cursor-target");

      setPosition({ x: e.clientX, y: e.clientY });
      setIsPointer(!!isTargetElement);
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Hide default cursor if enabled
    if (hideDefaultCursor) {
      document.body.style.cursor = "none";
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (hideDefaultCursor) {
        document.body.style.cursor = "auto";
      }
    };
  }, [hideDefaultCursor, isMobile]);

  // Don't render on mobile
  if (isMobile) return null;

  return (
    <div
      ref={cursorRef}
      className={cn(
        "fixed pointer-events-none z-[9999] mix-blend-difference",
        className
      )}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: "translate(-50%, -50%)",
      }}
    >
      {/* Outer ring */}
      <div
        className={cn(
          "absolute inset-0 border-2 border-white rounded-full transition-all duration-200",
          isPointer ? "w-12 h-12" : "w-8 h-8"
        )}
        style={{
          transform: `translate(-50%, -50%) ${
            isPointer ? "scale(1.2)" : "scale(1)"
          }`,
          animation: `spin ${spinDuration}s linear infinite`,
        }}
      >
        {/* Crosshair lines */}
        <div className="absolute top-0 left-1/2 w-px h-2 bg-white -translate-x-1/2" />
        <div className="absolute bottom-0 left-1/2 w-px h-2 bg-white -translate-x-1/2" />
        <div className="absolute left-0 top-1/2 h-px w-2 bg-white -translate-y-1/2" />
        <div className="absolute right-0 top-1/2 h-px w-2 bg-white -translate-y-1/2" />
      </div>

      {/* Center dot */}
      <div
        className={cn(
          "absolute top-1/2 left-1/2 bg-white rounded-full transition-all duration-200",
          isPointer ? "w-2 h-2" : "w-1 h-1"
        )}
        style={{
          transform: "translate(-50%, -50%)",
        }}
      />

      <style jsx>{`
        @keyframes spin {
          from {
            transform: translate(-50%, -50%) rotate(0deg);
          }
          to {
            transform: translate(-50%, -50%) rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}
