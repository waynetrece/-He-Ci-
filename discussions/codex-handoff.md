# Codex Handoff — LYSERP / 最佳拍檔 API 文件研讀

> 建立日期：2026-05-01
> 建立者：Claude（在 Wayne 的指示下）
> 對象：Codex
> 用途：Claude 讀完凌越/最佳拍檔 API 文件，整理出索引；交接給 Codex，作為兩端對齊的共同基準。

---

## 主交付物

若要先理解本輪 Codex 整理的背景、經過與審核重點，請先讀：

```
/Users/waynechen/01_開發專案/proposals/hj-proposal/discussions/claude-review-brief-hj-api.md
```

請直接讀這份索引檔：

```
/Users/waynechen/01_開發專案/proposals/hj-proposal/discussions/lyserp-api-reference-index.md
```

需要對照原始 PDF 時：

- `/Users/waynechen/Downloads/最佳拍檔API.pdf`（207 頁，欄位明細）
- `/Users/waynechen/Downloads/凌越_最佳拍檔_API匯出入資料清單說明.pdf`（5 頁，五個 API 函式 + XML 範例）

兩份檔都已驗證為文字型 PDF（無 OCR 問題、無亂碼、無截斷）。

---

## 索引涵蓋

1. **5 個 API 函式**：`LyGetPassKey` / `LyDataIn` / `LyDataOut` / `LyDataDel` / `LyDataPage` 與其傳入/回傳；protocol 細節（金鑰 30 秒過期、XML 結構、`imode` 30 BYTES、過濾式 `@v1@` / 多值 `@#1#@`）
2. **資料類別代碼總表**：~50 個 idakd → 名稱 → 欄位前綴 → 主檔頁區段 → HJ 站用途，分共用基本資料 / 營銷單據 / 生產製造單據 / 會計傳票
3. **HJ 網站對應重點**：商品 `SK_*`、訂單 `OR_*`/`OD_*`、私版詢價 `0000A5`、即時庫存 `000009`、收款 `0000A3`、銷項發票 `0000AS` 的核心欄位
4. **關鍵代碼速查**：計稅、收款類別、交貨狀態、配件類別、驗收狀態、imode 規則
5. XML 範例
6. **HJ 整合優先序清單**（P0~P3）
7. **10 條需要跟凌越窗口確認的雷區**（金鑰過期、大小寫慣例、單號編碼權、發票隨機碼、圖片路徑、庫存扣減時機、私版轉訂單流程、單向表、退貨自動作廢、經銷旗標）
8. 未來查表流程

---

## 兩端對齊請求

1. 請以這份索引為共同基準。如果 Codex 的進度有任何資訊與索引衝突或補充，**直接編輯索引檔**（不要另開），並在本檔案下方「對齊紀錄」區追加一筆，註明日期/修改點/原因。
2. 如果發現索引有錯或漏，同上。
3. 索引僅是地圖；實作細節仍以 PDF 原文為主。
4. 第 7 段「雷區」是要丟給 HJ 窗口/凌越窗口確認的問題清單，請不要逕自假設答案。Codex 若已經拿到答案，請更新索引並在本檔註記。

---

## 當前 HJ 專案狀態（同步給 Codex）

- 公開站：https://hj-proposal.vercel.app/
- 既有：架構總覽 + 公版商品 3 頁 + 私版報價 2 頁 + 會員系統 7 頁 + 購物車/結帳/成功頁
- 進行中決策：客製詢價走 LINE 方案 B（目標）/ A（保底）— 詳見 `discussions/line-integration-research.md`
- **正在等**：HJ 窗口回覆 32 題客戶確認清單（`discussions/hj-client-confirmation-questions.md`），回覆前不主動改 mockup / cart / checkout / success / scope
- 此次拿到的 ERP API 文件（凌越/最佳拍檔）= 後端整合的真實規格；可開始研究商品/訂單/庫存/發票串接設計，但先不動既有 mockup

---

## 對齊紀錄（之後雙方修改索引時請追加）

| 日期 | 修改人 | 變更摘要 | 原因 |
|---|---|---|---|
| 2026-05-01 | Claude | 建立 `lyserp-api-reference-index.md`（370 行） | 讀完 PDF 後初版 |
| 2026-05-01 | Codex | 補充金物流與材積判斷分工；新增 `hj-ecpay-logistics-volume-judgement.md`，並在索引雷區追加第 11 點 | 核對綠界官方物流文件後，確認配送可行性需網站先判斷，不能假設金物流自動處理材積 |
| 2026-05-01 | Codex | 修正材積分工措辭：問凌越只確認 ERP 欄位與物流單號回寫，不把配送規則硬推給凌越 | Wayne 提醒 API 文件與材積規則若無直接關聯，不應硬推給凌越 |
| 2026-05-01 | Codex | 新增 `claude-review-brief-hj-api.md`，整理專案狀態、文件來源、本輪經過、核心結論與 Claude 審核重點 | Wayne 要 Claude 審核時能清楚理解整個內容與經過 |
| 2026-05-02 | Codex | 新增 `codex-response-to-claude-followup.md`，回覆 Claude Q1-Q6，收斂 HJ 10 主題、凌越 4 題、內部架構備忘與 kickoff 待辦 | Claude followup 要 Codex 回饋後再交 Wayne 拍板 |
