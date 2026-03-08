import {
  PieChart, Pie, Cell,
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
} from "recharts";
import { ListTodo } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/private/components/ui/card";

interface StatusItem { name: string; value: number; color: string }
interface PriorityItem { name: string; value: number; fill: string }

interface DashboardChartsProps {
  statusData: StatusItem[];
  priorityData: PriorityItem[];
  total: number;
}

function CustomTooltip({ active, payload }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg border border-border bg-card px-3 py-2 text-sm shadow-lg">
      <p className="font-medium text-foreground">{payload[0].name}</p>
      <p className="text-muted-foreground">{payload[0].value} tarefa(s)</p>
    </div>
  );
}

export function DashboardCharts({ statusData, priorityData, total }: DashboardChartsProps) {
  if (total === 0) {
    return (
      <Card className="border-border bg-card">
        <CardContent className="flex flex-col items-center justify-center py-20 text-muted-foreground gap-3">
          <ListTodo className="h-10 w-10 opacity-30" />
          <p className="text-sm">Nenhuma tarefa para exibir nos gráficos.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {/* Pizza — status */}
      <Card className="border-border bg-card">
        <CardHeader className="pb-0">
          <CardTitle className="text-sm font-medium">Por status</CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={statusData}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={80}
                paddingAngle={4}
                dataKey="value"
                stroke="none"
              >
                {statusData.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex flex-wrap justify-center gap-x-5 gap-y-2 mt-2">
            {statusData.map((d) => (
              <div key={d.name} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <span className="h-2 w-2 rounded-full" style={{ background: d.color }} />
                {d.name}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Barras — prioridade */}
      <Card className="border-border bg-card">
        <CardHeader className="pb-0">
          <CardTitle className="text-sm font-medium">Por prioridade</CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={priorityData} barSize={36} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: "currentColor", opacity: 0.5 }}
              />
              <YAxis
                allowDecimals={false}
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 11, fill: "currentColor", opacity: 0.5 }}
              />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(255,255,255,0.05)" }} />
              <Bar dataKey="value" name="Tarefas" radius={[6, 6, 0, 0]}>
                {priorityData.map((entry, i) => (
                  <Cell key={i} fill={entry.fill} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          <div className="flex justify-center gap-5 mt-2">
            {priorityData.map((d) => (
              <div key={d.name} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <span className="h-2 w-2 rounded-full" style={{ background: d.fill }} />
                {d.name}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}