import { useRef, useState } from "react";
import { z } from "zod";
import { PRIORITIES, type CreateTaskPayload, type Priority } from "@/private/types/task";
import { PlusIcon } from "@/private/components/shared/Icons";
import { PillButton } from "@/private/components/shared/Pillbutton";
import { taskFormSchema } from "@/private/schema/taskFormSchema";
import { cn } from "@/private/lib/utils";

type TaskFormValues = z.infer<typeof taskFormSchema>;
type FieldErrors = Partial<Record<keyof TaskFormValues, string>>;

interface TaskFormProps {
  onAdd: (payload: CreateTaskPayload) => void;
}

export function TaskForm({ onAdd }: TaskFormProps) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState<Priority>("medium");
  const [errors, setErrors] = useState<FieldErrors>({});
  const inputRef = useRef<HTMLInputElement>(null);

  const validate = (): TaskFormValues | null => {
    const result = taskFormSchema.safeParse({
      title,
      description: description || undefined,
      dueDate: dueDate || undefined,
      priority,
    });

    if (!result.success) {
      const fieldErrors: FieldErrors = {};
      for (const issue of result.error.issues) {
        const field = issue.path[0] as keyof TaskFormValues;
        if (!fieldErrors[field]) fieldErrors[field] = issue.message;
      }
      setErrors(fieldErrors);
      return null;
    }

    setErrors({});
    return result.data;
  };

  const handleAdd = () => {
    const data = validate();
    if (!data) return;

    onAdd({
      title: data.title,
      description: data.description,
      dueDate: data.dueDate,
      priority: data.priority,
      status: "pending",
    });

    setTitle("");
    setDescription("");
    setDueDate("");
    setPriority("medium");
    setErrors({});
    setOpen(false);
  };

  const handleCancel = () => {
    setTitle("");
    setDescription("");
    setDueDate("");
    setErrors({});
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
    setTimeout(() => inputRef.current?.focus(), 50);
  };

  if (!open) {
    return (
      <button
        type="button"
        onClick={handleOpen}
        className="flex items-center gap-2 w-full px-5 py-3.5 mb-3 rounded-xl bg-card border border-dashed border-border text-sm text-muted-foreground hover:text-foreground hover:border-foreground/20 transition-colors cursor-pointer"
      >
        <PlusIcon size={16} color="currentColor" />
        Adicionar nova tarefa...
      </button>
    );
  }

  return (
    <div className="task-form-open bg-card border border-primary/50 rounded-xl p-5 mb-3 shadow-sm">
      <div className="mb-3">
        <input
          ref={inputRef}
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            if (errors.title) setErrors((p) => ({ ...p, title: undefined }));
          }}
          onKeyDown={(e) => e.key === "Enter" && handleAdd()}
          placeholder="Título da tarefa *"
          className={cn(
            "w-full bg-transparent border-b text-[15px] text-foreground placeholder:text-muted-foreground/50 pb-2 focus:outline-none transition-colors",
            errors.title ? "border-destructive" : "border-border",
          )}
        />
        {errors.title && (
          <p className="text-[11px] text-destructive mt-1">{errors.title}</p>
        )}
      </div>

      <div className="mb-4">
        <input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Descrição (opcional)"
          className="w-full bg-transparent border-b border-border text-sm text-foreground placeholder:text-muted-foreground/40 pb-2 focus:outline-none"
        />
      </div>

      <div className="flex flex-wrap items-start gap-2">
        <div className="flex gap-1">
          {PRIORITIES.map((p) => (
            <button
              key={p.value}
              type="button"
              onClick={() => setPriority(p.value)}
              className={cn(
                "px-2.5 py-1 rounded-full text-[11px] font-medium border-none cursor-pointer transition-all",
                priority === p.value ? "text-white" : "bg-secondary text-muted-foreground hover:bg-muted",
              )}
              style={priority === p.value ? { backgroundColor: p.hex } : undefined}
            >
              {p.label}
            </button>
          ))}
        </div>

        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="px-3 py-1 rounded-full text-[11px] border border-border bg-card text-foreground cursor-pointer focus:outline-none focus:ring-2 focus:ring-ring"
        />

        <div className="flex-1" />

        <div className="flex gap-2">
          <PillButton onClick={handleCancel}>Cancelar</PillButton>
          <PillButton active onClick={handleAdd}>Adicionar</PillButton>
        </div>
      </div>
    </div>
  );
}