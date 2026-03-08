export type Priority = "low" | "medium" | "high";
export type TaskStatus = "pending" | "in_progress" | "done";
export type StatusFilter = "all" | "pending" | "in_progress" | "done";

export interface Task {
  id: string;
  title: string;
  description?: string;
  dueDate?: string;
  status: TaskStatus;
  priority?: Priority;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTaskPayload {
  title: string;
  description?: string;
  dueDate?: string;
  status: TaskStatus;
  priority: Priority;
}

export interface UpdateTaskPayload {
  title?: string;
  description?: string;
  dueDate?: string;
  status?: TaskStatus;
  priority?: Priority;
}

export interface PriorityConfig {
  value: Priority;
  label: string;
  hex: string;
}

export const PRIORITIES: PriorityConfig[] = [
  { value: "high",   label: "Alta",   hex: "#ef4444" },
  { value: "medium", label: "Média",  hex: "#f59e0b" },
  { value: "low",    label: "Baixa",  hex: "#10b981" },
];

export const STATUS_STYLES: Record<string, { color: string; bg: string }> = {
  pending:     { color: "#f59e0b", bg: "color-mix(in oklch, #f59e0b 12%, transparent)" },
  in_progress: { color: "#3b82f6", bg: "color-mix(in oklch, #3b82f6 12%, transparent)" },
  done:        { color: "#10b981", bg: "color-mix(in oklch, #10b981 12%, transparent)" },
};



export const STATUS_FILTERS: { value: StatusFilter; label: string }[] = [
  { value: "all",         label: "Todas"       },
  { value: "pending",     label: "Pendente"    },
  { value: "in_progress", label: "Em andamento" },
  { value: "done",        label: "Concluída"   },
];

export const TASK_STATUS_LABELS: Record<TaskStatus, string> = {
  pending:     "Pendente",
  in_progress: "Em andamento",
  done:        "Concluída",
};