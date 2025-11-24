"use client";
import { motion } from "framer-motion";
import React, { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function UnifiedServiceCard({
  title,
  description,
  children,
  gifUrl,
  className,
  link,
}: {
  title: string;
  description: string;
  children?: React.ReactNode;
  gifUrl?: string;
  className?: string;
  link?: string;
}) {
  const [isHovered, setIsHovered] = useState(false);

  const cardContent = (
    <motion.div
      className={cn("w-full h-full", className)}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      <div className="max-w-sm w-full mx-auto p-8 rounded-xl border border-primary-500/10 bg-neutral-950/70 shadow-[2px_4px_16px_0px_rgba(255,87,34,0.06)_inset] group hover:border-primary-500/30 transition-colors duration-500 h-full flex flex-col cursor-pointer">
        {/* Animated Logo Section */}
        <div
          className="h-[15rem] md:h-[20rem] rounded-xl z-40 bg-neutral-900/70 [mask-image:radial-gradient(50%_50%_at_50%_50%,white_0%,transparent_100%)] relative overflow-hidden mb-4"
          style={{
            backgroundImage: isHovered && gifUrl ? `url(${gifUrl})` : 'none',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          {/* Dark overlay when GIF is shown */}
          {isHovered && gifUrl && (
            <div className="absolute inset-0 bg-black/50 z-0" />
          )}

          {/* Logo Animation Container - Carousel Style */}
          <div className="p-8 overflow-hidden h-full relative flex items-center justify-center">
            {/* Carousel wrapper with infinite horizontal scroll */}
            <div className="flex items-center gap-4 animate-carousel">
              {/* First set of logos */}
              {React.Children.toArray(children).map((child, index) => (
                <motion.div
                  key={`logo-1-${index}`}
                  className="flex-shrink-0"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.2 }}
                >
                  {child}
                </motion.div>
              ))}
              {/* Duplicate set for seamless loop */}
              {React.Children.toArray(children).map((child, index) => (
                <motion.div
                  key={`logo-2-${index}`}
                  className="flex-shrink-0"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.2 }}
                >
                  {child}
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Text Content */}
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-white py-2">{title}</h3>
          <p className="text-sm font-normal text-neutral-400">{description}</p>
        </div>
      </div>
    </motion.div>
  );

  // Wrap in Link if link is provided
  if (link) {
    return <Link href={link}>{cardContent}</Link>;
  }

  return cardContent;
}

export const Container = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        `h-16 w-16 rounded-full flex items-center justify-center bg-[rgba(255,87,34,0.02)]
    shadow-[0px_0px_8px_0px_rgba(255,87,34,0.25)_inset,0px_32px_24px_-16px_rgba(0,0,0,0.40)]
    `,
        className
      )}
    >
      {children}
    </div>
  );
};
