import { cn } from "../../lib/utils";

interface ProgressBarProps {
  value: number;
  label?: string;
  className?: string;
}

export function ProgressBar({ value, label, className }: ProgressBarProps) {
  const clamped = Math.min(100, Math.max(0, value));

  return (
    <div className={cn("bg-card border border-border rounded-xl px-6 py-5 mb-5", className)}>
      <div className="flex items-center justify-between mb-3">
        {label && (
          <span className="text-sm text-muted-foreground">{label}</span>
        )}
        <span className="text-xl font-semibold text-foreground tabular-nums ml-auto">
          {clamped}%
        </span>
      </div>
      <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
        <div
          className="h-full rounded-full bg-foreground transition-[width] duration-500 ease-[cubic-bezier(.4,0,.2,1)]"
          style={{ width: `${clamped}%` }}
        />
      </div>
    </div>
  );
}