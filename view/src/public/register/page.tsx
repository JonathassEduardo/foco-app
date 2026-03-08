import { useNavigate } from "react-router-dom";
import { RegisterForm } from "./components/RegisterForm";
import { Button } from "@/private/components/ui/button";

export default function RegisterPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background px-4 transition-colors duration-500">
      <div className="w-full max-w-[400px] space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
        
        <div className="flex flex-col space-y-2 text-center">
          <p className="text-[11px] font-medium tracking-[0.3em] uppercase text-muted-foreground">
            Comece agora
          </p>
          <h1 className="text-5xl font-bold tracking-tight text-foreground">
            Cadastro<span className="text-muted-foreground/40">.</span>
          </h1>
        </div>
        
        <RegisterForm />

        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            Já possui uma conta?{" "}
            <Button 
              variant="link" 
              className="p-0 h-auto font-semibold text-primary hover:text-primary/80 transition-colors"
              onClick={() => navigate("/login")}
            >
              Fazer login
            </Button>
          </p>
        </div>
      </div>
    </div>
  );
}