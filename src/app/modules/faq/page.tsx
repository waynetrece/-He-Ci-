"use client";

import { useState } from "react";
import { ModuleFooterNav } from "@/components/modules/ModuleFooterNav";
import { ModuleHero } from "@/components/modules/ModuleHero";
import { MockupCmsPage } from "@/components/modules/MockupCmsPage";

const FAQ_GROUPS = [
  {
    cat: "訂購流程",
    qs: [
      { q: "公版商品如何下單?", a: "選擇商品 → 加入購物車 → 結帳 → 選付款方式 → 確認訂單。完成後系統會自動寄送訂單通知,並推送 LINE 訊息(若已綁定)。" },
      { q: "私版客製如何詢價?", a: "於私版商品頁填寫詢價單,提供商品規格、數量、Logo 檔(若有);業務專員會在 2 個工作天內回覆報價,雙方確認後再付訂金轉正式訂單。" },
      { q: "可以同時下公版 + 私版嗎?", a: "可以。公版商品為現貨即出,私版需製作 2–4 週,一張訂單可分批出貨。建議若兩者時程差異大,可分開下單。" },
      { q: "最低訂購量是多少?", a: "公版商品依品項而定,最低多為 50 件起;私版客製最低 1,000 件起製。" },
    ],
  },
  {
    cat: "付款與發票",
    qs: [
      { q: "支援哪些付款方式?", a: "信用卡(綠界刷卡,支援一次付清)、一般匯款(會計核帳後出貨)、貨到付款(部分宅配支援)、自取現場付款。" },
      { q: "未匯款訂單會自動取消嗎?", a: "會,訂單成立後 7 天內未匯款會自動取消(實際期限以 HJ 設定為主)。建議下單後盡快匯款並留言通知。" },
      { q: "發票何時開立?", a: "信用卡 / ATM 付款 = 付款完成自動開立;匯款 = 會計核帳後開立。可選擇紙本、電子或雲端載具(手機條碼 / 自然人憑證)。" },
      { q: "退換貨發票怎麼處理?", a: "依退款方式:全退 = 發票作廢重開;部分退 = 開立折讓單。請聯繫客服協助處理。" },
    ],
  },
  {
    cat: "運送與退換",
    qs: [
      { q: "運費怎麼計算?", a: "依重量 / 體積 / 地區計算,滿 NT$ 3,000 免運。離島地區會額外加收運費,結帳頁會試算。" },
      { q: "離島地區可以宅配嗎?", a: "目前支援澎湖 / 金門 / 馬祖 / 綠島 / 蘭嶼 / 小琉球 / 東引 / 烏坵 8 個地區,需另加離島運費,部分商品因法規不可運送。" },
      { q: "如何查詢出貨狀態?", a: "訂單頁面會顯示物流商與單號,點擊「查詢運送狀態」會開新分頁到物流商官網查詢。" },
      { q: "可以退換貨嗎?", a: "公版商品鑑賞期 7 天內可申請退換,需透過客服(LINE / 電話)聯繫;私版客製因為已生產,原則上不接受退貨,品質瑕疵除外。" },
    ],
  },
  {
    cat: "會員與帳戶",
    qs: [
      { q: "如何註冊會員?", a: "於右上角「登入 / 註冊」點擊註冊,可使用 Email 或 LINE 快速註冊;若您是 HJ 既有客戶,系統會自動綁定您的客戶編號與歷史訂單。" },
      { q: "會員等級怎麼分?", a: "依採購地區與通路分為:北部直客、北部盤商、中南部直客、中南部盤商,不同等級有不同報價,由業務專員指派。" },
      { q: "可以查到過去的訂單嗎?", a: "可以,會員中心會顯示新網站訂單 + 過去 2 年凌越歷史訂單,並提供「再購買」快速重新下單功能。" },
    ],
  },
];

function AccordionItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-zinc-100 last:border-b-0">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between gap-4 py-5 text-left hover:text-amber-700"
      >
        <span className="text-base font-medium text-zinc-900">{q}</span>
        <span className={`size-6 shrink-0 transition-transform ${open ? "rotate-180" : ""}`}>▾</span>
      </button>
      {open && (
        <div className="pb-5 pr-10 text-sm leading-relaxed text-zinc-600">{a}</div>
      )}
    </div>
  );
}

export default function FaqPage() {
  return (
    <main className="min-h-dvh bg-zinc-100">
      <ModuleHero
        no="F6"
        title="常見問題 Q&A"
        subtitle="FAQ"
        desc="訂購流程 · 付款發票 · 運送退換 · 會員帳戶"
        tone="amber"
      />
      <section className="bg-zinc-200/70 px-6 py-10">
        <div className="mx-auto max-w-[1760px]">
          <MockupCmsPage
            url="https://hj.example.com/faq"
            pageTitle="常見問題"
            pageDesc="找不到答案?歡迎透過 LINE 客服或聯絡表單詢問。"
            breadcrumb={[{ label: "常見問題" }]}
          >
            <div className="grid grid-cols-4 gap-8">
              {/* Sidebar nav */}
              <aside className="sticky top-6 self-start">
                <div className="rounded-xl border border-zinc-200 bg-white p-5">
                  <div className="text-xs font-medium uppercase tracking-widest text-zinc-500">分類</div>
                  <nav className="mt-3 space-y-1">
                    {FAQ_GROUPS.map((g, i) => (
                      <a
                        key={g.cat}
                        href={`#cat-${i}`}
                        className="block rounded px-2 py-1.5 text-sm text-zinc-700 hover:bg-amber-50 hover:text-amber-700"
                      >
                        {g.cat}
                      </a>
                    ))}
                  </nav>
                </div>
                <div className="mt-5 rounded-xl bg-amber-50 p-5">
                  <div className="text-sm font-bold text-amber-900">沒找到答案?</div>
                  <p className="mt-2 text-xs text-amber-800">透過 LINE 客服或聯絡表單,我們會在 1 個工作天內回覆。</p>
                  <button className="mt-3 w-full rounded-md bg-amber-500 px-3 py-2 text-xs font-medium text-white">
                    聯絡客服 →
                  </button>
                </div>
              </aside>

              {/* Body */}
              <div className="col-span-3 space-y-10">
                {FAQ_GROUPS.map((g, i) => (
                  <section key={g.cat} id={`cat-${i}`}>
                    <h3 className="text-xl font-bold text-zinc-900">{g.cat}</h3>
                    <div className="mt-4 rounded-xl border border-zinc-200 bg-white px-6">
                      {g.qs.map((qa) => (
                        <AccordionItem key={qa.q} q={qa.q} a={qa.a} />
                      ))}
                    </div>
                  </section>
                ))}
              </div>
            </div>
          </MockupCmsPage>
        </div>
      </section>
      <ModuleFooterNav
        prev={{ title: "最新消息", href: "/modules/news" }}
        next={{ title: "隱私權政策", href: "/modules/policy" }}
      />
    </main>
  );
}
