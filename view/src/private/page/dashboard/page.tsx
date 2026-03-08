import { CheckCircle2, Clock, Loader2, ListTodo } from "lucide-react";
import { Header } from "@/private/components/shared/Header";
import { useTasks } from "@/private/hooks/useTasks";
import { OverdueAlert } from "./components/OverdueAlert";
import { useDashboardStats } from "@/private/hooks/useDashboardStats";
import { StatCard } from "@/private/components/shared/Statcard";
import { DashboardCharts } from "./components/Dashboardcharts";

export default function DashboardPage() {
  const { filteredTasks: tasks, loading } = useTasks();
  const stats = useDashboardStats(tasks);

  if (loading) {
    return (
      <div className="flex h-full min-h-[400px] items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      <Header eyebrow="Visão geral" title="Dashboard" highlight="Suas tarefas." />

      <OverdueAlert count={stats.overdue} />

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatCard
          label="Total de tarefas"
          value={stats.total}
          icon={<ListTodo className="h-4 w-4" style={{ color: "#8b5cf6" }} />}
          color="#8b5cf6"
        />
        <StatCard
          label="Pendentes"
          value={stats.pending}
          icon={<Clock className="h-4 w-4" style={{ color: "#f59e0b" }} />}
          color="#f59e0b"
        />
        <StatCard
          label="Em andamento"
          value={stats.inProgress}
          icon={<Loader2 className="h-4 w-4" style={{ color: "#3b82f6" }} />}
          color="#3b82f6"
        />
        <StatCard
          label="Concluídas"
          value={stats.done}
          icon={<CheckCircle2 className="h-4 w-4" style={{ color: "#10b981" }} />}
          color="#10b981"
        />
      </div>

      <DashboardCharts
        statusData={stats.statusData}
        priorityData={stats.priorityData}
        total={stats.total}
      />
    </div>
  );
}