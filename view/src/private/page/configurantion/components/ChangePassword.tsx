import { Button } from "@/private/components/ui/button";
import { Input } from "@/private/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/private/components/ui/card";
import { Label } from "@/private/components/ui/label";

export function ChangePassword() {
  return (
    <Card className="bg-card border-border shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-[11px] font-semibold text-muted-foreground uppercase tracking-[0.18em]">
          Segurança
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label className="text-xs text-foreground/70">Nova Senha</Label>
          <Input 
            type="password" 
            placeholder="••••••••" 
            className="bg-input border-border"
          />
        </div>
        <Button variant="secondary" className="w-full sm:w-auto border border-border hover:bg-accent">
          Atualizar Senha
        </Button>
      </CardContent>
    </Card>
  );
}