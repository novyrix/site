import * as React from "react";
import { cn } from "@/lib/utils";

export interface RadioOption {
  value: string;
  label: string;
  description?: string;
}

export interface RadioGroupProps {
  name: string;
  options: RadioOption[];
  value?: string;
  onChange?: (value: string) => void;
  label?: string;
  error?: string;
  helperText?: string;
  orientation?: "vertical" | "horizontal";
  required?: boolean;
}

export function RadioGroup({
  name,
  options,
  value,
  onChange,
  label,
  error,
  helperText,
  orientation = "vertical",
  required = false,
}: RadioGroupProps) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-300 mb-3">
          {label}
          {required && <span className="text-red-400 ml-1">*</span>}
        </label>
      )}
      <div
        className={cn(
          "flex gap-3",
          orientation === "vertical" ? "flex-col" : "flex-row flex-wrap"
        )}
      >
        {options.map((option) => (
          <RadioOption
            key={option.value}
            name={name}
            value={option.value}
            label={option.label}
            description={option.description}
            checked={value === option.value}
            onChange={() => onChange?.(option.value)}
          />
        ))}
      </div>
      {error && <p className="mt-2 text-sm text-red-400">{error}</p>}
      {helperText && !error && (
        <p className="mt-2 text-sm text-gray-500">{helperText}</p>
      )}
    </div>
  );
}

interface RadioOptionProps {
  name: string;
  value: string;
  label: string;
  description?: string;
  checked?: boolean;
  onChange?: () => void;
}

function RadioOption({
  name,
  value,
  label,
  description,
  checked = false,
  onChange,
}: RadioOptionProps) {
  const id = `${name}-${value}`;

  return (
    <label
      htmlFor={id}
      className={cn(
        "flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-all duration-200",
        "hover:bg-white/5",
        checked
          ? "border-primary-500 bg-primary-500/10"
          : "border-white/10 bg-white/5"
      )}
    >
      <div className="relative flex items-center pt-0.5">
        <input
          id={id}
          type="radio"
          name={name}
          value={value}
          checked={checked}
          onChange={onChange}
          className="peer h-5 w-5 cursor-pointer appearance-none rounded-full border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-black checked:bg-primary-500 checked:border-primary-500 border-white/20 hover:border-white/30 bg-white/5"
        />
        <div className="absolute left-1.5 top-1.5 w-2 h-2 rounded-full bg-white opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none" />
      </div>
      <div className="flex-1">
        <div className="text-sm font-medium text-white">{label}</div>
        {description && (
          <div className="text-xs text-gray-400 mt-1">{description}</div>
        )}
      </div>
    </label>
  );
}
