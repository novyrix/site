"use client";

import React, { useEffect, useRef } from "react";

interface LightningProps {
  hue?: number;
  intensity?: number;
  frequency?: number;
  className?: string;
}

export const Lightning: React.FC<LightningProps> = ({
  hue = 220, // Default blue hue
  intensity = 0.5,
  frequency = 0.002,
  className = "",
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    let animationFrameId: number;
    let time = 0;

    const drawLightning = () => {
      const width = canvas.offsetWidth;
      const height = canvas.offsetHeight;

      // Clear canvas
      ctx.clearRect(0, 0, width, height);

      time += frequency;

      // Draw multiple lightning bolts
      for (let i = 0; i < 3; i++) {
        const phase = time + i * 2;
        const shouldDraw = Math.sin(phase) > 0.95; // Flash occasionally

        if (shouldDraw) {
          const startX = (width / 4) * (i + 1);
          const startY = 0;

          ctx.beginPath();
          ctx.moveTo(startX, startY);

          let currentX = startX;
          let currentY = startY;

          // Create jagged lightning path
          const segments = 12 + Math.floor(Math.random() * 8);
          for (let j = 0; j < segments; j++) {
            currentX += (Math.random() - 0.5) * 60;
            currentY += height / segments + Math.random() * 20;
            ctx.lineTo(currentX, currentY);
          }

          // Style the lightning
          const alpha = intensity * (0.6 + Math.random() * 0.4);
          ctx.strokeStyle = `hsla(${hue}, 100%, 70%, ${alpha})`;
          ctx.lineWidth = 2 + Math.random() * 2;
          ctx.shadowBlur = 20;
          ctx.shadowColor = `hsla(${hue}, 100%, 60%, ${alpha})`;
          ctx.stroke();

          // Draw glow effect
          ctx.strokeStyle = `hsla(${hue}, 100%, 90%, ${alpha * 0.5})`;
          ctx.lineWidth = 4;
          ctx.shadowBlur = 30;
          ctx.stroke();
        }
      }

      animationFrameId = requestAnimationFrame(drawLightning);
    };

    drawLightning();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [hue, intensity, frequency]);

  return (
    <canvas
      ref={canvasRef}
      className={`w-full h-full ${className}`}
      style={{ pointerEvents: "none" }}
    />
  );
};
