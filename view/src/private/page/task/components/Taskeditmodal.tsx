import { useEffect, useRef, useState } from "react";
import { z } from "zod";
import { PRIORITIES, STATUS_FILTERS, type Priority, type Task, type TaskStatus, type UpdateTaskPayload } from "@/private/types/task";
import { XIcon } from "@/private/components/shared/Icons";
import { editSchema } from "@/private/schema/taskFormSchema";
import { cn } from "@/private/lib/utils";

type EditValues = z.infer<typeof editSchema>;
type FieldErrors = Partial<Record<keyof EditValues, string>>;

interface TaskEditModalProps {
  task: Task;
  onSave: (id: string, payload: UpdateTaskPayload) => void;
  onClose: () => void;
}

const STATUS_OPTIONS = STATUS_FILTERS.filter((s) => s.value !== "all");

export function TaskEditModal({ task, onSave, onClose }: TaskEditModalProps) {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description ?? "");
  const [dueDate, setDueDate] = useState(task.dueDate?.slice(0, 10) ?? "");
  const [priority, setPriority] = useState<Priority>(task.priority ?? "medium");
  const [status, setStatus] = useState<TaskStatus>(task.status);
  const [errors, setErrors] = useState<FieldErrors>({});
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const validate = (): EditValues | null => {
    const result = editSchema.safeParse({ title, description: description || undefined, dueDate: dueDate || undefined, priority, status });
    if (!result.success) {
      const errs: FieldErrors = {};
      for (const issue of result.error.issues) {
        const f = issue.path[0] as keyof EditValues;
        if (!errs[f]) errs[f] = issue.message;
      }
      setErrors(errs);
      return null;
    }
    setErrors({});
    return result.data;
  };

  const handleSave = () => {
    const data = validate();
    if (!data) return;
    onSave(task.id, {
      title: data.title,
      description: data.description,
      dueDate: data.dueDate,
      priority: data.priority,
      status: data.status,
    });
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      style={{ backgroundColor: "oklch(0 0 0 / 50%)" }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="task-form-open w-full max-w-md bg-card border border-border rounded-2xl shadow-2xl p-6">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-base font-semibold text-foreground">Editar tarefa</h2>
          <button
            type="button"
            onClick={onClose}
            className="w-7 h-7 flex items-center justify-center rounded-full bg-transparent border-none cursor-pointer text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
          >
            <XIcon size={14} />
          </button>
        </div>
        <div className="mb-4">
          <label className="text-[11px] font-medium text-muted-foreground uppercase tracking-wide mb-1 block">
            Título *
          </label>
          <input
            ref={inputRef}
            value={title}
            onChange={(e) => { setTitle(e.target.value); if (errors.title) setErrors((p) => ({ ...p, title: undefined })); }}
            onKeyDown={(e) => e.key === "Enter" && handleSave()}
            className={cn(
              "w-full bg-transparent border-b text-sm text-foreground pb-2 focus:outline-none transition-colors placeholder:text-muted-foreground/40",
              errors.title ? "border-destructive" : "border-border",
            )}
          />
          {errors.title && <p className="text-[11px] text-destructive mt-1">{errors.title}</p>}
        </div>
        <div className="mb-4">
          <label className="text-[11px] font-medium text-muted-foreground uppercase tracking-wide mb-1 block">
            Descrição
          </label>
          <input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Opcional"
            className="w-full bg-transparent border-b border-border text-sm text-foreground pb-2 focus:outline-none placeholder:text-muted-foreground/40"
          />
        </div>
        <div className="mb-4">
          <label className="text-[11px] font-medium text-muted-foreground uppercase tracking-wide mb-2 block">
            Status
          </label>
          <div className="flex flex-wrap gap-1.5">
            {STATUS_OPTIONS.map((s) => (
              <button
                key={s.value}
                type="button"
                onClick={() => setStatus(s.value as TaskStatus)}
                className={cn(
                  "px-3 py-1 rounded-full text-[11px] font-medium border-none cursor-pointer transition-all",
                  status === s.value
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-muted-foreground hover:bg-muted",
                )}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>
        <div className="mb-4">
          <label className="text-[11px] font-medium text-muted-foreground uppercase tracking-wide mb-2 block">
            Prioridade
          </label>
          <div className="flex gap-1.5">
            {PRIORITIES.map((p) => (
              <button
                key={p.value}
                type="button"
                onClick={() => setPriority(p.value)}
                className={cn(
                  "px-3 py-1 rounded-full text-[11px] font-medium border-none cursor-pointer transition-all",
                  priority === p.value ? "text-white" : "bg-secondary text-muted-foreground hover:bg-muted",
                )}
                style={priority === p.value ? { backgroundColor: p.hex } : undefined}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <label className="text-[11px] font-medium text-muted-foreground uppercase tracking-wide mb-2 block">
            Data de vencimento
          </label>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="px-3 py-1.5 rounded-lg text-[12px] border border-border bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-ring cursor-pointer"
          />
        </div>

        <div className="flex gap-2 justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg text-sm text-muted-foreground bg-secondary hover:bg-muted border-none cursor-pointer transition-colors"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="px-4 py-2 rounded-lg text-sm font-medium bg-primary text-primary-foreground hover:opacity-90 border-none cursor-pointer transition-opacity"
          >
            Salvar
          </button>
        </div>
      </div>
    </div>
  );
}