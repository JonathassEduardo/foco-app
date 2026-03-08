
import { TaskHeader } from "./components/Taskheader";
import { ProgressBar } from "@/private/components/shared/Progressbar";
import { TaskFilterBar } from "./components/Taskfilterbar";
import { TaskList } from "./components/Tasklist";
import { TaskFooter } from "./components/Taskfooter";
import { TaskForm } from "./components/Taskform";
import { useTasks } from "@/private/hooks/useTasks";


export default function TaskPage() {
  const {
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
  } = useTasks();

  return (
    <div className="min-h-screen bg-background flex items-start justify-center px-6 py-12">
      <div className="w-full max-w-xl">
        <TaskHeader />

        <ProgressBar
          value={stats.percent}
          label={`${stats.done} de ${stats.total} concluídas`}
        />

        <TaskFilterBar
          statusFilter={statusFilter}
          onStatusChange={setStatusFilter}
        />

        <TaskForm onAdd={addTask} />

        <TaskList
          tasks={filteredTasks}
          loading={loading}
          getPriorityConfig={getPriorityConfig}
          onToggle={toggleTask}
          onRemove={removeTask}
          onEdit={editTask}
        />

        {stats.total > 0 && (
          <TaskFooter
            remaining={stats.remaining}
            onClearCompleted={clearCompleted}
          />
        )}
      </div>
    </div>
  );
}