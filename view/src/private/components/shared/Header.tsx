// src/private/components/shared/Header.tsx
import { ReactNode } from "react";

interface HeaderProps {
  eyebrow: string;      // Agora são obrigatórios para evitar textos "mágicos"
  title: string;
  highlight: string;
  children?: ReactNode;
}

export function Header({
  eyebrow,
  title,
  highlight,
  children,
}: HeaderProps) {
  return (
    <div className="flex flex-col mb-10 gap-4 w-full animate-in fade-in duration-500">
      <div className="flex items-start justify-between w-full">
        <div className="flex-1">
          <p className="text-[11px] font-medium tracking-[0.2em] uppercase text-muted-foreground mb-2">
            {eyebrow}
          </p>
          <h1 className="text-5xl font-bold tracking-tight leading-[1.1] text-foreground m-0">
            {title}
            <br />
            <span className="text-muted-foreground/60">{highlight}</span>
          </h1>
        </div>
        {children && (
          <div className="mt-6 shrink-0">
            {children}
          </div>
        )}
      </div>
    </div>
  );
}