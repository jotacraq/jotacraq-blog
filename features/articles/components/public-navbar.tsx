"use client";

import Link from "next/link";
import { formatDisplayDate } from "@/features/articles/lib/format-date";
import { ThemeToggle } from "@/features/theme/components/theme-toggle";
import { siteConfig } from "@/shared/config/site";
import { IconLink } from "@/shared/ui/icon-link";

type PublicNavbarProps = {
  latestArticleDate: string | null;
};

function GitHubIcon() {
  return (
    <svg
      aria-hidden="true"
      fill="currentColor"
      height="18"
      viewBox="0 0 24 24"
      width="18"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12 2C6.48 2 2 6.58 2 12.26c0 4.52 2.87 8.35 6.84 9.71.5.1.68-.22.68-.49 0-.24-.01-.88-.01-1.73-2.78.62-3.37-1.37-3.37-1.37-.45-1.18-1.11-1.5-1.11-1.5-.91-.64.07-.63.07-.63 1 .07 1.53 1.06 1.53 1.06.9 1.56 2.35 1.11 2.92.85.09-.66.35-1.11.63-1.37-2.22-.26-4.56-1.14-4.56-5.06 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.31.1-2.71 0 0 .84-.28 2.75 1.05A9.33 9.33 0 0 1 12 6.99c.85 0 1.71.12 2.51.34 1.91-1.33 2.75-1.05 2.75-1.05.55 1.4.2 2.45.1 2.71.64.72 1.03 1.63 1.03 2.75 0 3.93-2.34 4.79-4.57 5.05.36.32.68.95.68 1.91 0 1.38-.01 2.49-.01 2.83 0 .27.18.59.69.49A10.05 10.05 0 0 0 22 12.26C22 6.58 17.52 2 12 2Z" />
    </svg>
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
          <IconLink href={siteConfig.githubUrl} label="Abrir GitHub do autor">
            <GitHubIcon />
          </IconLink>
        </div>
      </nav>
    </header>
  );
}
