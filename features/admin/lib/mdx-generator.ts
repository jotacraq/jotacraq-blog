import type { ArticleDraft, ArticleDraftValidationResult } from "../types";

const SLUG_REGEX = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const PUBLISHED_AT_REGEX = /^\d{4}-\d{2}-\d{2}$/;

export function validateArticleDraft(
  draft: ArticleDraft,
): ArticleDraftValidationResult {
  const errors: ArticleDraftValidationResult["errors"] = {};

  if (!draft.title.trim()) errors.title = "Title is required.";
  if (!draft.subtitle.trim()) errors.subtitle = "Subtitle is required.";
  if (!draft.slug.trim()) errors.slug = "Slug is required.";
  if (!draft.publishedAt.trim()) errors.publishedAt = "Published date is required.";
  if (!draft.excerpt.trim()) errors.excerpt = "Excerpt is required.";
  if (!draft.content.trim()) errors.content = "Content is required.";

  if (draft.slug.trim() && !SLUG_REGEX.test(draft.slug.trim())) {
    errors.slug = "Slug must contain lowercase letters, numbers, and hyphens.";
  }

  if (draft.publishedAt.trim() && !PUBLISHED_AT_REGEX.test(draft.publishedAt.trim())) {
    errors.publishedAt = "Published date must use YYYY-MM-DD format.";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

export function parseTags(tags: string): string[] {
  return tags
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);
}

export function generateArticleMdx(draft: ArticleDraft): string {
  const validation = validateArticleDraft(draft);
  if (!validation.isValid) {
    throw new Error("Invalid article draft.");
  }

  const normalizedTags = parseTags(draft.tags);
  const tagsBlock =
    normalizedTags.length > 0
      ? normalizedTags.map((tag) => `  - ${tag}`).join("\n")
      : "  -";

  return `---
title: "${draft.title}"
subtitle: "${draft.subtitle}"
slug: "${draft.slug}"
publishedAt: "${draft.publishedAt}"
excerpt: "${draft.excerpt}"
tags:
${tagsBlock}
draft: false
---

${draft.content}`;
}

export function getSuggestedFilename(draft: ArticleDraft): string {
  return `${draft.publishedAt}-${draft.slug}.mdx`;
}
