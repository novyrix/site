"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface DeviceMockupProps {
  src: string;
  type: "mobile" | "desktop" | "tablet";
  className?: string;
}

export const DeviceMockup = ({ src, type, className }: DeviceMockupProps) => {
  if (type === "mobile") {
    return (
      <div className={cn("relative mx-auto border-gray-800 dark:border-gray-800 bg-gray-800 border-[14px] rounded-[2.5rem] h-[600px] w-[300px] shadow-xl", className)}>
        <div className="w-[148px] h-[18px] bg-gray-800 top-0 rounded-b-[1rem] left-1/2 -translate-x-1/2 absolute"></div>
        <div className="h-[46px] w-[3px] bg-gray-800 absolute -start-[17px] top-[124px] rounded-s-lg"></div>
        <div className="h-[46px] w-[3px] bg-gray-800 absolute -start-[17px] top-[178px] rounded-s-lg"></div>
        <div className="h-[64px] w-[3px] bg-gray-800 absolute -end-[17px] top-[142px] rounded-e-lg"></div>
        <div className="rounded-[2rem] overflow-hidden w-full h-full bg-white dark:bg-gray-800">
           {/* Use iframe for live preview if src is a URL, otherwise image */}
           {src.startsWith("http") ? (
             <iframe src={src} className="w-full h-full border-0" title="Mobile Preview" />
           ) : (
             <img src={src} className="w-full h-full object-cover" alt="Mobile Preview" />
           )}
        </div>
      </div>
    );
  }

  if (type === "desktop") {
    return (
      <div className={cn("relative mx-auto border-gray-800 dark:border-gray-800 bg-gray-800 border-[8px] rounded-t-xl h-[400px] w-full max-w-[800px] shadow-xl", className)}>
        <div className="rounded-lg overflow-hidden h-full bg-white dark:bg-gray-800">
            {src.startsWith("http") ? (
             <iframe src={src} className="w-full h-full border-0" title="Desktop Preview" />
           ) : (
             <img src={src} className="w-full h-full object-cover" alt="Desktop Preview" />
           )}
        </div>
      </div>
    );
  }

  return null;
};
