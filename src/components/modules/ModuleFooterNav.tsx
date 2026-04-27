import Link from "next/link";

export function ModuleFooterNav({
  prev,
  next,
}: {
  prev?: { title: string; href: string };
  next?: { title: string; href: string };
}) {
  return (
    <footer className="bg-zinc-900 px-6 py-12 text-zinc-300">
      <div className="mx-auto max-w-[1760px]">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {prev ? (
            <Link
              href={prev.href}
              className="group flex flex-col rounded-xl border border-zinc-700 bg-zinc-800/50 p-5 transition-colors hover:border-zinc-600 hover:bg-zinc-800"
            >
              <span className="text-xs uppercase tracking-widest text-zinc-500">
                ← 上一個模組
              </span>
              <span className="mt-1 text-lg font-semibold text-white group-hover:text-emerald-400">
                {prev.title}
              </span>
            </Link>
          ) : (
            <div />
          )}

          {next ? (
            <Link
              href={next.href}
              className="group flex flex-col items-end rounded-xl border border-zinc-700 bg-zinc-800/50 p-5 transition-colors hover:border-zinc-600 hover:bg-zinc-800 text-right"
            >
              <span className="text-xs uppercase tracking-widest text-zinc-500">
                下一個模組 →
              </span>
              <span className="mt-1 text-lg font-semibold text-white group-hover:text-emerald-400">
                {next.title}
              </span>
            </Link>
          ) : (
            <div />
          )}
        </div>

        <div className="mt-8 flex justify-center">
          <Link
            href="/"
            className="rounded-full border border-zinc-700 bg-zinc-800/50 px-5 py-2 text-sm text-zinc-400 transition-colors hover:border-zinc-600 hover:text-white"
          >
            ← 返回整體架構
          </Link>
        </div>
      </div>
    </footer>
  );
}
