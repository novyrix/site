import { cn } from "@/lib/utils";

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "text" | "circular" | "rectangular";
}

export function Skeleton({ className, variant = "rectangular", ...props }: SkeletonProps) {
  return (
    <div
      className={cn(
        "animate-pulse bg-white/5",
        variant === "text" && "h-4 rounded",
        variant === "circular" && "rounded-full",
        variant === "rectangular" && "rounded-lg",
        className
      )}
      {...props}
    />
  );
}

// Pre-built skeleton patterns
export function SkeletonCard() {
  return (
    <div className="glass-card border border-white/10 rounded-xl p-6 space-y-4">
      <Skeleton className="h-6 w-3/4" variant="text" />
      <Skeleton className="h-4 w-full" variant="text" />
      <Skeleton className="h-4 w-5/6" variant="text" />
      <div className="flex gap-2 mt-4">
        <Skeleton className="h-10 w-24" />
        <Skeleton className="h-10 w-24" />
      </div>
    </div>
  );
}

export function SkeletonTable() {
  return (
    <div className="space-y-3">
      {/* Header */}
      <div className="flex gap-4 pb-3 border-b border-white/10">
        <Skeleton className="h-4 w-1/4" variant="text" />
        <Skeleton className="h-4 w-1/4" variant="text" />
        <Skeleton className="h-4 w-1/4" variant="text" />
        <Skeleton className="h-4 w-1/4" variant="text" />
      </div>
      {/* Rows */}
      {[...Array(5)].map((_, i) => (
        <div key={i} className="flex gap-4 py-3 border-b border-white/5">
          <Skeleton className="h-4 w-1/4" variant="text" />
          <Skeleton className="h-4 w-1/4" variant="text" />
          <Skeleton className="h-4 w-1/4" variant="text" />
          <Skeleton className="h-4 w-1/4" variant="text" />
        </div>
      ))}
    </div>
  );
}

export function SkeletonAvatar({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-16 h-16",
  };

  return <Skeleton className={sizeClasses[size]} variant="circular" />;
}
