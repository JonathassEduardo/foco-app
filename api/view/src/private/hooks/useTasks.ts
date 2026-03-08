import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import {
  PRIORITIES,
  type CreateTaskPayload,
  type Priority,
  type StatusFilter,
  type Task,
  type UpdateTaskPayload,
} from "@/private/types/task";
import { taskService } from "@/private/service/Taskservice";

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");

  const fetchTasks = useCallback(async () => {
    try {
      setLoading(true);
      const data = await taskService.list();
      setTasks(data);
    } catch {
      toast.error("Erro ao carregar tarefas.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchTasks(); }, [fetchTasks]);

  const addTask = async (payload: CreateTaskPayload) => {
    try {
      const task = await taskService.create(payload);
      setTasks((prev) => [task, ...prev]);
      toast.success("Tarefa criada com sucesso!");
    } catch {
      toast.error("Erro ao criar tarefa.");
    }
  };

  const editTask = async (id: string, payload: UpdateTaskPayload) => {
    const previous = tasks.find((t) => t.id === id);
    if (!previous) return;

    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, ...payload } : t)));

    try {
      const updated = await taskService.update(id, payload);
      setTasks((prev) => prev.map((t) => (t.id === id ? updated : t)));
      toast.success("Tarefa atualizada!");
    } catch {
      toast.error("Erro ao atualizar tarefa.");
      fetchTasks();
    }
  };

  const toggleTask = async (id: string) => {
    const task = tasks.find((t) => t.id === id);
    if (!task) return;

    const nextStatus = task.status === "done" ? "pending" : "done";

    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status: nextStatus } : t))
    );

    try {
      const updated = await taskService.update(id, { status: nextStatus });
      setTasks((prev) => prev.map((t) => (t.id === id ? updated : t)));
      toast.success(nextStatus === "done" ? "Tarefa concluída!" : "Tarefa reaberta.");
    } catch {
      toast.error("Erro ao atualizar tarefa.");
      fetchTasks();
    }
  };

  const removeTask = async (id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
    try {
      await taskService.remove(id);
      toast.success("Tarefa excluída.");
    } catch {
      toast.error("Erro ao excluir tarefa.");
      fetchTasks();
    }
  };

  const clearCompleted = async () => {
    const done = tasks.filter((t) => t.status === "done");
    if (done.length === 0) return;

    setTasks((prev) => prev.filter((t) => t.status !== "done"));
    try {
      await Promise.all(done.map((t) => taskService.remove(t.id)));
      toast.success(`${done.length} ${done.length === 1 ? "tarefa removida" : "tarefas removidas"}.`);
    } catch {
      toast.error("Erro ao limpar tarefas concluídas.");
      fetchTasks();
    }
  };

  const filteredTasks = tasks.filter((t) =>
    statusFilter === "all" ? true : t.status === statusFilter
  );

  const stats = {
    total: tasks.length,
    done: tasks.filter((t) => t.status === "done").length,
    remaining: tasks.filter((t) => t.status !== "done").length,
    percent: tasks.length
      ? Math.round((tasks.filter((t) => t.status === "done").length / tasks.length) * 100)
      : 0,
  };

  const getPriorityConfig = (v: Priority | undefined) =>
    v ? PRIORITIES.find((p) => p.value === v) : undefined;

  return {
    filteredTasks,
    stats,
    loading,
    statusFilter,
    setStatusFilter,
    addTask,
    editTask,
    toggleTask,
    removeTask,
    clearCompleted,
    getPriorityConfig,
  };
}