import { ArticleTimeline } from "@/features/articles/components/article-timeline";
import { PublicNavbar } from "@/features/articles/components/public-navbar";
import { getLatestArticle, getPublishedArticles } from "@/features/articles/lib/articles";

export default async function Home() {
  const [articles, latestArticle] = await Promise.all([getPublishedArticles(), getLatestArticle()]);

  return (
    <>
      <PublicNavbar latestArticleDate={latestArticle?.publishedAt ?? null} />
      <main style={{ margin: "0 auto", maxWidth: "760px", padding: "48px 16px 72px" }}>
        <header style={{ marginBottom: "28px" }}>
          <h1 style={{ fontSize: "42px", margin: 0 }}>Artigos</h1>
          <p style={{ color: "var(--muted)", lineHeight: 1.7, margin: "12px 0 0" }}>
            Uma timeline publica com textos autorais, organizados do mais recente para o mais
            antigo.
          </p>
        </header>
        <ArticleTimeline articles={articles} />
      </main>
    </>
  );
}
