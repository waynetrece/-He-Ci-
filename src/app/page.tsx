import { ArchitectureOverview } from "@/components/ArchitectureOverview";
import { Hero } from "@/components/Hero";
import { ProjectStatus } from "@/components/ProjectStatus";

export default function Home() {
  return (
    <main className="min-h-dvh bg-zinc-950 text-zinc-100">
      <Hero />
      <ProjectStatus />
      <ArchitectureOverview />
      <footer className="border-t border-zinc-800 py-8 text-center text-xs text-zinc-500">
        提案規劃中 · 2026
      </footer>
    </main>
  );
}
