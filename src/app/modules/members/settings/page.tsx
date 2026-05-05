"use client";

import Link from "next/link";
import { useState } from "react";
import { CommentToolbar } from "@/components/modules/CommentSystem";
import { ModuleFooterNav } from "@/components/modules/ModuleFooterNav";
import { MemberSettingsMockup } from "@/components/modules/mockups/MemberSettingsMockup";
import { MEMBER_MOCKUPS } from "@/lib/members-mockups";

const PAGE_ID = "members-settings";
const PAGE_LABEL = "會員系統 — 帳號設定";
const ACTIVE_TAB = "settings";

// 32 題 review 已決議事項(直接反映在 mockup 上,本頁無待確認問題):
// - 不分「個人 / 企業」分流(C 包)
// - 4 等級由業務後台指派,會員此頁只能查看(C 包)
// - 凌越客編 = 內部處理,不對會員顯示(Q-C1 / Q-C2)
// - 發票格式 = 三聯 / 二聯+載具 / 捐贈+愛心碼(B 包,跟結帳流程一致)
// - LINE 通知細項 = phase 2,目前只開 Email 通知

export default function MembersSettingsPage() {
  const [annotations, setAnnotations] = useState(true);

  return (
    <main className="min-h-dvh bg-zinc-50 text-zinc-900">
      <CommentToolbar
        pageId={PAGE_ID}
        pageLabel={PAGE_LABEL}
        annotations={annotations}
        setAnnotations={setAnnotations}
      />

      <section className="border-b-2 border-zinc-400 bg-amber-50/60 px-6 py-3">
        <div className="mx-auto flex max-w-[1760px] flex-wrap items-center gap-2">
          <span className="mr-2 text-sm font-medium text-amber-900">
            會員系統 預覽:
          </span>
          {MEMBER_MOCKUPS.map((m) => {
            const active = m.id === ACTIVE_TAB;
            const cls = `rounded-full border-2 px-4 py-1.5 text-sm font-medium transition-colors ${
              active
                ? "border-zinc-900 bg-zinc-900 text-white shadow-sm"
                : m.ready
                  ? "border-zinc-400 bg-white text-zinc-700 hover:border-zinc-900 hover:bg-amber-100"
                  : "border-zinc-300 bg-zinc-100 text-zinc-400 cursor-not-allowed"
            }`;
            const content = (
              <>
                {m.name}
                {!m.ready && (
                  <span className="ml-1 text-[10px] opacity-60">(製作中)</span>
                )}
              </>
            );
            return m.ready && !active ? (
              <Link key={m.id} href={m.href} className={cls}>
                {content}
              </Link>
            ) : (
              <button key={m.id} disabled={!m.ready} className={cls}>
                {content}
              </button>
            );
          })}
        </div>
      </section>

      <section className="bg-zinc-200/70 px-6 py-10">
        <div className="mx-auto max-w-[1760px]">
          <MemberSettingsMockup annotations={annotations} pageId={PAGE_ID} />
        </div>
      </section>

      {/* Resolution summary */}
      <section className="border-t-2 border-zinc-400 bg-emerald-50/40 px-6 py-12">
        <div className="mx-auto max-w-[1760px]">
          <h2 className="text-2xl font-bold tracking-tight text-emerald-900">
            本頁需求已全部對齊
          </h2>
          <p className="mt-2 max-w-3xl text-sm text-zinc-700">
            32 題 review 已決議,帳號設定統一一個視圖;LINE 通知細項列為 phase 2 開發。
          </p>
          <ul className="mt-5 grid max-w-4xl grid-cols-1 gap-2 text-sm text-zinc-700 lg:grid-cols-2">
            {[
              "不分個人/企業,統一一個帳號設定視圖(C 包)",
              "4 等級由業務後台指派,會員此頁唯讀(C 包)",
              "凌越客編內部處理,不對會員顯示(Q-C1 / Q-C2)",
              "LINE 綁定狀態顯示在「基本登入資料」",
              "可儲存多筆收件地址,可標記預設",
              "發票偏好 = 三聯 / 二聯+載具 / 捐贈+愛心碼(B 包)",
              "Email 通知 phase 1 開放,LINE 通知 phase 2",
              "公司資料修改 = 業務後台維護(避開會員自改 ERP 風險)",
            ].map((t) => (
              <li key={t} className="flex items-start gap-2">
                <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-white">
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </span>
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <ModuleFooterNav
        prev={{ title: "樣品申請紀錄", href: "/modules/members/samples" }}
        next={{ title: "回到會員首頁", href: "/modules/members" }}
      />
    </main>
  );
}
