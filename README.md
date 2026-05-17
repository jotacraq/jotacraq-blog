# Jotacraq Blog

Blog pessoal construido com Next.js, MDX e Vercel. O MVP usa arquivos versionados no
GitHub como fonte de conteudo, sem banco de dados e sem CMS.

## Stack

- Next.js
- TypeScript
- MDX
- GitHub
- Vercel
- Vitest
- ESLint
- Prettier

## Local Development

```bash
npm install
npm run dev
```

## Quality Checks

```bash
npm run format:check
npm run lint
npm run typecheck
npm run test
npm run build
```

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
- Metrics are expected to come from Vercel Analytics when configured.

## Main Routes

- `/` public article timeline.
- `/artigos/[slug]` article detail page.
- `/sobre` author page.
- `/admin` local admin overview.
- `/admin/postar` MDX writing assistant.
