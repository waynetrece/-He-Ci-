import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

function Base({ size = 20, children, ...rest }: IconProps & { children: React.ReactNode }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...rest}
    >
      {children}
    </svg>
  );
}

export function IconBox(p: IconProps) {
  return (
    <Base {...p}>
      <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
      <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
      <line x1="12" y1="22.08" x2="12" y2="12" />
    </Base>
  );
}

export function IconCup(p: IconProps) {
  return (
    <Base {...p}>
      <path d="M5 8h14l-1.5 12a2 2 0 0 1-2 2h-7a2 2 0 0 1-2-2Z" />
      <path d="M5 8V6a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v2" />
    </Base>
  );
}

export function IconStraw(p: IconProps) {
  return (
    <Base {...p}>
      <path d="M9 3l-2 18a2 2 0 0 0 4 0l-2-18Z" />
      <line x1="14" y1="6" x2="20" y2="6" />
      <line x1="14" y1="11" x2="18" y2="11" />
    </Base>
  );
}

export function IconUtensils(p: IconProps) {
  return (
    <Base {...p}>
      <path d="M3 2v7c0 1.1.9 2 2 2h0a2 2 0 0 0 2-2V2" />
      <path d="M5 2v20" />
      <path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Z" />
      <path d="M21 22V15" />
    </Base>
  );
}

export function IconBag(p: IconProps) {
  return (
    <Base {...p}>
      <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </Base>
  );
}

export function IconPalette(p: IconProps) {
  return (
    <Base {...p}>
      <circle cx="13.5" cy="6.5" r=".5" />
      <circle cx="17.5" cy="10.5" r=".5" />
      <circle cx="8.5" cy="7.5" r=".5" />
      <circle cx="6.5" cy="12.5" r=".5" />
      <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z" />
    </Base>
  );
}

export function IconCheck(p: IconProps) {
  return (
    <Base {...p}>
      <polyline points="20 6 9 17 4 12" />
    </Base>
  );
}

export function IconTruck(p: IconProps) {
  return (
    <Base {...p}>
      <rect x="1" y="3" width="15" height="13" />
      <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
      <circle cx="5.5" cy="18.5" r="2.5" />
      <circle cx="18.5" cy="18.5" r="2.5" />
    </Base>
  );
}

export function IconPhone(p: IconProps) {
  return (
    <Base {...p}>
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </Base>
  );
}

export function IconLeaf(p: IconProps) {
  return (
    <Base {...p}>
      <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19.2 2.96c1 6.63-1.4 14.04-7.2 14.04-1.1 0-2-.45-2-1.5" />
      <path d="M2 21c0-3 1.85-5.36 5.08-6" />
    </Base>
  );
}

export function IconTarget(p: IconProps) {
  return (
    <Base {...p}>
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </Base>
  );
}

export function IconHandshake(p: IconProps) {
  return (
    <Base {...p}>
      <path d="M11 17l2 2a1 1 0 0 0 3 0c0-.5-.2-.9-.5-1.2L19 14" />
      <path d="M14 12.5l3.5-3.5a2.83 2.83 0 0 0-4-4l-3.5 3.5" />
      <path d="M9 14l3-3a2.83 2.83 0 1 0-4-4L4.4 10.6" />
      <path d="M9 14a2.83 2.83 0 0 1-4 0L3 12" />
    </Base>
  );
}

export function IconMail(p: IconProps) {
  return (
    <Base {...p}>
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </Base>
  );
}

export function IconHeart(p: IconProps) {
  return (
    <Base {...p}>
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </Base>
  );
}

export function IconChevronRight(p: IconProps) {
  return (
    <Base {...p}>
      <polyline points="9 18 15 12 9 6" />
    </Base>
  );
}

export function IconChevronDown(p: IconProps) {
  return (
    <Base {...p}>
      <polyline points="6 9 12 15 18 9" />
    </Base>
  );
}

export function IconArrowRight(p: IconProps) {
  return (
    <Base {...p}>
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </Base>
  );
}

export function IconCircleDot(p: IconProps) {
  return (
    <Base {...p}>
      <circle cx="12" cy="12" r="3" fill="currentColor" />
    </Base>
  );
}

export function IconShield(p: IconProps) {
  return (
    <Base {...p}>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </Base>
  );
}

export function IconStar(p: IconProps) {
  return (
    <Base {...p}>
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </Base>
  );
}

export function IconLayers(p: IconProps) {
  return (
    <Base {...p}>
      <polygon points="12 2 2 7 12 12 22 7 12 2" />
      <polyline points="2 17 12 22 22 17" />
      <polyline points="2 12 12 17 22 12" />
    </Base>
  );
}
