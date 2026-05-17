import Link from "next/link";
import type { ReactNode } from "react";

type IconLinkProps = {
  href: string;
  label: string;
  children: ReactNode;
};

export function IconLink({ href, label, children }: IconLinkProps) {
  return (
    <Link
      aria-label={label}
      href={href}
      style={{
        alignItems: "center",
        border: "1px solid var(--border)",
        borderRadius: "8px",
        display: "inline-flex",
        height: "40px",
        justifyContent: "center",
        width: "40px",
      }}
    >
      {children}
    </Link>
  );
}
