# Spec 04 - Architecture and Quality

## Objetivo

Definir a organizacao tecnica do projeto, os limites entre modulos e os quality gates esperados desde o inicio.

## Stack MVP

- Next.js.
- TypeScript.
- MDX/Markdown.
- GitHub.
- Vercel.
- ESLint.
- Prettier.
- GitHub Actions.

## Estrutura de Pastas

Estrutura recomendada:

```txt
app/
  page.tsx
  artigos/
    [slug]/
      page.tsx
  sobre/
    page.tsx
  admin/
    page.tsx
    postar/
      page.tsx

content/
  articles/
  author.mdx

features/
  articles/
    components/
    lib/
    types.ts
  admin/
    components/
    lib/
    types.ts
  author/
    lib/
    types.ts
  theme/
    components/
  metrics/
    lib/

shared/
  ui/
  lib/
  config/

docs/
  prd-jotacraq-blog.md
  specs/
```

## Principios de Arquitetura

- Rotas em `app/` devem ser finas.
- Regras de dominio devem ficar em `features/`.
- Componentes reutilizaveis devem ir para `shared/ui`.
- Helpers genericos devem ir para `shared/lib`.
- Cada arquivo deve ter responsabilidade clara.
- Arquivos devem ficar abaixo de 500 linhas.
- Dependencias externas devem ser introduzidas com parcimonia.

## Modulo Articles

Responsabilidades:

- ler arquivos MDX;
- interpretar frontmatter;
- validar dados;
- ordenar artigos;
- encontrar artigo por slug;
- calcular tempo estimado de leitura.

Nao deve cuidar de:

- layout da homepage;
- estado do formulario admin;
- tema visual global.

## Modulo Admin

Responsabilidades:

- controlar estado do formulario de postagem;
- validar campos do formulario;
- gerar frontmatter;
- gerar conteudo MDX;
- sugerir nome de arquivo.

Nao deve cuidar de:

- ler arquivos do filesystem diretamente;
- publicar na Vercel;
- criar commits no MVP.

## Modulo Theme

Responsabilidades:

- alternar tema;
- persistir preferencia no navegador;
- expor componente de toggle.

## Quality Gates

Scripts esperados:

```txt
npm run lint
npm run typecheck
npm run test
npm run build
```

## Testes Minimos

Testar:

- parse de frontmatter;
- ordenacao de artigos por data;
- filtro de rascunhos;
- busca por slug;
- geracao de MDX no admin;
- validacao de slug;
- validacao de data.

## GitHub Actions

Workflow minimo para pull requests:

```yaml
name: Quality Gate

on:
  pull_request:
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
      - run: npm run lint
      - run: npm run typecheck
      - run: npm run test
      - run: npm run build
```

## Convencao de PRs

PRs sugeridos:

- `chore/project-scaffold`
- `feat/content-mdx`
- `feat/public-homepage`
- `feat/article-pages`
- `feat/theme-toggle`
- `feat/about-page`
- `feat/admin-dashboard`
- `feat/admin-post-editor`
- `ci/quality-gate`

## Criterios de Aceite

- O projeto tem estrutura modular clara.
- Os scripts de qualidade rodam localmente.
- O workflow de CI roda em pull requests.
- Nenhum arquivo principal ultrapassa 500 linhas.
- Funcoes de dominio possuem testes.
- Segredos e tokens nao aparecem no repositorio.
