import Link from "next/link";

type Page = {
  no: string;
  label: string;
  href: string;
  desc: string;
  status: "existing" | "new";
};

const A_CMS: Page[] = [
  { no: "F1", label: "消費端首頁", href: "/modules/home", desc: "Banner / 商品入口 / 樣品 + 私版 CTA / 最新消息", status: "new" },
  { no: "F2", label: "關於我們", href: "/modules/about", desc: "品牌故事 / 數字 / 核心價值 / 沿革時間軸", status: "new" },
  { no: "F3", label: "聯絡我們", href: "/modules/contact", desc: "表單 + 公司資訊 + LINE CTA + 地圖", status: "new" },
  { no: "F4", label: "最新消息列表", href: "/modules/news", desc: "卡片 / 分類篩選 / 搜尋 / 分頁", status: "new" },
  { no: "F5", label: "最新消息詳情", href: "/modules/news/1", desc: "文章排版 / 標籤 / 相關推薦 / 分享", status: "new" },
  { no: "F6", label: "常見問題 Q&A", href: "/modules/faq", desc: "Accordion / 4 大分類 / 客服 CTA", status: "new" },
  { no: "F7", label: "政策條款", href: "/modules/policy", desc: "隱私 / 服務條款 / 運送 / 退換貨 4 Tab", status: "new" },
];

const B_PRODUCTS: Page[] = [
  { no: "F8", label: "公版商品列表", href: "/modules/products", desc: "(既有)分類篩選 + 商品卡 + Q1–Q7 已釘", status: "existing" },
  { no: "F9", label: "商品內容頁", href: "/modules/products/detail", desc: "(既有)規格選擇器 + 加購 + Q1/Q2", status: "existing" },
  { no: "F10", label: "樣品申請流程", href: "/modules/products/sample", desc: "(既有)申請 → 審核 → 出樣", status: "existing" },
  { no: "F11", label: "私版商品入口", href: "/modules/private-quote", desc: "(既有)私版報價系統入口", status: "existing" },
  { no: "F12", label: "私版詢價表單", href: "/modules/private-quote/quote-form", desc: "(既有)客製規格 + 上傳檔", status: "existing" },
  { no: "F13", label: "公版商品搜尋結果", href: "/modules/search", desc: "公版商品名稱 / 編號 / 分類 / 規格搜尋", status: "new" },
];

const C_CHECKOUT: Page[] = [
  { no: "F14", label: "購物車", href: "/modules/cart", desc: "(既有)公版+私版分區", status: "existing" },
  { no: "F15", label: "結帳填寫資料", href: "/modules/checkout", desc: "(既有)收件 + 發票 + 配送", status: "existing" },
  { no: "F16", label: "付款方式選擇", href: "/modules/checkout/payment", desc: "信用卡 / 匯款 / 貨到 / 自取(ATM/分期未開放)", status: "new" },
  { no: "F17", label: "付款結果", href: "/modules/checkout/success", desc: "(既有)成功 / 失敗結果頁", status: "existing" },
];

const D_MEMBER: Page[] = [
  { no: "F18", label: "登入 / 註冊", href: "/modules/members/auth", desc: "(既有)Email + LINE 雙通道", status: "existing" },
  { no: "F19", label: "忘記密碼", href: "/modules/members/auth/forgot", desc: "3 步驟 / Email 重設 / LINE 找回", status: "new" },
  { no: "F20", label: "會員儀表板", href: "/modules/members", desc: "(既有)數字總覽 + 快速入口", status: "existing" },
  { no: "F21", label: "訂單列表", href: "/modules/members/orders", desc: "(既有)新訂單 + 凌越歷史 + 再購買", status: "existing" },
  { no: "F22", label: "訂單詳情", href: "/modules/members/orders/order-1", desc: "(既有)狀態 / 物流 / 退款", status: "existing" },
  { no: "F23", label: "詢價單列表", href: "/modules/members/quote-list", desc: "(既有)私版詢價歷史", status: "existing" },
  { no: "F24", label: "樣品申請列表", href: "/modules/members/samples", desc: "(既有)樣品歷史", status: "existing" },
  { no: "F25", label: "個人資料", href: "/modules/members/settings", desc: "(既有)基本資料 + 密碼變更", status: "existing" },
  { no: "F26", label: "收件地址簿", href: "/modules/members/addresses", desc: "多筆地址 + 預設 + 統編", status: "new" },
];

const E_OTHER: Page[] = [
  { no: "F27", label: "物流自動化(暫保留)", href: "/modules/logistics-automation", desc: "(既有)— 待 Wayne 確認是否要留", status: "existing" },
  { no: "F28", label: "物流前台 demo(暫保留)", href: "/modules/logistics-front-demo", desc: "(既有)— 待 Wayne 確認是否要留", status: "existing" },
];

const SECTIONS = [
  { tag: "A", title: "形象 / CMS", color: "amber", pages: A_CMS },
  { tag: "B", title: "商品瀏覽", color: "indigo", pages: B_PRODUCTS },
  { tag: "C", title: "結帳流程", color: "violet", pages: C_CHECKOUT },
  { tag: "D", title: "會員中心", color: "rose", pages: D_MEMBER },
  { tag: "E", title: "其他(待確認)", color: "zinc", pages: E_OTHER },
];

const COLORS = {
  amber: { bg: "bg-amber-50", border: "border-amber-300", title: "text-amber-900", dot: "bg-amber-500" },
  indigo: { bg: "bg-indigo-50", border: "border-indigo-300", title: "text-indigo-900", dot: "bg-indigo-500" },
  violet: { bg: "bg-violet-50", border: "border-violet-300", title: "text-violet-900", dot: "bg-violet-500" },
  rose: { bg: "bg-rose-50", border: "border-rose-300", title: "text-rose-900", dot: "bg-rose-500" },
  zinc: { bg: "bg-zinc-100", border: "border-zinc-300", title: "text-zinc-900", dot: "bg-zinc-500" },
};

export default function PreviewIndexPage() {
  const total = SECTIONS.reduce((sum, s) => sum + s.pages.length, 0);
  const newCount = SECTIONS.flatMap((s) => s.pages).filter((p) => p.status === "new").length;
  const existingCount = total - newCount;
  return (
    <main className="min-h-dvh bg-zinc-50 px-6 py-12">
      <div className="mx-auto max-w-6xl">
        <header className="mb-10">
          <Link href="/" className="text-xs text-zinc-500 hover:text-zinc-900">
            ← 返回提案首頁
          </Link>
          <h1 className="mt-3 text-4xl font-bold tracking-tight text-zinc-900">
            前台 Mockup 全頁索引
          </h1>
          <p className="mt-3 text-base text-zinc-600">
            前台 mockup 共 <span className="font-bold text-amber-700">{total} 頁</span>
            (新建 {newCount} 頁 · 既有 {existingCount} 頁)。請逐頁點開核對畫面與內容是否符合需求。
          </p>
          <div className="mt-4 flex gap-3 text-xs">
            <span className="inline-flex items-center gap-2 rounded-full border border-amber-300 bg-amber-50 px-3 py-1">
              <span className="size-2 rounded-full bg-amber-500" /> 新建
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-zinc-300 bg-white px-3 py-1">
              <span className="size-2 rounded-full bg-zinc-400" /> 既有(已存在的 mockup)
            </span>
          </div>
        </header>

        <div className="space-y-10">
          {SECTIONS.map((s) => {
            const c = COLORS[s.color as keyof typeof COLORS];
            return (
              <section key={s.tag}>
                <div className="mb-4 flex items-baseline gap-3">
                  <span className={`rounded-md px-3 py-1 font-mono text-xs font-bold ${c.bg} ${c.title}`}>
                    區塊 {s.tag}
                  </span>
                  <h2 className={`text-2xl font-bold tracking-tight ${c.title}`}>
                    {s.title}
                  </h2>
                  <span className="text-sm text-zinc-500">{s.pages.length} 頁</span>
                </div>
                <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
                  {s.pages.map((p) => (
                    <Link
                      key={p.no}
                      href={p.href}
                      className={`group relative block rounded-xl border-2 ${c.border} ${c.bg} p-5 transition-all hover:-translate-y-0.5 hover:shadow-md`}
                    >
                      <div className="flex items-baseline justify-between">
                        <span className="font-mono text-xs font-bold text-zinc-500">{p.no}</span>
                        <span
                          className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${
                            p.status === "new"
                              ? "bg-amber-500 text-white"
                              : "bg-zinc-200 text-zinc-700"
                          }`}
                        >
                          {p.status === "new" ? "新建" : "既有"}
                        </span>
                      </div>
                      <div className={`mt-2 text-base font-bold ${c.title}`}>{p.label}</div>
                      <div className="mt-1.5 text-xs leading-relaxed text-zinc-600">{p.desc}</div>
                      <div className="mt-3 font-mono text-[10px] text-zinc-400">{p.href}</div>
                      <div className={`absolute bottom-3 right-4 text-xs ${c.title} opacity-0 group-hover:opacity-100`}>
                        →
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            );
          })}
        </div>

        <footer className="mt-16 rounded-xl border-2 border-amber-300 bg-amber-50 p-6">
          <h3 className="text-lg font-bold text-amber-900">核對備註</h3>
          <ul className="mt-3 space-y-1.5 text-sm text-amber-800">
            <li>• 既有 16 頁含 Q&A 對照表(32 題 review 之前釘的問題,不需 HJ 再回答)</li>
            <li>• 新建 11 頁不含 Q&A,純 mockup 展示</li>
            <li>• 物流 2 頁(F28/F29)不在原報價,待 Wayne 確認去留</li>
            <li>• 報價單原寫 25 頁,實列 27 頁 → 需要把報價單調整成 27 頁(寧可多不少)</li>
          </ul>
        </footer>
      </div>
    </main>
  );
}
