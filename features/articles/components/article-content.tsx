import { formatDisplayDate } from "@/features/articles/lib/format-date";
import type { Article } from "@/features/articles/types";
import type { ReactNode } from "react";

type ArticleContentProps = {
  article: Article;
};

function renderLine(line: string, key: string) {
  const trimmed = line.trim();

  if (trimmed.length === 0) {
    return <br key={key} />;
  }

  if (trimmed.startsWith("### ")) {
    return (
      <h3 key={key} style={{ fontSize: "24px", margin: "32px 0 12px" }}>
        {trimmed.slice(4)}
      </h3>
    );
  }

  if (trimmed.startsWith("## ")) {
    return (
      <h2 key={key} style={{ fontSize: "30px", margin: "36px 0 14px" }}>
        {trimmed.slice(3)}
      </h2>
    );
  }

  if (trimmed.startsWith("# ")) {
    return (
      <h1 key={key} style={{ fontSize: "36px", margin: "40px 0 16px" }}>
        {trimmed.slice(2)}
      </h1>
    );
  }

  if (trimmed.startsWith("- ")) {
    return (
      <li key={key} style={{ marginBottom: "8px" }}>
        {trimmed.slice(2)}
      </li>
    );
  }

  if (trimmed.startsWith("```")) {
    return (
      <pre
        key={key}
        style={{
          background: "var(--surface)",
          border: "1px solid var(--border)",
          borderRadius: "8px",
          margin: "20px 0",
          overflowX: "auto",
          padding: "14px",
        }}
      >
        <code>{trimmed.slice(3)}</code>
      </pre>
    );
  }

  return (
    <p key={key} style={{ lineHeight: 1.9, margin: "0 0 14px" }}>
      {line}
    </p>
  );
}

export function ArticleContent({ article }: ArticleContentProps) {
  const lines = article.content.split("\n");
  const contentBlocks: ReactNode[] = [];
  let listItems: ReactNode[] = [];

  lines.forEach((line, index) => {
    const key = `${article.slug}-${index}`;
    const trimmed = line.trim();

    if (trimmed.startsWith("- ")) {
      listItems.push(renderLine(line, key));
      return;
    }

    if (listItems.length > 0) {
      contentBlocks.push(
        <ul
          key={`${article.slug}-list-${index}`}
          style={{ margin: "0 0 18px", paddingLeft: "20px" }}
        >
          {listItems}
        </ul>
      );
      listItems = [];
    }

    contentBlocks.push(renderLine(line, key));
  });

  if (listItems.length > 0) {
    contentBlocks.push(
      <ul key={`${article.slug}-list-end`} style={{ margin: "0 0 18px", paddingLeft: "20px" }}>
        {listItems}
      </ul>
    );
  }

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
      <section style={{ fontSize: "18px" }}>{contentBlocks}</section>
    </article>
  );
}
