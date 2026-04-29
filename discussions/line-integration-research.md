# LINE 客製詢價整合調研與決策紀錄

> 日期：2026-04-29
> 任務：確認「私版客製商品資料能否自動帶到 LINE，讓 HJ 後續用 LINE 報價」
> 對應 PDF：私版商品「轉 LINE 客服報價」「下單轉 LINE 客服」+ 官網「LINE / Email 註冊」
> HJ 既有：已確認有 LINE 官方帳號 `@hjhjtw`，未使用第三方 LINE 客服系統

---

## 1. 一句話結論

**可以做，但不要把它定義成第三方 LINE 客服系統。**

比較準確的規劃是：

> 網站建立正式的私版客製詢價單，並透過 HJ 的 LINE 官方帳號把詢價摘要送給客戶；HJ 人員再用 LINE 官方帳號聊天功能人工接續報價。

目前決策：

- **B 當正式目標**：客戶送出私版客製需求後，LINE 自動收到詢價摘要。
- **A 當保底流程**：如果客戶還沒加 LINE / 還沒綁定 LINE，網站仍建立詢價單，並提示客戶加入 LINE、提供詢價編號。
- **正式資料不只放 LINE**：詢價單、商品規格、數量、備註、報價狀態仍以網站後台資料庫為準。

---

## 2. 客戶看得懂的功能說法

可以對 HJ 這樣描述：

> 私版客製商品送出詢價後，網站會先建立一筆詢價單。若客戶已加入或綁定 HJ LINE，系統可自動傳一則詢價摘要到客戶 LINE，後續由 HJ 人員透過 LINE 官方帳號人工報價。若客戶尚未綁定 LINE，網站會顯示 HJ LINE 加好友入口與詢價編號，讓客服可人工接續。

不要寫：

- 網站直接丟到 LINE 客服系統
- LINE 自動完成報價
- 不用網站後台也能管理詢價

原因：HJ 沒有第三方客服系統，LINE 官方帳號本身是對話渠道，不是完整的詢價管理系統。

---

## 3. 建議問 HJ 的版本

> 私版客製商品送出詢價後，HJ 希望 LINE 怎麼配合？
>
> A. 網站產生詢價單，客戶自行加入 LINE，HJ 人工用 LINE 回覆報價。
> B. 網站產生詢價單，並自動傳一則詢價摘要到客戶 LINE，HJ 再人工回覆。
> C. 可以規劃成 B，但如果客戶尚未綁定 LINE，就先走 A 的人工方式。

**建議答案：C。**

C 的好處是體驗接近 B，但不會因為客戶沒加好友、沒綁定、封鎖官方帳號而卡住整個詢價流程。

---

## 4. 建議流程

```text
客戶在網站填私版客製需求
  ↓
網站建立詢價單 quote_request
  ↓
判斷會員是否已有 line_user_id / 是否可推播
  ├─ 有：透過 LINE Messaging API 推送詢價摘要給客戶
  │      ↓
  │    HJ 人員在 LINE 官方帳號聊天中接續報價
  │
  └─ 沒有：網站顯示 HJ LINE 加好友入口 + 詢價編號
         ↓
       客戶用詢價編號找客服，HJ 人工接續

不論哪一條，網站後台都保留正式詢價紀錄。
```

---

## 5. 需要開發的項目

### 5.1 網站後台詢價單

正式資料應存在網站，不應只留在 LINE 訊息裡。

建議欄位：

- 詢價編號
- 會員 ID
- LINE userId（若已綁定）
- 商品 / 分類
- 規格選項
- 數量
- 客戶備註
- 上傳檔案連結（若之後有做）
- 狀態：待客服確認 / 報價中 / 已報價 / 客戶確認 / 取消
- LINE 通知狀態：未綁定 / 已送出 / 送出失敗

### 5.2 LINE Messaging API

用途：

- 從 HJ LINE 官方帳號推送詢價摘要給客戶。
- 接收客戶加好友、傳訊息、帳號綁定等 webhook 事件。

需要：

- HJ LINE 官方帳號的 LINE Developers 權限。
- Messaging API Channel。
- Channel access token。
- Channel secret。
- Webhook URL。

### 5.3 會員與 LINE 綁定

B 流程能不能順利做，關鍵在於網站會員要能對應到 LINE 使用者。

可用做法：

- LINE Login：會員用 LINE 登入 / 註冊時，網站取得 LINE userId。
- Account linking：會員先有網站帳號，再把網站帳號和 LINE 帳號綁起來。
- Webhook：客戶加好友或傳訊息時，LINE 會送事件給網站後端，網站可取得 userId。

### 5.4 保底流程

如果客戶沒有綁定 LINE，網站仍要完成詢價單建立，不應讓客戶卡住。

畫面可以顯示：

```text
已收到您的客製詢價
詢價編號：HJQ-20260429-001

請加入 HJ LINE 官方帳號，並提供詢價編號給客服。
LINE：@hjhjtw
```

---

## 6. LINE 訊息範例

客戶送出後，可收到：

```text
已收到您的客製詢價

詢價編號：HJQ-20260429-001
商品：紙杯客製印刷
數量：3,000 個
備註：希望印 Logo，交期越快越好

HJ 客服會再透過 LINE 與您確認細節及報價。
```

建議訊息只放摘要與詢價編號，詳細資料回網站後台查看，避免 LINE 訊息含太多敏感資訊。

---

## 7. 程式開發方向

### 7.1 推送訊息

```js
async function pushQuoteSummaryToLine({ lineUserId, quote }) {
  const response = await fetch('https://api.line.me/v2/bot/message/push', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.LINE_CHANNEL_ACCESS_TOKEN}`,
    },
    body: JSON.stringify({
      to: lineUserId,
      messages: [
        {
          type: 'text',
          text: [
            '已收到您的客製詢價',
            '',
            `詢價編號：${quote.code}`,
            `商品：${quote.productName}`,
            `數量：${quote.quantity}`,
            `備註：${quote.note || '無'}`,
            '',
            'HJ 客服會再透過 LINE 與您確認細節及報價。',
          ].join('\n'),
        },
      ],
    }),
  });

  if (!response.ok) {
    throw new Error(`LINE push failed: ${response.status}`);
  }
}
```

### 7.2 建立詢價單時的判斷

```js
async function createCustomQuoteRequest(input, member) {
  const quote = await db.quoteRequest.create({
    data: {
      memberId: member.id,
      productName: input.productName,
      quantity: input.quantity,
      note: input.note,
      status: 'pending',
    },
  });

  if (!member.lineUserId) {
    return {
      quote,
      lineStatus: 'needs_line_binding',
    };
  }

  try {
    await pushQuoteSummaryToLine({
      lineUserId: member.lineUserId,
      quote,
    });

    return {
      quote,
      lineStatus: 'sent',
    };
  } catch {
    return {
      quote,
      lineStatus: 'send_failed_show_manual_fallback',
    };
  }
}
```

### 7.3 Webhook

需要建立一個 endpoint，例如：

```text
POST /api/line/webhook
```

用途：

- 接收客戶加好友事件。
- 接收客戶傳訊息事件。
- 接收 account link 結果。
- 驗證 LINE webhook signature，避免偽造請求。

---

## 8. 官方文件閱讀順序

### A. Messaging API 總覽

先理解 LINE 官方帳號如何透過 API 發訊息、收事件。

https://developers.line.biz/en/docs/messaging-api/overview/

### B. Send messages / Push message

用來把詢價摘要從 HJ LINE 官方帳號推送給客戶。官方文件說 Messaging API 可發送 push message 給 user / group / multi-person chat。

https://developers.line.biz/en/docs/messaging-api/sending-messages/
https://developers.line.biz/en/reference/messaging-api/nojs/#send-push-message

### C. Get user IDs

要推送給特定客戶，必須取得 LINE userId。官方文件說可從 webhook、好友清單、群組成員等方式取得。

https://developers.line.biz/en/docs/messaging-api/getting-user-ids/

### D. Webhook

用來接收加好友、傳訊息、帳號綁定等事件。官方文件也提醒 webhook 要驗證 signature。

https://developers.line.biz/en/docs/messaging-api/receiving-messages/

### E. Account linking

若網站會員和 LINE 帳號要綁定，這份是重點。官方文件明確提到購物網站可在用戶購買時由官方帳號送 LINE 訊息。

https://developers.line.biz/en/docs/messaging-api/linking-accounts/

### F. LINE Login

若 HJ 需求表寫的「LINE 註冊」是指用 LINE 登入 / 註冊會員，需看 LINE Login。

https://developers.line.biz/en/docs/line-login/overview/

### G. LINE Notify 已停用

LINE Notify 已於 2025-03-31 結束服務，不能再拿來做新網站通知。替代方案是 Messaging API。

https://notify-bot.line.me/closing-announce/

---

## 9. 風險與邊界

1. **沒有第三方客服系統**
   - 所以不做「送進客服系統」這種說法。
   - 要以網站後台詢價單 + LINE 官方帳號聊天接續為主。

2. **客戶沒綁定 LINE 時不能硬推**
   - 沒有 lineUserId 或推播失敗時，走 A 保底流程。

3. **LINE 不是正式訂單資料庫**
   - LINE 對話方便，但報價、狀態、紀錄仍要回網站後台管理。

4. **報價仍是人工**
   - 目前只規劃把詢價摘要送到 LINE，不規劃自動算價 / 自動報價。

5. **LINE 訊息量與方案費用要另確認**
   - 不先在提案裡寫死費用，正式報價前以 LINE 官方當期方案為準。

---

## 10. 後續對 mockup 的影響

在 HJ 回覆前先不改畫面，但後續調整方向可以先記下：

- 私版商品詢價送出成功頁要有「詢價編號」。
- 若會員已綁定 LINE，成功頁可顯示「已同步傳送到您的 LINE」。
- 若尚未綁定 LINE，成功頁顯示「加入 HJ LINE + 提供詢價編號」。
- 會員中心可顯示詢價紀錄與狀態。
- HJ 後台需要有私版詢價單列表，不能只靠 LINE 對話找資料。

---

## 11. 目前給 Claude / Codex 的結論

後續提到 LINE 客製詢價時，統一使用這個方向：

> B 是目標，A 是保底。
> HJ 沒有第三方 LINE 客服系統，所以正式詢價資料存在網站後台。
> LINE 官方帳號負責把詢價摘要送給客戶，並讓 HJ 人員接續人工報價。
> 不要承諾自動報價，也不要把 LINE 當正式資料庫。
