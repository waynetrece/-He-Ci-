import type { ReactNode } from "react";
import {
  MockupShell,
  MockupSiteFooter,
  MockupSiteHeader,
} from "./MockupShell";

export function MockupCmsPage({
  url,
  pageTitle,
  pageDesc,
  breadcrumb,
  children,
}: {
  url?: string;
  pageTitle: string;
  pageDesc?: string;
  breadcrumb?: { label: string; href?: string }[];
  children: ReactNode;
}) {
  return (
    <MockupShell url={url}>
      <MockupSiteHeader />

      <div className="border-b border-zinc-100 bg-zinc-50 px-6 py-3">
        <div className="mx-auto flex max-w-[1760px] items-center gap-1.5 text-xs text-zinc-500">
          <span>首頁</span>
          {breadcrumb?.map((b) => (
            <span key={b.label} className="flex items-center gap-1.5">
              <span className="text-zinc-300">/</span>
              <span className={b.href ? "" : "text-zinc-900"}>{b.label}</span>
            </span>
          ))}
        </div>
      </div>

      <section className="border-b border-zinc-100 bg-white px-6 py-10">
        <div className="mx-auto max-w-[1760px]">
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900">
            {pageTitle}
          </h1>
          {pageDesc && (
            <p className="mt-3 max-w-3xl text-sm text-zinc-600">{pageDesc}</p>
          )}
        </div>
      </section>

      <section className="bg-white px-6 py-12">
        <div className="mx-auto max-w-[1760px]">{children}</div>
      </section>

      <MockupSiteFooter />
    </MockupShell>
  );
}
