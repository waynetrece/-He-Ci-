import Link from "next/link";
import type { ReactNode } from "react";

export function ModuleHero({
  no,
  title,
  subtitle,
  desc,
  tone = "amber",
  right,
}: {
  no: string;
  title: string;
  subtitle?: string;
  desc?: string;
  tone?: "amber" | "indigo" | "emerald" | "violet" | "rose";
  stats?: { label: string; value: string }[];
  right?: ReactNode;
}) {
  const TONE = {
    amber: { border: "border-amber-500", bg: "bg-amber-50/60", title: "text-amber-900", accent: "text-amber-700" },
    indigo: { border: "border-indigo-500", bg: "bg-indigo-50/60", title: "text-indigo-900", accent: "text-indigo-700" },
    emerald: { border: "border-emerald-500", bg: "bg-emerald-50/60", title: "text-emerald-900", accent: "text-emerald-700" },
    violet: { border: "border-violet-500", bg: "bg-violet-50/60", title: "text-violet-900", accent: "text-violet-700" },
    rose: { border: "border-rose-500", bg: "bg-rose-50/60", title: "text-rose-900", accent: "text-rose-700" },
  }[tone];

  return (
    <header className={`border-b ${TONE.border} ${TONE.bg} px-6 py-4`}>
      <div className="mx-auto flex max-w-[1760px] flex-wrap items-center gap-x-6 gap-y-3">
        {/* Left: breadcrumb + module no + title */}
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
          <nav className="flex items-center gap-2 text-sm text-zinc-500">
            <Link href="/" className="hover:text-zinc-900">
              首頁
            </Link>
            <span>/</span>
            <span>模組規劃</span>
          </nav>
          <span className="text-zinc-400">/</span>
          <span
            className={`rounded-md border ${TONE.border} bg-white px-2 py-0.5 font-mono text-xs font-bold ${TONE.accent}`}
          >
            模組 {no}
          </span>
          <h1
            className={`text-xl font-bold tracking-tight sm:text-2xl ${TONE.title}`}
          >
            {title}
          </h1>
          {subtitle && (
            <span className="text-sm text-zinc-600">— {subtitle}</span>
          )}
        </div>

        {/* Right: pluggable content (e.g. mockup tabs) */}
        {right && <div className="ml-auto flex items-center gap-2">{right}</div>}

        {/* Optional desc spans full width */}
        {desc && <p className="basis-full text-sm text-zinc-600">{desc}</p>}
      </div>
    </header>
  );
}
