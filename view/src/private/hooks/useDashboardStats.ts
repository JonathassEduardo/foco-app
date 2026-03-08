import { useMemo } from "react";
import type { Task } from "@/private/types/task";

const STATUS_COLORS = {
  pending: "#f59e0b",
  in_progress: "#3b82f6",
  done: "#10b981",
};

const PRIORITY_COLORS = {
  high: "#ef4444",
  medium: "#f59e0b",
  low: "#10b981",
};

function isOverdue(task: Task) {
  if (!task.dueDate || task.status === "done") return false;
  return new Date(task.dueDate) < new Date();
}

export function useDashboardStats(tasks: Task[]) {
  return useMemo(() => {
    const total = tasks.length;
    const done = tasks.filter((t) => t.status === "done").length;
    const pending = tasks.filter((t) => t.status === "pending").length;
    const inProgress = tasks.filter((t) => t.status === "in_progress").length;
    const overdue = tasks.filter(isOverdue).length;

    const statusData = [
      { name: "Pendente", value: pending, color: STATUS_COLORS.pending },
      { name: "Em andamento", value: inProgress, color: STATUS_COLORS.in_progress },
      { name: "Concluída", value: done, color: STATUS_COLORS.done },
    ].filter((d) => d.value > 0);

    const priorityData = [
      { name: "Alta", value: tasks.filter((t) => t.priority === "high").length, fill: PRIORITY_COLORS.high },
      { name: "Média", value: tasks.filter((t) => t.priority === "medium").length, fill: PRIORITY_COLORS.medium },
      { name: "Baixa", value: tasks.filter((t) => t.priority === "low").length, fill: PRIORITY_COLORS.low },
    ];

    return { total, done, pending, inProgress, overdue, statusData, priorityData };
  }, [tasks]);
}