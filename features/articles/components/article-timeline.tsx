import Link from "next/link";
import { formatDisplayDate } from "@/features/articles/lib/format-date";
import type { Article } from "@/features/articles/types";

type ArticleTimelineProps = {
  articles: Article[];
};

export function ArticleTimeline({ articles }: ArticleTimelineProps) {
  if (articles.length === 0) {
    return (
      <p style={{ color: "var(--muted)", lineHeight: 1.7 }}>
        Ainda nao ha artigos publicados.
      </p>
    );
  }

  return (
    <ol
      style={{
        borderLeft: "1px solid var(--border)",
        display: "grid",
        gap: "22px",
        listStyle: "none",
        margin: 0,
        padding: "0 0 0 24px",
      }}
    >
      {articles.map((article) => (
        <li key={article.slug} style={{ position: "relative" }}>
          <span
            aria-hidden="true"
            style={{
              backgroundColor: "var(--foreground)",
              border: "2px solid var(--muted)",
              borderRadius: "999px",
              height: "10px",
              left: "-30px",
              position: "absolute",
              top: "9px",
              width: "10px",
            }}
          />
          <article style={{ display: "grid", gap: "8px" }}>
            <time dateTime={article.publishedAt} style={{ color: "var(--muted)", fontSize: "14px" }}>
              {formatDisplayDate(article.publishedAt)}
            </time>
            <h2 style={{ fontSize: "28px", margin: 0 }}>
              <Link href={`/artigos/${article.slug}`} style={{ textDecoration: "none" }}>
                {article.title}
              </Link>
            </h2>
            <p style={{ color: "var(--muted)", margin: 0 }}>{article.subtitle}</p>
            <p style={{ lineHeight: 1.7, margin: 0 }}>{article.excerpt}</p>
          </article>
        </li>
      ))}
    </ol>
  );
}
