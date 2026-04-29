# LINE 整合可行性調研

> 日期：2026-04-29
> 任務：確認「網站客製商品訂購後能不能拋到 LINE 客服」+ 延伸功能 + 實作文件
> 對應 PDF：私版商品 (1)(2)「轉 LINE 客服報價」「下單轉 LINE 客服」+ 會員 (1)(2) 訂單配送狀態
> HJ 既有：LINE@ `@hjhjtw`

---

## 一、一句話結論

**能。**

透過 **LINE Messaging API** 的 Push API，網站後端可以把任何訊息（純文字、圖片、報價單卡片、訂單卡片）主動推到：
- HJ 的 LINE 官方帳號（OA 後台多客服都看得到）
- 客服群組（OA + 業務都加入的群組）
- 特定業務的 LINE（業務先加 OA 好友後可推）

---

## 二、重要更新：LINE Notify 已停用

> 2025/3/31 LINE 官方關閉了 LINE Notify 服務。

之前 Obsidian 08 文件提的「LINE Notify」**已不能再用**。所有「網站推訊息給 LINE」都要改用 Messaging API。

來源：[LINE Notify 停用公告](https://notify-bot.line.me/closing-announce/)

---

## 三、實作架構（從零到能推訊息）

```
[HJ 網站後端]
   ↓ POST https://api.line.me/v2/bot/message/push
   ↓ Header: Authorization: Bearer {channel access token}
   ↓ Body: { "to": "<userId / groupId>", "messages": [...] }
   ↓
[LINE 平台]
   ↓
[LINE OA / 群組 / 業務手機] ← 收到訊息
```

### 起步步驟

1. **HJ 已有 LINE OA**（@hjhjtw）— 已過第一關
2. **登入 LINE Developers Console**（https://developers.line.biz/console/）
3. **建立 Messaging API Channel**，綁到 @hjhjtw 這個 OA
4. **取得 Channel Access Token + Channel Secret**（網站後端要用）
5. **網站後端寫 push 邏輯**（訂單成立後呼叫 push API）

---

## 四、三種「拋到 LINE 客服」的推送對象

| 對象 | 怎麼接收 | 適合情境 |
|---|---|---|
| **A. OA 自己（push 到 OA channel）** | OA 後台「聊天室」→ 多客服可同時看 / 處理 | 客戶主動詢價的訊息會進這 |
| **B. LINE 群組** | OA + 業務都加入同一群組 → 推到群組 | **訂單通知最常見的做法**：業務都看得到 |
| **C. 個別業務 LINE** | 業務先加 OA 好友 → 取得業務 userId → 推給特定業務 | 私版客製訂單派工 |

> 推到 OA channel 後，**OA 後台多客服模式** 可以讓 N 個業務同時值班 / 接手；要看 LINE OA 方案有沒有支援多客服。

---

## 五、程式碼範例

### Node.js（HJ 網站後端用）

```js
// 客戶下單成功後呼叫
async function pushOrderToLine(order) {
  const message = {
    to: process.env.LINE_GROUP_ID, // 客服群組 ID
    messages: [
      {
        type: 'text',
        text: `🆕 新訂單 ${order.id}\n客戶：${order.customer.name}\n商品：${order.items[0].name} × ${order.items[0].qty}\n金額：NT$ ${order.total}\n收件：${order.shipping.address}`
      }
    ]
  };

  await fetch('https://api.line.me/v2/bot/message/push', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.LINE_CHANNEL_ACCESS_TOKEN}`
    },
    body: JSON.stringify(message)
  });
}
```

### curl 測試（最快驗證）

```bash
curl -X POST https://api.line.me/v2/bot/message/push \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer {YOUR_CHANNEL_TOKEN}' \
  -d '{
    "to": "U4af4980629...",
    "messages": [
      { "type": "text", "text": "新訂單測試" }
    ]
  }'
```

### 進階：用 Flex Message 做訂單卡片

`messages[]` 不只能放純文字。LINE 提供 **Flex Message** — 可以做出有商品圖、規格、金額、按鈕的訂單卡片。例如：

```
┌──────────────────┐
│ [商品圖]          │
│ 客製禮盒 × 200    │
│ NT$ 18,000       │
│ 客戶：陳先生       │
│ [查看訂單詳情]     │
└──────────────────┘
```

點按鈕可以連回網站訂單詳情頁。

---

## 六、延伸功能（HJ 可考慮的）

依 PDF + 業界做法，網站 + LINE 整合可以做：

### 6.1 訂單事件通知（最直接的價值）

- 客戶下訂單 → 推給客服群組 / 業務（**這就是 Wayne 問的核心需求**）
- 客戶付款完成 → 推給會計 + 業務
- 出貨 → 推給客戶（要客戶加 OA 為好友才能推）
- 送達 → 推給客戶
- 退換貨申請 → 推給客服群組

### 6.2 私版報價推送

- 客戶在網站填好私版規格 → 系統算出報價 → push 報價單卡片給客戶
- 客戶按卡片按鈕「確認報價」→ 觸發訂單成立

### 6.3 LINE Login（會員一鍵註冊）

- PDF 寫「註冊方式：LINE / Email」
- 客戶點「用 LINE 登入」→ 自動取得 LINE 名稱 / 頭像 / Email → 直接註冊會員
- 後續客戶在 LINE 跟 OA 對話時，OA 可自動辨識「這是 X 客戶，他下過 Y 單」

### 6.4 LIFF（LINE 內開網頁）

- LIFF = LINE Front-end Framework，可以把網頁直接嵌進 LINE 聊天介面
- 例：客戶在 LINE 跟業務聊天 → 業務點訊息打開「報價單填寫」LIFF → 客戶在 LINE 內就能填 → 不用切到瀏覽器
- B2B 客製包材報價非常適合（客戶不想離開 LINE）

### 6.5 Rich Menu（圖文選單）

- LINE OA 聊天視窗下方的固定圖文按鈕區
- HJ 可放：「私版報價」/「歷史訂單」/「樣品申請」/「客服」
- 客戶點 → 直接導去網站對應頁面（或開 LIFF）

### 6.6 1 對 1 客服聊天免費

- LINE OA 後台「聊天室」介面，業務可以即時回客戶
- **這部分不收費**，只有 HJ 主動「群發 / push」訊息才扣額度

---

## 七、費用（台灣 2026 LINE OA 方案）

| 方案 | 月費（未稅）| 免費訊息 / 月 | 超過後 | HJ 適用？ |
|---|---|---|---|---|
| 輕用量 | 免費 | 200 則 | 不可加購 | ❌ 太少 |
| 中用量 | NT$ 800 | 3,000 則 | 不可加購 | ✅ **建議起步** |
| 高用量 | NT$ 1,200 | 6,000 則 | NT$ 0.2 / 則起 | 視訂單量升級 |

### HJ 預估訊息量

假設 HJ 每月 200 張訂單，每張平均 3 則通知（成立 / 出貨 / 送達）= **600 則 / 月**。
- 中用量（3,000 則）有充裕空間
- 即使升級到 500 張訂單 / 月（1,500 則）也還在中用量範圍

> **重要**：1 對 1 客服回覆、自動回覆、加好友歡迎訊息**都不算**訊息額度。只有「主動 push」才扣。

### 開發費（一次性）

- Messaging API 整合（push 訂單通知到群組）：較簡單
- LINE Login 整合：中等
- Flex Message 訂單卡片：中等
- LIFF 嵌入網頁：中等
- Rich Menu 設計與設定：簡單

具體開發費由 HJ 決定要做哪些功能後再估。

---

## 八、對應 PDF / 既有 scope

| PDF 條目 | LINE 整合對應 |
|---|---|
| 官網 (3) 註冊方式 LINE / Email | LINE Login |
| 私版商品 (1) 部分複雜客製轉 LINE 客服報價 | Push API + Flex Message 報價卡片 |
| 私版商品 (2) 客服、客人提供原始檔、下單均轉 LINE 客服 | Push API + 1 對 1 客服 + LIFF |
| 會員 (1) 查詢歷史訂單，再購買一次按鈕 | LIFF（在 LINE 內開歷史訂單）|
| 會員 (2) 訂單配送狀態 | Push API（出貨 / 送達通知）|
| 03 #27 是否保留 LINE@ | ✅ 保留 + 升級成 OA + Messaging API 串接 |

---

## 九、要補問 HJ 窗口的問題

> 這幾題已經部分包含在 `hj-client-confirmation-questions.md` 待客戶回覆，但本份 LINE 調研讓問題更具體。

1. **訂單通知接收方式**
   - 推到 LINE OA（@hjhjtw 後台多客服）？
   - 推到專屬「訂單通知」LINE 群組（OA + 業務都加入）？
   - 推給特定業務的個人 LINE？

2. **要通知哪些訂單事件**
   - 成立 / 付款完成 / 備貨中 / 出貨 / 送達 / 退換貨 — 全部？挑哪幾個？

3. **LINE Login 是否要做**
   - PDF 寫「LINE / Email 註冊」— 是真的要 LINE 一鍵登入，還是 Email 註冊 + LINE 客服？
   - 若要 LINE Login，HJ 是否同意 LINE 帳號跟凌越客戶編號要對在一起？

4. **私版報價是否要做 LINE Flex 卡片**
   - 客戶在網站送出私版需求 → 業務報價 → push 卡片到客戶 LINE，客戶按「確認」就成立訂單？
   - 還是維持現有方式（業務 LINE 文字回覆，客戶回網站結帳）？

5. **LINE OA 方案決策**
   - 目前 @hjhjtw 是哪個方案？月訊息量大概多少？
   - 預期上線後要升級到中用量（NT$ 800/月）嗎？

---

## 十、注意事項 / 風險

1. **訊息額度限制**：超過免費額度後，輕用量 / 中用量都「不能加購」要等下個月。HJ 要評估月訊息量挑對方案。

2. **客戶必須先加 OA 為好友才能推**：如果要直接推訊息給客戶（出貨通知、報價卡片），客戶必須先加 @hjhjtw 為好友。網站可放「加 LINE 好友送樣品」之類引導。

3. **LINE Login 要 OA 認證帳號**：取得用戶 Email 需要 OA 升級成「認證帳號」（藍盾）。HJ 是否已認證需要確認。

4. **多客服功能**：要 OA 後台多客服同時值班，要看方案有沒有開放（業務行銷功能）。

5. **資料隱私**：透過 Messaging API 推送的訊息會經過 LINE 平台，敏感資料（信用卡末 4 碼、客戶身分證等）建議只放訂單編號 + 連回網站詳情頁。

---

## 十一、給 HJ 的提案建議

LINE 整合對 HJ 是**差異化亮點**，特別是：

- ✅ B2B 包材業客戶習慣用 LINE 溝通（PDF 也明確要轉 LINE）
- ✅ 既有 @hjhjtw 不浪費，直接升級成 OA + API 串接
- ✅ 開發成本一次性，月費低（NT$ 800/月）
- ✅ 取代 SHOPLINE 沒有的「網站 + LINE 雙向打通」體驗

第一版建議優先做：
1. **訂單事件通知**（push 到客服群組）— 直接解決 PDF「下單轉 LINE 客服」需求
2. **LINE Login**（PDF 已要求）

第二版可加：
3. **Flex Message 報價卡片**（私版報價推送）
4. **LIFF 訂單查詢**（會員體驗升級）
5. **Rich Menu**（提升 OA 互動性）

---

## 十二、官方文件連結

- **Messaging API 總覽**：https://developers.line.biz/en/docs/messaging-api/overview/
- **發送訊息（Push API）**：https://developers.line.biz/en/docs/messaging-api/sending-messages/
- **API 參考**：https://developers.line.biz/en/reference/messaging-api/
- **LINE Login**：https://developers.line.biz/en/docs/line-login/
- **LIFF**：https://developers.line.biz/en/docs/liff/overview/
- **Flex Message**：https://developers.line.biz/en/docs/messaging-api/using-flex-messages/
- **LINE Notify 停用公告**：https://notify-bot.line.me/closing-announce/
- **台灣 LINE OA 方案費率**（2026 整理）：https://www.anyong.com.tw/37452
- **LINE Biz-Solutions（台灣）**：https://tw.linebiz.com/

---

## 十三、調研結論給 Wayne

| 問題 | 答案 |
|---|---|
| 網站客製商品訂購後能不能拋到 LINE 客服？ | **能**。用 Messaging API 的 Push API |
| 用什麼技術？ | LINE Messaging API（取代已停用的 LINE Notify）|
| HJ 已有的資源 | LINE@ `@hjhjtw`（升級成 OA 即可用）|
| 起步成本 | 月費 NT$ 800（中用量）+ 一次性開發費 |
| 延伸功能 | 訂單通知 / LINE Login / Flex 報價卡片 / LIFF / Rich Menu |
| 對 HJ 的價值 | 差異化亮點，符合 B2B 包材業客戶 LINE 溝通習慣 |
| 跟 PDF 的對應 | 私版 (1)(2)「轉 LINE」直接解決；會員 (2) 訂單狀態通知；官網 (3) LINE 註冊 |

可以推給 HJ 作為提案賣點。建議在客戶回覆窗口問題後，把這些 LINE 延伸功能列入第一版 / 第二版討論範圍。
