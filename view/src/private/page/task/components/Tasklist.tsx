import { type Task, type Priority, type UpdateTaskPayload } from "@/types/task";
import { type useTasks } from "@/hooks/useTasks";
import { TaskItem } from "./Taskitem";

type GetPriorityConfig = ReturnType<typeof useTasks>["getPriorityConfig"];

interface TaskListProps {
  tasks: Task[];
  loading: boolean;
  getPriorityConfig: GetPriorityConfig;
  onToggle: (id: string) => void;
  onRemove: (id: string) => void;
  onEdit: (id: string, payload: UpdateTaskPayload) => void;
}

export function TaskList({ tasks, loading, getPriorityConfig, onToggle, onRemove, onEdit }: TaskListProps) {
  if (loading) {
    return (
      <div className="flex flex-col gap-2">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="h-[72px] rounded-xl bg-muted animate-pulse" />
        ))}
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="text-center py-12 text-sm text-muted-foreground/50 select-none">
        Nenhuma tarefa aqui ainda
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          priorityConfig={getPriorityConfig(task.priority as Priority)}
          onToggle={onToggle}
          onRemove={onRemove}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
}