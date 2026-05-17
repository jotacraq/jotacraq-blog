# Spec 06 - Roadmap and Backlog

## Objetivo

Organizar a evolução do redesign em etapas incrementais, permitindo execução por waves e agentes paralelos no próximo passo.

## Roadmap Recomendado

### Fase 1 - Modelo de Conteúdo

Entregas:

- adicionar `category` ao tipo `Article`;
- atualizar parser e validação;
- atualizar MDX existentes;
- atualizar testes de domínio;
- atualizar gerador MDX do admin.

Critério:

- domínio reconhece categoria e rascunhos continuam ocultos.

### Fase 2 - Visual System

Entregas:

- tokens GitHub Dark;
- fonte monoespaçada;
- estilos globais refinados;
- estilos `.markdown`;
- ajustes de light mode.

Critério:

- páginas públicas têm base visual GitHub-like sem quebrar layout.

### Fase 3 - Homepage e Header

Entregas:

- header compacto;
- homepage sem hero;
- lista técnica de posts;
- tags e metadados;
- estado vazio.

Critério:

- home comunica imediatamente blog técnico e lista posts publicados.

### Fase 4 - Página de Artigo e Sobre

Entregas:

- metadados no topo do artigo;
- conteúdo MDX estilizado;
- estados not found;
- página sobre ajustada ao visual.

Critério:

- artigo é confortável de ler e suporta Markdown comum.

### Fase 5 - Admin Incremental

Entregas:

- campo categoria no editor;
- MDX gerado com novo frontmatter;
- visual admin mais coerente;
- E2E atualizado.

Critério:

- fluxo local de publicação continua funcionando com novo modelo.

### Fase 6 - QA e Documentação

Entregas:

- atualizar README;
- atualizar E2E;
- rodar quality gate completa;
- revisão visual desktop/mobile.

Critério:

- PR pronto para review visual e técnico.

## Backlog Futuro

### Produto

- Página `/projetos`.
- Busca simples por título/tag.
- Filtro por categoria.
- Arquivo por ano ou mês.
- Página de tags.
- Open Graph por artigo.
- Sitemap e RSS.

### Admin

- `/admin/posts`.
- `/admin/posts/new`.
- `/admin/posts/edit/[id]`.
- Preview Markdown por abas.
- Autoslug.
- Gestão de rascunhos.
- Persistência Git-backed, CMS ou banco.

### Visual

- Destaque de sintaxe em blocos de código.
- Melhor suporte a tabelas.
- Estados de foco mais refinados.
- Ajustes finos no light mode.

### Infra

- Vercel Analytics.
- Sentry ou outra observabilidade leve.
- Cache ou validações extras se o volume de posts crescer.

## Sequência Para o Próximo Documento

Depois destas specs, criar um plano em:

```txt
docs/specs/jotacraq-blog-redesign/superpowers/plans/
```

O plano deve dividir trabalho em waves:

- Wave 0: preparação e modelo;
- Wave 1: visual system e conteúdo;
- Wave 2: homepage/header e artigo/sobre;
- Wave 3: admin incremental;
- Wave 4: E2E, docs e QA.

## Critérios de Priorização

Priorizar primeiro:

- mudanças que destravam todas as outras, como `category`;
- superfícies públicas visíveis ao usuário;
- testes que reduzem risco de regressão;
- documentação do fluxo editorial.

Postergar:

- CRUD real;
- persistência online;
- busca;
- páginas secundárias não essenciais;
- qualquer feature que exija nova infraestrutura.
