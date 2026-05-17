"use client";

import { Link2, Moon, Sun } from "lucide-react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { formatDisplayDate } from "@/features/articles/lib/format-date";
import { siteConfig } from "@/shared/config/site";
import { IconLink } from "@/shared/ui/icon-link";

type PublicNavbarProps = {
  latestArticleDate: string | null;
};

function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  return (
    <button
      aria-label={isDark ? "Ativar tema claro" : "Ativar tema escuro"}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      style={{
        alignItems: "center",
        background: "transparent",
        border: "1px solid var(--border)",
        borderRadius: "8px",
        cursor: "pointer",
        display: "inline-flex",
        height: "40px",
        justifyContent: "center",
        width: "40px",
      }}
      type="button"
    >
      {isDark ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
}

export function PublicNavbar({ latestArticleDate }: PublicNavbarProps) {
  return (
    <header style={{ borderBottom: "1px solid var(--border)" }}>
      <nav
        style={{
          alignItems: "center",
          display: "flex",
          gap: "12px",
          justifyContent: "space-between",
          margin: "0 auto",
          maxWidth: "1024px",
          minHeight: "72px",
          padding: "0 16px",
        }}
      >
        <Link href="/" style={{ fontWeight: 700, textDecoration: "none" }}>
          {siteConfig.name}
        </Link>

        <div style={{ alignItems: "center", display: "flex", gap: "10px" }}>
          {latestArticleDate ? (
            <span style={{ color: "var(--muted)", fontSize: "14px", whiteSpace: "nowrap" }}>
              Ultimo artigo: {formatDisplayDate(latestArticleDate)}
            </span>
          ) : null}
          <ThemeToggle />
          <IconLink href={siteConfig.githubUrl} label="GitHub">
            <Link2 size={18} />
          </IconLink>
        </div>
      </nav>
    </header>
  );
}
