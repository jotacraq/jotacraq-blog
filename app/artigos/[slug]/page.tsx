import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArticleContent } from "@/features/articles/components/article-content";
import { PublicNavbar } from "@/features/articles/components/public-navbar";
import {
  getArticleBySlug,
  getLatestArticle,
  getPublishedArticles,
} from "@/features/articles/lib/articles";

type ArticlePageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  const articles = await getPublishedArticles();
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    return {
      title: "Artigo nao encontrado",
    };
  }

  return {
    title: article.title,
    description: article.excerpt,
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const [article, latestArticle] = await Promise.all([getArticleBySlug(slug), getLatestArticle()]);

  if (!article) {
    notFound();
  }

  return (
    <>
      <PublicNavbar latestArticleDate={latestArticle?.publishedAt ?? null} />
      <main style={{ margin: "0 auto", maxWidth: "760px", padding: "48px 16px 72px" }}>
        <Link href="/" style={{ color: "var(--muted)" }}>
          Voltar para home
        </Link>
        <ArticleContent article={article} />
      </main>
    </>
  );
}
