import { MDXRemote } from "next-mdx-remote/rsc";
import { formatDisplayDate } from "@/features/articles/lib/format-date";
import type { Article } from "@/features/articles/types";

type ArticleContentProps = {
  article: Article;
};

const mdxComponents = {
  h1: (props: React.ComponentProps<"h1">) => (
    <h1 {...props} style={{ fontSize: "36px", margin: "40px 0 16px" }} />
  ),
  h2: (props: React.ComponentProps<"h2">) => (
    <h2 {...props} style={{ fontSize: "30px", margin: "36px 0 14px" }} />
  ),
  h3: (props: React.ComponentProps<"h3">) => (
    <h3 {...props} style={{ fontSize: "24px", margin: "32px 0 12px" }} />
  ),
  p: (props: React.ComponentProps<"p">) => (
    <p {...props} style={{ lineHeight: 1.9, margin: "0 0 14px" }} />
  ),
  ul: (props: React.ComponentProps<"ul">) => (
    <ul {...props} style={{ margin: "0 0 18px", paddingLeft: "20px" }} />
  ),
  li: (props: React.ComponentProps<"li">) => <li {...props} style={{ marginBottom: "8px" }} />,
  pre: (props: React.ComponentProps<"pre">) => (
    <pre
      {...props}
      style={{
        background: "var(--surface)",
        border: "1px solid var(--border)",
        borderRadius: "8px",
        margin: "20px 0",
        overflowX: "auto",
        padding: "14px",
      }}
    />
  ),
  code: (props: React.ComponentProps<"code">) => <code {...props} />,
  a: (props: React.ComponentProps<"a">) => (
    <a {...props} style={{ color: "var(--accent)", textUnderlineOffset: "3px" }} />
  ),
};

export function ArticleContent({ article }: ArticleContentProps) {
  return (
    <article style={{ marginTop: "20px" }}>
      <header style={{ marginBottom: "24px" }}>
        <h1 style={{ fontSize: "46px", lineHeight: 1.1, margin: "0 0 10px" }}>{article.title}</h1>
        <p style={{ color: "var(--muted)", fontSize: "22px", lineHeight: 1.5, margin: "0 0 16px" }}>
          {article.subtitle}
        </p>
        <div style={{ color: "var(--muted)", fontSize: "14px" }}>
          {formatDisplayDate(article.publishedAt)} - {article.readingTimeMinutes} min de leitura
        </div>
      </header>
      <section style={{ fontSize: "18px" }}>
        <MDXRemote components={mdxComponents} source={article.content} />
      </section>
    </article>
  );
}
