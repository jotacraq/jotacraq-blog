import {
  generateArticleMdx,
  getSuggestedFilename,
  parseTags,
  validateArticleDraft,
} from "./mdx-generator";
import type { ArticleDraft } from "../types";

const validDraft: ArticleDraft = {
  title: "Valid Title",
  subtitle: "Valid Subtitle",
  slug: "valid-slug-123",
  publishedAt: "2026-05-16",
  excerpt: "Valid excerpt",
  tags: "nextjs, mdx, admin",
  content: "This is valid content.",
};

describe("validateArticleDraft", () => {
  it("validates required fields", () => {
    const result = validateArticleDraft(validDraft);
    expect(result.isValid).toBe(true);
    expect(result.errors).toEqual({});
  });

  it("fails when required fields are empty", () => {
    const result = validateArticleDraft({
      ...validDraft,
      title: " ",
      content: "",
    });

    expect(result.isValid).toBe(false);
    expect(result.errors.title).toBeDefined();
    expect(result.errors.content).toBeDefined();
  });

  it("fails when slug format is invalid", () => {
    const result = validateArticleDraft({
      ...validDraft,
      slug: "Invalid Slug",
    });

    expect(result.isValid).toBe(false);
    expect(result.errors.slug).toBeDefined();
  });

  it("fails when publishedAt format is invalid", () => {
    const result = validateArticleDraft({
      ...validDraft,
      publishedAt: "16-05-2026",
    });

    expect(result.isValid).toBe(false);
    expect(result.errors.publishedAt).toBeDefined();
  });
});

describe("parseTags", () => {
  it("turns comma-separated tags into a trimmed array", () => {
    expect(parseTags(" nextjs,  mdx ,admin ,, ")).toEqual(["nextjs", "mdx", "admin"]);
  });

  it("returns an empty array for empty input", () => {
    expect(parseTags("")).toEqual([]);
  });
});

describe("generateArticleMdx", () => {
  it("returns valid frontmatter plus content", () => {
    const mdx = generateArticleMdx(validDraft);

    expect(mdx).toContain('title: "Valid Title"');
    expect(mdx).toContain('subtitle: "Valid Subtitle"');
    expect(mdx).toContain('slug: "valid-slug-123"');
    expect(mdx).toContain('publishedAt: "2026-05-16"');
    expect(mdx).toContain('excerpt: "Valid excerpt"');
    expect(mdx).toContain("tags:");
    expect(mdx).toContain("  - nextjs");
    expect(mdx).toContain("draft: false");
    expect(mdx).toContain("This is valid content.");
  });

  it("throws for invalid input", () => {
    expect(() =>
      generateArticleMdx({
        ...validDraft,
        title: "",
      })
    ).toThrow();
  });
});

describe("getSuggestedFilename", () => {
  it("returns YYYY-MM-DD-slug.mdx", () => {
    expect(getSuggestedFilename(validDraft)).toBe("2026-05-16-valid-slug-123.mdx");
  });
});
