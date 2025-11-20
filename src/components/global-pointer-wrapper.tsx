"use client";

import React from "react";
import { FollowerPointerCard } from "@/components/ui/following-pointer";

interface GlobalPointerWrapperProps {
  children: React.ReactNode;
}

export function GlobalPointerWrapper({ children }: GlobalPointerWrapperProps) {
  return (
    <FollowerPointerCard
      title={
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-orange-500 animate-pulse" />
          <p className="text-xs font-medium text-white">Novy AI</p>
        </div>
      }
    >
      {children}
    </FollowerPointerCard>
  );
}
