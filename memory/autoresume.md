# Autoresume - HJ Proposal

> 更新時間：2026-04-29
> 用途：下次新視窗快速接續目前最新狀態。

## 一句話狀態

HJ 客戶確認問題已整理成 Word 並提供給窗口，目前等待窗口回覆；另外已補 LINE 客製詢價決策：**B 自動傳詢價摘要到客戶 LINE 是目標，A 人工加 LINE + 詢價編號是保底**。回覆前不要再主動調整 mockup / cart / checkout / success。

## 最新 commit

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

## 目前等待

- 等 HJ 窗口回覆確認問題清單。
- 回覆後再依答案調整既有 mockup、版面、Q 和 scope 文件。
- 若 HJ 回 LINE 題，先判斷是否同意「B 目標 + A 保底」；不要把 LINE 寫成第三方客服系統。

## LINE 客製詢價目前定論

- HJ 已有 LINE 官方帳號 `@hjhjtw`，目前沒有第三方 LINE 客服系統。
- 正式詢價資料應存在網站後台，不只放在 LINE 對話。
- 目標流程：客戶送出私版客製需求後，網站建立詢價單，並自動傳詢價摘要到客戶 LINE。
- 保底流程：若客戶尚未加好友 / 尚未綁定 LINE / 推播失敗，網站仍建立詢價單，並顯示 HJ LINE 與詢價編號，讓客服人工接續。
- 詳見 `discussions/line-integration-research.md`。

## 下次接手先讀

1. `memory/checkpoint.md`
2. `memory/claude-handoff.md`
3. `discussions/scope-checklist.md` §18
4. `discussions/hj-client-confirmation-questions.md`
5. 如果接 LINE 題：`discussions/line-integration-research.md`

## 下次接手不要做

- 不要回到舊 31 題或 `window-line-batch2.md` 擴寫。
- 不要主動修改 cart / checkout / success mockup。
- 不要主動修改會員、公版、私版 mockup 的問題文字。
- 不要把 `discussions/advanced-features-memo.md` 給客戶或混進客戶問題。
- 不要再用「第一版」這個詞給客戶；客戶版統一用「網站正式上線時」或具體問法。
- 不要把 LINE 描述成「已接第三方客服系統」或「LINE 自動報價」。

## 下次安全起手式

如果 Wayne 貼窗口回覆：

1. 先把回覆整理成「已確認 / 仍待確認 / 影響 mockup 的決策」三類。
2. 再對照 `discussions/hj-client-confirmation-questions.md` 題號。
3. 只調整和回覆直接相關的 mockup / 文件。
4. 調整前先說明會改哪些頁面或文件。

如果 Wayne 只是說「繼續」：

> 目前等待 HJ 窗口回覆；若已收到回覆，請貼回覆內容，我再依答案調整既有版面與問題。
