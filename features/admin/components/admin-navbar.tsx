import Link from "next/link";

const navLinkStyle: React.CSSProperties = {
  fontWeight: 500,
  textDecoration: "none",
};

export function AdminNavbar() {
  return (
    <header style={{ borderBottom: "1px solid var(--border)" }}>
      <nav
        aria-label="Navegacao administrativa"
        style={{
          alignItems: "center",
          display: "flex",
          gap: "16px",
          justifyContent: "space-between",
          margin: "0 auto",
          maxWidth: "1024px",
          minHeight: "72px",
          padding: "0 16px",
        }}
      >
        <Link
          aria-label="Ir para inicio do admin"
          href="/admin"
          style={{ fontWeight: 700, textDecoration: "none" }}
        >
          Admin
        </Link>

        <div style={{ alignItems: "center", display: "flex", gap: "16px" }}>
          <Link href="/admin" style={navLinkStyle}>
            Home
          </Link>
          <Link href="/admin/postar" style={navLinkStyle}>
            Postar
          </Link>
        </div>
      </nav>
    </header>
  );
}
