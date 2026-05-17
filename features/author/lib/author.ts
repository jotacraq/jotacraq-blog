import { promises as fs } from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type { AuthorProfile } from "../types";

const AUTHOR_FILE_NAME = "author.mdx";

function getRequiredString(
  source: Record<string, unknown>,
  key: keyof Omit<AuthorProfile, "interests" | "content">
): string {
  const value = source[key];

  if (typeof value !== "string" || value.trim() === "") {
    throw new Error(`Invalid author frontmatter in "${AUTHOR_FILE_NAME}": "${key}" is required.`);
  }

  return value;
}

function getInterests(source: Record<string, unknown>): string[] {
  const value = source.interests;

  if (!Array.isArray(value) || value.length === 0 || value.some((item) => typeof item !== "string")) {
    throw new Error(
      `Invalid author frontmatter in "${AUTHOR_FILE_NAME}": "interests" must be a non-empty string array.`
    );
  }

  return value;
}

export async function getAuthorProfile(): Promise<AuthorProfile> {
  const authorPath = path.join(process.cwd(), "content", AUTHOR_FILE_NAME);
  const fileContent = await fs.readFile(authorPath, "utf8");
  const parsed = matter(fileContent);
  const data = parsed.data as Record<string, unknown>;

  return {
    name: getRequiredString(data, "name"),
    headline: getRequiredString(data, "headline"),
    githubUrl: getRequiredString(data, "githubUrl"),
    location: getRequiredString(data, "location"),
    interests: getInterests(data),
    content: parsed.content.trim(),
  };
}
