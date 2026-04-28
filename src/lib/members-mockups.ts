export type MemberMockup = {
  id:
    | "auth"
    | "dashboard"
    | "orders"
    | "order-detail"
    | "settings"
    | "quote-list"
    | "samples";
  name: string;
  layer: "前台";
  ready: boolean;
  href: string;
};

export const MEMBER_MOCKUPS: MemberMockup[] = [
  {
    id: "auth",
    name: "註冊／登入",
    layer: "前台",
    ready: true,
    href: "/modules/members/auth",
  },
  {
    id: "dashboard",
    name: "會員首頁",
    layer: "前台",
    ready: true,
    href: "/modules/members",
  },
  {
    id: "orders",
    name: "歷史訂單",
    layer: "前台",
    ready: true,
    href: "/modules/members/orders",
  },
  {
    id: "order-detail",
    name: "訂單詳情",
    layer: "前台",
    ready: true,
    href: "/modules/members/orders/HJ-20260427-001",
  },
  {
    id: "quote-list",
    name: "詢價單",
    layer: "前台",
    ready: true,
    href: "/modules/members/quote-list",
  },
  {
    id: "samples",
    name: "樣品紀錄",
    layer: "前台",
    ready: true,
    href: "/modules/members/samples",
  },
  {
    id: "settings",
    name: "帳號設定",
    layer: "前台",
    ready: true,
    href: "/modules/members/settings",
  },
];
