import { FilterIcon } from "@/private/components/shared/Icons";
import { PillButton } from "@/private/components/shared/Pillbutton";
import { STATUS_FILTERS, type StatusFilter } from "@/private/types/task";

interface TaskFilterBarProps {
  statusFilter: StatusFilter;
  onStatusChange: (v: StatusFilter) => void;
}

export function TaskFilterBar({ statusFilter, onStatusChange }: TaskFilterBarProps) {
  return (
    <div className="flex flex-wrap items-center gap-2 mb-4">
      <FilterIcon className="text-muted-foreground shrink-0" />
      {STATUS_FILTERS.map((f) => (
        <PillButton
          key={f.value}
          active={statusFilter === f.value}
          onClick={() => onStatusChange(f.value)}
        >
          {f.label}
        </PillButton>
      ))}
    </div>
  );
}