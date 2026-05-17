# Spec 01 - Content Model

## Objetivo

Padronizar o modelo de posts/artigos para suportar categoria, tags, rascunhos, data de publicação, excerpt e tempo de leitura calculado.

## Fonte de Verdade

Os posts continuam armazenados em:

```txt
content/articles/*.mdx
```

Cada arquivo representa um artigo. O nome recomendado segue:

```txt
YYYY-MM-DD-slug.mdx
```

## Frontmatter Obrigatório

```md
---
title: "Primeiro artigo"
subtitle: "Uma abertura para o blog"
slug: "primeiro-artigo"
publishedAt: "2026-05-16"
category: "Geral"
excerpt: "Este artigo inaugura o espaço editorial do Jotacraq Blog."
tags:
  - blog
  - inicio
draft: false
---
```

## Modelo TypeScript

```ts
export type Article = {
  title: string;
  subtitle: string;
  slug: string;
  publishedAt: string;
  category: string;
  excerpt: string;
  tags: string[];
  draft: boolean;
  content: string;
  readingTimeMinutes: number;
};
```

## Regras de Validação

- `title`: obrigatório, string não vazia.
- `subtitle`: obrigatório enquanto a UI usar subtítulo.
- `slug`: obrigatório, minúsculo, com números e hífens.
- `publishedAt`: obrigatório no formato `YYYY-MM-DD`.
- `category`: obrigatório, string não vazia.
- `excerpt`: obrigatório, string não vazia.
- `tags`: array de strings; pode ser vazio.
- `draft`: boolean obrigatório.
- `content`: string não vazia para posts publicados.

## Publicação

Um artigo é público quando:

```ts
article.draft === false;
```

Artigos com `draft: true` devem:

- aparecer no admin local;
- não aparecer na homepage pública;
- não ser incluídos em `generateStaticParams`;
- retornar `notFound` caso acessados por slug.

## Ordenação

Posts públicos devem ser ordenados por `publishedAt` em ordem decrescente.

Em caso de datas iguais, a ordenação secundária pode usar `title` em ordem alfabética para manter saída estável.

## Tempo de Leitura

`readingTimeMinutes` deve continuar calculado a partir do conteúdo.

Regra recomendada:

- contar palavras do `content`;
- dividir por aproximadamente 200 palavras por minuto;
- arredondar para cima;
- mínimo de 1 minuto.

Texto exibido:

```txt
1 min de leitura
2 min de leitura
```

## Funções Esperadas

O módulo `features/articles/lib/articles.ts` deve expor ou continuar expondo:

- `getAllArticles()`;
- `getPublishedArticles()`;
- `getLatestArticle()`;
- `getArticleBySlug(slug)`.

Comportamentos:

- `getAllArticles` inclui rascunhos;
- `getPublishedArticles` exclui rascunhos;
- `getLatestArticle` considera apenas publicados;
- `getArticleBySlug` deve retornar apenas artigo publicado para rotas públicas.

## Dados Iniciais

Os arquivos existentes em `content/articles` devem ser atualizados com `category`.

Sugestões:

- `primeiro-artigo`: `Geral`;
- `rascunho-exemplo`: `Draft` ou `Geral`, mantendo `draft: true`.

## Testes

Atualizar testes para cobrir:

- leitura de `category`;
- rejeição ou fallback quando `category` está ausente;
- ordenação por data;
- ocultação de rascunhos;
- lookup por slug publicado;
- cálculo de tempo de leitura;
- metadados completos do artigo publicado.
