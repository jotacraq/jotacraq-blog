# Spec 04 - Admin and Editor

## Objetivo

Adaptar o admin leve atual ao novo modelo de posts e definir a evolução futura para um painel de gestão, sem exigir persistência online nesta etapa.

## Estado Atual

O projeto já possui:

- `/admin`: resumo local de artigos;
- `/admin/postar`: formulário que gera MDX;
- `features/admin/lib/mdx-generator.ts`;
- testes para validação e geração de MDX.

## Escopo desta Iteração

Atualizar o admin existente para suportar o novo campo `category`.

Não implementar CRUD real ainda.

## `/admin`

Deve continuar mostrando:

- total de artigos publicados;
- total de rascunhos;
- último artigo;
- lista local de artigos recentes.

Melhorias desejáveis:

- mostrar categoria na lista;
- manter visual coerente com GitHub Dark;
- usar tabela/lista compacta em vez de cards chamativos;
- mencionar que métricas reais podem vir de Vercel Analytics no futuro.

## `/admin/postar`

Campos obrigatórios:

- título;
- subtítulo;
- slug;
- data de publicação;
- categoria;
- excerpt;
- tags;
- conteúdo.

Saída MDX:

```md
---
title: "Titulo"
subtitle: "Subtitulo"
slug: "titulo"
publishedAt: "2026-05-16"
category: "Geral"
excerpt: "Resumo"
tags:
  - dev
draft: false
---

Conteúdo do artigo.
```

## Validação

O gerador deve validar:

- título não vazio;
- subtítulo não vazio;
- slug no padrão correto;
- data no formato `YYYY-MM-DD`;
- categoria não vazia;
- excerpt não vazio;
- conteúdo não vazio.

Tags podem ficar vazias.

## UX do Editor Atual

Requisitos:

- textarea grande e confortável;
- fonte monoespaçada;
- preview de MDX gerado;
- filename sugerido;
- botão para copiar MDX;
- layout responsivo em uma coluna no mobile.

## Preview Markdown

Preview renderizado é desejável, mas pode ser etapa posterior.

Se implementado nesta iteração:

- usar abas `Escrever` e `Preview`;
- preview deve reaproveitar estilo `.markdown`;
- não precisa persistir estado fora do navegador.

## Admin Futuro

Rotas planejadas:

```txt
/admin/posts
/admin/posts/new
/admin/posts/edit/[id]
```

Recursos futuros:

- listar posts em tabela GitHub-like;
- editar post;
- visualizar post;
- salvar rascunho;
- publicar/despublicar;
- excluir;
- preview Markdown;
- autoslug;
- persistência a definir.

## Decisão de Persistência

Para este ciclo:

- não usar banco;
- não usar CMS;
- não salvar arquivos automaticamente pelo navegador;
- manter fluxo Git/MDX manual.

Persistência real deve virar outro PRD ou spec própria quando o produto precisar sair do fluxo local.

## Testes

Atualizar testes de `mdx-generator` para cobrir:

- `category` obrigatório;
- geração do frontmatter com `category`;
- filename sugerido preservado;
- tags vazias;
- erro ao tentar gerar MDX inválido.

Atualizar E2E para cobrir:

- preenchimento de categoria;
- MDX gerado contendo `category`;
- botão copiar habilitado após formulário válido.

## Critérios de Aceite

- Admin gera MDX compatível com o novo modelo.
- Validação impede post sem categoria.
- Layout continua utilizável em mobile.
- O fluxo editorial por commit continua documentado.
