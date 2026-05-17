import Link from "next/link";
import { AdminNavbar } from "@/features/admin/components/admin-navbar";
import { getAllArticles, getLatestArticle } from "@/features/articles/lib/articles";

export default async function AdminHomePage() {
  const [articles, latestArticle] = await Promise.all([getAllArticles(), getLatestArticle()]);

  const totalDrafts = articles.filter((article) => article.draft).length;
  const totalPublished = articles.length - totalDrafts;
  const recentArticles = articles.slice(0, 5);

  return (
    <>
      <AdminNavbar />
      <main style={{ margin: "0 auto", maxWidth: "1024px", padding: "40px 16px 72px" }}>
        <header style={{ marginBottom: "28px" }}>
          <h1 style={{ fontSize: "40px", margin: 0 }}>Painel Admin</h1>
          <p style={{ color: "var(--muted)", lineHeight: 1.7, margin: "12px 0 0" }}>
            Resumo local dos artigos MDX para acompanhar publicacoes e rascunhos.
          </p>
        </header>

        <section
          aria-label="Resumo de artigos"
          style={{
            display: "grid",
            gap: "12px",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            marginBottom: "24px",
          }}
        >
          <article style={{ border: "1px solid var(--border)", padding: "16px" }}>
            <p style={{ color: "var(--muted)", margin: 0 }}>Publicados</p>
            <p style={{ fontSize: "32px", fontWeight: 700, margin: "8px 0 0" }}>{totalPublished}</p>
          </article>
          <article style={{ border: "1px solid var(--border)", padding: "16px" }}>
            <p style={{ color: "var(--muted)", margin: 0 }}>Rascunhos</p>
            <p style={{ fontSize: "32px", fontWeight: 700, margin: "8px 0 0" }}>{totalDrafts}</p>
          </article>
          <article style={{ border: "1px solid var(--border)", padding: "16px" }}>
            <p style={{ color: "var(--muted)", margin: 0 }}>Ultimo publicado</p>
            <p style={{ fontSize: "24px", fontWeight: 700, margin: "8px 0 0" }}>
              {latestArticle?.publishedAt ?? "Sem artigos publicados"}
            </p>
          </article>
        </section>

        <section
          aria-label="Metricas"
          style={{ border: "1px solid var(--border)", marginBottom: "24px", padding: "16px" }}
        >
          <h2 style={{ fontSize: "20px", margin: 0 }}>Metricas do MVP</h2>
          <p style={{ color: "var(--muted)", lineHeight: 1.7, margin: "10px 0 0" }}>
            Para visualizacoes, visitantes e paginas mais acessadas em producao, configure o
            Vercel Analytics no projeto.
          </p>
        </section>

        <section aria-label="Artigos recentes" style={{ marginBottom: "24px" }}>
          <h2 style={{ fontSize: "24px", margin: "0 0 12px" }}>Artigos recentes</h2>
          {recentArticles.length === 0 ? (
            <p style={{ color: "var(--muted)", margin: 0 }}>Nenhum artigo local encontrado.</p>
          ) : (
            <ul style={{ display: "grid", gap: "10px", listStyle: "none", margin: 0, padding: 0 }}>
              {recentArticles.map((article) => (
                <li
                  key={article.slug}
                  style={{
                    alignItems: "baseline",
                    border: "1px solid var(--border)",
                    display: "flex",
                    gap: "8px",
                    justifyContent: "space-between",
                    padding: "12px 14px",
                  }}
                >
                  <div>
                    <strong>{article.title}</strong>
                    <p style={{ color: "var(--muted)", margin: "4px 0 0" }}>{article.publishedAt}</p>
                  </div>
                  {article.draft ? (
                    <span
                      style={{
                        border: "1px solid var(--border)",
                        color: "var(--muted)",
                        fontSize: "12px",
                        fontWeight: 600,
                        letterSpacing: "0.02em",
                        padding: "4px 8px",
                        textTransform: "uppercase",
                      }}
                    >
                      Draft
                    </span>
                  ) : null}
                </li>
              ))}
            </ul>
          )}
        </section>

        <Link
          href="/admin/postar"
          style={{
            border: "1px solid var(--border)",
            display: "inline-block",
            fontWeight: 600,
            padding: "10px 14px",
            textDecoration: "none",
          }}
        >
          Ir para /admin/postar
        </Link>
      </main>
    </>
  );
}
