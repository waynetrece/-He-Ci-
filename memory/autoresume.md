# Autoresume - HJ Proposal

> 更新時間：2026-05-01
> 用途：下次新視窗快速接續目前最新狀態。

## 一句話狀態

HJ 窗口已回覆確認問題，並提供凌越 ERP API 文件；`最佳拍檔API.pdf` 207 頁已完整重讀並與 Claude 的 API 索引規則對齊。mockup 仍先不要動，下一步以 `discussions/hj-maya-to-hj-confirmation-items.md`、`discussions/hj-maya-to-lingyue-api-confirmation-items.md`、`discussions/hj-api-207-full-read-reanalysis.md` 為主檔，等 Wayne 提供 Claude 分析後再做差異核對。

## 最新 commit

- 工作區目前新增 2026-05-01 API 207 頁重讀、HJ/凌越分流問題、金物流材積判斷文件，尚待 Wayne review 後再決定是否提交。
- `c7706e6 docs(line): 記錄客製詢價 LINE 決策`
- `a0ed40c docs(line): LINE 整合可行性調研 — Messaging API 取代已停用的 Notify`
- `6c8386d docs(progress): 記錄 HJ 客戶問題已送窗口`
- `ae6865b docs(client-questions): 新增 HJ 窗口確認 Word 檔`
- `91d9809 docs(client-questions): 移除第一版用語`
- `3173df5 docs(client-questions): 整理 HJ 客戶確認問題版`

## 目前已送窗口的檔案

- Word：`exports/HJ-網站需求確認問題清單.docx`
- Repo Markdown：`discussions/hj-client-confirmation-questions.md`
- Obsidian Markdown：`1-Projects/禾啟HJ-餐飲包材電商/13-提供客戶確認問題清單.md`
- Obsidian Word：`1-Projects/禾啟HJ-餐飲包材電商/HJ-網站需求確認問題清單.docx`

## 目前不再只是等待

- 窗口已回覆確認問題清單。
- 凌越 API 文件已收到。
- 凌越 API 207 頁已重讀並整理成共同索引與問題分流。
- 金物流 / 材積判斷已確認：不硬推給凌越；凌越只問資料欄位與物流單號回寫，配送可行性由 HJ 規則 + 馬亞網站邏輯 + 金物流規範判斷。
- API 文件確認方向已收斂：重點是判斷「文件是否清楚到馬亞可直接對接」，以及缺哪些 endpoint、帳密、公司代號、可用 `idakd`、必填欄位、XML 範例、測試資料與欄位對照；不要把 SEO、商品文案、網站上下架這類網站功能拿去問凌越。
- 下一步等 Wayne 提供 Claude API 分析後，再做差異核對。
- 仍不直接進 mockup；先確認客戶規則、馬亞技術方案、凌越 API 補件。

## LINE 客製詢價目前定論

- HJ 已有 LINE 官方帳號 `@hjhjtw`，目前沒有第三方 LINE 客服系統。
- 正式詢價資料應存在網站後台，不只放在 LINE 對話。
- 目標流程：客戶送出私版客製需求後，網站建立詢價單，並自動傳詢價摘要到客戶 LINE。
- 保底流程：若客戶尚未加好友 / 尚未綁定 LINE / 推播失敗，網站仍建立詢價單，並顯示 HJ LINE 與詢價編號，讓客服人工接續。
- 詳見 `discussions/line-integration-research.md`。

## 下次接手先讀

1. `memory/checkpoint.md`
2. `memory/claude-handoff.md`
3. `discussions/codex-handoff.md`
4. `discussions/lyserp-api-reference-index.md`
5. `discussions/hj-api-207-full-read-reanalysis.md`
6. `discussions/hj-maya-to-hj-confirmation-items.md`
7. `discussions/hj-maya-to-lingyue-api-confirmation-items.md`
8. `discussions/hj-ecpay-logistics-volume-judgement.md`
9. 舊版初稿可參考：`discussions/hj-window-reply-api-architecture-review.md`、`discussions/hj-followup-questions-customer-maya-lingyue.md`
10. 如果接 LINE 題：`discussions/line-integration-research.md`

## 下次接手不要做

- 不要回到舊 31 題或 `window-line-batch2.md` 擴寫。
- 不要主動修改 cart / checkout / success mockup。
- 不要主動修改會員、公版、私版 mockup 的問題文字。
- 不要把 `discussions/advanced-features-memo.md` 給客戶或混進客戶問題。
- 不要再用「第一版」這個詞給客戶；客戶版統一用「網站正式上線時」或具體問法。
- 不要把 LINE 描述成「已接第三方客服系統」或「LINE 自動報價」。

## 下次安全起手式

如果 Wayne 要繼續：

1. 先 review `hj-window-reply-api-architecture-review.md`。
2. 再 review `hj-followup-questions-customer-maya-lingyue.md`。
3. 目前新版主檔是 `hj-api-207-full-read-reanalysis.md`、`hj-maya-to-hj-confirmation-items.md`、`hj-maya-to-lingyue-api-confirmation-items.md`。
4. 若 Wayne 提供 Claude 的 API 分析，先依 `discussions/codex-handoff.md` 規則核對，衝突或補充直接改 `lyserp-api-reference-index.md` 並追加 handoff 紀錄。
5. 等架構與 API 問題收斂後，再決定 mockup 調整範圍。

如果 Wayne 只是說「繼續」：

> 目前窗口回覆與凌越 API 文件已整理成架構/API 判讀草稿；下一步應先審 `discussions/hj-window-reply-api-architecture-review.md` 與 `discussions/hj-followup-questions-customer-maya-lingyue.md`，不要先改 mockup。
