import { useState } from "react";
import { cn } from "@/private/lib/utils";
import { PriorityConfig, STATUS_STYLES, Task, TASK_STATUS_LABELS, UpdateTaskPayload } from "@/private/types/task";
import { TaskEditModal } from "./Taskeditmodal";
import { CheckCircleFilledIcon, CheckCircleIcon, EditIcon, TrashIcon } from "@/private/components/shared/Icons";
// Importando componentes do shadcn/ui
import { Button } from "@/private/components/ui/button";
import { Badge } from "@/private/components/ui/badge";

interface TaskItemProps {
  task: Task;
  priorityConfig: PriorityConfig | undefined;
  onToggle: (id: string) => void;
  onRemove: (id: string) => void;
  onEdit: (id: string, payload: UpdateTaskPayload) => void;
}

export function TaskItem({ task, priorityConfig, onToggle, onRemove, onEdit }: TaskItemProps) {
  const [editing, setEditing] = useState(false);
  const isDone = task.status === "done";
  const statusStyle = STATUS_STYLES[task.status];

  return (
    <>
      <div
        className={cn(
          "task-item-enter group relative flex items-center gap-3 bg-card border border-border rounded-xl px-4 py-4",
          "hover:translate-x-0.5 transition-[transform,box-shadow] duration-200",
          isDone ? "opacity-60 shadow-none" : "hover:shadow-sm",
        )}
      >
        <span
          className="absolute left-0 top-[20%] bottom-[20%] w-[3px] rounded-r-sm transition-colors duration-200"
          style={{
            backgroundColor: isDone
              ? "var(--border)"
              : (priorityConfig?.hex ?? statusStyle.color),
          }}
        />

        <Button
          variant="ghost"
          size="icon"
          onClick={() => onToggle(task.id)}
          className={cn(
            "h-9 w-9 p-0 hover:bg-transparent transition-colors",
            isDone ? "text-emerald-500" : "text-border hover:text-foreground",
          )}
        >
          {isDone ? <CheckCircleFilledIcon /> : <CheckCircleIcon color="currentColor" />}
          <span className="sr-only">Marcar como concluída</span>
        </Button>

        <div className="flex-1 min-w-0">
          <p className={cn(
            "text-sm font-medium leading-snug mb-1 transition-colors duration-200",
            isDone ? "line-through text-muted-foreground" : "text-foreground",
          )}>
            {task.title}
          </p>

          {task.description && (
            <p className="text-xs text-muted-foreground/60 mb-1.5 leading-snug">
              {task.description}
            </p>
          )}

          <div className="flex flex-wrap items-center gap-2">
            {priorityConfig && (
              <Badge
                variant="outline"
                className="text-[10px] font-semibold tracking-wider uppercase px-2 py-0 border-none"
                style={{
                  color: priorityConfig.hex,
                  backgroundColor: `color-mix(in oklch, ${priorityConfig.hex} 12%, transparent)`,
                }}
              >
                {priorityConfig.label}
              </Badge>
            )}

            <Badge
              variant="outline"
              className="text-[10px] font-semibold tracking-wide uppercase px-2 py-0 border-none"
              style={{ color: statusStyle.color, backgroundColor: statusStyle.bg }}
            >
              {TASK_STATUS_LABELS[task.status]}
            </Badge>

            {task.dueDate && (
              <span className="text-[10px] text-muted-foreground/60">
                Vence {new Date(task.dueDate).toLocaleDateString("pt-BR")}
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setEditing(true)}
            className="h-8 w-8 rounded-full text-primary hover:bg-primary hover:text-primary-foreground"
          >
            <EditIcon size={20} />
            <span className="sr-only">Editar tarefa</span>
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => onRemove(task.id)}
            className="h-8 w-8 rounded-full text-red-600 hover:bg-red-500 hover:text-white"
          >
            <TrashIcon size={20} />
            <span className="sr-only">Excluir tarefa</span>
          </Button>
        </div>
      </div>

      {editing && (
        <TaskEditModal
          task={task}
          onSave={onEdit}
          onClose={() => setEditing(false)}
        />
      )}
    </>
  );
}