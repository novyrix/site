import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  // Base styles - all buttons share these
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:ring-offset-black disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          "bg-primary-500 text-white hover:bg-primary-600 active:bg-primary-700 shadow-lg shadow-primary-500/20 hover:shadow-xl hover:shadow-primary-500/30",
        secondary:
          "bg-dark-700 text-white hover:bg-dark-600 active:bg-dark-500 border border-dark-600",
        outline:
          "border-2 border-primary-500 text-primary-500 hover:bg-primary-500/10 active:bg-primary-500/20",
        ghost:
          "text-gray-300 hover:bg-dark-800 hover:text-white active:bg-dark-700",
        glass:
          "glass-button text-white border border-white/10 hover:border-white/20 hover:bg-white/10",
        destructive:
          "bg-red-600 text-white hover:bg-red-700 active:bg-red-800 shadow-lg shadow-red-600/20",
      },
      size: {
        sm: "h-9 px-4 text-sm",
        md: "h-11 px-6 text-base",
        lg: "h-13 px-8 text-lg",
        xl: "h-16 px-10 text-xl",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      loading = false,
      leftIcon,
      rightIcon,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";
    
    // When asChild is true, only render children (Slot requires single child)
    if (asChild) {
      return (
        <Comp
          className={cn(buttonVariants({ variant, size, className }))}
          ref={ref}
          {...props}
        >
          {children}
        </Comp>
      );
    }
    
    // When asChild is false, render as button with all features
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={disabled || loading}
        {...props}
      >
        {loading && (
          <svg
            className="animate-spin h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {!loading && leftIcon && <span className="inline-flex">{leftIcon}</span>}
        {children}
        {!loading && rightIcon && <span className="inline-flex">{rightIcon}</span>}
      </Comp>
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };
