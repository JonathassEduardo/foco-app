import { Button } from "@/private/components/ui/button";
import { Input } from "@/private/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/private/components/ui/card";

export function ChangeNameEmail() {
  return (
    <Card className="bg-card border-border shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-[11px] font-semibold text-muted-foreground uppercase tracking-[0.18em]">
          Email
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Input 
          type="text" 
          placeholder="Seu email" 
          className="bg-input border-border focus-visible:ring-ring"
        />
        <Button className="w-full sm:w-auto bg-primary text-primary-foreground hover:opacity-90 transition-opacity">
          Salvar Alterações
        </Button>
      </CardContent>
    </Card>
  );
}