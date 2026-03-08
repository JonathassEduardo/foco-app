interface TaskFooterProps {
  remaining: number;
  onClearCompleted: () => void;
}

export function TaskFooter({ remaining, onClearCompleted }: TaskFooterProps) {
  return (
    <div className="flex items-center justify-between mt-4 px-1">
      <span className="text-xs text-muted-foreground/50">
        {remaining} {remaining === 1 ? "tarefa restante" : "tarefas restantes"}
      </span>
      <button
        type="button"
        onClick={onClearCompleted}
        className="text-xs text-muted-foreground/50 hover:text-muted-foreground bg-transparent border-none cursor-pointer transition-colors"
      >
        Limpar concluídas
      </button>
    </div>
  );
}