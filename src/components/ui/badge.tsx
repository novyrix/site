import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-full px-3 py-1 text-xs font-medium transition-colors",
  {
    variants: {
      variant: {
        default: "bg-white/10 text-white border border-white/20",
        primary: "bg-primary-500/20 text-primary-400 border border-primary-500/30",
        success: "bg-green-500/20 text-green-400 border border-green-500/30",
        warning: "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30",
        error: "bg-red-500/20 text-red-400 border border-red-500/30",
        info: "bg-blue-500/20 text-blue-400 border border-blue-500/30",
        // Status-specific variants
        pending: "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30",
        approved: "bg-blue-500/20 text-blue-400 border border-blue-500/30",
        accepted: "bg-green-500/20 text-green-400 border border-green-500/30",
        rejected: "bg-red-500/20 text-red-400 border border-red-500/30",
        inProgress: "bg-primary-500/20 text-primary-400 border border-primary-500/30",
        completed: "bg-green-500/20 text-green-400 border border-green-500/30",
        cancelled: "bg-gray-500/20 text-gray-400 border border-gray-500/30",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
