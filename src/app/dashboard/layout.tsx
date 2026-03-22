import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "SuperConstructor - Dashboard de Video con Remotion",
  description:
    "Dashboard para crear videos con Remotion, Claude Code y Agent Skills",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-unfocused-border-color">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="text-sm text-subtitle hover:text-foreground transition-colors"
            >
              ← Volver
            </Link>
            <div className="w-px h-5 bg-unfocused-border-color" />
            <h1 className="text-lg font-bold text-foreground">
              SuperConstructor
            </h1>
            <span className="text-xs text-subtitle">
              Remotion + Claude Code
            </span>
          </div>
          <Link
            href="/dashboard/guia"
            className="text-xs text-subtitle hover:text-foreground transition-colors"
          >
            Ver Guia
          </Link>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 py-6">{children}</main>
    </div>
  );
}
