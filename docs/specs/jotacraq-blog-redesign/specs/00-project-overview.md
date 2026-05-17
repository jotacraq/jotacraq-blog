# Spec 00 - Project Overview

## Objetivo

Evoluir o Jotacraq Blog para uma experiência técnica, minimalista e inspirada no GitHub Dark, preservando a arquitetura atual baseada em Next.js, arquivos MDX e deploy estático.

O redesign deve melhorar identidade visual, leitura, estrutura de posts e fluxo editorial sem introduzir banco de dados, CMS ou painel administrativo complexo nesta etapa.

## Contexto Atual

O projeto já possui:

- Next.js com App Router;
- conteúdo em `content/articles/*.mdx`;
- leitura de metadados com `gray-matter`;
- renderização de MDX com `next-mdx-remote/rsc`;
- homepage pública;
- página individual de artigo;
- página sobre;
- dark/light mode;
- admin leve em `/admin` e `/admin/postar`;
- testes unitários, Playwright E2E e GitHub Actions.

## Decisão Principal

Manter `content/articles` e `features/articles` como estrutura interna nesta fase.

O briefing usa a linguagem "posts", mas renomear pastas, rotas e domínio para `posts` agora criaria ruído em arquivos já testados. A evolução será feita sobre o domínio atual de artigos, adicionando os campos e componentes necessários para se comportar como um sistema real de posts técnicos.

## Resultado Esperado

Ao final do redesign:

- `/` deve parecer um índice técnico de posts, sem hero;
- `/artigos/[slug]` deve ter leitura MDX refinada;
- o visual deve lembrar GitHub Dark, documentação técnica e editor de código;
- cada item deve mostrar data, categoria, título, descrição, tempo de leitura e tags;
- rascunhos devem continuar ocultos publicamente;
- admin atual deve gerar MDX compatível com o novo modelo;
- o projeto deve continuar barato, estático e simples de publicar.

## Escopo Desta Iteração

Inclui:

- atualização do modelo de conteúdo;
- atualização dos arquivos MDX existentes;
- redesign de tokens globais, header, homepage e artigo;
- ajustes no admin gerador de MDX;
- estados vazios e responsividade;
- testes e E2E atualizados.

Não inclui:

- banco de dados;
- CMS;
- autenticação real;
- CRUD persistente online;
- comentários;
- newsletter;
- busca full-text;
- analytics customizado.

## Rotas Mantidas

```txt
/                    Índice público de artigos/posts
/artigos/[slug]      Leitura individual
/sobre               Sobre o autor
/admin               Resumo administrativo local
/admin/postar        Gerador de MDX
```

## Rotas Futuras

```txt
/projetos                 Página opcional de projetos
/admin/posts              Gestão de posts
/admin/posts/new          Criação de post
/admin/posts/edit/[id]    Edição de post
```

## Critérios de Aceite

- O usuário abre a home e vê imediatamente a lista de posts.
- O visual público é escuro, monoespaçado e GitHub-like.
- O conteúdo público vem apenas de arquivos MDX publicados.
- O admin atual continua funcionando e gera frontmatter compatível.
- Todas as rotas atuais continuam acessíveis.
- CI, build, testes unitários e E2E continuam verdes.
