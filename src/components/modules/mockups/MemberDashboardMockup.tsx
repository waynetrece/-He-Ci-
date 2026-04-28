"use client";

import Link from "next/link";
import { useState } from "react";
import { Questioned } from "../CommentSystem";
import {
  MockupShell,
  MockupSiteFooter,
  MockupSiteHeader,
} from "../MockupShell";

/* ============== Q definitions ============== */

const Q1 = {
  no: "Q1",
  question: "一般會員與企業客戶是否共用同一套等級系統，還是各自獨立？各有幾級、等級名稱、升降級規則、價格生效時間？當會員等級價、企業合約價、ERP 客戶特殊價同時存在時，價格優先順序如何判定？",
  context:
    "目前先以這樣示意：個人會員顯示「VIP 銀級」、企業客戶顯示「合作客戶 A 級」當示意。實際命名與分級數想請 HJ 提供。價格優先順序也是計價邏輯核心，需確認。",
  clientRef: {
    source: "後台 / 顧客管理 (2)",
    quote: "多層會員分級：商品會因顧客分級而有不同價",
    note: "需求表寫了「多層分級」，但兩種會員的等級系統是否共用、命名、升降級規則、與 ERP / 合約價的優先順序皆未提供。",
  },
};

const Q2 = {
  no: "Q2",
  question: "會員首頁依會員類型顯示什麼差異？個人會員的會員首頁要隱藏哪些區塊（公司資料卡 / 詢價紀錄 / 多門市等）？ERP 客戶編號是否在會員自己看的畫面顯示？",
  context:
    "目前先以這樣示意：企業客戶頂部有「公司資料卡」（公司名 / 統編 / ERP 客戶編號 / 等級 / 價格級距）；個人會員此區塊隱藏，改顯示精簡版會員資料。想請 HJ 確認顯示策略。",
  clientRef: {
    source: "後台 / 顧客管理 (1)(2)",
    quote: "API 串接：網站客人需與原 ERP 客戶編號相同；多層會員分級",
    note: "需求表沒有指定 ERP 客戶編號是否要對會員自己顯示，也沒有規定會員首頁在兩種會員間的差異。",
  },
};

const Q3 = {
  no: "Q3",
  question: "價格顯示規則 — 未登入訪客 / 個人會員 / 企業客戶分別看到什麼價格？顯示原價、會員價、企業價、請洽詢，還是隱藏價格？",
  context:
    "目前先以這樣示意：個人會員顯示「會員價」+「原價劃掉」；企業客戶顯示「合約價」+「等級價」。實際是否顯示、要顯示什麼數字、未登入訪客看到的版本，想請 HJ 確認。",
  clientRef: {
    source: "後台 / 顧客管理 (2)",
    quote: "多層會員分級：商品會因顧客分級而有不同價",
    note: "需求表寫了「不同價」，但「不同身份看到什麼版本」未指定。",
  },
};

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

/* ============== Component ============== */

type ViewType = "personal" | "business";

export function MemberDashboardMockup({
  annotations = false,
  pageId = "members-dashboard",
}: {
  annotations?: boolean;
  pageId?: string;
}) {
  const [view, setView] = useState<ViewType>("business");

  const profile =
    view === "business"
      ? {
          greeting: "禾啟餐飲有限公司",
          subGreeting: "聯絡人：陳先生",
          tier: "合作客戶 A 級",
          tierColor: "bg-amber-600",
          companyName: "禾啟餐飲有限公司",
          taxId: "12345678",
          erpCode: "HJC-A-00231",
          priceLevel: "A 級價（合約價優先）",
        }
      : {
          greeting: "陳先生",
          subGreeting: "歡迎回來",
          tier: "VIP 銀級",
          tierColor: "bg-zinc-500",
          companyName: null,
          taxId: null,
          erpCode: null,
          priceLevel: "VIP 銀級價",
        };

  return (
    <MockupShell url="https://hjhj.com.tw/members">
      <MockupSiteHeader />

      {/* Mockup Demo Toggle (B2B vs Personal preview) — 不在實際網站，是 demo 用 */}
      {/* Demo toggle — 不加 Annotated，因為這條本身就是 demo 工具，標題已自說明 */}
      <div className="border-b-2 border-dashed border-amber-300 bg-amber-50/60 px-6 py-3">
        <div className="mx-auto flex max-w-[1760px] items-center gap-3 text-xs">
          <span className="rounded-full bg-amber-700 px-2 py-0.5 font-bold text-white">
            預覽
          </span>
          <span className="text-zinc-700">
            切換會員類型，確認不同會員看到的內容：
          </span>
          <div className="flex gap-1 rounded-md bg-white p-1 shadow-sm border border-zinc-200">
            {(["personal", "business"] as ViewType[]).map((v) => (
              <button
                key={v}
                onClick={() => setView(v)}
                className={`rounded px-3 py-1 font-medium transition-colors ${
                  view === v
                    ? "bg-amber-700 text-white"
                    : "text-zinc-600 hover:bg-zinc-50"
                }`}
              >
                {v === "personal" ? "個人會員" : "企業客戶"}
              </button>
            ))}
          </div>
          <span className="ml-auto text-zinc-500 italic">
            （實際網站會依登入身份自動顯示對應版本）
          </span>
        </div>
      </div>

      {/* Hero with greeting + tier badge */}
      <section className="border-b border-zinc-200 bg-gradient-to-br from-amber-50 to-white px-6 py-7">
        <div className="mx-auto max-w-[1760px]">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <div className="text-xs text-zinc-500">{profile.subGreeting}</div>
              <h1 className="mt-1 text-2xl font-bold text-zinc-900">
                {profile.greeting}
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

      {/* B2B 專屬：公司資料卡（個人會員隱藏） */}
      {view === "business" && (
        <section className="border-b border-zinc-200 bg-white px-6 py-6">
          <div className="mx-auto max-w-[1760px]">
            <Questioned
              show={annotations}
              questions={[Q2]}
              pageId={pageId}
              position="top-right"
            >
              <div className="rounded-xl border-2 border-amber-300 bg-amber-50/30 p-5 shadow-sm">
                <div className="mb-3 flex items-center justify-between">
                  <h2 className="text-sm font-bold text-amber-900 uppercase tracking-wider">
                    公司資料
                  </h2>
                  <Link
                    href="/modules/members/settings"
                    className="text-xs text-amber-700 hover:underline flex items-center gap-1"
                  >
                    編輯資料
                    <ChevronRight />
                  </Link>
                </div>
                <div className="grid gap-4 text-sm md:grid-cols-2 lg:grid-cols-4">
                  <Field label="公司名稱" value={profile.companyName!} />
                  <Field label="統一編號" value={profile.taxId!} mono />
                  <Field label="ERP 客戶編號" value={profile.erpCode!} mono highlight />
                  <Questioned
                    show={annotations}
                    questions={[Q1, Q3]}
                    pageId={pageId}
                    position="top-right"
                  >
                    <Field label="目前價格級距" value={profile.priceLevel} />
                  </Questioned>
                </div>
              </div>
            </Questioned>
          </div>
        </section>
      )}

      {/* 個人會員：簡化版 profile bar（價格級距還是顯示） */}
      {view === "personal" && (
        <section className="border-b border-zinc-200 bg-white px-6 py-4">
          <div className="mx-auto max-w-[1760px]">
            <Questioned
              show={annotations}
              questions={[Q1, Q3]}
              pageId={pageId}
              position="top-right"
            >
              <div className="rounded-lg bg-zinc-50/60 p-4 text-sm flex flex-wrap items-center gap-x-6 gap-y-2">
                <span className="text-zinc-600">您目前的會員等級：</span>
                <span className="font-bold text-zinc-900">{profile.tier}</span>
                <span className="text-zinc-300">|</span>
                <span className="text-zinc-600">適用價格：</span>
                <span className="font-bold text-zinc-900">{profile.priceLevel}</span>
              </div>
            </Questioned>
          </div>
        </section>
      )}

      {/* Cards grid */}
      <section className="bg-zinc-50/40 px-6 py-8">
        <div className="mx-auto max-w-[1760px]">
          <h2 className="mb-4 text-base font-bold text-zinc-700">
            快速功能
          </h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {/* 歷史訂單 */}
            <Card
              icon={<PackageIcon />}
              title="歷史訂單"
              subtitle="近 30 天 5 筆"
              meta="最近：HJ-20260427-001 已出貨"
              href="/modules/members/orders"
              tone="amber"
            />

            {/* 詢價紀錄（B2B 專屬，個人視 Q11） */}
            {view === "business" && (
              <Card
                icon={<FileTextIcon />}
                title="我的詢價紀錄"
                subtitle="3 筆進行中"
                meta="2 筆等客服回覆"
                href="/modules/members/quote-list"
                tone="indigo"
                badge="企業專屬"
              />
            )}

            {/* 樣品紀錄 */}
            <Card
              icon={<GiftIcon />}
              title="樣品申請紀錄"
              subtitle="2 筆已寄出"
              meta="1 筆已送達"
              href="/modules/members/samples"
              tone="emerald"
            />

            {/* 帳號設定 */}
            <Card
              icon={<SettingsIcon />}
              title={view === "business" ? "帳號與公司資料" : "帳號設定"}
              subtitle={
                view === "business"
                  ? "公司 / 發票 / 多門市地址"
                  : "基本資料 / 收件地址"
              }
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
              className="text-sm text-amber-700 hover:underline flex items-center gap-1"
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
                    items: "12oz 客製紙杯 × 5,000",
                    amount: "9,250",
                    status: "已出貨",
                    tone: "emerald",
                  },
                  {
                    id: "HJ-20260420-008",
                    date: "2026/04/20",
                    items: "牛皮紙便當盒 × 2,000 + 餐具組",
                    amount: "12,800",
                    status: "已完成",
                    tone: "zinc",
                  },
                  {
                    id: "HJ-20260415-003",
                    date: "2026/04/15",
                    items: "客製模切紙袋 × 500",
                    amount: "—（客服報價中）",
                    status: "備貨中",
                    tone: "amber",
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
                    <td className="px-4 py-3 text-right font-mono text-zinc-700">
                      NT$ {o.amount}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span
                        className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                          o.tone === "emerald"
                            ? "bg-emerald-100 text-emerald-800"
                            : o.tone === "amber"
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

function Field({
  label,
  value,
  mono,
  highlight,
}: {
  label: string;
  value: string;
  mono?: boolean;
  highlight?: boolean;
}) {
  return (
    <div>
      <div className="text-xs text-zinc-500">{label}</div>
      <div
        className={`mt-1 ${mono ? "font-mono" : ""} ${highlight ? "rounded bg-amber-100 px-2 py-0.5 inline-block text-amber-900" : "text-zinc-900"} font-bold`}
      >
        {value}
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
  badge,
  dot,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  meta?: string;
  href: string;
  tone: "amber" | "indigo" | "emerald" | "zinc";
  badge?: string;
  dot?: "ok" | "warn";
}) {
  const toneCls = {
    amber: "border-amber-200 bg-white hover:border-amber-400 [&_.icon-bg]:bg-amber-100 [&_.icon-bg]:text-amber-700",
    indigo: "border-indigo-200 bg-white hover:border-indigo-400 [&_.icon-bg]:bg-indigo-100 [&_.icon-bg]:text-indigo-700",
    emerald: "border-emerald-200 bg-white hover:border-emerald-400 [&_.icon-bg]:bg-emerald-100 [&_.icon-bg]:text-emerald-700",
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
        {badge && (
          <span className="rounded-full bg-zinc-900 px-2 py-0.5 text-[10px] font-bold uppercase text-white">
            {badge}
          </span>
        )}
        {dot && (
          <span
            className={`size-2.5 rounded-full ${dot === "ok" ? "bg-emerald-500" : "bg-amber-500"}`}
          />
        )}
      </div>
      <div className="font-bold text-zinc-900">{title}</div>
      <div className="mt-1 text-sm font-medium text-zinc-700">{subtitle}</div>
      {meta && (
        <div className="mt-1.5 text-xs text-zinc-500 leading-relaxed">{meta}</div>
      )}
      <div className="mt-3 flex items-center text-xs font-medium text-amber-700 group-hover:text-amber-900">
        前往
        <ChevronRight />
      </div>
    </Link>
  );
}
