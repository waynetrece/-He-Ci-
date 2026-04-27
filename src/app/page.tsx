import { ArchitectureMap } from "@/components/architecture/ArchitectureMap";
import { BackendArchitectureMap } from "@/components/architecture/BackendArchitectureMap";
import { DesignArchitectureMap } from "@/components/architecture/DesignArchitectureMap";
import { ExternalArchitectureMap } from "@/components/architecture/ExternalArchitectureMap";
import { FrontendArchitectureMap } from "@/components/architecture/FrontendArchitectureMap";
import { ProductsArchitectureMap } from "@/components/architecture/ProductsArchitectureMap";

export default function Home() {
  return (
    <main className="min-h-dvh bg-white text-zinc-900">
      <ArchitectureMap />
      <FrontendArchitectureMap />
      <ProductsArchitectureMap />
      <DesignArchitectureMap />
      <BackendArchitectureMap />
      <ExternalArchitectureMap />

      <footer className="border-t border-zinc-200 bg-white px-6 py-6 text-center">
        <div className="text-xs text-zinc-500">
          禾啟 HJ · 餐飲包材電商平台架構提案
        </div>
      </footer>
    </main>
  );
}
