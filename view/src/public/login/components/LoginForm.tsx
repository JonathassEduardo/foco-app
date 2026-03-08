import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { z } from "zod";
import { toast } from "sonner";
import { Button } from "@/private/components/ui/button";
import { Input } from "@/private/components/ui/input";
import { Label } from "@/private/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/private/components/ui/card";
import { useAuth } from "@/private/hooks/useAuth";


const loginSchema = z.object({
  email: z.string().min(1, "E-mail é obrigatório.").email("E-mail inválido."),
  password: z.string().min(1, "Senha é obrigatória."),
});

type FieldErrors = Partial<Record<"email" | "password", string>>;

export function LoginForm() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<FieldErrors>({});

  const validate = (): boolean => {
    const result = loginSchema.safeParse({ email, password });
    if (!result.success) {
      const errs: FieldErrors = {};
      for (const issue of result.error.issues) {
        const f = issue.path[0] as keyof FieldErrors;
        if (!errs[f]) errs[f] = issue.message;
      }
      setErrors(errs);
      return false;
    }
    setErrors({});
    return true;
  };

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!validate()) return;

    setIsLoading(true);
    try {
      await login({ email, password });
      navigate("/tasks");
    } catch (err: any) {
      const msg = err?.response?.data?.message ?? "E-mail ou senha incorretos.";
      toast.error(msg);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Card className="border-border bg-card shadow-lg animate-in fade-in zoom-in-95 duration-500">
      <CardHeader className="space-y-1 text-center">
        <CardTitle className="text-2xl font-bold tracking-tight">Entrar</CardTitle>
        <CardDescription className="text-muted-foreground">
          Digite seu e-mail para acessar sua conta
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit} className="space-y-4">
          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email">E-mail</Label>
            <Input
              id="email"
              type="email"
              placeholder="nome@exemplo.com"
              value={email}
              onChange={(e) => { setEmail(e.target.value); if (errors.email) setErrors(p => ({ ...p, email: undefined })); }}
              className={`bg-input border-border ${errors.email ? "border-destructive" : ""}`}
            />
            {errors.email && <p className="text-[11px] text-destructive">{errors.email}</p>}
          </div>

          {/* Password */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Senha</Label>
              <button type="button" className="text-xs text-muted-foreground hover:text-primary transition-colors">
                Esqueceu a senha?
              </button>
            </div>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => { setPassword(e.target.value); if (errors.password) setErrors(p => ({ ...p, password: undefined })); }}
                className={`bg-input border-border pr-10 ${errors.password ? "border-destructive" : ""}`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            {errors.password && <p className="text-[11px] text-destructive">{errors.password}</p>}
          </div>

          <Button type="submit" className="w-full bg-primary text-primary-foreground" disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Acessar Sistema
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}