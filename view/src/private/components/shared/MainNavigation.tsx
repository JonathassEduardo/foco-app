import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@/private/components/ui/menubar";
import { useTheme } from "next-themes";
import { LayoutDashboard, User, Sun, Moon, Monitor, Settings, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { APP_THEMES } from "@/private/config/themes";
import { useAuth } from "@/private/hooks/useAuth";

export function MainNavigation() {
  const { setTheme } = useTheme();
  const navigate = useNavigate();
  const { logout } = useAuth();

    const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <Menubar className="border-none bg-transparent px-0 shadow-none">
      {/* Dashboard */}
      <MenubarMenu>
        <MenubarTrigger className="cursor-pointer">
          <LayoutDashboard className="w-4 h-4 mr-2" />
          Dashboard
        </MenubarTrigger>
        <MenubarContent>
          {/* Navega para a rota de tarefas */}
          <MenubarItem onClick={() => navigate("/tasks")}>
            Visão Geral <MenubarShortcut>⌘H</MenubarShortcut>
          </MenubarItem>
          <MenubarItem>Estatísticas</MenubarItem>
          <MenubarSeparator />
          <MenubarItem>Exportar Dados</MenubarItem>
        </MenubarContent>
      </MenubarMenu>

      {/* Perfil */}
      <MenubarMenu>
        <MenubarTrigger className="cursor-pointer">
          <User className="w-4 h-4 mr-2" />
          Perfil
        </MenubarTrigger>
        <MenubarContent>
          {/* Navega para a sua ConfigurationPage */}
          <MenubarItem onClick={() => navigate("/configuration")}>
            <Settings className="w-4 h-4 mr-2" /> Configurações
          </MenubarItem>
          <MenubarSeparator />
         <MenubarItem className="text-destructive" onClick={handleLogout}>
          <LogOut className="w-4 h-4 mr-2" /> Sair
        </MenubarItem>
        </MenubarContent>
      </MenubarMenu>

      {/* Aparência (Sem navegação de rota, apenas troca de estado do tema) */}
      <MenubarMenu>
        <MenubarTrigger className="cursor-pointer">Aparência</MenubarTrigger>
        <MenubarContent>
          <MenubarSub>
            <MenubarSubTrigger>Tema</MenubarSubTrigger>
            <MenubarSubContent>
              {APP_THEMES.map((theme) => (
                <MenubarItem 
                  key={theme.id} 
                  onClick={() => setTheme(theme.id)}
                >
                  <theme.icon className={`w-4 h-4 mr-2 ${theme.color || ""}`} />
                  {theme.label}
                </MenubarItem>
              ))}
            </MenubarSubContent>
          </MenubarSub>
          
          <MenubarSeparator />
          <MenubarItem disabled>Personalizar...</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
}