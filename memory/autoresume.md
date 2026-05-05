# Autoresume - HJ Proposal

> 更新時間：2026-05-05
> 用途：下次新視窗快速接續目前最新狀態。

## 一句話狀態

目前主線已推進到 HJ 報價單草案整理；HEAD 是 `e58c587` 報價單 v8，`main` 目前 ahead origin 5 commits。`discussions/hj-quote-draft.md` 有本機未提交修訂，但尚未可交付，下一步要先清理編號與金額總計，再決定是否升成 v9。

## Git / 工作區

- 分支：`main`
- 遠端狀態：`main...origin/main [ahead 5]`
- 最新 HEAD：`e58c587 docs(quote): v8 — 拿掉 FAQ(對齊 HJ 原始需求,FAQ 不在 1150422 列表內)`
- 唯一未提交檔案：`discussions/hj-quote-draft.md`

## 目前報價單狀態

- 主檔：`discussions/hj-quote-draft.md`
- 目前 committed 版本：草案 v8
- v8 重點：FAQ 已從主案移除；v8 金額為未稅 `$1,070,750`、含稅 `NT$ 1,124,288`。
- 本機修訂方向：CMS 6 頁改 4 頁、最新消息併入行銷活動 / 部落格、設計小計改 `$161,500`。
- 本機修訂問題：多個項目編號重複為 `13`，報價總計仍有舊設計小計 `$170,500`，金額需重算。

## 下次安全起手式

1. 先讀 `memory/checkpoint.md` 的 2026-05-05 區塊。
2. 檢查 `git diff -- discussions/hj-quote-draft.md`。
3. 先不要產出客戶版檔案；要先修正流水號與總金額。
4. 若 Wayne 同意保留本機修訂方向，再把報價草案升成 v9。
5. mockup 仍先不要主動改；目前主線是報價單 / scope / 金額收斂。

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
- 不要主動修改會員、公版、私版 mockup 的問題文字。
- 不要把 `discussions/advanced-features-memo.md` 給客戶或混進客戶問題。
- 不要再用「第一版」這個詞給客戶；客戶版統一用「網站正式上線時」或具體問法。
- 不要把 LINE 描述成「已接第三方客服系統」或「LINE 自動報價」。
- 不要把目前本機 dirty 的報價草案當作可交付版。
