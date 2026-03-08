import { Checkbox } from "@/private/components/ui/checkbox";
import { Label } from "@/private/components/ui/label";

export function NotificationPreferences() {
  return (
    <div className="space-y-4 pt-4">
      <h3 className="text-[11px] font-bold text-muted-foreground uppercase tracking-[0.2em]">
        Notificações
      </h3>
      <div className="grid gap-3">
        {[
          { id: "email", label: "Notificações por E-mail", desc: "Resumos semanais." },
          { id: "push", label: "Notificações Push", desc: "Alertas em tempo real." }
        ].map((item) => (
          <div key={item.id} className="flex items-center space-x-3 rounded-xl border border-border p-4 bg-card/40 transition-colors hover:bg-card/60">
            <Checkbox id={item.id} className="border-primary data-[state=checked]:bg-primary" />
            <div className="grid gap-1 leading-none">
              <Label htmlFor={item.id} className="text-sm font-medium cursor-pointer">
                {item.label}
              </Label>
              <p className="text-xs text-muted-foreground">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}