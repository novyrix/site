import * as React from "react";
import { cn } from "@/lib/utils";

export interface SwitchProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: string;
  description?: string;
  error?: string;
}

const Switch = React.forwardRef<HTMLInputElement, SwitchProps>(
  ({ className, label, description, error, id, ...props }, ref) => {
    const switchId = id || `switch-${Math.random().toString(36).substring(2, 9)}`;

    return (
      <div className="flex items-center justify-between gap-4">
        {(label || description) && (
          <div className="flex-1">
            {label && (
              <label
                htmlFor={switchId}
                className="block text-sm font-medium text-gray-300 cursor-pointer"
              >
                {label}
                {props.required && <span className="text-red-400 ml-1">*</span>}
              </label>
            )}
            {description && (
              <p className="text-xs text-gray-500 mt-1">{description}</p>
            )}
            {error && <p className="text-xs text-red-400 mt-1">{error}</p>}
          </div>
        )}
        <label htmlFor={switchId} className="relative inline-flex items-center cursor-pointer">
          <input
            id={switchId}
            type="checkbox"
            className="sr-only peer"
            ref={ref}
            {...props}
          />
          <div
            className={cn(
              "w-11 h-6 rounded-full transition-colors duration-200",
              "peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary-500 peer-focus:ring-offset-2 peer-focus:ring-offset-black",
              "peer-checked:bg-primary-500 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
              error ? "bg-red-500/30" : "bg-white/20",
              className
            )}
          >
            <div
              className={cn(
                "absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white transition-transform duration-200",
                "peer-checked:translate-x-5"
              )}
            />
          </div>
        </label>
      </div>
    );
  }
);
Switch.displayName = "Switch";

export { Switch };
