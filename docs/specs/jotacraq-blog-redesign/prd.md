# PRD - Jotacraq Blog Redesign e Sistema de Posts

## 1. Visão Geral

O Jotacraq Blog deve evoluir de um MVP funcional para um blog técnico mais refinado, com estética de desenvolvedor, aparência inspirada no GitHub Dark e experiência direta de leitura. O produto deve parecer um índice técnico de artigos: escuro, monoespaçado, compacto, sem hero grande e sem linguagem visual de landing page.

O projeto atual já possui uma base importante: Next.js, MDX, listagem pública, página de artigo, página sobre, tema dark/light, admin leve para gerar MDX, testes unitários, E2E e CI. Este redesign deve respeitar essa base e avançar incrementalmente, evitando reescrever o que já funciona.

## 2. Problema Atual

A experiência atual cumpre o papel básico de listar e abrir artigos, mas ainda não transmite uma identidade visual forte. A interface é minimalista, porém vazia e pouco acabada. Também existe uma diferença de linguagem entre o briefing desejado e a implementação atual:

- O briefing fala em posts Markdown com categoria, tags, status e leitura tipo índice técnico.
- O projeto atual usa `content/articles/*.mdx` com `title`, `subtitle`, `slug`, `publishedAt`, `excerpt`, `tags` e `draft`.
- O admin atual gera MDX, mas não é um painel completo de criação, edição e gestão.
- A taxonomia ainda não possui `category` explícita.
- A homepage ainda pode ficar mais parecida com uma lista técnica de documentação ou commits.

## 3. Objetivo do Redesign

Criar uma experiência pública mais madura para o blog, mantendo a simplicidade do MVP:

- visual inspirado em GitHub Dark;
- fonte monoespaçada em toda a experiência editorial;
- homepage como lista técnica de posts;
- artigo individual com leitura confortável e Markdown bem estilizado;
- metadados claros: data, categoria, tags e tempo de leitura;
- base de conteúdo via arquivos versionados no Git;
- fluxo editorial incremental, sem banco de dados nesta fase.

## 4. Escopo Funcional

### MVP do Redesign

- Manter posts/artigos via arquivos MDX versionados no repositório.
- Listar apenas conteúdos publicados.
- Ordenar posts do mais recente para o mais antigo.
- Abrir página individual por slug.
- Renderizar conteúdo Markdown/MDX com estilos próprios.
- Exibir metadados: data, categoria, descrição, tags e tempo estimado.
- Separar publicados de rascunhos.
- Adicionar estados vazios e estado de artigo não encontrado.
- Ajustar homepage para uma lista direta, sem hero.
- Ajustar header público para navegação compacta: Blog, Artigos, Sobre, Projetos, último artigo, tema e GitHub.

### Evolução Pós-MVP

- Melhorar o admin atual para gerir posts.
- Criar `/admin/posts`, `/admin/posts/new` e `/admin/posts/edit/[id]`.
- Adicionar editor Markdown com preview.
- Adicionar gestão de rascunhos e publicados.
- Avaliar persistência real apenas depois de validar o fluxo com arquivos.

## 5. Escopo Visual

A linguagem visual deve seguir:

- GitHub Dark;
- documentação técnica;
- terminal/editor de código;
- listas de commits ou arquivos;
- mínima ornamentação;
- baixa densidade visual, mas com acabamento.

Diretrizes:

- Fundo primário: `#0d1117`.
- Superfície: `#161b22`.
- Borda: `#30363d`.
- Texto principal: `#e6edf3`.
- Texto secundário: `#c9d1d9`.
- Texto muted: `#8b949e`.
- Accent azul GitHub: `#58a6ff`.
- Hover discreto com `rgba(88, 166, 255, 0.04)`.
- Fonte monoespaçada preferencial: `"JetBrains Mono", "Fira Code", "IBM Plex Mono", "Cascadia Code", monospace`.

Não deve haver hero grande, gradientes chamativos, cards pesados, sombras fortes, layout de dashboard ou comunicação de marketing.

## 6. Requisitos Obrigatórios

- A homepage deve abrir direto na lista de posts.
- Cada item da lista deve exibir data, categoria, título, descrição curta e tempo de leitura.
- Rascunhos não devem aparecer publicamente.
- Artigos devem ser acessíveis por slug.
- Markdown/MDX deve suportar títulos, parágrafos, listas, links, imagens, blockquotes, código inline e blocos de código.
- A página de artigo deve ter layout centralizado e legível.
- O header deve ser compacto e responsivo.
- O tema dark deve ser a experiência principal.
- O modo claro pode continuar existindo, mas não deve enfraquecer a identidade GitHub Dark.
- A implementação não deve exigir banco de dados.
- A implementação não deve exigir CMS.
- A implementação não deve quebrar rotas públicas já existentes.
- Arquivos de aplicação devem continuar pequenos e bem segmentados.
- Testes e CI devem continuar passando.

## 7. Requisitos Desejáveis

- Autocálculo de tempo de leitura em vez de campo manual.
- Categoria obrigatória no frontmatter.
- Tags renderizadas em estilo discreto.
- Página `/projetos` simples ou placeholder refinado, caso a navegação já inclua Projetos.
- Preview Markdown no admin.
- Busca ou filtro por categoria em etapa futura.
- Melhor suporte visual para tabelas em Markdown.
- Metadados de SEO por artigo.
- Open Graph básico.

## 8. Fora de Escopo

Para esta etapa, ficam fora:

- Banco de dados.
- Strapi ou CMS externo.
- Autenticação real de admin.
- Painel administrativo completo com persistência online.
- Upload de imagens.
- Comentários.
- Newsletter.
- Analytics customizado com dashboard próprio.
- Busca full-text.
- Sistema de usuários.
- Paginação complexa.
- Landing page institucional.

## 9. Arquitetura Sugerida

### Decisão Principal

Manter a arquitetura atual baseada em MDX, ajustando nomenclatura e campos em vez de trocar para uma nova pasta `content/posts` agora.

Motivo: o projeto já possui `content/articles`, domínio `features/articles`, rotas `/artigos/[slug]`, testes e renderização com `next-mdx-remote/rsc`. Renomear tudo para `posts` neste momento traria churn sem benefício funcional imediato. O produto pode usar a palavra "posts" no PRD e UX, enquanto a estrutura interna segue como `articles` até uma refatoração planejada.

### Estrutura Recomendada

- `content/articles/*.mdx`: fonte de verdade dos posts.
- `features/articles/lib/articles.ts`: leitura, validação, ordenação e lookup.
- `features/articles/types.ts`: modelo de artigo/post.
- `features/articles/components/`: lista, conteúdo Markdown, metadados e navegação pública.
- `features/admin/`: geração e futura gestão de MDX.
- `shared/config/site.ts`: nome, GitHub e metadados globais.
- `app/`: rotas finas e composição das páginas.

### Ajuste de Modelo

Adicionar `category` ao frontmatter atual e padronizar `publishedAt` como data pública. Manter `draft` em vez de criar `published`, pois já existe no código. A regra pública deve ser:

```ts
published = draft === false;
```

## 10. Modelo de Dados dos Posts

Modelo recomendado para o domínio:

```ts
type Article = {
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

Frontmatter recomendado:

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

Regras:

- `title`, `slug`, `publishedAt`, `category`, `excerpt` e `draft` são obrigatórios.
- `subtitle` pode continuar obrigatório se a UI usar como linha editorial.
- `tags` deve aceitar array vazio.
- `readingTimeMinutes` deve ser calculado a partir do conteúdo.
- Slugs devem ser únicos.
- Datas devem usar `YYYY-MM-DD`.

## 11. Rotas e Páginas Necessárias

### Públicas

- `/`: lista técnica de posts publicados.
- `/artigos/[slug]`: leitura individual.
- `/sobre`: sobre o autor.
- `/projetos`: desejável, pode ser etapa futura caso entre no header.

### Admin Atual

- `/admin`: dashboard leve com resumo local.
- `/admin/postar`: gerador de MDX.

### Admin Futuro

- `/admin/posts`: gestão de posts.
- `/admin/posts/new`: criação de post.
- `/admin/posts/edit/[id]`: edição de post.

## 12. Componentes Necessários

### Redesign Público

- `PublicNavbar`: header compacto GitHub-like.
- `ArticleIndex`: lista principal sem hero.
- `ArticleIndexItem`: item da lista com metadados.
- `ArticleMeta`: data, categoria e tempo de leitura.
- `TagList`: tags discretas.
- `ArticleContent`: conteúdo MDX com classe `.markdown`.
- `EmptyArticlesState`: nenhum post publicado.
- `NotFoundArticleState`: artigo inexistente.

### Admin Futuro

- `AdminNavbar`.
- `PostTable`.
- `PostStatusBadge`.
- `MarkdownEditor`.
- `MarkdownPreview`.
- `PostForm`.

## 13. Estados de Interface

- Nenhum artigo publicado: mostrar mensagem curta e sem card pesado.
- Nenhum rascunho: usar no admin futuro.
- Erro ao carregar artigos: prever fallback, mesmo que leitura local raramente falhe.
- Artigo não encontrado: usar rota `notFound` com mensagem clara.
- Lista carregada: itens separados por borda inferior.
- Hover em artigo: fundo azul muito sutil e título em accent.
- Mobile: coluna única, header compacto, metadados acima do título.

## 14. Fluxo de Criação de Posts

### Etapa Atual Recomendada

1. Autor acessa `/admin/postar` localmente.
2. Preenche título, slug, categoria, descrição, tags e conteúdo.
3. O sistema gera MDX válido.
4. Autor cria arquivo em `content/articles/YYYY-MM-DD-slug.mdx`.
5. Autor commita e abre PR ou faz push.
6. CI valida build, testes e E2E.
7. Vercel publica após merge/deploy.

### Etapa Futura

1. Autor acessa `/admin/posts/new`.
2. Escreve Markdown em editor dedicado.
3. Alterna entre Escrever e Preview.
4. Salva como rascunho ou publica.
5. Persistência será definida em projeto separado: Git-backed, CMS, banco ou API.

## 15. Critérios de Aceite

- Homepage apresenta uma lista técnica de posts sem hero.
- Visual principal lembra GitHub Dark.
- Fonte monoespaçada aplicada de forma consistente.
- Cada post mostra data, categoria, título, descrição e leitura estimada.
- Posts aparecem ordenados por data decrescente.
- Rascunhos ficam ocultos da experiência pública.
- Página individual renderiza MDX com estilos para títulos, links, listas, blockquotes e código.
- Header é compacto e responsivo.
- GitHub link permanece disponível.
- Dark mode é refinado e não depende de gradientes ou sombras fortes.
- Mobile não possui sobreposição, overflow ou botões ilegíveis.
- Fluxo atual de geração de MDX continua funcionando.
- `npm run format:check`, `npm run lint`, `npm run typecheck`, `npm run test`, `npm run build` e E2E continuam verdes.

## 16. Plano de Implementação em Etapas

### Etapa 1 - Especificação e Preparação

- Validar este PRD.
- Criar specs detalhadas para visual, conteúdo, rotas e admin futuro.
- Criar plano de tasks segmentado por waves.

### Etapa 2 - Modelo de Conteúdo

- Adicionar `category` ao modelo e aos MDX existentes.
- Atualizar validações e testes do domínio de artigos.
- Atualizar gerador MDX do admin para incluir categoria.

### Etapa 3 - Redesign Visual Público

- Atualizar tokens de cor GitHub Dark.
- Aplicar fonte monoespaçada.
- Refinar header público.
- Redesenhar homepage como índice técnico.
- Refinar página de artigo e estilos Markdown.

### Etapa 4 - Estados e Responsividade

- Implementar estados vazios e not found refinados.
- Revisar mobile para home, artigo, sobre e admin.
- Adicionar/atualizar E2E para fluxos públicos.

### Etapa 5 - Admin Incremental

- Melhorar `/admin/postar` com categoria e preview simples.
- Avaliar se `/admin/posts` entra no próximo ciclo.
- Documentar fluxo editorial no README.

## 17. Riscos e Decisões Técnicas

- **Risco: renomear articles para posts cedo demais.** Decisão: manter estrutura atual e evoluir sem churn.
- **Risco: visual monoespaçado prejudicar leitura longa.** Decisão: usar mono como identidade, mas com line-height generoso e largura controlada.
- **Risco: modo claro descaracterizar o produto.** Decisão: dark é primário; light deve ser funcional, não protagonista.
- **Risco: admin sem persistência parecer incompleto.** Decisão: deixar explícito que o MVP usa fluxo Git/MDX, e painel completo é fase futura.
- **Risco: MDX permitir conteúdo complexo sem estilo.** Decisão: criar classe `.markdown` robusta e cobrir elementos comuns.
- **Risco: briefing pressupõe ausência de funcionalidades que o MVP já tem.** Decisão: adaptar ao estado real e reaproveitar o que já foi entregue.

## 18. Próximos Passos

1. Validar este PRD.
2. Criar specs detalhadas em `docs/specs/jotacraq-blog-redesign/specs/`.
3. Criar plano Superpowers com waves paralelizáveis.
4. Implementar primeiro o modelo de conteúdo e testes.
5. Implementar redesign público.
6. Rodar QA visual e E2E.
7. Só depois decidir se o admin completo entra neste ciclo ou em um projeto separado.
