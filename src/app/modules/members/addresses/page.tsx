"use client";

import { useState } from "react";
import { ModuleFooterNav } from "@/components/modules/ModuleFooterNav";
import { ModuleHero } from "@/components/modules/ModuleHero";
import {
  MockupShell,
  MockupSiteFooter,
  MockupSiteHeader,
} from "@/components/modules/MockupShell";

const ADDRESSES = [
  {
    id: 1,
    label: "公司",
    name: "陳老闆",
    phone: "0912-345-678",
    addr: "新北市五股區五權路 10 號 3 樓",
    isDefault: true,
    invoice: "三聯式 / 統編 12345678",
  },
  {
    id: 2,
    label: "倉庫",
    name: "陳老闆",
    phone: "0912-345-678",
    addr: "桃園市龜山區工業東街 5 號",
    isDefault: false,
    invoice: "—",
  },
  {
    id: 3,
    label: "分店 A",
    name: "店長 王小明",
    phone: "0987-654-321",
    addr: "台北市信義區忠孝東路五段 100 號",
    isDefault: false,
    invoice: "—",
  },
];

const MEMBER_NAV = [
  { l: "會員儀表板", h: "/modules/members" },
  { l: "訂單列表", h: "/modules/members/orders" },
  { l: "詢價單", h: "/modules/members/quote-list" },
  { l: "樣品申請", h: "/modules/members/samples" },
  { l: "收件地址簿", h: "/modules/members/addresses", active: true },
  { l: "個人資料", h: "/modules/members/settings" },
];

export default function AddressesPage() {
  const [editing, setEditing] = useState<number | null>(null);
  return (
    <main className="min-h-dvh bg-zinc-100">
      <ModuleHero
        no="F27"
        title="收件地址簿"
        subtitle="Address Book"
        desc="多筆收件地址 · 預設地址 · 統編記憶 · 結帳一鍵帶入"
        tone="amber"
      />
      <section className="bg-zinc-200/70 px-6 py-10">
        <div className="mx-auto max-w-[1760px]">
          <MockupShell url="https://hj.example.com/member/addresses">
            <MockupSiteHeader />

            <div className="mx-auto max-w-[1760px] grid grid-cols-4 gap-8 px-6 py-10">
              {/* Sidebar */}
              <aside className="rounded-xl border border-zinc-200 bg-white p-5">
                <div className="mb-4 flex items-center gap-3 border-b border-zinc-100 pb-4">
                  <div className="flex size-10 items-center justify-center rounded-full bg-amber-100 text-sm font-bold text-amber-700">
                    陳
                  </div>
                  <div>
                    <div className="text-sm font-bold text-zinc-900">陳老闆</div>
                    <div className="text-xs text-zinc-500">北部直客 · VIP</div>
                  </div>
                </div>
                <nav className="space-y-1 text-sm">
                  {MEMBER_NAV.map((n) => (
                    <a
                      key={n.l}
                      href={n.h}
                      className={`block rounded px-3 py-2 ${
                        n.active ? "bg-amber-50 font-medium text-amber-700" : "text-zinc-700 hover:bg-zinc-50"
                      }`}
                    >
                      {n.l}
                    </a>
                  ))}
                </nav>
              </aside>

              {/* Body */}
              <div className="col-span-3">
                <div className="mb-6 flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-zinc-900">收件地址簿</h2>
                    <p className="mt-1 text-sm text-zinc-500">最多儲存 10 筆,結帳時可一鍵套用</p>
                  </div>
                  <button className="rounded-lg bg-amber-500 px-5 py-2.5 text-sm font-medium text-white hover:bg-amber-600">
                    + 新增地址
                  </button>
                </div>

                <div className="space-y-4">
                  {ADDRESSES.map((a) => (
                    <article key={a.id} className="rounded-xl border border-zinc-200 bg-white p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-medium text-amber-700">{a.label}</span>
                            {a.isDefault && (
                              <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-medium text-emerald-700">預設地址</span>
                            )}
                          </div>
                          <div className="mt-3 grid grid-cols-3 gap-4 text-sm">
                            <div>
                              <dt className="text-xs text-zinc-500">收件人</dt>
                              <dd className="text-zinc-900">{a.name}</dd>
                            </div>
                            <div>
                              <dt className="text-xs text-zinc-500">電話</dt>
                              <dd className="text-zinc-900">{a.phone}</dd>
                            </div>
                            <div>
                              <dt className="text-xs text-zinc-500">發票資訊</dt>
                              <dd className="text-zinc-900">{a.invoice}</dd>
                            </div>
                          </div>
                          <div className="mt-3">
                            <dt className="text-xs text-zinc-500">地址</dt>
                            <dd className="mt-0.5 text-sm text-zinc-900">{a.addr}</dd>
                          </div>
                        </div>
                        <div className="flex flex-col gap-2">
                          <button onClick={() => setEditing(a.id)} className="rounded-md border border-zinc-300 px-3 py-1 text-xs hover:border-amber-500">編輯</button>
                          {!a.isDefault && (
                            <button className="rounded-md border border-zinc-300 px-3 py-1 text-xs hover:border-amber-500">設為預設</button>
                          )}
                          <button className="rounded-md border border-rose-200 px-3 py-1 text-xs text-rose-600 hover:bg-rose-50">刪除</button>
                        </div>
                      </div>
                      {editing === a.id && (
                        <div className="mt-5 grid grid-cols-2 gap-3 border-t border-zinc-100 pt-5">
                          {[
                            { l: "標籤", v: a.label },
                            { l: "收件人", v: a.name },
                            { l: "電話", v: a.phone },
                            { l: "縣市 / 區", v: "新北市 / 五股區" },
                          ].map((f) => (
                            <div key={f.l}>
                              <label className="text-xs text-zinc-700">{f.l}</label>
                              <input className="mt-1 w-full rounded-md border border-zinc-300 px-3 py-2 text-sm" defaultValue={f.v} />
                            </div>
                          ))}
                          <div className="col-span-2">
                            <label className="text-xs text-zinc-700">詳細地址</label>
                            <input className="mt-1 w-full rounded-md border border-zinc-300 px-3 py-2 text-sm" defaultValue={a.addr} />
                          </div>
                          <div className="col-span-2 flex gap-2">
                            <button className="rounded-md bg-amber-500 px-4 py-2 text-xs font-medium text-white">儲存</button>
                            <button onClick={() => setEditing(null)} className="rounded-md border border-zinc-300 px-4 py-2 text-xs">取消</button>
                          </div>
                        </div>
                      )}
                    </article>
                  ))}
                </div>
              </div>
            </div>

            <MockupSiteFooter />
          </MockupShell>
        </div>
      </section>
      <ModuleFooterNav
        prev={{ title: "個人資料", href: "/modules/members/settings" }}
        next={{ title: "(返回前台首頁)", href: "/modules/home" }}
      />
    </main>
  );
}
