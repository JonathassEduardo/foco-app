interface IconProps {
  size?: number;
  color?: string;
  className?: string;
}

export function CheckCircleIcon({ size = 18, color = "currentColor", className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 18 18" fill="none" className={className}>
      <circle cx="9" cy="9" r="8" stroke={color} strokeWidth="1.5" />
    </svg>
  );
}

export function CheckCircleFilledIcon({ size = 18, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 18 18" fill="none" className={className}>
      <circle cx="9" cy="9" r="8" fill="currentColor" />
      <path d="M5.5 9l2.5 2.5 4.5-4.5" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function TrashIcon({ size = 15, color = "currentColor", className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 15 15" fill="none" className={className}>
      <path d="M5.5 1.5h4M2 4h11M3.5 4l.7 8.5a1 1 0 001 .9h4.6a1 1 0 001-.9L11.5 4" stroke={color} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function EditIcon({ size = 15, color = "currentColor", className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 15 15" fill="none" className={className}>
      <path d="M10.5 2.5l2 2L5 12H3v-2l7.5-7.5z" stroke={color} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function PlusIcon({ size = 18, color = "currentColor", className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 18 18" fill="none" className={className}>
      <path d="M9 4v10M4 9h10" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

export function FilterIcon({ size = 14, color = "currentColor", className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none" className={className}>
      <path d="M1.5 3.5h11M3.5 7h7M5.5 10.5h3" stroke={color} strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}

export function BriefcaseIcon({ size = 13, color = "currentColor", className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 13 13" fill="none" className={className}>
      <rect x="1" y="4" width="11" height="8" rx="1.5" stroke={color} strokeWidth="1.2" />
      <path d="M4.5 4V3a1 1 0 011-1h2a1 1 0 011 1v1" stroke={color} strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

export function LeafIcon({ size = 13, color = "currentColor", className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 13 13" fill="none" className={className}>
      <path d="M2 11c1-4 3.5-7 8-8-1 4-3.5 7-8 8z" stroke={color} strokeWidth="1.2" strokeLinejoin="round" />
      <path d="M2 11l3-3" stroke={color} strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

export function HeartIcon({ size = 13, color = "currentColor", className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 13 13" fill="none" className={className}>
      <path d="M6.5 10.5S1.5 7 1.5 4a2.5 2.5 0 015 0 2.5 2.5 0 015 0c0 3-5 6.5-5 6.5z" stroke={color} strokeWidth="1.2" strokeLinejoin="round" />
    </svg>
  );
}

export function LightbulbIcon({ size = 13, color = "currentColor", className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 13 13" fill="none" className={className}>
      <path d="M6.5 1.5A3 3 0 003.5 4.5c0 1.4.8 2.5 2 3v1h2v-1c1.2-.5 2-1.6 2-3a3 3 0 00-3-3z" stroke={color} strokeWidth="1.2" strokeLinejoin="round" />
      <path d="M5 10.5h3" stroke={color} strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

export function TagIcon({ size = 13, color = "currentColor", className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 13 13" fill="none" className={className}>
      <path d="M1.5 1.5h4l5.5 5.5-4 4L1.5 5.5v-4z" stroke={color} strokeWidth="1.2" strokeLinejoin="round" />
      <circle cx="4" cy="4" r="0.8" fill={color} />
    </svg>
  );
}

export function XIcon({ size = 15, color = "currentColor", className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 15 15" fill="none" className={className}>
      <path d="M3 3l9 9M12 3l-9 9" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}