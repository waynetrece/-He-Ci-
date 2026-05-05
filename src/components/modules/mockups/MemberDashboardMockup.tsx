"use client";

import Link from "next/link";
import {
  MockupShell,
  MockupSiteFooter,
  MockupSiteHeader,
} from "../MockupShell";

// 32 題 review 已決議事項(直接反映在 mockup 上,本頁無待確認問題):
// - 會員 4 等級 = 北部直客 / 北部盤商 / 中南部直客 / 中南部盤商(由業務指派 — C 包)
// - 不分「個人 / 企業」分流(統一一個流程,等級由業務後台指派)
// - 凌越客編綁定 = 內部處理,等簽約後對齊(Q-C1 / Q-C2),不直接對會員顯示
// - 註冊後業務 1 個工作天聯繫設定等級,設定前可瀏覽公版、申請樣品
//
// 已 deprecated 概念(原 mockup 有,review 不採用):
// - 個人會員 / 企業客戶 切換(原 demo toggle)
// - VIP 銀級 / 合作客戶 A 級(舊命名)
// - ERP 客戶編號對會員顯示(改為內部處理)

/* ============== Icons ============== */

function PackageIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16.5 9.4l-9-5.19M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
      <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
      <line x1="12" y1="22.08" x2="12" y2="12" />
    </svg>
  );
}

function FileTextIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <polyline points="10 9 9 9 8 9" />
    </svg>
  );
}

function GiftIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 12 20 22 4 22 4 12" />
      <rect x="2" y="7" width="20" height="5" />
      <line x1="12" y1="22" x2="12" y2="7" />
      <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" />
      <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
    </svg>
  );
}

function SettingsIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  );
}

function CrownIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 6l4 6 5-4-2 9H5L3 8l5 4 4-6z" />
    </svg>
  );
}

function ChevronRight() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="9 18 15 12 9 6" />
    </svg>
  );
}

function LogOutIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" y1="12" x2="9" y2="12" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function MessageIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  );
}

/* ============== Component ============== */

export function MemberDashboardMockup({
  annotations: _annotations,
  pageId: _pageId,
}: {
  annotations?: boolean;
  pageId?: string;
}) {
  // 統一一個流程 — 4 等級由業務後台指派,demo 用「北部直客」當示意
  const profile = {
    name: "陳先生",
    company: "禾啟餐飲",
    tier: "北部直客",
    tierColor: "bg-amber-600",
    salesContact: {
      name: "王業務",
      phone: "0912-345-678",
      lineId: "@hj-sales-wang",
    },
  };

  return (
    <MockupShell url="https://hjhj.com.tw/members">
      <MockupSiteHeader />

      {/* Hero with greeting + tier badge */}
      <section className="border-b border-zinc-200 bg-gradient-to-br from-amber-50 to-white px-6 py-7">
        <div className="mx-auto max-w-[1760px]">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <div className="text-xs text-zinc-500">歡迎回來</div>
              <h1 className="mt-1 text-2xl font-bold text-zinc-900">
                {profile.name}
                <span className="ml-2 text-base font-normal text-zinc-500">
                  / {profile.company}
                </span>
              </h1>
            </div>
            <div className="flex items-center gap-2">
              <span
                className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold text-white ${profile.tierColor}`}
              >
                <CrownIcon />
                {profile.tier}
              </span>
              <Link
                href="/modules/members/auth"
                className="flex items-center gap-1.5 rounded-md border border-zinc-300 bg-white px-3 py-1.5 text-xs font-medium text-zinc-700 hover:bg-zinc-50"
              >
                <LogOutIcon />
                登出
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 帳戶資訊卡 — 等級 / 業務窗口 */}
      <section className="border-b border-zinc-200 bg-white px-6 py-6">
        <div className="mx-auto max-w-[1760px]">
          <div className="grid gap-4 lg:grid-cols-2">
            {/* 等級 + 適用價格 */}
            <div className="rounded-xl border-2 border-amber-200 bg-amber-50/40 p-5">
              <div className="mb-3 flex items-center justify-between">
                <h2 className="text-sm font-bold uppercase tracking-wider text-amber-900">
                  您的會員等級
                </h2>
                <span className="text-[10px] font-medium text-amber-700">
                  由 HJ 業務依採購地區與通路指派
                </span>
              </div>
              <div className="grid gap-4 text-sm md:grid-cols-2">
                <div>
                  <div className="text-xs text-zinc-500">目前等級</div>
                  <div className="mt-1 inline-flex items-center gap-1.5 rounded-md bg-amber-600 px-2.5 py-1 text-xs font-bold text-white">
                    <CrownIcon />
                    {profile.tier}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">適用價格</div>
                  <div className="mt-1 font-bold text-zinc-900">
                    北部直客專屬價(會員價)
                  </div>
                </div>
              </div>
              <p className="mt-3 text-xs leading-relaxed text-zinc-600">
                會員 4 等級:
                <span className="mx-1 font-semibold text-amber-800">
                  北部直客 / 北部盤商 / 中南部直客 / 中南部盤商
                </span>
                。等級由業務指派,如需調整請聯繫專屬業務。
              </p>
            </div>

            {/* 專屬業務窗口 */}
            <div className="rounded-xl border-2 border-emerald-200 bg-emerald-50/30 p-5">
              <div className="mb-3 flex items-center justify-between">
                <h2 className="text-sm font-bold uppercase tracking-wider text-emerald-900">
                  您的專屬業務
                </h2>
                <span className="text-[10px] font-medium text-emerald-700">
                  訂單、報價、樣品問題請聯繫
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-base font-bold text-white">
                  {profile.salesContact.name.slice(0, 1)}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-base font-bold text-zinc-900">
                    {profile.salesContact.name}
                  </div>
                  <div className="mt-1 flex flex-wrap gap-3 text-xs text-zinc-600">
                    <span className="inline-flex items-center gap-1">
                      <PhoneIcon />
                      <span className="font-mono">
                        {profile.salesContact.phone}
                      </span>
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <MessageIcon />
                      <span className="font-mono">
                        LINE {profile.salesContact.lineId}
                      </span>
                    </span>
                  </div>
                </div>
                <a
                  href="https://line.me/R/ti/p/@hj-sales-wang"
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-lg bg-emerald-500 px-3 py-2 text-xs font-bold text-white hover:bg-emerald-600"
                >
                  LINE 聯繫
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 統計快覽 */}
      <section className="border-b border-zinc-200 bg-white px-6 py-5">
        <div className="mx-auto max-w-[1760px]">
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            <Stat label="進行中訂單" value="3" suffix="筆" tone="amber" />
            <Stat label="待付款" value="1" suffix="筆" tone="rose" />
            <Stat label="詢價單進行中" value="2" suffix="筆" tone="violet" />
            <Stat label="樣品已寄出" value="2" suffix="筆" tone="emerald" />
          </div>
        </div>
      </section>

      {/* Cards grid */}
      <section className="bg-zinc-50/40 px-6 py-8">
        <div className="mx-auto max-w-[1760px]">
          <h2 className="mb-4 text-base font-bold text-zinc-700">快速功能</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card
              icon={<PackageIcon />}
              title="歷史訂單"
              subtitle="網站訂單 + 凌越歷史"
              meta="近 30 天 5 筆;凌越歷史預設近 2 年"
              href="/modules/members/orders"
              tone="amber"
            />
            <Card
              icon={<FileTextIcon />}
              title="詢價紀錄"
              subtitle="2 筆進行中"
              meta="私版客製詢價單,業務透過 LINE 報價"
              href="/modules/members/quote-list"
              tone="violet"
            />
            <Card
              icon={<GiftIcon />}
              title="樣品申請紀錄"
              subtitle="2 筆已寄出"
              meta="每品項 ≤ 3、最多 10 款、總數 ≤ 30"
              href="/modules/members/samples"
              tone="emerald"
            />
            <Card
              icon={<SettingsIcon />}
              title="帳號設定"
              subtitle="基本資料 / 收件地址 / 發票"
              meta="LINE 綁定狀態、密碼變更"
              href="/modules/members/settings"
              tone="zinc"
            />
          </div>
        </div>
      </section>

      {/* Recent orders preview */}
      <section className="border-t border-zinc-200 bg-white px-6 py-8">
        <div className="mx-auto max-w-[1760px]">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-base font-bold text-zinc-900">最近訂單</h2>
            <Link
              href="/modules/members/orders"
              className="flex items-center gap-1 text-sm text-amber-700 hover:underline"
            >
              查看全部
              <ChevronRight />
            </Link>
          </div>
          <div className="overflow-hidden rounded-lg border border-zinc-200">
            <table className="w-full text-sm">
              <thead className="bg-zinc-50 text-xs text-zinc-500">
                <tr>
                  <th className="px-4 py-2.5 text-left font-medium">訂單號</th>
                  <th className="px-4 py-2.5 text-left font-medium">日期</th>
                  <th className="px-4 py-2.5 text-left font-medium">商品</th>
                  <th className="px-4 py-2.5 text-left font-medium">來源</th>
                  <th className="px-4 py-2.5 text-right font-medium">金額</th>
                  <th className="px-4 py-2.5 text-center font-medium">狀態</th>
                  <th className="px-4 py-2.5"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100">
                {[
                  {
                    id: "HJ-20260427-001",
                    date: "2026/04/27",
                    items: "12oz 公版瓦楞紙杯 × 2 箱",
                    source: "網站",
                    sourceTone: "emerald",
                    amount: "8,400",
                    status: "已出貨",
                    statusTone: "emerald",
                  },
                  {
                    id: "HJ-20260420-008",
                    date: "2026/04/20",
                    items: "牛皮紙便當盒 × 5 條 + 餐具組 × 3 條",
                    source: "網站",
                    sourceTone: "emerald",
                    amount: "12,800",
                    status: "已完成",
                    statusTone: "zinc",
                  },
                  {
                    id: "LY-20251218-417",
                    date: "2025/12/18",
                    items: "客製模切紙袋 × 1,000 + 杯蓋 × 2 條",
                    source: "凌越歷史",
                    sourceTone: "indigo",
                    amount: "23,500",
                    status: "已完成",
                    statusTone: "zinc",
                  },
                ].map((o) => (
                  <tr key={o.id} className="hover:bg-zinc-50/60">
                    <td className="px-4 py-3 font-mono text-xs text-zinc-700">
                      <Link
                        href={`/modules/members/orders/${o.id}`}
                        className="hover:text-amber-700 hover:underline"
                      >
                        {o.id}
                      </Link>
                    </td>
                    <td className="px-4 py-3 text-zinc-600">{o.date}</td>
                    <td className="px-4 py-3 text-zinc-800">{o.items}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`rounded-full px-2 py-0.5 text-[11px] font-medium ${
                          o.sourceTone === "indigo"
                            ? "bg-indigo-100 text-indigo-800"
                            : "bg-emerald-100 text-emerald-800"
                        }`}
                      >
                        {o.source}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right font-mono text-zinc-700">
                      NT$ {o.amount}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span
                        className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                          o.statusTone === "emerald"
                            ? "bg-emerald-100 text-emerald-800"
                            : o.statusTone === "amber"
                              ? "bg-amber-100 text-amber-800"
                              : "bg-zinc-100 text-zinc-700"
                        }`}
                      >
                        {o.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <Link
                        href={`/modules/members/orders/${o.id}`}
                        className="text-xs text-amber-700 hover:underline"
                      >
                        查看 →
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <MockupSiteFooter />
    </MockupShell>
  );
}

function Stat({
  label,
  value,
  suffix,
  tone,
}: {
  label: string;
  value: string;
  suffix?: string;
  tone: "amber" | "rose" | "violet" | "emerald";
}) {
  const toneCls = {
    amber: "border-amber-200 bg-amber-50/40 text-amber-900",
    rose: "border-rose-200 bg-rose-50/40 text-rose-900",
    violet: "border-violet-200 bg-violet-50/40 text-violet-900",
    emerald: "border-emerald-200 bg-emerald-50/40 text-emerald-900",
  }[tone];

  return (
    <div className={`rounded-lg border-2 px-4 py-3 ${toneCls}`}>
      <div className="text-xs font-medium opacity-80">{label}</div>
      <div className="mt-1 flex items-baseline gap-1">
        <span className="text-2xl font-bold">{value}</span>
        {suffix && <span className="text-sm font-medium opacity-70">{suffix}</span>}
      </div>
    </div>
  );
}

function Card({
  icon,
  title,
  subtitle,
  meta,
  href,
  tone,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  meta?: string;
  href: string;
  tone: "amber" | "violet" | "emerald" | "zinc";
}) {
  const toneCls = {
    amber:
      "border-amber-200 bg-white hover:border-amber-400 [&_.icon-bg]:bg-amber-100 [&_.icon-bg]:text-amber-700",
    violet:
      "border-violet-200 bg-white hover:border-violet-400 [&_.icon-bg]:bg-violet-100 [&_.icon-bg]:text-violet-700",
    emerald:
      "border-emerald-200 bg-white hover:border-emerald-400 [&_.icon-bg]:bg-emerald-100 [&_.icon-bg]:text-emerald-700",
    zinc: "border-zinc-200 bg-white hover:border-zinc-400 [&_.icon-bg]:bg-zinc-100 [&_.icon-bg]:text-zinc-700",
  }[tone];

  return (
    <Link
      href={href}
      className={`group flex flex-col rounded-xl border-2 p-5 shadow-sm transition-all hover:shadow-md ${toneCls}`}
    >
      <div className="mb-3 flex items-center justify-between">
        <span className="icon-bg flex size-10 items-center justify-center rounded-lg">
          {icon}
        </span>
      </div>
      <div className="font-bold text-zinc-900">{title}</div>
      <div className="mt-1 text-sm font-medium text-zinc-700">{subtitle}</div>
      {meta && (
        <div className="mt-1.5 text-xs leading-relaxed text-zinc-500">
          {meta}
        </div>
      )}
      <div className="mt-3 flex items-center text-xs font-medium text-amber-700 group-hover:text-amber-900">
        前往
        <ChevronRight />
      </div>
    </Link>
  );
}
