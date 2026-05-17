import type { Metadata } from "next";
import Link from "next/link";
import { PublicNavbar } from "@/features/articles/components/public-navbar";
import { getLatestArticle } from "@/features/articles/lib/articles";
import { getAuthorProfile } from "@/features/author/lib/author";

export async function generateMetadata(): Promise<Metadata> {
  const author = await getAuthorProfile();

  return {
    title: `Sobre ${author.name}`,
    description: author.headline,
  };
}

export default async function AboutPage() {
  const [author, latestArticle] = await Promise.all([getAuthorProfile(), getLatestArticle()]);

  return (
    <>
      <PublicNavbar latestArticleDate={latestArticle?.publishedAt ?? null} />
      <main style={{ margin: "0 auto", maxWidth: "760px", padding: "56px 16px 72px" }}>
        <h1 style={{ fontSize: "42px", margin: "0 0 12px" }}>{author.name}</h1>
        <p style={{ color: "var(--muted)", fontSize: "20px", lineHeight: 1.7, margin: 0 }}>
          {author.headline}
        </p>

        <div style={{ lineHeight: 1.8, marginTop: "32px", whiteSpace: "pre-wrap" }}>
          {author.content}
        </div>

        <section style={{ marginTop: "32px" }}>
          <h2 style={{ marginBottom: "10px" }}>Interesses</h2>
          <ul style={{ margin: 0, paddingLeft: "20px" }}>
            {author.interests.map((interest) => (
              <li key={interest}>{interest}</li>
            ))}
          </ul>
        </section>

        <Link
          href={author.githubUrl}
          rel="noreferrer"
          style={{ alignItems: "center", display: "inline-flex", gap: "8px", marginTop: "28px" }}
          target="_blank"
        >
          GitHub
        </Link>
      </main>
    </>
  );
}
