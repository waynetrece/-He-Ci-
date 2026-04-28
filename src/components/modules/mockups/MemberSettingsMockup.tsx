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

const Q2 = {
  no: "Q2",
  question: "是否需要常用收件地址 / 多門市地址管理？個人會員可存幾筆？企業客戶可存幾筆？標籤命名規則？",
  context:
    "目前先以這樣示意：① 個人會員可存 5 筆地址，標籤為「家裡 / 工作 / 其他」② 企業客戶可依需求設定上限，標籤為「總店 / 分店 / 倉庫 / 其他」可自訂。可標記預設地址。想請 HJ 確認上限與標籤。",
  clientRef: {
    source: "需求表未提及（補充項）",
    quote: "（這項在需求表沒有對應段落）",
    note: "餐飲客戶可能多門市配送，建議補上。想請 HJ 確認上限與標籤命名。",
  },
};

const Q3 = {
  no: "Q3",
  question: "發票資料需要哪些欄位（公司抬頭、統編、發票寄送方式、Email 收件、紙本郵寄地址）？個人會員是否簡化版（僅 Email）？",
  context:
    "目前先以這樣示意：① 企業客戶需填寫公司抬頭、統編、發票寄送方式（Email / 紙本郵寄擇一）② 個人會員僅需 Email 收件 ③ 紙本寄送可指定地址。想請 HJ 確認欄位需求。",
  clientRef: {
    source: "需求表未提及（補充項）",
    quote: "（這項在需求表沒有對應段落）",
    note: "企業場景幾乎一定會問。想請 HJ 確認欄位完整度。",
  },
};

const Q4 = {
  no: "Q4",
  question: "公司資料（公司名、統編、ERP 客戶編號、發票資料）若由會員自行修改，是否需要後台審核後才同步 ERP？",
  context:
    "目前先以這樣示意：① 公司名、統編、發票資料 → 會員可自行修改，但變更後標示「待業務確認」，由 HJ 業務在後台審核通過才同步 ERP ② ERP 客戶編號 → 唯讀，僅後台可改。想請 HJ 確認規則。",
  clientRef: {
    source: "後台 / 顧客管理 (1)",
    quote: "API 串接：網站客人需與原 ERP 客戶編號相同",
    note: "需求表寫了 ERP 編號要對應，但會員是否能修改公司資料、是否需審核同步 ERP 未指定。",
  },
};

/* ============== Icons ============== */

function CheckCircle() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 0a12 12 0 1 0 0 24 12 12 0 0 0 0-24zm5.707 9.707-7 7a1 1 0 0 1-1.414 0l-3-3a1 1 0 1 1 1.414-1.414L10 14.586l6.293-6.293a1 1 0 1 1 1.414 1.414z" />
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
}

function ChevronLeft() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="15 18 9 12 15 6" />
    </svg>
  );
}

/* ============== Component ============== */

type ViewMode = "business" | "personal";

export function MemberSettingsMockup({
  annotations = false,
  pageId = "members-settings",
}: {
  annotations?: boolean;
  pageId?: string;
}) {
  const [view, setView] = useState<ViewMode>("business");

  return (
    <MockupShell url="https://hjhj.com.tw/members/settings">
      <MockupSiteHeader />

      {/* Demo toggle */}
      <div className="border-b-2 border-dashed border-amber-300 bg-amber-50/60 px-6 py-3">
        <div className="mx-auto flex max-w-[1760px] items-center gap-3 text-xs">
          <span className="rounded-full bg-amber-700 px-2 py-0.5 font-bold text-white">
            預覽
          </span>
          <span className="text-zinc-700">切換會員類型，確認不同欄位差異：</span>
          <div className="flex gap-1 rounded-md bg-white p-1 shadow-sm border border-zinc-200">
            {(["personal", "business"] as ViewMode[]).map((v) => (
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
        </div>
      </div>

      {/* Breadcrumb */}
      <section className="border-b border-zinc-200 bg-white px-6 py-3">
        <div className="mx-auto max-w-[1760px] text-xs text-zinc-500">
          <Link href="/modules/members" className="hover:text-zinc-900">
            會員首頁
          </Link>
          <span className="mx-2 text-zinc-300">/</span>
          <span className="font-semibold text-zinc-900">
            {view === "business" ? "帳號與公司資料" : "帳號設定"}
          </span>
        </div>
      </section>

      {/* Hero */}
      <section className="border-b border-zinc-200 bg-white px-6 py-5">
        <div className="mx-auto max-w-[1760px]">
          <h1 className="text-2xl font-bold text-zinc-900">
            {view === "business" ? "帳號與公司資料" : "帳號設定"}
          </h1>
          <p className="mt-1 text-sm text-zinc-500">
            {view === "business"
              ? "管理登入帳號、公司資料、發票、收件地址與通知偏好"
              : "管理登入帳號、收件地址、發票與通知偏好"}
          </p>
        </div>
      </section>

      {/* Sections grid */}
      <section className="bg-zinc-50/40 px-6 py-8">
        <div className="mx-auto max-w-[1760px] space-y-6">
          {/* 1. 基本登入資料 */}
          <Section title="基本登入資料" subtitle="您的會員帳號與聯絡資訊">
            <Field label="Email" value="wayne@example.com" verified />
            <Field label="行動電話" value="0912-345-678" verified />
            <Field label="姓名" value={view === "business" ? "陳先生（聯絡人）" : "陳先生"} />
            <Field label="密碼" value="••••••••" action={<button className="text-xs text-amber-700 hover:underline">變更密碼</button>} />
          </Section>

          {/* 2. 公司資料（B2B only） */}
          {view === "business" && (
            <Questioned
              show={annotations}
              questions={[Q4]}
              pageId={pageId}
              position="top-right"
            >
              <Section
                title="公司資料"
                subtitle="與凌越 ERP 同步的核心資料"
                tone="amber"
              >
                <Field label="公司名稱" value="禾啟餐飲有限公司" editable />
                <Field label="統一編號" value="12345678" mono editable />
                <Field
                  label="ERP 客戶編號"
                  value="HJC-A-00231"
                  mono
                  highlight
                  meta="僅後台可修改"
                />
                <Field label="會員等級" value="合作客戶 A 級" meta="由業務評定" />
                <div className="col-span-full rounded-md bg-amber-50/60 p-3 text-xs text-amber-900">
                  ⓘ 公司名 / 統編變更需業務確認後才同步 ERP，期間訂單仍以原資料計算。
                </div>
              </Section>
            </Questioned>
          )}

          {/* 3. 收件地址 */}
          <Questioned
            show={annotations}
            questions={[Q2]}
            pageId={pageId}
            position="top-right"
          >
            <Section
              title={view === "business" ? "多門市收件地址" : "收件地址"}
              subtitle={
                view === "business"
                  ? "可新增多筆門市 / 倉庫地址"
                  : "可儲存常用地址，下單時直接選擇"
              }
              extra={
                <button className="flex items-center gap-1 rounded-md border border-zinc-300 bg-white px-3 py-1.5 text-xs font-medium text-zinc-700 hover:bg-zinc-50">
                  <PlusIcon />
                  新增地址
                </button>
              }
            >
              <div className="col-span-full space-y-2">
                {(view === "business"
                  ? [
                      { tag: "總店", name: "禾啟餐飲（總店）", addr: "新北市五股區五權五路 10 號", phone: "陳先生 0912-345-678", isDefault: true },
                      { tag: "分店 A", name: "禾啟餐飲（信義分店）", addr: "台北市信義區市府路 1 號", phone: "張小姐 0922-111-222" },
                      { tag: "倉庫", name: "禾啟貨倉", addr: "桃園市龜山區工業路 5 號", phone: "倉管 0933-555-666" },
                    ]
                  : [
                      { tag: "家裡", name: "陳先生", addr: "新北市五股區五權五路 10 號", phone: "0912-345-678", isDefault: true },
                      { tag: "工作", name: "陳先生", addr: "台北市信義區市府路 1 號", phone: "0912-345-678" },
                    ]
                ).map((a, i) => (
                  <article
                    key={i}
                    className={`flex items-start gap-3 rounded-lg border p-4 ${
                      a.isDefault
                        ? "border-amber-300 bg-amber-50/40"
                        : "border-zinc-200 bg-white"
                    }`}
                  >
                    <div className="flex flex-col items-center gap-1">
                      <span
                        className={`rounded px-2 py-0.5 text-[10px] font-bold ${
                          view === "business" ? "bg-indigo-100 text-indigo-800" : "bg-sky-100 text-sky-800"
                        }`}
                      >
                        {a.tag}
                      </span>
                      {a.isDefault && (
                        <span className="rounded bg-amber-700 px-1.5 py-0.5 text-[10px] font-bold text-white">
                          預設
                        </span>
                      )}
                    </div>
                    <div className="min-w-0 flex-1 text-sm">
                      <div className="font-bold text-zinc-900">{a.name}</div>
                      <div className="text-zinc-600">{a.phone}</div>
                      <div className="text-zinc-600">{a.addr}</div>
                    </div>
                    <div className="flex flex-col gap-1.5">
                      {!a.isDefault && (
                        <button className="text-xs text-amber-700 hover:underline">
                          設為預設
                        </button>
                      )}
                      <button className="text-xs text-zinc-500 hover:text-zinc-900">
                        編輯
                      </button>
                      <button className="text-xs text-zinc-500 hover:text-rose-700">
                        刪除
                      </button>
                    </div>
                  </article>
                ))}
                {view === "personal" && (
                  <p className="text-xs text-zinc-500">
                    ※ 個人會員最多可儲存 5 筆地址
                  </p>
                )}
              </div>
            </Section>
          </Questioned>

          {/* 4. 發票資料 */}
          <Questioned
            show={annotations}
            questions={[Q3]}
            pageId={pageId}
            position="top-right"
          >
            <Section title="發票資料" subtitle="訂單成立時自動套用">
              {view === "business" ? (
                <>
                  <Field label="發票抬頭" value="禾啟餐飲有限公司" editable />
                  <Field label="統一編號" value="12345678" mono editable />
                  <Field label="發票類型" value="三聯式發票（紙本郵寄）" editable />
                  <Field label="郵寄地址" value="新北市五股區五權五路 10 號" editable />
                  <Field label="副本 Email" value="invoice@hjhj.com.tw" editable />
                </>
              ) : (
                <>
                  <Field label="發票類型" value="電子發票" editable />
                  <Field label="收件 Email" value="wayne@example.com" verified editable />
                  <Field label="載具" value="未綁定載具" action={<button className="text-xs text-amber-700 hover:underline">綁定手機條碼</button>} />
                </>
              )}
            </Section>
          </Questioned>

          {/* 5. 通知偏好（Email） */}
          <Section title="通知偏好" subtitle="決定接收哪些 Email 通知">
            <div className="col-span-full">
              <div className="overflow-hidden rounded-lg border border-zinc-200">
                <table className="w-full text-sm">
                  <thead className="bg-zinc-50 text-xs text-zinc-500">
                    <tr>
                      <th className="px-4 py-2.5 text-left font-medium">通知類型</th>
                      <th className="px-4 py-2.5 text-center font-medium">Email</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-100">
                    {[
                      { name: "訂單成立通知", email: true, required: true },
                      { name: "出貨通知", email: true, required: false },
                      { name: "報價回覆", email: true, required: false },
                      { name: "樣品出貨", email: true, required: false },
                      { name: "重要公告", email: true, required: true },
                      { name: "行銷活動", email: false, required: false },
                    ].map((n) => (
                      <tr key={n.name}>
                        <td className="px-4 py-2.5">
                          {n.name}
                          {n.required && (
                            <span className="ml-1.5 text-[10px] text-zinc-400">
                              （必開）
                            </span>
                          )}
                        </td>
                        <td className="px-4 py-2.5 text-center">
                          <input
                            type="checkbox"
                            defaultChecked={n.email}
                            disabled={n.required && n.email}
                            className="size-4 rounded border-zinc-300 accent-amber-700 disabled:opacity-60"
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </Section>

          {/* Back link */}
          <div className="flex justify-center pt-4">
            <Link
              href="/modules/members"
              className="flex items-center gap-1.5 text-sm text-zinc-600 hover:text-zinc-900"
            >
              <ChevronLeft />
              返回會員首頁
            </Link>
          </div>
        </div>
      </section>

      <MockupSiteFooter />
    </MockupShell>
  );
}

/* ============== Subcomponents ============== */

function Section({
  title,
  subtitle,
  children,
  extra,
  tone = "default",
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  extra?: React.ReactNode;
  tone?: "default" | "amber" | "emerald";
}) {
  const toneCls = {
    default: "border-zinc-200 bg-white",
    amber: "border-amber-200 bg-white",
    emerald: "border-emerald-200 bg-white",
  }[tone];

  return (
    <section className={`rounded-xl border ${toneCls} p-6 shadow-sm`}>
      <header className="mb-4 flex items-end justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-zinc-900">{title}</h2>
          {subtitle && (
            <p className="mt-0.5 text-xs text-zinc-500">{subtitle}</p>
          )}
        </div>
        {extra && <div className="shrink-0">{extra}</div>}
      </header>
      <div className="grid gap-4 sm:grid-cols-2">{children}</div>
    </section>
  );
}

function Field({
  label,
  value,
  mono,
  highlight,
  verified,
  editable,
  action,
  meta,
}: {
  label: string;
  value: string;
  mono?: boolean;
  highlight?: boolean;
  verified?: boolean;
  editable?: boolean;
  action?: React.ReactNode;
  meta?: string;
}) {
  return (
    <div>
      <div className="flex items-center justify-between">
        <label className="text-xs text-zinc-500">{label}</label>
        {action ? (
          <span>{action}</span>
        ) : editable ? (
          <button className="text-xs text-amber-700 hover:underline">
            編輯
          </button>
        ) : null}
      </div>
      <div className="mt-1 flex items-center gap-2">
        <span
          className={`flex-1 ${mono ? "font-mono" : ""} ${highlight ? "rounded bg-amber-100 px-2 py-0.5 inline-block text-amber-900" : "text-zinc-900"} font-medium`}
        >
          {value}
        </span>
        {verified && (
          <span className="text-xs text-emerald-700 flex items-center gap-1">
            <CheckCircle />
            已驗證
          </span>
        )}
      </div>
      {meta && (
        <div className="mt-1 text-[10px] text-zinc-400">{meta}</div>
      )}
    </div>
  );
}
