import Link from "next/link";

const MOCKUP_LINKS = [
  { name: "公版商品", href: "/modules/products", ready: true },
  { name: "私版報價", href: "/modules/private-quote", ready: true },
  { name: "會員系統", href: "/modules/members", ready: true },
  { name: "訂單系統", href: "/modules/orders", ready: false },
  { name: "金物流", href: "/modules/checkout", ready: false },
];

export function TopNav() {
  return (
    <nav className="sticky top-0 z-40 border-b border-zinc-300 bg-white shadow-sm">
      <div className="mx-auto flex max-w-[1760px] items-center gap-6 px-6 py-3">
        <Link
          href="/"
          className="flex items-center gap-2 text-base font-bold text-zinc-900 hover:text-amber-700"
        >
          <span className="rounded-md bg-amber-700 px-2 py-1 text-xs font-mono text-white">
            HJ
          </span>
          <span>禾啟提案</span>
        </Link>

        <span className="text-zinc-300">|</span>

        <Link
          href="/"
          className="text-sm text-zinc-600 hover:text-zinc-900"
        >
          架構總覽
        </Link>

        <span className="text-zinc-300">|</span>

        <span className="text-xs text-zinc-500">頁面 Mockup：</span>

        <div className="flex flex-wrap items-center gap-2">
          {MOCKUP_LINKS.map((m) =>
            m.ready ? (
              <Link
                key={m.href}
                href={m.href}
                className="rounded-full border border-zinc-400 bg-white px-3 py-1 text-sm text-zinc-700 hover:border-amber-700 hover:bg-amber-50 hover:text-amber-800"
              >
                {m.name}
              </Link>
            ) : (
              <span
                key={m.href}
                className="rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1 text-sm text-zinc-400 cursor-not-allowed"
                title="製作中"
              >
                {m.name}
                <span className="ml-1 text-[10px] opacity-70">（製作中）</span>
              </span>
            ),
          )}
        </div>
      </div>
    </nav>
  );
}
