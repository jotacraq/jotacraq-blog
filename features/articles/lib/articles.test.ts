import { afterEach, describe, expect, it } from "vitest";
import { promises as fs } from "node:fs";
import path from "node:path";
import {
  getAllArticles,
  getArticleBySlug,
  getLatestArticle,
  getPublishedArticles,
} from "./articles";

const contentDir = path.join(process.cwd(), "content", "articles");
const invalidFixturePath = path.join(contentDir, "9999-01-01-invalid-frontmatter.mdx");

afterEach(async () => {
  await fs.rm(invalidFixturePath, { force: true });
});

describe("articles library", () => {
  it("getAllArticles returns all .mdx files including drafts sorted by date desc", async () => {
    const articles = await getAllArticles();

    expect(articles.map((article) => article.slug)).toEqual([
      "rascunho-exemplo",
      "primeiro-artigo",
    ]);
    expect(articles[0]?.draft).toBe(true);
    expect(articles[0]?.readingTimeMinutes).toBeGreaterThan(0);
  });

  it("getPublishedArticles excludes drafts", async () => {
    const articles = await getPublishedArticles();

    expect(articles).toHaveLength(1);
    expect(articles[0]?.slug).toBe("primeiro-artigo");
    expect(articles[0]?.draft).toBe(false);
  });

  it("getArticleBySlug returns only published article by slug", async () => {
    await expect(getArticleBySlug("primeiro-artigo")).resolves.toMatchObject({
      slug: "primeiro-artigo",
      draft: false,
    });
    await expect(getArticleBySlug("rascunho-exemplo")).resolves.toBeNull();
    await expect(getArticleBySlug("nao-existe")).resolves.toBeNull();
  });

  it("getLatestArticle returns latest published article", async () => {
    const article = await getLatestArticle();

    expect(article?.slug).toBe("primeiro-artigo");
  });

  it("throws clear error when required frontmatter is invalid", async () => {
    await fs.writeFile(
      invalidFixturePath,
      `---
title: "Invalido"
subtitle: "Sem data valida"
slug: "invalido"
publishedAt: "16-05-2026"
excerpt: "Resumo"
---

conteudo
`,
      "utf8"
    );

    await expect(getAllArticles()).rejects.toThrow(
      'Invalid frontmatter in "9999-01-01-invalid-frontmatter.mdx": "publishedAt" must use YYYY-MM-DD format.'
    );
  });
});
