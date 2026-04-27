function SearchIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.35-4.35" />
    </svg>
  );
}

function CartIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <circle cx="9" cy="21" r="1" />
      <circle cx="20" cy="21" r="1" />
      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
    </svg>
  );
}

function UserIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

function MonitorIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
      <line x1="8" y1="21" x2="16" y2="21" />
      <line x1="12" y1="17" x2="12" y2="21" />
    </svg>
  );
}

export function MockupShell({
  url,
  children,
}: {
  url?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="overflow-hidden rounded-2xl border-2 border-zinc-400 bg-white shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)]">
      {/* 預覽框上方的 label bar — 讓客戶清楚這是「新網站的實際畫面」 */}
      <div className="flex items-center gap-2 border-b-2 border-zinc-400 bg-zinc-900 px-4 py-2 text-xs text-zinc-300">
        <span className="flex items-center gap-1.5 text-amber-300">
          <MonitorIcon />
          <span className="font-mono uppercase tracking-widest">
            Live Preview
          </span>
        </span>
        <span className="text-zinc-500">／</span>
        <span className="text-zinc-300">新網站客戶端實際畫面（非提案介面）</span>
        {url && (
          <span className="ml-auto truncate font-mono text-zinc-500">
            {url}
          </span>
        )}
      </div>

      {/* 實際 mockup 內容 */}
      <div className="bg-white">{children}</div>
    </div>
  );
}

export function MockupSiteHeader() {
  return (
    <header className="border-b border-zinc-200 bg-white">
      {/* Top utility bar */}
      <div className="border-b border-zinc-100 bg-zinc-50/60 px-6 py-1.5">
        <div className="mx-auto flex max-w-[1760px] items-center justify-between text-xs text-zinc-500">
          <span>歡迎來到禾啟｜全台滿 NT$ 3,000 免運</span>
          <div className="flex items-center gap-4">
            <span>常見問題</span>
            <span>聯絡我們</span>
            <span className="border-l border-zinc-300 pl-4">中文 | English</span>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="mx-auto flex max-w-[1760px] items-center gap-6 px-6 py-5">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="size-9 rounded bg-zinc-900" />
          <div>
            <div className="text-base font-bold leading-tight text-zinc-900">
              禾啟 HJ
            </div>
            <div className="text-[10px] leading-tight text-zinc-500">
              餐飲包材專家
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="flex flex-1 items-center gap-2 rounded-md border border-zinc-300 bg-white px-3 py-2">
          <span className="text-zinc-400">
            <SearchIcon />
          </span>
          <input
            type="text"
            placeholder="搜尋商品名稱、規格、商品編號…"
            className="flex-1 bg-transparent text-sm placeholder:text-zinc-400 focus:outline-none"
            readOnly
          />
        </div>

        {/* Right side */}
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-1.5 rounded-md border border-zinc-200 bg-white px-3 py-2 text-xs text-zinc-700 hover:bg-zinc-50">
            <CartIcon />
            <span>購物車</span>
            <span className="rounded-full bg-zinc-900 px-1.5 text-[10px] text-white">
              0
            </span>
          </button>
          <button className="flex items-center gap-1.5 rounded-md bg-zinc-900 px-3 py-2 text-xs text-white">
            <UserIcon />
            <span>登入 / 註冊</span>
          </button>
        </div>
      </div>

      {/* Main nav */}
      <nav className="border-t border-zinc-100">
        <div className="mx-auto flex max-w-[1760px] items-center gap-7 px-6">
          {[
            { label: "首頁" },
            { label: "關於我們" },
            { label: "公版商品", active: true },
            { label: "私版商品" },
            { label: "作品集" },
            { label: "設計服務" },
            { label: "行銷動態" },
            { label: "聯絡我們" },
          ].map((n) => (
            <a
              key={n.label}
              className={`relative py-3 text-sm transition-colors ${
                n.active
                  ? "font-bold text-zinc-900"
                  : "text-zinc-600 hover:text-zinc-900"
              }`}
            >
              {n.label}
              {n.active && (
                <span className="absolute -bottom-px left-0 right-0 h-0.5 bg-zinc-900" />
              )}
            </a>
          ))}
        </div>
      </nav>
    </header>
  );
}

export function MockupSiteFooter() {
  return (
    <footer className="border-t border-zinc-200 bg-zinc-50 px-6 py-10">
      <div className="mx-auto grid max-w-[1760px] grid-cols-4 gap-8 text-xs text-zinc-600">
        <div>
          <div className="mb-3 text-sm font-bold text-zinc-900">禾啟 HJ</div>
          <div className="leading-relaxed">
            新北市五股區五權路 10 號
            <br />
            02-2299-3456
            <br />
            Lkphouse@yahoo.com.tw
            <br />
            周一至周五 08:00 - 17:00
          </div>
        </div>
        <div>
          <div className="mb-3 text-sm font-bold text-zinc-900">顧客服務</div>
          <ul className="space-y-1.5">
            <li>常見問題</li>
            <li>購物須知</li>
            <li>樣品申請</li>
            <li>運送與退換貨</li>
          </ul>
        </div>
        <div>
          <div className="mb-3 text-sm font-bold text-zinc-900">關於我們</div>
          <ul className="space-y-1.5">
            <li>品牌故事</li>
            <li>聯絡資訊</li>
            <li>人才招募</li>
            <li>企劃提案</li>
          </ul>
        </div>
        <div>
          <div className="mb-3 text-sm font-bold text-zinc-900">追蹤我們</div>
          <ul className="space-y-1.5">
            <li>Facebook</li>
            <li>Instagram</li>
            <li>LINE@ @hjhjtw</li>
          </ul>
          <div className="mt-4 text-[10px] text-zinc-400">
            © 2026 禾啟股份有限公司
          </div>
        </div>
      </div>
    </footer>
  );
}
