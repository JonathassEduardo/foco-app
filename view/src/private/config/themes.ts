import { Terminal, Code, Snowflake, type LucideIcon, Skull, SunMedium, MoonStar } from "lucide-react";

export interface ThemeConfig {
  id: string;
  label: string;
  icon: LucideIcon;
  color?: string;
}

export const APP_THEMES: ThemeConfig[] = [
  { id: "light",label: "Claro",icon: SunMedium,color: "text-amber-500"  },
  { id: "dark",label: "Escuro",icon: MoonStar,color: "text-blue-400"},
  { id: "dracula", label: "Dracula", icon: Terminal, color: "text-purple-400" },
  { id: "sublime", label: "Sublime", icon: Code, color: "text-yellow-400" },
  { id: "nord", label: "Nord", icon: Snowflake, color: "text-blue-300" },
  { id: "metal", label: "Metal", icon: Skull, color: "text-red-500" },
];

export const THEME_IDS = APP_THEMES.map(t => t.id);