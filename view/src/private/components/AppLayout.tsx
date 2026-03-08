import { Outlet } from "react-router-dom";
import { MainNavigation } from "./shared/MainNavigation";

export function AppLayout() {
  return (
    <div className="min-h-screen bg-background flex items-start justify-center px-6 py-12">
      <div className="w-full max-w-xl relative">
        {/* Menu posicionado de forma absoluta para alinhar com o topo do título das páginas */}
        <div className="absolute right-0 top-6 z-50">
          <MainNavigation />
        </div>

        {/* Aqui entram as páginas (que contêm o TaskHeader) */}
        <div className="space-y-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
}