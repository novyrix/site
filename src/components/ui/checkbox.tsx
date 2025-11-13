import * as React from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: string;
  error?: string;
  helperText?: string;
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, error, helperText, id, ...props }, ref) => {
    const checkboxId = id || `checkbox-${Math.random().toString(36).substring(2, 9)}`;

    return (
      <div className="flex items-start gap-3">
        <div className="relative flex items-center">
          <input
            id={checkboxId}
            type="checkbox"
            className={cn(
              "peer h-5 w-5 cursor-pointer appearance-none rounded border transition-all duration-200",
              "focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-black",
              "checked:bg-primary-500 checked:border-primary-500",
              "disabled:cursor-not-allowed disabled:opacity-50",
              error
                ? "border-red-500"
                : "border-white/20 hover:border-white/30 bg-white/5",
              className
            )}
            ref={ref}
            {...props}
          />
          <Check className="absolute left-0.5 top-0.5 w-4 h-4 text-white pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity" />
        </div>
        {label && (
          <div className="flex-1">
            <label
              htmlFor={checkboxId}
              className="block text-sm font-medium text-gray-300 cursor-pointer select-none"
            >
              {label}
              {props.required && <span className="text-red-400 ml-1">*</span>}
            </label>
            {error && <p className="mt-1 text-sm text-red-400">{error}</p>}
            {helperText && !error && (
              <p className="mt-1 text-sm text-gray-500">{helperText}</p>
            )}
          </div>
        )}
      </div>
    );
  }
);
Checkbox.displayName = "Checkbox";

export { Checkbox };
