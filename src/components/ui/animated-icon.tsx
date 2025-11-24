"use client";
import { motion, Variants } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface AnimatedIconProps {
  icon: LucideIcon;
  className?: string;
  containerClassName?: string;
  variant?: "bounce" | "rotate" | "scale" | "shake" | "pulse";
  trigger?: "hover" | "click" | "auto";
}

export function AnimatedIcon({
  icon: Icon,
  className,
  containerClassName,
  variant = "scale",
  trigger = "hover",
}: AnimatedIconProps) {
  const [isActive, setIsActive] = useState(false);

  const variants: Variants = {
    bounce: {
      y: [0, -8, 0],
      transition: { duration: 0.6 }
    },
    rotate: {
      rotate: 360,
      transition: { duration: 0.6 }
    },
    scale: {
      scale: [1, 1.15, 1],
      transition: { duration: 0.4 }
    },
    shake: {
      x: [-3, 3, -3, 3, 0],
      transition: { duration: 0.5 }
    },
    pulse: {
      scale: [1, 1.05, 1],
      opacity: [1, 0.8, 1],
      transition: { duration: 0.8 }
    }
  };

  const handleInteraction = () => {
    if (trigger === "click") {
      setIsActive(true);
      setTimeout(() => setIsActive(false), 600);
    }
  };

  return (
    <motion.div
      className={cn("relative inline-flex items-center justify-center cursor-pointer", containerClassName)}
      whileHover={trigger === "hover" ? variant : undefined}
      animate={trigger === "click" && isActive ? variant : undefined}
      onClick={handleInteraction}
      variants={variants}
    >
      <Icon className={cn("relative z-10", className)} />
    </motion.div>
  );
}

export function AnimatedIconCard({
  icon: Icon,
  title,
  description,
  className,
  variant = "scale",
}: {
  icon: LucideIcon;
  title: string;
  description: string;
  className?: string;
  variant?: "bounce" | "rotate" | "scale" | "shake" | "pulse";
}) {
  return (
    <motion.div
      className={cn(
        "relative group p-6 rounded-2xl bg-neutral-900/50 border border-neutral-800 hover:border-primary-500/50 transition-all duration-300 overflow-hidden",
        className
      )}
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      {/* Glow effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-primary-500/0 to-primary-600/0 group-hover:from-primary-500/10 group-hover:to-primary-600/10 transition-all duration-500"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
      />

      {/* Animated background orb */}
      <motion.div
        className="absolute top-0 right-0 w-32 h-32 bg-primary-500/5 rounded-full blur-2xl"
        initial={{ scale: 0, opacity: 0 }}
        whileHover={{ scale: 1.5, opacity: 1 }}
        transition={{ duration: 0.5 }}
      />

      {/* Content */}
      <div className="relative z-10">
        <AnimatedIcon
          icon={Icon}
          className="w-12 h-12 text-primary-500 mb-4"
          variant={variant}
          trigger="hover"
        />
        <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
        <p className="text-sm text-neutral-400 leading-relaxed">{description}</p>
      </div>
    </motion.div>
  );
}
