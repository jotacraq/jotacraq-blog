# Spec 01 - Content and MDX

## Objetivo

Definir como artigos e dados do autor serao armazenados, lidos, validados e exibidos no MVP.

## Estrutura de Conteudo

Os artigos devem ficar em:

```txt
content/articles/
```

O conteudo do autor deve ficar em:

```txt
content/author.mdx
```

## Nome dos Arquivos de Artigo

Formato recomendado:

```txt
YYYY-MM-DD-slug-do-artigo.mdx
```

Exemplo:

```txt
2026-05-16-meu-primeiro-artigo.mdx
```

O nome do arquivo ajuda na organizacao, mas a URL deve usar o campo `slug` do frontmatter.

## Frontmatter de Artigo

Campos obrigatorios:

```yaml
title: "Titulo do artigo"
subtitle: "Subtitulo curto do artigo"
slug: "titulo-do-artigo"
publishedAt: "2026-05-16"
excerpt: "Resumo curto usado na homepage."
```

Campos opcionais:

```yaml
tags:
  - dev
  - carreira
draft: false
```

Exemplo completo:

```mdx
---
title: "Meu primeiro artigo"
subtitle: "Uma introducao ao blog"
slug: "meu-primeiro-artigo"
publishedAt: "2026-05-16"
excerpt: "Primeiras linhas do artigo ou resumo curto."
tags:
  - dev
  - carreira
draft: false
---

Conteudo do artigo em MDX.
```

## Regras de Conteudo

- Artigos com `draft: true` nao devem aparecer na homepage.
- Artigos sem `draft` devem ser considerados publicados.
- Artigos devem ser ordenados por `publishedAt` em ordem decrescente.
- O `slug` deve ser unico.
- O `publishedAt` deve usar formato `YYYY-MM-DD`.
- O `excerpt` deve ser curto o suficiente para uso em cards ou timeline.

## Modelo de Artigo em Codigo

Tipo esperado:

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

## Funcoes Esperadas

Modulo sugerido:

```txt
features/articles/lib/articles.ts
```

Funcoes:

```ts
getAllArticles(): Promise<Article[]>
getPublishedArticles(): Promise<Article[]>
getArticleBySlug(slug: string): Promise<Article | null>
getLatestArticle(): Promise<Article | null>
```

## Conteudo do Autor

Arquivo:

```txt
content/author.mdx
```

Frontmatter:

```yaml
name: "Nome do autor"
headline: "Descricao curta"
githubUrl: "https://github.com/usuario"
location: "Brasil"
interests:
  - desenvolvimento
  - escrita
```

## Criterios de Aceite

- A aplicacao consegue listar artigos publicados.
- A aplicacao ignora artigos marcados como rascunho.
- A aplicacao encontra um artigo por slug.
- A homepage consegue obter o artigo mais recente.
- A pagina "Sobre mim" consegue ler dados do autor.
- Frontmatter invalido deve falhar de forma clara durante desenvolvimento ou build.

