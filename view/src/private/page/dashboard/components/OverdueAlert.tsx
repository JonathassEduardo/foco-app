import { AlertTriangle } from "lucide-react";

interface OverdueAlertProps {
  count: number;
}

export function OverdueAlert({ count }: OverdueAlertProps) {
  if (count === 0) return null;
  return (
    <div className="flex items-center gap-3 rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-500">
      <AlertTriangle className="h-4 w-4 shrink-0" />
      <span>
        Você tem <strong>{count}</strong> tarefa{count > 1 ? "s" : ""} atrasada{count > 1 ? "s" : ""}.
      </span>
    </div>
  );
}