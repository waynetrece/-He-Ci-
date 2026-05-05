# Autoresume - HJ Proposal

> 更新時間：2026-05-05
> 用途：下次新視窗快速接續目前最新狀態。

## 一句話狀態

目前主線是 HJ 報價單草案整理；`discussions/hj-quote-draft.md` 已更新為草案 v16 工作稿，參考馬亞既有報價單語氣，但依 HJ 架構重新撰寫設計與程式內容。v16 主案未稅 `$1,035,250`、含稅 `NT$ 1,087,013`，待 Wayne review 後才輸出正式客戶版。

## Git / 工作區

- 分支：`main`
- 遠端狀態：`main...origin/main`
- 最新 HEAD：`2b1d7c1 docs(quote): v14-v15 — 加彈跳元件設計 $4,500;全站搜尋改商品搜尋 $25K→$15K`
- 本機未提交檔案：`memory/checkpoint.md`、`memory/autoresume.md`、`memory/claude-handoff.md`

## 目前報價單狀態

- 主檔：`discussions/hj-quote-draft.md`
- 目前工作稿：草案 v16
- 設計區：`$157,000`
- 程式設計與資料庫規劃：`$869,000`
- 我們的服務：`$9,250`
- 主案含稅：`NT$ 1,087,013`
- 選配 A+B+C 全包後含稅：約 `NT$ 1,218,263`
- v16 已修正：項目流水號、設計/程式小計、稅額、50/30/尾款金額、樣品需登入、私版原始檔走 LINE；設計區改成頁面清單避免表格文字過長，程式區依 HJ 架構擴寫，公版商品前台收斂為列表頁 + 內容頁，不列商品比較功能；公告欄 / 彈跳視窗 / 浮動按鈕補為前端共用元件設計 1 組；搜尋改為公版商品搜尋，不做全站搜尋。Mockup 也已清除商品比較入口與 `/modules/products/compare` 頁。

## 下次安全起手式

1. 先讀 `memory/checkpoint.md` 的 2026-05-05 區塊。
2. 檢查 `git diff -- discussions/hj-quote-draft.md`。
3. 請 Wayne 先 review v16 金額、模組拆法與文字語氣。
4. Wayne 確認後，再輸出正式客戶版 Excel / Word / PDF 到 `exports/`。
5. 除已依 Wayne 明確回饋清除公版商品比較功能外，其他 mockup 仍先不要主動改；目前主線是報價單 / scope / 金額收斂。

## LINE 客製詢價目前定論

- HJ 已有 LINE 官方帳號 `@hjhjtw`，目前沒有第三方 LINE 客服系統。
- 正式詢價資料應存在網站後台，不只放在 LINE 對話。
- 目標流程：客戶送出私版客製需求後，網站建立詢價單，並自動傳詢價摘要到客戶 LINE。
- 保底流程：若客戶尚未加好友 / 尚未綁定 LINE / 推播失敗，網站仍建立詢價單，並顯示 HJ LINE 與詢價編號，讓客服人工接續。
- 詳見 `discussions/line-integration-research.md`。

## 下次接手先讀

1. `memory/checkpoint.md`
2. `memory/claude-handoff.md`
3. `discussions/hj-quote-draft.md`
4. 如果需要回看 API / scope 判斷：`discussions/codex-handoff.md`、`discussions/lyserp-api-reference-index.md`、`discussions/hj-api-207-full-read-reanalysis.md`

## 下次接手不要做

- 不要回到舊 31 題或 `window-line-batch2.md` 擴寫。
- 不要主動修改 cart / checkout / success mockup。
- 不要主動修改會員、私版 mockup 的問題文字；公版商品 mockup 僅清除 Wayne 指定不要的商品比較功能。
- 不要把 `discussions/advanced-features-memo.md` 給客戶或混進客戶問題。
- 不要再用「第一版」這個詞給客戶；客戶版統一用「網站正式上線時」或具體問法。
- 不要把 LINE 描述成「已接第三方客服系統」或「LINE 自動報價」。
- 不要把 v16 工作稿直接當作可發送客戶版。
