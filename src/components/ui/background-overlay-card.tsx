"use client";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import React from "react";

export function BackgroundOverlayCard({
  title,
  description,
  backgroundImage,
  hoverGif,
  className,
  children,
}: {
  title: string;
  description: string;
  backgroundImage?: string;
  hoverGif?: string;
  className?: string;
  children?: React.ReactNode;
}) {
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <motion.div
      className={cn("w-full h-full", className)}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      <div
        className={cn(
          "group w-full cursor-pointer overflow-hidden relative h-full rounded-xl shadow-xl flex flex-col justify-between p-6 border border-primary-500/10",
          "bg-neutral-950/70 backdrop-blur-sm",
          "hover:border-primary-500/30 transition-all duration-500"
        )}
        style={{
          backgroundImage: isHovered && hoverGif ? `url(${hoverGif})` : backgroundImage ? `url(${backgroundImage})` : 'none',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Overlay on hover */}
        {isHovered && hoverGif && (
          <div className="absolute inset-0 bg-black/60 transition-opacity duration-500 z-0" />
        )}

        {/* Content */}
        <div className="relative z-10">
          {children}
        </div>

        <div className="relative z-10 mt-auto">
          <h3 className="font-bold text-xl md:text-2xl text-gray-50 mb-2">
            {title}
          </h3>
          <p className="font-normal text-sm text-gray-300">
            {description}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
