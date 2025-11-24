"use client";
import { motion } from "framer-motion";
import React, { useEffect } from "react";
import { cn } from "@/lib/utils";

export function AnimatedServiceCard({
  title,
  description,
  children,
  className,
}: {
  title: string;
  description: string;
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <Card className={className}>
      <CardSkeletonContainer>
        <Skeleton>{children}</Skeleton>
      </CardSkeletonContainer>
      <CardTitle>{title}</CardTitle>
      <CardDescription>{description}</CardDescription>
    </Card>
  );
}

const Skeleton = ({ children }: { children?: React.ReactNode }) => {
  return (
    <div className="p-8 overflow-hidden h-full relative flex items-center justify-center">
      {/* Animated vertical line in the center */}
      <div className="absolute left-1/2 -translate-x-1/2 h-40 w-px bg-gradient-to-b from-transparent via-primary-500 to-transparent z-10 animate-move">
        <div className="w-10 h-32 top-1/2 -translate-y-1/2 absolute -left-5">
          <Sparkles />
        </div>
      </div>

      {/* Logos with horizontal infinite movement */}
      <div className="flex flex-row shrink-0 justify-center items-center gap-2 relative z-20">
        <motion.div
          className="circle-1"
          animate={{
            x: [-2, 2, -2],
            y: [-2, 2, -2],
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {React.Children.toArray(children)[0]}
        </motion.div>

        <motion.div
          className="circle-2"
          animate={{
            x: [-3, 3, -3],
            y: [2, -2, 2],
            scale: [1, 1.08, 1],
          }}
          transition={{
            duration: 3.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.2,
          }}
        >
          {React.Children.toArray(children)[1]}
        </motion.div>

        <motion.div
          className="circle-3"
          animate={{
            x: [-2, 2, -2],
            y: [-3, 3, -3],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.4,
          }}
        >
          {React.Children.toArray(children)[2]}
        </motion.div>

        <motion.div
          className="circle-4"
          animate={{
            x: [2, -2, 2],
            y: [3, -3, 3],
            scale: [1, 1.08, 1],
          }}
          transition={{
            duration: 3.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.6,
          }}
        >
          {React.Children.toArray(children)[3]}
        </motion.div>

        <motion.div
          className="circle-5"
          animate={{
            x: [3, -3, 3],
            y: [-2, 2, -2],
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.8,
          }}
        >
          {React.Children.toArray(children)[4]}
        </motion.div>
      </div>
    </div>
  );
};

const Sparkles = () => {
  const randomMove = () => Math.random() * 2 - 1;
  const randomOpacity = () => Math.random();
  const random = () => Math.random();
  return (
    <div className="absolute inset-0">
      {[...Array(12)].map((_, i) => (
        <motion.span
          key={`star-${i}`}
          animate={{
            top: `calc(${random() * 100}% + ${randomMove()}px)`,
            left: `calc(${random() * 100}% + ${randomMove()}px)`,
            opacity: randomOpacity(),
            scale: [1, 1.2, 0],
          }}
          transition={{
            duration: random() * 2 + 4,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            position: "absolute",
            top: `${random() * 100}%`,
            left: `${random() * 100}%`,
            width: `2px`,
            height: `2px`,
            borderRadius: "50%",
            zIndex: 1,
          }}
          className="inline-block bg-primary-400"
        ></motion.span>
      ))}
    </div>
  );
};

export const Card = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "max-w-sm w-full mx-auto p-8 rounded-xl border border-primary-500/10 bg-neutral-950/70 shadow-[2px_4px_16px_0px_rgba(255,87,34,0.06)_inset] group hover:border-primary-500/30 transition-colors duration-500",
        className
      )}
    >
      {children}
    </div>
  );
};

export const CardTitle = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <h3
      className={cn(
        "text-lg font-semibold text-white py-2",
        className
      )}
    >
      {children}
    </h3>
  );
};

export const CardDescription = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <p
      className={cn(
        "text-sm font-normal text-neutral-400 max-w-sm",
        className
      )}
    >
      {children}
    </p>
  );
};

export const CardSkeletonContainer = ({
  className,
  children,
  showGradient = true,
}: {
  className?: string;
  children: React.ReactNode;
  showGradient?: boolean;
}) => {
  return (
    <div
      className={cn(
        "h-[15rem] md:h-[20rem] rounded-xl z-40",
        className,
        showGradient &&
          "bg-neutral-900/70 [mask-image:radial-gradient(50%_50%_at_50%_50%,white_0%,transparent_100%)]"
      )}
    >
      {children}
    </div>
  );
};

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
