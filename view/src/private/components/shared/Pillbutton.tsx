import { type ButtonHTMLAttributes } from "react";
import { cn } from "../../lib/utils";

interface PillButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean;
  size?: "sm" | "md";
}

export function PillButton({
  children,
  active = false,
  size = "md",
  className,
  ...props
}: PillButtonProps) {
  return (
    <button
      type="button"
      className={cn(
        "rounded-full border-none cursor-pointer font-medium transition-colors duration-150",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        size === "sm" ? "px-2.5 py-1 text-[11px]" : "px-3.5 py-1.5 text-xs",
        active
          ? "bg-primary text-primary-foreground"
          : "bg-secondary text-muted-foreground hover:bg-muted hover:text-foreground",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}