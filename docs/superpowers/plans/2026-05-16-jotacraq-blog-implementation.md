# Jotacraq Blog Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use `superpowers:dispatching-parallel-agents` for the wave-based parallel strategy, or `superpowers:subagent-driven-development` only if executing one task at a time. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the Jotacraq Blog MVP with Next.js, MDX content, public reading pages, a lightweight admin writing assistant, quality gates, and Vercel-ready production setup.

**Architecture:** The MVP is a Next.js app with content stored as MDX files in the repository. Public routes read parsed MDX metadata from `content/articles`, while admin routes generate valid MDX without persisting data online. Domain logic lives under `features/`, shared presentation helpers live under `shared/`, and route files stay thin.

**Tech Stack:** Next.js, TypeScript, MDX, gray-matter, next-themes, lucide-react, Vitest, Testing Library, ESLint, Prettier, GitHub Actions, Vercel.

---

## Source Specs

Before executing tasks, read these files:

- `docs/prd-jotacraq-blog.md`
- `docs/specs/00-project-overview.md`
- `docs/specs/01-content-mdx.md`
- `docs/specs/02-public-experience.md`
- `docs/specs/03-admin-experience.md`
- `docs/specs/04-architecture-and-quality.md`
- `docs/specs/05-roadmap-and-backlog.md`

## Execution Rules

- Execute the bootstrap tasks in order, then use the parallel waves defined in "Parallel Execution Strategy".
- Keep each file below 500 lines.
- After each task, run the listed verification command.
- Commit after each task when verification passes.
- Do not introduce a database, CMS, Strapi, or server-side persistence in the MVP.
- Do not add paid services as required dependencies.
- Use `npm` consistently unless the repository is intentionally converted before Task 1.
- If a task discovers existing user changes, preserve them and adapt the implementation.
- Parallel workers are not alone in the codebase. They must not revert edits made by others and must keep their write scope limited to the files assigned to their front.
- The coordinator owns dependency installation and final integration. Parallel workers should not run `npm install` unless their brief explicitly assigns dependency ownership.

---

## Parallel Execution Strategy

This plan is designed for multiple agents working with short, focused context. Use one coordinator agent plus implementation workers with disjoint write scopes.

### Coordinator Responsibilities

The coordinator owns:

- task dispatch;
- dependency installation;
- conflict prevention;
- final integration;
- full quality gate runs;
- commits if workers do not commit directly;
- review of each worker's changed files.

The coordinator should not give two workers ownership of the same file in the same wave.

### Worker Rules

Each worker must:

- read only the source specs and task brief assigned to them;
- edit only files in their ownership scope;
- avoid broad refactors;
- preserve existing changes;
- run the verification commands listed in their brief;
- return changed file paths, verification results, and any concerns.

Workers must not:

- edit unrelated routes or shared files;
- change dependency versions;
- reformat the whole repository;
- introduce database, CMS, Strapi, or paid-service requirements;
- move files owned by another worker.

### Dependency Normalization

To avoid parallel `package.json` and `package-lock.json` conflicts, the coordinator should install shared dependencies before dispatching parallel workers.

After Task 2, the coordinator should run:

```bash
npm install gray-matter next-themes lucide-react
```

Then workers for Tasks 5, 8, 9, and 12 should skip dependency installation steps if those packages already exist in `package.json`.

### Execution Waves

#### Wave 0 - Sequential Bootstrap

These tasks must run sequentially because they create the project and shared foundation.

1. Task 1: Initialize Git and Next.js Project
2. Task 2: Configure Quality Tooling
3. Coordinator dependency normalization
4. Task 3: Create Project Structure
5. Task 4: Add Sample MDX Content

Do not dispatch parallel implementation agents before Wave 0 is complete.

#### Wave 1 - Domain Libraries in Parallel

These can run at the same time after Wave 0.

| Worker | Task | Ownership | Depends On |
| --- | --- | --- | --- |
| Articles Domain | Task 5 | `features/articles/types.ts`, `features/articles/lib/articles.ts`, `features/articles/lib/articles.test.ts` | `content/articles`, `gray-matter` |
| Author Domain | Task 6 | `features/author/types.ts`, `features/author/lib/author.ts`, `features/author/lib/author.test.ts` | `content/author.mdx`, `gray-matter` |
| Admin Generator | Task 13 | `features/admin/types.ts`, `features/admin/lib/mdx-generator.ts`, `features/admin/lib/mdx-generator.test.ts` | quality tooling only |

Coordinator integration after Wave 1:

```bash
npm run test
npm run typecheck
```

Expected:

- all domain tests pass;
- no type conflicts between independent feature modules.

#### Wave 2 - UI Foundations and Public Shell

These tasks have some shared dependencies. Run them with care.

Recommended sequence:

1. Task 7: Add Shared UI Foundations
2. Task 8: Implement Theme Support
3. Task 9: Build Public Navigation

Task 7 should finish before Tasks 8 and 9 because navbar uses shared UI and global CSS. Task 8 and Task 9 may run in parallel only if Task 9 does not edit `app/layout.tsx` or theme files.

Ownership:

| Worker | Task | Ownership |
| --- | --- | --- |
| UI Foundation | Task 7 | `app/globals.css`, `shared/ui/*` |
| Theme | Task 8 | `app/layout.tsx`, `features/theme/components/*` |
| Public Navbar | Task 9 | `features/articles/lib/format-date.ts`, `features/articles/lib/format-date.test.ts`, `features/articles/components/public-navbar.tsx` |

Coordinator integration after Wave 2:

```bash
npm run test
npm run lint
npm run typecheck
npm run build
```

#### Wave 3 - Public Pages in Parallel

These can run at the same time after Wave 2 and Wave 1 domain libraries are integrated.

| Worker | Task | Ownership | Depends On |
| --- | --- | --- | --- |
| Homepage | Task 10 | `app/page.tsx`, `features/articles/components/article-timeline.tsx` | Articles Domain, Public Navbar |
| Article Detail | Task 11 | `app/artigos/[slug]/page.tsx`, `features/articles/components/article-content.tsx` | Articles Domain, Public Navbar |
| About Page | Task 12 | `app/sobre/page.tsx` | Author Domain, Public Navbar |

Coordinator integration after Wave 3:

```bash
npm run lint
npm run typecheck
npm run build
```

Expected:

- `/` builds;
- `/artigos/primeiro-artigo` builds;
- `/sobre` builds;
- draft article is not publicly routed.

#### Wave 4 - Admin UI in Parallel

Task 14 and Task 15 both touch admin routes. Split ownership carefully.

Recommended sequence:

1. Admin Shell worker implements only `features/admin/components/admin-navbar.tsx`.
2. Admin Dashboard worker implements `app/admin/page.tsx`.
3. Admin Editor worker implements `features/admin/components/post-editor.tsx` and `app/admin/postar/page.tsx`.

Parallel-safe ownership:

| Worker | Scope | Ownership |
| --- | --- | --- |
| Admin Shell | shared admin navigation | `features/admin/components/admin-navbar.tsx` |
| Admin Dashboard | admin overview route | `app/admin/page.tsx` |
| Admin Editor | post editor route and component | `features/admin/components/post-editor.tsx`, `app/admin/postar/page.tsx` |

Dependencies:

- Admin Dashboard depends on Articles Domain and Admin Shell.
- Admin Editor depends on Admin Generator and Admin Shell.

Coordinator integration after Wave 4:

```bash
npm run test
npm run lint
npm run typecheck
npm run build
```

Expected:

- `/admin` builds;
- `/admin/postar` builds;
- admin generator tests still pass.

#### Wave 5 - Delivery, CI, and Production Readiness

These should run after feature integration.

| Worker | Task | Ownership |
| --- | --- | --- |
| CI | Task 16 | `.github/workflows/quality.yml` |
| Docs | Task 17 | `README.md` |
| QA Coordinator | Task 18 | verification only, fixes only after identifying issues |

Task 16 and Task 17 can run in parallel. Task 18 must run last.

### Suggested Worker Briefs

Use these as short prompts when dispatching agents. Include only the relevant task body from this file plus the listed specs.

#### Worker Brief: Articles Domain

Read:

- `docs/specs/01-content-mdx.md`
- Task 5 from this plan

Goal:

- Implement article loading, validation, filtering, sorting, lookup, and tests.

Ownership:

- `features/articles/types.ts`
- `features/articles/lib/articles.ts`
- `features/articles/lib/articles.test.ts`

Do not edit:

- routes in `app/`;
- admin files;
- author files;
- package dependencies.

Return:

- changed files;
- test command output summary;
- any assumptions.

#### Worker Brief: Author Domain

Read:

- `docs/specs/01-content-mdx.md`
- Task 6 from this plan

Goal:

- Implement author profile loading and tests.

Ownership:

- `features/author/types.ts`
- `features/author/lib/author.ts`
- `features/author/lib/author.test.ts`

Return:

- changed files;
- test command output summary;
- any assumptions.

#### Worker Brief: Admin Generator

Read:

- `docs/specs/03-admin-experience.md`
- Task 13 from this plan

Goal:

- Implement pure MDX generation and validation logic with tests.

Ownership:

- `features/admin/types.ts`
- `features/admin/lib/mdx-generator.ts`
- `features/admin/lib/mdx-generator.test.ts`

Return:

- changed files;
- test command output summary;
- any assumptions.

#### Worker Brief: Public Pages

Read:

- `docs/specs/02-public-experience.md`
- assigned task body from Tasks 10, 11, or 12

Goal:

- Implement exactly one public page/front.

Ownership:

- Homepage worker: `app/page.tsx`, `features/articles/components/article-timeline.tsx`
- Article worker: `app/artigos/[slug]/page.tsx`, `features/articles/components/article-content.tsx`
- About worker: `app/sobre/page.tsx`

Return:

- changed files;
- build/typecheck summary;
- any visual or responsive concerns.

#### Worker Brief: Admin UI

Read:

- `docs/specs/03-admin-experience.md`
- assigned section from Wave 4

Goal:

- Implement exactly one admin surface.

Ownership:

- Admin Shell worker: `features/admin/components/admin-navbar.tsx`
- Admin Dashboard worker: `app/admin/page.tsx`
- Admin Editor worker: `features/admin/components/post-editor.tsx`, `app/admin/postar/page.tsx`

Return:

- changed files;
- build/typecheck summary;
- any UX concerns.

### Integration Checklist Between Waves

After each wave, the coordinator must run:

```bash
git status --short
npm run format:check
npm run lint
npm run typecheck
npm run test
npm run build
```

If failures appear:

- group failures by ownership area;
- dispatch focused fix agents only for the failing area;
- avoid broad manual fixes unless the issue is a trivial integration conflict.

### Parallelization Summary

Best parallel opportunities:

- Wave 1: Articles Domain, Author Domain, Admin Generator.
- Wave 3: Homepage, Article Detail, About Page.
- Wave 4: Admin Dashboard and Admin Editor after Admin Shell exists.
- Wave 5: CI and README.

Best sequential work:

- Wave 0 bootstrap.
- Dependency installation.
- Shared UI foundation.
- Final production readiness pass.

---

## Task 1: Initialize Git and Next.js Project

**Purpose:** Create the base Next.js application in the current repository.

**Files:**

- Create: `package.json`
- Create: `package-lock.json`
- Create: `next.config.ts`
- Create: `tsconfig.json`
- Create: `eslint.config.mjs`
- Create: `app/layout.tsx`
- Create: `app/page.tsx`
- Create: `app/globals.css`
- Create: `public/`
- Create: `.gitignore`

- [ ] **Step 1: Initialize Git if needed**

Run:

```bash
git status
```

Expected:

- If Git says this is not a repository, run `git init`.
- If Git already exists, continue.

- [ ] **Step 2: Scaffold Next.js**

Run:

```bash
npx create-next-app@latest . --ts --eslint --app --src-dir false --use-npm --no-tailwind --import-alias "@/*"
```

Expected:

- Next.js project files are created in the current directory.
- Existing `docs/` files remain untouched.

- [ ] **Step 3: Verify dev scripts exist**

Check `package.json` and confirm these scripts exist:

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  }
}
```

If `next lint` is unavailable for the installed Next.js version, use ESLint directly in a later task.

- [ ] **Step 4: Run initial build**

Run:

```bash
npm run build
```

Expected:

- Build completes successfully.

- [ ] **Step 5: Commit**

Run:

```bash
git add .
git commit -m "chore: initialize next app"
```

---

## Task 2: Configure Quality Tooling

**Purpose:** Add consistent formatting, typecheck, testing, and quality scripts.

**Files:**

- Modify: `package.json`
- Create: `.prettierrc`
- Create: `.prettierignore`
- Create: `vitest.config.ts`
- Create: `tests/setup.ts`

- [ ] **Step 1: Install dev dependencies**

Run:

```bash
npm install -D prettier vitest @testing-library/react @testing-library/jest-dom jsdom
```

Expected:

- Dependencies are added to `package.json`.

- [ ] **Step 2: Add scripts to `package.json`**

Set scripts to include:

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint .",
    "format": "prettier . --write",
    "format:check": "prettier . --check",
    "typecheck": "tsc --noEmit",
    "test": "vitest run",
    "test:watch": "vitest"
  }
}
```

- [ ] **Step 3: Create `.prettierrc`**

```json
{
  "semi": true,
  "singleQuote": false,
  "trailingComma": "es5",
  "printWidth": 100
}
```

- [ ] **Step 4: Create `.prettierignore`**

```txt
.next
node_modules
coverage
dist
package-lock.json
```

- [ ] **Step 5: Create `vitest.config.ts`**

```ts
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./tests/setup.ts"],
  },
});
```

- [ ] **Step 6: Create `tests/setup.ts`**

```ts
import "@testing-library/jest-dom/vitest";
```

- [ ] **Step 7: Verify quality commands**

Run:

```bash
npm run format:check
npm run lint
npm run typecheck
npm run test
npm run build
```

Expected:

- All commands pass.

- [ ] **Step 8: Commit**

```bash
git add .
git commit -m "chore: configure quality tooling"
```

---

## Task 3: Create Project Structure

**Purpose:** Establish the folder boundaries used by all future tasks.

**Files:**

- Create: `content/articles/.gitkeep`
- Create: `features/articles/components/.gitkeep`
- Create: `features/articles/lib/.gitkeep`
- Create: `features/admin/components/.gitkeep`
- Create: `features/admin/lib/.gitkeep`
- Create: `features/author/lib/.gitkeep`
- Create: `features/theme/components/.gitkeep`
- Create: `features/metrics/lib/.gitkeep`
- Create: `shared/ui/.gitkeep`
- Create: `shared/lib/.gitkeep`
- Create: `shared/config/site.ts`

- [ ] **Step 1: Create directories**

Run:

```bash
mkdir -p content/articles features/articles/components features/articles/lib features/admin/components features/admin/lib features/author/lib features/theme/components features/metrics/lib shared/ui shared/lib shared/config
```

If using PowerShell, run:

```powershell
New-Item -ItemType Directory -Force content/articles,features/articles/components,features/articles/lib,features/admin/components,features/admin/lib,features/author/lib,features/theme/components,features/metrics/lib,shared/ui,shared/lib,shared/config
```

- [ ] **Step 2: Create `shared/config/site.ts`**

```ts
export const siteConfig = {
  name: "Jotacraq Blog",
  description: "Artigos, ideias e registros autorais.",
  githubUrl: "https://github.com/jotacraq",
} as const;
```

- [ ] **Step 3: Preserve empty folders**

Create `.gitkeep` files in empty folders listed above.

- [ ] **Step 4: Verify**

Run:

```bash
npm run typecheck
```

Expected:

- Typecheck passes.

- [ ] **Step 5: Commit**

```bash
git add .
git commit -m "chore: add project structure"
```

---

## Task 4: Add Sample MDX Content

**Purpose:** Add local content that drives homepage, article page, and author page development.

**Files:**

- Create: `content/articles/2026-05-16-primeiro-artigo.mdx`
- Create: `content/articles/2026-05-17-rascunho-exemplo.mdx`
- Create: `content/author.mdx`

- [ ] **Step 1: Create published article**

```mdx
---
title: "Primeiro artigo"
subtitle: "Uma abertura para o blog"
slug: "primeiro-artigo"
publishedAt: "2026-05-16"
excerpt: "Este artigo inaugura o espaco editorial do blog."
tags:
  - dev
  - escrita
draft: false
---

Este e o primeiro artigo do Jotacraq Blog.

Ele existe para validar a estrutura de conteudo, a listagem da homepage e a pagina individual de leitura.
```

- [ ] **Step 2: Create draft article**

```mdx
---
title: "Rascunho exemplo"
subtitle: "Artigo que nao aparece publicamente"
slug: "rascunho-exemplo"
publishedAt: "2026-05-17"
excerpt: "Este rascunho valida o filtro de artigos nao publicados."
tags:
  - draft
draft: true
---

Este artigo nao deve aparecer na homepage publica.
```

- [ ] **Step 3: Create author content**

```mdx
---
name: "Jotacraq"
headline: "Desenvolvedor compartilhando ideias, estudos e registros de construcao."
githubUrl: "https://github.com/jotacraq"
location: "Brasil"
interests:
  - desenvolvimento
  - produto
  - escrita
---

Sou um autor em construcao, usando este espaco para publicar artigos, aprendizados e pensamentos sobre tecnologia.
```

- [ ] **Step 4: Verify files are present**

Run:

```bash
ls content/articles
ls content
```

Expected:

- Two article files exist.
- `author.mdx` exists.

- [ ] **Step 5: Commit**

```bash
git add content
git commit -m "content: add initial mdx content"
```

---

## Task 5: Implement Article Domain Library

**Purpose:** Read, validate, and expose article data from MDX files.

**Files:**

- Create: `features/articles/types.ts`
- Create: `features/articles/lib/articles.ts`
- Create: `features/articles/lib/articles.test.ts`

- [ ] **Step 1: Install content dependencies**

Run:

```bash
npm install gray-matter
```

- [ ] **Step 2: Create `features/articles/types.ts`**

```ts
export type Article = {
  title: string;
  subtitle: string;
  slug: string;
  publishedAt: string;
  excerpt: string;
  tags: string[];
  draft: boolean;
  content: string;
  readingTimeMinutes: number;
};
```

- [ ] **Step 3: Create failing tests in `features/articles/lib/articles.test.ts`**

```ts
import {
  getAllArticles,
  getArticleBySlug,
  getLatestArticle,
  getPublishedArticles,
} from "./articles";

describe("articles content library", () => {
  it("returns all articles including drafts", async () => {
    const articles = await getAllArticles();

    expect(articles.map((article) => article.slug)).toContain("primeiro-artigo");
    expect(articles.map((article) => article.slug)).toContain("rascunho-exemplo");
  });

  it("filters draft articles from published results", async () => {
    const articles = await getPublishedArticles();

    expect(articles.map((article) => article.slug)).toContain("primeiro-artigo");
    expect(articles.map((article) => article.slug)).not.toContain("rascunho-exemplo");
  });

  it("finds an article by slug", async () => {
    const article = await getArticleBySlug("primeiro-artigo");

    expect(article?.title).toBe("Primeiro artigo");
  });

  it("returns null for unknown slug", async () => {
    const article = await getArticleBySlug("nao-existe");

    expect(article).toBeNull();
  });

  it("returns the latest published article", async () => {
    const article = await getLatestArticle();

    expect(article?.slug).toBe("primeiro-artigo");
  });
});
```

- [ ] **Step 4: Run tests and confirm failure**

Run:

```bash
npm run test -- features/articles/lib/articles.test.ts
```

Expected:

- Tests fail because `articles.ts` does not exist yet.

- [ ] **Step 5: Create `features/articles/lib/articles.ts`**

```ts
import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import type { Article } from "../types";

const articlesDirectory = path.join(process.cwd(), "content", "articles");

type ArticleFrontmatter = {
  title?: unknown;
  subtitle?: unknown;
  slug?: unknown;
  publishedAt?: unknown;
  excerpt?: unknown;
  tags?: unknown;
  draft?: unknown;
};

function assertString(value: unknown, field: string): string {
  if (typeof value !== "string" || value.trim().length === 0) {
    throw new Error(`Invalid article frontmatter: ${field} must be a non-empty string`);
  }

  return value;
}

function normalizeTags(value: unknown): string[] {
  if (value === undefined) {
    return [];
  }

  if (!Array.isArray(value)) {
    throw new Error("Invalid article frontmatter: tags must be an array");
  }

  return value.map((tag) => assertString(tag, "tags[]"));
}

function calculateReadingTime(content: string): number {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
}

function parseArticle(raw: string): Article {
  const parsed = matter(raw);
  const data = parsed.data as ArticleFrontmatter;

  return {
    title: assertString(data.title, "title"),
    subtitle: assertString(data.subtitle, "subtitle"),
    slug: assertString(data.slug, "slug"),
    publishedAt: assertString(data.publishedAt, "publishedAt"),
    excerpt: assertString(data.excerpt, "excerpt"),
    tags: normalizeTags(data.tags),
    draft: data.draft === true,
    content: parsed.content.trim(),
    readingTimeMinutes: calculateReadingTime(parsed.content),
  };
}

function sortByPublishedAtDesc(a: Article, b: Article): number {
  return b.publishedAt.localeCompare(a.publishedAt);
}

export async function getAllArticles(): Promise<Article[]> {
  const filenames = await fs.readdir(articlesDirectory);
  const mdxFilenames = filenames.filter((filename) => filename.endsWith(".mdx"));

  const articles = await Promise.all(
    mdxFilenames.map(async (filename) => {
      const filePath = path.join(articlesDirectory, filename);
      const raw = await fs.readFile(filePath, "utf8");
      return parseArticle(raw);
    })
  );

  return articles.sort(sortByPublishedAtDesc);
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
```

- [ ] **Step 6: Verify**

Run:

```bash
npm run test -- features/articles/lib/articles.test.ts
npm run typecheck
```

Expected:

- Tests pass.
- Typecheck passes.

- [ ] **Step 7: Commit**

```bash
git add .
git commit -m "feat: add mdx article library"
```

---

## Task 6: Implement Author Domain Library

**Purpose:** Read and validate author profile content from `content/author.mdx`.

**Files:**

- Create: `features/author/types.ts`
- Create: `features/author/lib/author.ts`
- Create: `features/author/lib/author.test.ts`

- [ ] **Step 1: Create `features/author/types.ts`**

```ts
export type AuthorProfile = {
  name: string;
  headline: string;
  githubUrl: string;
  location: string;
  interests: string[];
  content: string;
};
```

- [ ] **Step 2: Create tests**

```ts
import { getAuthorProfile } from "./author";

describe("author content library", () => {
  it("loads the author profile from content/author.mdx", async () => {
    const author = await getAuthorProfile();

    expect(author.name).toBe("Jotacraq");
    expect(author.githubUrl).toBe("https://github.com/jotacraq");
    expect(author.interests).toContain("desenvolvimento");
  });
});
```

- [ ] **Step 3: Create `features/author/lib/author.ts`**

```ts
import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import type { AuthorProfile } from "../types";

const authorPath = path.join(process.cwd(), "content", "author.mdx");

type AuthorFrontmatter = {
  name?: unknown;
  headline?: unknown;
  githubUrl?: unknown;
  location?: unknown;
  interests?: unknown;
};

function assertString(value: unknown, field: string): string {
  if (typeof value !== "string" || value.trim().length === 0) {
    throw new Error(`Invalid author frontmatter: ${field} must be a non-empty string`);
  }

  return value;
}

function assertStringArray(value: unknown, field: string): string[] {
  if (!Array.isArray(value)) {
    throw new Error(`Invalid author frontmatter: ${field} must be an array`);
  }

  return value.map((item) => assertString(item, `${field}[]`));
}

export async function getAuthorProfile(): Promise<AuthorProfile> {
  const raw = await fs.readFile(authorPath, "utf8");
  const parsed = matter(raw);
  const data = parsed.data as AuthorFrontmatter;

  return {
    name: assertString(data.name, "name"),
    headline: assertString(data.headline, "headline"),
    githubUrl: assertString(data.githubUrl, "githubUrl"),
    location: assertString(data.location, "location"),
    interests: assertStringArray(data.interests, "interests"),
    content: parsed.content.trim(),
  };
}
```

- [ ] **Step 4: Verify**

Run:

```bash
npm run test -- features/author/lib/author.test.ts
npm run typecheck
```

Expected:

- Tests pass.

- [ ] **Step 5: Commit**

```bash
git add .
git commit -m "feat: add author content library"
```

---

## Task 7: Add Shared UI Foundations

**Purpose:** Create reusable UI pieces for links, layout, and theme-aware styling.

**Files:**

- Modify: `app/globals.css`
- Create: `shared/ui/container.tsx`
- Create: `shared/ui/icon-link.tsx`

- [ ] **Step 1: Update `app/globals.css`**

Use global CSS variables for themes:

```css
:root {
  --background: #faf9f6;
  --foreground: #161616;
  --muted: #666666;
  --border: #d8d3ca;
  --surface: #ffffff;
  --accent: #2764d8;
}

[data-theme="dark"] {
  --background: #101113;
  --foreground: #f5f1e8;
  --muted: #a8a29a;
  --border: #34363a;
  --surface: #181a1f;
  --accent: #8bb7ff;
}

* {
  box-sizing: border-box;
}

html {
  color-scheme: light;
}

html[data-theme="dark"] {
  color-scheme: dark;
}

body {
  margin: 0;
  background: var(--background);
  color: var(--foreground);
  font-family: Arial, Helvetica, sans-serif;
}

a {
  color: inherit;
}

button,
input,
textarea {
  font: inherit;
}
```

- [ ] **Step 2: Create `shared/ui/container.tsx`**

```tsx
import type { ReactNode } from "react";

type ContainerProps = {
  children: ReactNode;
  className?: string;
};

export function Container({ children, className = "" }: ContainerProps) {
  return <div className={`mx-auto w-full max-w-5xl px-4 ${className}`}>{children}</div>;
}
```

If Tailwind is not installed, replace the implementation with inline styles:

```tsx
import type { ReactNode } from "react";

type ContainerProps = {
  children: ReactNode;
  className?: string;
};

export function Container({ children, className }: ContainerProps) {
  return (
    <div
      className={className}
      style={{
        width: "100%",
        maxWidth: "1024px",
        margin: "0 auto",
        padding: "0 16px",
      }}
    >
      {children}
    </div>
  );
}
```

- [ ] **Step 3: Create `shared/ui/icon-link.tsx`**

```tsx
import Link from "next/link";
import type { ReactNode } from "react";

type IconLinkProps = {
  href: string;
  label: string;
  children: ReactNode;
};

export function IconLink({ href, label, children }: IconLinkProps) {
  return (
    <Link
      aria-label={label}
      href={href}
      style={{
        alignItems: "center",
        border: "1px solid var(--border)",
        borderRadius: "8px",
        display: "inline-flex",
        height: "40px",
        justifyContent: "center",
        width: "40px",
      }}
    >
      {children}
    </Link>
  );
}
```

- [ ] **Step 4: Verify**

Run:

```bash
npm run lint
npm run typecheck
```

Expected:

- Lint and typecheck pass.

- [ ] **Step 5: Commit**

```bash
git add .
git commit -m "feat: add shared ui foundations"
```

---

## Task 8: Implement Theme Support

**Purpose:** Add dark/light mode with browser persistence.

**Files:**

- Modify: `app/layout.tsx`
- Create: `features/theme/components/theme-provider.tsx`
- Create: `features/theme/components/theme-toggle.tsx`

- [ ] **Step 1: Install dependencies**

Run:

```bash
npm install next-themes lucide-react
```

- [ ] **Step 2: Create theme provider**

```tsx
"use client";

import { ThemeProvider as NextThemeProvider } from "next-themes";
import type { ReactNode } from "react";

type ThemeProviderProps = {
  children: ReactNode;
};

export function ThemeProvider({ children }: ThemeProviderProps) {
  return (
    <NextThemeProvider attribute="data-theme" defaultTheme="system" enableSystem>
      {children}
    </NextThemeProvider>
  );
}
```

- [ ] **Step 3: Create theme toggle**

```tsx
"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted && resolvedTheme === "dark";

  return (
    <button
      aria-label="Alternar tema"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      type="button"
      style={{
        alignItems: "center",
        background: "var(--surface)",
        border: "1px solid var(--border)",
        borderRadius: "8px",
        color: "var(--foreground)",
        cursor: "pointer",
        display: "inline-flex",
        height: "40px",
        justifyContent: "center",
        width: "40px",
      }}
    >
      {isDark ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
}
```

- [ ] **Step 4: Wrap app in `app/layout.tsx`**

Ensure `ThemeProvider` wraps `children`.

```tsx
import type { Metadata } from "next";
import { ThemeProvider } from "@/features/theme/components/theme-provider";
import { siteConfig } from "@/shared/config/site";
import "./globals.css";

export const metadata: Metadata = {
  title: siteConfig.name,
  description: siteConfig.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
```

- [ ] **Step 5: Verify**

Run:

```bash
npm run lint
npm run typecheck
npm run build
```

Expected:

- All commands pass.

- [ ] **Step 6: Commit**

```bash
git add .
git commit -m "feat: add theme support"
```

---

## Task 9: Build Public Navigation

**Purpose:** Add navbar with site title, latest article date, theme toggle, and GitHub icon.

**Files:**

- Create: `features/articles/lib/format-date.ts`
- Create: `features/articles/lib/format-date.test.ts`
- Create: `features/articles/components/public-navbar.tsx`

- [ ] **Step 1: Create date formatter tests**

```ts
import { formatDisplayDate } from "./format-date";

describe("formatDisplayDate", () => {
  it("formats ISO date to Brazilian display date", () => {
    expect(formatDisplayDate("2026-05-16")).toBe("16/05/2026");
  });
});
```

- [ ] **Step 2: Create date formatter**

```ts
export function formatDisplayDate(value: string): string {
  const [year, month, day] = value.split("-");
  return `${day}/${month}/${year}`;
}
```

- [ ] **Step 3: Create public navbar**

```tsx
import { Github } from "lucide-react";
import Link from "next/link";
import { ThemeToggle } from "@/features/theme/components/theme-toggle";
import { siteConfig } from "@/shared/config/site";
import { IconLink } from "@/shared/ui/icon-link";
import { formatDisplayDate } from "../lib/format-date";

type PublicNavbarProps = {
  latestArticleDate: string | null;
};

export function PublicNavbar({ latestArticleDate }: PublicNavbarProps) {
  return (
    <header
      style={{
        borderBottom: "1px solid var(--border)",
        background: "var(--background)",
      }}
    >
      <nav
        style={{
          alignItems: "center",
          display: "flex",
          gap: "16px",
          justifyContent: "space-between",
          margin: "0 auto",
          maxWidth: "1024px",
          minHeight: "72px",
          padding: "0 16px",
        }}
      >
        <Link href="/" style={{ fontSize: "18px", fontWeight: 700, textDecoration: "none" }}>
          {siteConfig.name}
        </Link>
        <div style={{ alignItems: "center", display: "flex", gap: "10px" }}>
          {latestArticleDate ? (
            <span style={{ color: "var(--muted)", fontSize: "14px" }}>
              Ultimo artigo: {formatDisplayDate(latestArticleDate)}
            </span>
          ) : null}
          <ThemeToggle />
          <IconLink href={siteConfig.githubUrl} label="Abrir GitHub do autor">
            <Github size={18} />
          </IconLink>
        </div>
      </nav>
    </header>
  );
}
```

- [ ] **Step 4: Verify**

Run:

```bash
npm run test -- features/articles/lib/format-date.test.ts
npm run lint
npm run typecheck
```

Expected:

- Tests, lint, and typecheck pass.

- [ ] **Step 5: Commit**

```bash
git add .
git commit -m "feat: add public navbar"
```

---

## Task 10: Build Homepage Timeline

**Purpose:** Replace the default homepage with the article timeline.

**Files:**

- Modify: `app/page.tsx`
- Create: `features/articles/components/article-timeline.tsx`

- [ ] **Step 1: Create article timeline component**

```tsx
import Link from "next/link";
import type { Article } from "../types";
import { formatDisplayDate } from "../lib/format-date";

type ArticleTimelineProps = {
  articles: Article[];
};

export function ArticleTimeline({ articles }: ArticleTimelineProps) {
  if (articles.length === 0) {
    return <p style={{ color: "var(--muted)" }}>Ainda nao ha artigos publicados.</p>;
  }

  return (
    <ol
      style={{
        display: "grid",
        gap: "28px",
        listStyle: "none",
        margin: 0,
        padding: "24px 0 24px 28px",
        position: "relative",
      }}
    >
      <span
        aria-hidden="true"
        style={{
          background: "var(--border)",
          bottom: 0,
          left: "8px",
          position: "absolute",
          top: 0,
          width: "2px",
        }}
      />
      {articles.map((article) => (
        <li key={article.slug} style={{ position: "relative" }}>
          <span
            aria-hidden="true"
            style={{
              background: "var(--accent)",
              borderRadius: "999px",
              height: "14px",
              left: "-26px",
              position: "absolute",
              top: "8px",
              width: "14px",
            }}
          />
          <article>
            <time style={{ color: "var(--muted)", fontSize: "14px" }}>
              {formatDisplayDate(article.publishedAt)}
            </time>
            <h2 style={{ fontSize: "28px", margin: "8px 0 4px" }}>
              <Link href={`/artigos/${article.slug}`} style={{ textDecoration: "none" }}>
                {article.title}
              </Link>
            </h2>
            <p style={{ color: "var(--muted)", fontSize: "18px", margin: "0 0 8px" }}>
              {article.subtitle}
            </p>
            <p style={{ lineHeight: 1.7, margin: 0 }}>{article.excerpt}</p>
          </article>
        </li>
      ))}
    </ol>
  );
}
```

- [ ] **Step 2: Replace `app/page.tsx`**

```tsx
import { ArticleTimeline } from "@/features/articles/components/article-timeline";
import { PublicNavbar } from "@/features/articles/components/public-navbar";
import { getLatestArticle, getPublishedArticles } from "@/features/articles/lib/articles";

export default async function HomePage() {
  const articles = await getPublishedArticles();
  const latestArticle = await getLatestArticle();

  return (
    <>
      <PublicNavbar latestArticleDate={latestArticle?.publishedAt ?? null} />
      <main style={{ margin: "0 auto", maxWidth: "860px", padding: "56px 16px" }}>
        <h1 style={{ fontSize: "42px", margin: "0 0 12px" }}>Artigos</h1>
        <p style={{ color: "var(--muted)", fontSize: "18px", lineHeight: 1.7, margin: 0 }}>
          Registros, ideias e textos publicados em ordem de lancamento.
        </p>
        <ArticleTimeline articles={articles} />
      </main>
    </>
  );
}
```

- [ ] **Step 3: Verify**

Run:

```bash
npm run lint
npm run typecheck
npm run build
```

Expected:

- Homepage builds successfully.
- Draft article is not listed in generated output.

- [ ] **Step 4: Commit**

```bash
git add .
git commit -m "feat: build public homepage timeline"
```

---

## Task 11: Build Article Detail Pages

**Purpose:** Add `/artigos/[slug]` route for reading full articles.

**Files:**

- Create: `app/artigos/[slug]/page.tsx`
- Create: `features/articles/components/article-content.tsx`

- [ ] **Step 1: Create article content component**

For MVP, render MDX content as plain pre-wrapped text until MDX component rendering is added.

```tsx
import type { Article } from "../types";
import { formatDisplayDate } from "../lib/format-date";

type ArticleContentProps = {
  article: Article;
};

export function ArticleContent({ article }: ArticleContentProps) {
  return (
    <article style={{ lineHeight: 1.8 }}>
      <p style={{ color: "var(--muted)", margin: "0 0 12px" }}>
        {formatDisplayDate(article.publishedAt)} · {article.readingTimeMinutes} min de leitura
      </p>
      <h1 style={{ fontSize: "44px", margin: "0 0 10px" }}>{article.title}</h1>
      <p style={{ color: "var(--muted)", fontSize: "20px", margin: "0 0 40px" }}>
        {article.subtitle}
      </p>
      <div style={{ whiteSpace: "pre-wrap" }}>{article.content}</div>
    </article>
  );
}
```

- [ ] **Step 2: Create article route**

```tsx
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

export async function generateMetadata({ params }: ArticlePageProps) {
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
      <main style={{ margin: "0 auto", maxWidth: "760px", padding: "48px 16px" }}>
        <Link href="/" style={{ color: "var(--muted)" }}>
          Voltar para home
        </Link>
        <ArticleContent article={article} />
      </main>
    </>
  );
}
```

- [ ] **Step 3: Verify**

Run:

```bash
npm run lint
npm run typecheck
npm run build
```

Expected:

- `/artigos/primeiro-artigo` is statically generated.
- Draft route is not generated.

- [ ] **Step 4: Commit**

```bash
git add .
git commit -m "feat: add article detail pages"
```

---

## Task 12: Build About Page

**Purpose:** Add `/sobre` route using author MDX data.

**Files:**

- Create: `app/sobre/page.tsx`

- [ ] **Step 1: Create page**

```tsx
import { Github } from "lucide-react";
import Link from "next/link";
import { PublicNavbar } from "@/features/articles/components/public-navbar";
import { getLatestArticle } from "@/features/articles/lib/articles";
import { getAuthorProfile } from "@/features/author/lib/author";

export async function generateMetadata() {
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
      <main style={{ margin: "0 auto", maxWidth: "760px", padding: "56px 16px" }}>
        <h1 style={{ fontSize: "42px", margin: "0 0 12px" }}>Sobre {author.name}</h1>
        <p style={{ color: "var(--muted)", fontSize: "20px", lineHeight: 1.7 }}>
          {author.headline}
        </p>
        <div style={{ lineHeight: 1.8, marginTop: "32px", whiteSpace: "pre-wrap" }}>
          {author.content}
        </div>
        <section style={{ marginTop: "32px" }}>
          <h2>Interesses</h2>
          <ul>
            {author.interests.map((interest) => (
              <li key={interest}>{interest}</li>
            ))}
          </ul>
        </section>
        <Link
          href={author.githubUrl}
          style={{ alignItems: "center", display: "inline-flex", gap: "8px", marginTop: "24px" }}
        >
          <Github size={18} />
          GitHub
        </Link>
      </main>
    </>
  );
}
```

- [ ] **Step 2: Verify**

Run:

```bash
npm run lint
npm run typecheck
npm run build
```

Expected:

- `/sobre` builds successfully.

- [ ] **Step 3: Commit**

```bash
git add .
git commit -m "feat: add about page"
```

---

## Task 13: Implement Admin MDX Generator Library

**Purpose:** Create tested pure functions for validating admin form input and generating MDX.

**Files:**

- Create: `features/admin/types.ts`
- Create: `features/admin/lib/mdx-generator.ts`
- Create: `features/admin/lib/mdx-generator.test.ts`

- [ ] **Step 1: Create types**

```ts
export type ArticleDraftInput = {
  title: string;
  subtitle: string;
  slug: string;
  publishedAt: string;
  excerpt: string;
  tags: string;
  content: string;
};

export type ArticleDraftValidation = {
  valid: boolean;
  errors: Partial<Record<keyof ArticleDraftInput, string>>;
};
```

- [ ] **Step 2: Create tests**

```ts
import { generateArticleMdx, getSuggestedFilename, validateArticleDraft } from "./mdx-generator";

const validInput = {
  title: "Titulo",
  subtitle: "Subtitulo",
  slug: "titulo",
  publishedAt: "2026-05-16",
  excerpt: "Resumo",
  tags: "dev, escrita",
  content: "Conteudo do artigo.",
};

describe("admin mdx generator", () => {
  it("validates a complete draft", () => {
    expect(validateArticleDraft(validInput)).toEqual({ valid: true, errors: {} });
  });

  it("rejects invalid slug", () => {
    const result = validateArticleDraft({ ...validInput, slug: "Slug Invalido" });

    expect(result.valid).toBe(false);
    expect(result.errors.slug).toBe("Use apenas letras minusculas, numeros e hifens.");
  });

  it("generates article mdx", () => {
    const mdx = generateArticleMdx(validInput);

    expect(mdx).toContain('title: "Titulo"');
    expect(mdx).toContain('slug: "titulo"');
    expect(mdx).toContain("  - dev");
    expect(mdx).toContain("Conteudo do artigo.");
  });

  it("suggests filename", () => {
    expect(getSuggestedFilename(validInput)).toBe("2026-05-16-titulo.mdx");
  });
});
```

- [ ] **Step 3: Create generator**

```ts
import type { ArticleDraftInput, ArticleDraftValidation } from "../types";

const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const datePattern = /^\d{4}-\d{2}-\d{2}$/;

function escapeYamlString(value: string): string {
  return value.replaceAll("\\", "\\\\").replaceAll('"', '\\"');
}

export function validateArticleDraft(input: ArticleDraftInput): ArticleDraftValidation {
  const errors: ArticleDraftValidation["errors"] = {};

  if (!input.title.trim()) errors.title = "Titulo e obrigatorio.";
  if (!input.subtitle.trim()) errors.subtitle = "Subtitulo e obrigatorio.";
  if (!input.excerpt.trim()) errors.excerpt = "Resumo e obrigatorio.";
  if (!input.content.trim()) errors.content = "Conteudo e obrigatorio.";

  if (!input.slug.trim()) {
    errors.slug = "Slug e obrigatorio.";
  } else if (!slugPattern.test(input.slug)) {
    errors.slug = "Use apenas letras minusculas, numeros e hifens.";
  }

  if (!input.publishedAt.trim()) {
    errors.publishedAt = "Data e obrigatoria.";
  } else if (!datePattern.test(input.publishedAt)) {
    errors.publishedAt = "Use o formato YYYY-MM-DD.";
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

export function parseTags(value: string): string[] {
  return value
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);
}

export function generateArticleMdx(input: ArticleDraftInput): string {
  const validation = validateArticleDraft(input);

  if (!validation.valid) {
    throw new Error("Cannot generate MDX from invalid article draft");
  }

  const tags = parseTags(input.tags);
  const tagsBlock =
    tags.length > 0 ? tags.map((tag) => `  - ${escapeYamlString(tag)}`).join("\n") : "";

  return `---
title: "${escapeYamlString(input.title.trim())}"
subtitle: "${escapeYamlString(input.subtitle.trim())}"
slug: "${escapeYamlString(input.slug.trim())}"
publishedAt: "${escapeYamlString(input.publishedAt.trim())}"
excerpt: "${escapeYamlString(input.excerpt.trim())}"
tags:
${tagsBlock}
draft: false
---

${input.content.trim()}
`;
}

export function getSuggestedFilename(input: Pick<ArticleDraftInput, "publishedAt" | "slug">): string {
  return `${input.publishedAt}-${input.slug}.mdx`;
}
```

- [ ] **Step 4: Verify**

Run:

```bash
npm run test -- features/admin/lib/mdx-generator.test.ts
npm run typecheck
```

Expected:

- Tests pass.

- [ ] **Step 5: Commit**

```bash
git add .
git commit -m "feat: add admin mdx generator"
```

---

## Task 14: Build Admin Layout and Dashboard

**Purpose:** Add `/admin` with local article summary and admin navigation.

**Files:**

- Create: `features/admin/components/admin-navbar.tsx`
- Create: `app/admin/page.tsx`

- [ ] **Step 1: Create admin navbar**

```tsx
import Link from "next/link";

export function AdminNavbar() {
  return (
    <header style={{ borderBottom: "1px solid var(--border)" }}>
      <nav
        style={{
          alignItems: "center",
          display: "flex",
          gap: "20px",
          justifyContent: "space-between",
          margin: "0 auto",
          maxWidth: "1024px",
          minHeight: "72px",
          padding: "0 16px",
        }}
      >
        <Link href="/admin" style={{ fontWeight: 700, textDecoration: "none" }}>
          Admin
        </Link>
        <div style={{ display: "flex", gap: "14px" }}>
          <Link href="/admin">Home</Link>
          <Link href="/admin/postar">Postar</Link>
        </div>
      </nav>
    </header>
  );
}
```

- [ ] **Step 2: Create admin dashboard**

```tsx
import Link from "next/link";
import { AdminNavbar } from "@/features/admin/components/admin-navbar";
import { getAllArticles, getLatestArticle } from "@/features/articles/lib/articles";
import { formatDisplayDate } from "@/features/articles/lib/format-date";

export default async function AdminPage() {
  const [allArticles, latestArticle] = await Promise.all([getAllArticles(), getLatestArticle()]);
  const publishedCount = allArticles.filter((article) => !article.draft).length;
  const draftCount = allArticles.filter((article) => article.draft).length;

  return (
    <>
      <AdminNavbar />
      <main style={{ margin: "0 auto", maxWidth: "1024px", padding: "48px 16px" }}>
        <h1>Admin Home</h1>
        <section style={{ display: "grid", gap: "16px", gridTemplateColumns: "repeat(3, 1fr)" }}>
          <div style={{ border: "1px solid var(--border)", borderRadius: "8px", padding: "16px" }}>
            <strong>{publishedCount}</strong>
            <p>Artigos publicados</p>
          </div>
          <div style={{ border: "1px solid var(--border)", borderRadius: "8px", padding: "16px" }}>
            <strong>{draftCount}</strong>
            <p>Rascunhos locais</p>
          </div>
          <div style={{ border: "1px solid var(--border)", borderRadius: "8px", padding: "16px" }}>
            <strong>
              {latestArticle ? formatDisplayDate(latestArticle.publishedAt) : "Sem artigos"}
            </strong>
            <p>Ultimo artigo</p>
          </div>
        </section>
        <section style={{ marginTop: "32px" }}>
          <h2>Artigos recentes</h2>
          <ul>
            {allArticles.map((article) => (
              <li key={article.slug}>
                {article.title} {article.draft ? "(rascunho)" : ""}
              </li>
            ))}
          </ul>
        </section>
        <section style={{ marginTop: "32px" }}>
          <h2>Metricas</h2>
          <p style={{ color: "var(--muted)" }}>
            No MVP, metricas reais devem ser acompanhadas pelo Vercel Analytics quando configurado.
          </p>
        </section>
        <Link href="/admin/postar">Criar novo artigo</Link>
      </main>
    </>
  );
}
```

- [ ] **Step 3: Verify**

Run:

```bash
npm run lint
npm run typecheck
npm run build
```

Expected:

- `/admin` builds successfully.

- [ ] **Step 4: Commit**

```bash
git add .
git commit -m "feat: add admin dashboard"
```

---

## Task 15: Build Admin Post Editor

**Purpose:** Add `/admin/postar` with form, validation, generated MDX preview, copy, and filename suggestion.

**Files:**

- Create: `features/admin/components/post-editor.tsx`
- Create: `app/admin/postar/page.tsx`

- [ ] **Step 1: Create client editor**

```tsx
"use client";

import { useMemo, useState } from "react";
import type { ArticleDraftInput } from "../types";
import {
  generateArticleMdx,
  getSuggestedFilename,
  validateArticleDraft,
} from "../lib/mdx-generator";

const initialInput: ArticleDraftInput = {
  title: "",
  subtitle: "",
  slug: "",
  publishedAt: new Date().toISOString().slice(0, 10),
  excerpt: "",
  tags: "",
  content: "",
};

export function PostEditor() {
  const [input, setInput] = useState<ArticleDraftInput>(initialInput);
  const validation = useMemo(() => validateArticleDraft(input), [input]);
  const generatedMdx = useMemo(() => {
    if (!validation.valid) return "";
    return generateArticleMdx(input);
  }, [input, validation.valid]);
  const filename = validation.valid ? getSuggestedFilename(input) : "YYYY-MM-DD-slug.mdx";

  function updateField(field: keyof ArticleDraftInput, value: string) {
    setInput((current) => ({ ...current, [field]: value }));
  }

  async function copyMdx() {
    if (!generatedMdx) return;
    await navigator.clipboard.writeText(generatedMdx);
  }

  return (
    <div style={{ display: "grid", gap: "24px", gridTemplateColumns: "1fr 1fr" }}>
      <form style={{ display: "grid", gap: "14px" }}>
        {(["title", "subtitle", "slug", "publishedAt", "excerpt", "tags"] as const).map((field) => (
          <label key={field} style={{ display: "grid", gap: "6px" }}>
            {field}
            <input
              onChange={(event) => updateField(field, event.target.value)}
              style={{ padding: "10px" }}
              value={input[field]}
            />
            {validation.errors[field] ? (
              <span style={{ color: "#c0392b", fontSize: "14px" }}>{validation.errors[field]}</span>
            ) : null}
          </label>
        ))}
        <label style={{ display: "grid", gap: "6px" }}>
          content
          <textarea
            onChange={(event) => updateField("content", event.target.value)}
            rows={16}
            style={{ padding: "10px", resize: "vertical" }}
            value={input.content}
          />
          {validation.errors.content ? (
            <span style={{ color: "#c0392b", fontSize: "14px" }}>{validation.errors.content}</span>
          ) : null}
        </label>
      </form>
      <aside>
        <p style={{ color: "var(--muted)" }}>Arquivo sugerido: {filename}</p>
        <button disabled={!generatedMdx} onClick={copyMdx} type="button">
          Copiar MDX
        </button>
        <pre
          style={{
            background: "var(--surface)",
            border: "1px solid var(--border)",
            borderRadius: "8px",
            marginTop: "16px",
            maxHeight: "560px",
            overflow: "auto",
            padding: "16px",
            whiteSpace: "pre-wrap",
          }}
        >
          {generatedMdx || "Preencha os campos obrigatorios para gerar o MDX."}
        </pre>
      </aside>
    </div>
  );
}
```

- [ ] **Step 2: Create page**

```tsx
import { AdminNavbar } from "@/features/admin/components/admin-navbar";
import { PostEditor } from "@/features/admin/components/post-editor";

export default function AdminPostPage() {
  return (
    <>
      <AdminNavbar />
      <main style={{ margin: "0 auto", maxWidth: "1180px", padding: "48px 16px" }}>
        <h1>Postar</h1>
        <p style={{ color: "var(--muted)" }}>
          Escreva o artigo, gere o MDX e adicione o arquivo em content/articles para publicar via
          commit.
        </p>
        <PostEditor />
      </main>
    </>
  );
}
```

- [ ] **Step 3: Verify**

Run:

```bash
npm run lint
npm run typecheck
npm run build
```

Expected:

- `/admin/postar` builds successfully.

- [ ] **Step 4: Commit**

```bash
git add .
git commit -m "feat: add admin post editor"
```

---

## Task 16: Add GitHub Actions Quality Gate

**Purpose:** Run quality checks automatically on pull requests.

**Files:**

- Create: `.github/workflows/quality.yml`

- [ ] **Step 1: Create workflow**

```yaml
name: Quality Gate

on:
  pull_request:
    branches:
      - main
  push:
    branches:
      - main

jobs:
  quality:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
      - run: npm ci
      - run: npm run format:check
      - run: npm run lint
      - run: npm run typecheck
      - run: npm run test
      - run: npm run build
```

- [ ] **Step 2: Verify locally**

Run:

```bash
npm run format:check
npm run lint
npm run typecheck
npm run test
npm run build
```

Expected:

- All commands pass.

- [ ] **Step 3: Commit**

```bash
git add .github/workflows/quality.yml
git commit -m "ci: add quality gate workflow"
```

---

## Task 17: Add README and Publishing Guide

**Purpose:** Document local development, publishing articles, and production deploy.

**Files:**

- Create or Modify: `README.md`

- [ ] **Step 1: Write README**

Use this structure:

```md
# Jotacraq Blog

Blog pessoal construido com Next.js, MDX e Vercel.

## Stack

- Next.js
- TypeScript
- MDX
- GitHub
- Vercel

## Local Development

\`\`\`bash
npm install
npm run dev
\`\`\`

## Quality Checks

\`\`\`bash
npm run format:check
npm run lint
npm run typecheck
npm run test
npm run build
\`\`\`

## Publishing an Article

1. Open `/admin/postar` locally.
2. Fill title, subtitle, slug, date, excerpt, tags, and content.
3. Copy the generated MDX.
4. Create a file in `content/articles` using `YYYY-MM-DD-slug.mdx`.
5. Commit the article.
6. Push to GitHub.
7. Vercel deploys the new version automatically.

## MVP Decisions

- No database.
- No CMS.
- Articles are versioned in Git.
- Admin posting generates MDX but does not publish directly.
```

- [ ] **Step 2: Verify**

Run:

```bash
npm run format:check
```

Expected:

- Formatting check passes.

- [ ] **Step 3: Commit**

```bash
git add README.md
git commit -m "docs: add project readme"
```

---

## Task 18: Production Readiness Pass

**Purpose:** Confirm MVP behavior, quality, and deployment readiness.

**Files:**

- Modify only files needed to fix issues found during verification.

- [ ] **Step 1: Run full verification**

Run:

```bash
npm run format:check
npm run lint
npm run typecheck
npm run test
npm run build
```

Expected:

- All commands pass.

- [ ] **Step 2: Run local app**

Run:

```bash
npm run dev
```

Expected:

- App starts locally.
- The terminal shows a local URL, usually `http://localhost:3000`.

- [ ] **Step 3: Manual browser check**

Open the local URL and verify:

- `/` shows the public homepage.
- `/` lists `Primeiro artigo`.
- `/` does not list `Rascunho exemplo`.
- `/artigos/primeiro-artigo` opens the article page.
- `/sobre` opens author page.
- `/admin` opens admin dashboard.
- `/admin/postar` opens post editor.
- Theme toggle changes theme.
- GitHub icon points to `siteConfig.githubUrl`.

- [ ] **Step 4: Check file sizes**

Run:

```bash
find app features shared -type f \( -name "*.ts" -o -name "*.tsx" -o -name "*.css" \) -exec wc -l {} +
```

On PowerShell:

```powershell
Get-ChildItem app,features,shared -Recurse -Include *.ts,*.tsx,*.css | ForEach-Object { "$($_.FullName): $((Get-Content $_.FullName | Measure-Object -Line).Lines)" }
```

Expected:

- No implementation file exceeds 500 lines.

- [ ] **Step 5: Commit final fixes if any**

If fixes were needed:

```bash
git add .
git commit -m "chore: finalize mvp readiness"
```

If no fixes were needed, do not create an empty commit.

---

## Final Definition of Done

The MVP is complete when:

- `npm run format:check` passes.
- `npm run lint` passes.
- `npm run typecheck` passes.
- `npm run test` passes.
- `npm run build` passes.
- Homepage lists published MDX articles.
- Draft articles are hidden from public listing.
- Article detail pages work by slug.
- About page reads `content/author.mdx`.
- Admin dashboard shows local article summary.
- Admin post editor generates valid MDX.
- Dark/light mode works.
- README documents the publishing flow.
- GitHub Actions quality gate exists.
- The app is ready to connect to Vercel.
