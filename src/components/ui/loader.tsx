"use client";

import React from "react";
import { motion } from "framer-motion";

export const LoaderOne = () => {
  const loadingCircleVariants = {
    start: {
      y: "0%",
    },
    end: {
      y: "100%",
    },
  };

  return (
    <div className="flex items-center justify-center space-x-2">
      <motion.span
        className="block h-2 w-2 rounded-full bg-primary-400"
        variants={loadingCircleVariants}
        initial="start"
        animate="end"
        transition={{
          duration: 0.5,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
          delay: 0,
        }}
      />
      <motion.span
        className="block h-2 w-2 rounded-full bg-primary-400"
        variants={loadingCircleVariants}
        initial="start"
        animate="end"
        transition={{
          duration: 0.5,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
          delay: 0.1,
        }}
      />
      <motion.span
        className="block h-2 w-2 rounded-full bg-primary-400"
        variants={loadingCircleVariants}
        initial="start"
        animate="end"
        transition={{
          duration: 0.5,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
          delay: 0.2,
        }}
      />
    </div>
  );
};
