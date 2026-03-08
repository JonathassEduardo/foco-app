
import { type ReactNode } from "react";
import { BriefcaseIcon, HeartIcon, LeafIcon, LightbulbIcon, TagIcon } from "./Icons";

const CATEGORY_ICON_MAP: Record<string, ReactNode> = {
  Work:     <BriefcaseIcon size={12} />,
  Personal: <LeafIcon     size={12} />,
  Health:   <HeartIcon    size={12} />,
  Ideas:    <LightbulbIcon size={12} />,
  Other:    <TagIcon      size={12} />,
};

interface CategoryBadgeProps {
  category: string;
}

export function CategoryBadge({ category }: CategoryBadgeProps) {
  const icon = CATEGORY_ICON_MAP[category] ?? <TagIcon size={12} />;

  return (
    <span className="inline-flex items-center gap-1 text-[11px] leading-none text-muted-foreground">
      <span className="flex items-center text-muted-foreground/60">{icon}</span>
      {category}
    </span>
  );
}