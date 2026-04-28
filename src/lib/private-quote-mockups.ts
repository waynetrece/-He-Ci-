export type PrivateQuoteMockup = {
  id: "list" | "form";
  name: string;
  layer: "前台";
  ready: boolean;
  href: string;
};

export const PRIVATE_QUOTE_MOCKUPS: PrivateQuoteMockup[] = [
  {
    id: "list",
    name: "私版商品列表頁",
    layer: "前台",
    ready: true,
    href: "/modules/private-quote",
  },
  {
    id: "form",
    name: "即時報價單品頁",
    layer: "前台",
    ready: true,
    href: "/modules/private-quote/quote-form",
  },
];
