import { THEME_IDS } from "@/private/config/themes";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ReactNode } from "react";


export function ThemeProvider({ children }: { children: ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange={false}
      themes={THEME_IDS}
    >
      {children}
    </NextThemesProvider>
  );
}