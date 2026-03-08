import { Header } from "@/private/components/shared/Header";

interface TaskHeaderProps {
  eyebrow?: string;
  title?: string;
  highlight?: string;
}

export function TaskHeader({
  eyebrow = "Seu espaço",
  title = "Foco",
  highlight = "Total.",
}: TaskHeaderProps) {
  return (
    <Header 
      eyebrow={eyebrow} 
      title={title} 
      highlight={highlight}
    >
    </Header>
  );
}