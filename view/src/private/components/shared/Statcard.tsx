import { Card, CardContent } from "@/private/components/ui/card";

interface StatCardProps {
  label: string;
  value: number;
  icon: React.ReactNode;
  color: string;
}

export function StatCard({ label, value, icon, color }: StatCardProps) {
  return (
    <Card className="border-border bg-card overflow-hidden">
      <CardContent className="p-5">
        <div className="flex items-center justify-between mb-3">
          <div className="rounded-lg p-2" style={{ backgroundColor: `${color}20` }}>
            {icon}
          </div>
          <div className="h-1.5 w-8 rounded-full" style={{ backgroundColor: color }} />
        </div>
        <p className="text-3xl font-bold tracking-tight">{value}</p>
        <p className="text-xs text-muted-foreground mt-1">{label}</p>
      </CardContent>
    </Card>
  );
}