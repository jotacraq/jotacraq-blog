import { promises as fs } from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type { Article } from "../types";

const ARTICLES_DIR = path.join(process.cwd(), "content", "articles");
const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

function getReadingTimeMinutes(content: string): number {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
}

function assertStringField(
  data: Record<string, unknown>,
  field: keyof Pick<Article, "title" | "subtitle" | "slug" | "publishedAt" | "excerpt">,
  fileName: string
): string {
  const value = data[field];
  if (typeof value !== "string" || value.trim() === "") {
    throw new Error(`Invalid frontmatter in "${fileName}": "${field}" must be a non-empty string.`);
  }
  return value.trim();
}

function parseArticleFile(fileName: string, rawContent: string): Article {
  const parsed = matter(rawContent);
  const data = parsed.data as Record<string, unknown>;
  const title = assertStringField(data, "title", fileName);
  const subtitle = assertStringField(data, "subtitle", fileName);
  const slug = assertStringField(data, "slug", fileName);
  const publishedAt = assertStringField(data, "publishedAt", fileName);
  const excerpt = assertStringField(data, "excerpt", fileName);

  if (!DATE_PATTERN.test(publishedAt)) {
    throw new Error(
      `Invalid frontmatter in "${fileName}": "publishedAt" must use YYYY-MM-DD format.`
    );
  }

  const tagsValue = data.tags;
  if (tagsValue !== undefined && !Array.isArray(tagsValue)) {
    throw new Error(`Invalid frontmatter in "${fileName}": "tags" must be an array of strings.`);
  }
  const tags = (tagsValue ?? []) as unknown[];
  if (!tags.every((tag) => typeof tag === "string")) {
    throw new Error(`Invalid frontmatter in "${fileName}": "tags" must be an array of strings.`);
  }

  const draftValue = data.draft;
  if (draftValue !== undefined && typeof draftValue !== "boolean") {
    throw new Error(`Invalid frontmatter in "${fileName}": "draft" must be a boolean when provided.`);
  }

  return {
    title,
    subtitle,
    slug,
    publishedAt,
    excerpt,
    tags: tags as string[],
    draft: draftValue ?? false,
    content: parsed.content.trim(),
    readingTimeMinutes: getReadingTimeMinutes(parsed.content),
  };
}

export async function getAllArticles(): Promise<Article[]> {
  const entries = await fs.readdir(ARTICLES_DIR, { withFileTypes: true });
  const files = entries
    .filter((entry) => entry.isFile() && entry.name.endsWith(".mdx"))
    .map((entry) => entry.name);

  const articles: Article[] = [];
  const seenSlugs = new Set<string>();

  for (const fileName of files) {
    const rawContent = await fs.readFile(path.join(ARTICLES_DIR, fileName), "utf8");
    const article = parseArticleFile(fileName, rawContent);
    if (seenSlugs.has(article.slug)) {
      throw new Error(`Duplicate article slug "${article.slug}" found in "${fileName}".`);
    }
    seenSlugs.add(article.slug);
    articles.push(article);
  }

  return articles.sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

export async function getPublishedArticles(): Promise<Article[]> {
  const articles = await getAllArticles();
  return articles.filter((article) => !article.draft);
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  const articles = await getPublishedArticles();
  return articles.find((article) => article.slug === slug) ?? null;
}

export async function getLatestArticle(): Promise<Article | null> {
  const articles = await getPublishedArticles();
  return articles[0] ?? null;
}
