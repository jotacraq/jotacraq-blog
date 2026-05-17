# PRD - Jotacraq Blog

## 1. Visao Geral

O Jotacraq Blog sera um blog pessoal voltado para publicacao de artigos autorais, com uma experiencia publica simples, limpa e focada em leitura. O projeto deve nascer como um MVP gratuito ou de custo minimo, usando Next.js, arquivos MDX/Markdown versionados no GitHub e deploy na Vercel.

A decisao principal para o MVP e nao usar banco de dados nem CMS externo. Os artigos ficarao no proprio repositorio, permitindo publicacao por commit, revisao por PR e deploy automatico.

Essa abordagem reduz complexidade, elimina custos iniciais e combina bem com um blog pessoal de autor unico.

## 2. Objetivo do Produto

Criar um blog pessoal em producao onde visitantes possam ler artigos publicados pelo autor, com boa experiencia visual, suporte a tema claro/escuro, pagina sobre o autor e estrutura tecnica limpa para evoluir no futuro.

O administrador tera uma area simples para apoiar a escrita dos artigos, mas no MVP a publicacao oficial acontecera via commit no repositorio.

## 3. Decisoes Tomadas

- O projeto sera construido com Next.js.
- Strapi sera deixado de fora do MVP.
- Nao havera banco de dados no MVP.
- Os artigos serao arquivos MDX/Markdown no repositorio.
- A hospedagem sera feita na Vercel.
- O repositorio sera publico.
- O fluxo de publicacao sera baseado em GitHub e deploy automatico.
- A area admin sera um assistente/editor de escrita, nao um CMS completo no primeiro momento.
- Metricas reais usarao preferencialmente Vercel Analytics, se disponivel no plano gratuito.

## 4. Personas

### Visitante

Pessoa que acessa o site para ler artigos. Nao precisa de login, painel ou qualquer configuracao. Deve conseguir encontrar rapidamente os artigos mais recentes e abrir um texto completo com poucos cliques.

### Autor/Admin

Pessoa responsavel por escrever e publicar os artigos. Precisa de uma interface de apoio para estruturar textos, gerar arquivos MDX e manter o conteudo organizado no repositorio.

## 5. Escopo do MVP

### Incluso no MVP

- Homepage publica com listagem de artigos.
- Timeline vertical centralizada exibindo artigos por data de publicacao.
- Navbar publica com titulo do site, data do ultimo artigo e icone do GitHub.
- Pagina individual para cada artigo.
- Pagina "Sobre mim".
- Dark mode e light mode.
- Artigos em MDX/Markdown.
- Area admin simples com atalhos para Home e Postar.
- Pagina `/admin/postar` como assistente de criacao de artigo.
- Geracao de conteudo MDX a partir dos inputs da pagina de postagem.
- Deploy na Vercel.
- Repositorio publico no GitHub.
- Quality gates basicos: lint, typecheck, build e testes essenciais.
- Workflow basico de CI no GitHub Actions.

### Fora do MVP

- Banco de dados.
- Strapi ou outro CMS externo.
- Publicacao direta em producao por painel.
- Edicao online persistente de rascunhos.
- Sistema multiusuario.
- Comentarios em artigos.
- Newsletter.
- Busca avancada.
- Dashboard avancado de metricas proprias.
- Upload de imagens pelo painel.

## 6. Experiencia Publica

### Homepage

A homepage deve ser a tela principal do blog. Ela precisa transmitir clareza, personalidade e foco editorial.

Requisitos:

- Navbar no topo.
- Titulo do site no lado esquerdo.
- Data do ultimo artigo publicado no lado direito.
- Icone do GitHub apontando para o perfil pessoal do autor.
- Alternador de tema claro/escuro.
- Lista de artigos ordenada do mais recente para o mais antigo.
- Linha vertical centralizada conectando visualmente os artigos.
- Cada item da timeline deve exibir:
  - titulo;
  - subtitulo;
  - data de publicacao;
  - pequena introducao ou primeiras linhas;
  - link para leitura completa.

### Pagina de Artigo

Cada artigo tera uma pagina propria baseada no slug do arquivo.

Exemplo:

```txt
/artigos/meu-primeiro-artigo
```

Conteudo esperado:

- Titulo.
- Subtitulo.
- Data de publicacao.
- Tempo estimado de leitura, se possivel.
- Conteudo completo em MDX.
- Link para voltar para a homepage.
- Layout confortavel para leitura em desktop e mobile.

### Sobre Mim

Pagina dedicada ao autor.

Conteudo esperado:

- Nome ou apelido do autor.
- Breve biografia.
- Areas de interesse.
- Link para GitHub.
- Possivel espaco para links futuros.

## 7. Experiencia Admin

No MVP, a area admin sera simples e voltada ao autor. Ela nao precisa ser um CMS completo.

### Navbar Admin

Atalhos obrigatorios:

- Home
- Postar

### Admin Home

Rota sugerida:

```txt
/admin
```

Objetivo:

Dar ao autor uma visao basica do estado do blog.

Conteudos possiveis no MVP:

- Total de artigos publicados.
- Data do ultimo artigo.
- Lista simples dos artigos existentes.
- Card informativo sobre metricas via Vercel Analytics.
- Atalho para criar novo artigo.

Como nao havera banco de dados no MVP, metricas proprias serao limitadas. O dashboard pode comecar exibindo dados derivados dos arquivos locais e deixar espaco preparado para integracao futura.

### Postar

Rota sugerida:

```txt
/admin/postar
```

Objetivo:

Ajudar o autor a pensar, estruturar e gerar um artigo em MDX.

Campos esperados:

- Titulo.
- Subtitulo.
- Slug.
- Data de publicacao.
- Resumo/introducao.
- Tags.
- Conteudo principal.

UX esperada:

- Area de texto ampla.
- Campos bem espacados.
- Layout sem distracoes.
- Preview do frontmatter ou do MDX gerado.
- Botao para copiar o conteudo MDX.
- Botao para baixar o arquivo `.mdx`, se implementado.
- Validacao basica de campos obrigatorios.

Fluxo de publicacao no MVP:

1. Admin escreve o artigo em `/admin/postar`.
2. O sistema gera o conteudo MDX.
3. O autor adiciona o arquivo em `content/articles`.
4. O autor faz commit e abre PR ou envia direto para a branch principal.
5. A Vercel faz deploy automatico.

## 8. Modelo de Conteudo

Os artigos ficarao em:

```txt
content/articles/
```

Exemplo de arquivo:

```txt
content/articles/2026-05-16-meu-primeiro-artigo.mdx
```

Formato sugerido:

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
---

Conteudo do artigo em MDX.
```

Campos do artigo:

- `title`: titulo do artigo.
- `subtitle`: subtitulo exibido na timeline.
- `slug`: identificador usado na URL.
- `publishedAt`: data de publicacao.
- `excerpt`: introducao curta.
- `tags`: lista opcional de tags.
- `content`: corpo do arquivo MDX.

Conteudo do autor:

```txt
content/author.mdx
```

Campos sugeridos:

- nome;
- bio;
- githubUrl;
- interesses;
- localizacao opcional.

## 9. Arquitetura Recomendada

Estrutura inicial:

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
  admin/
  author/
  metrics/
  theme/

shared/
  ui/
  lib/
  config/

docs/
  prd-jotacraq-blog.md
```

Principios:

- Separar dominio de artigos da interface visual.
- Manter arquivos com menos de 500 linhas.
- Evitar componentes grandes demais.
- Criar helpers dedicados para leitura e parse dos arquivos MDX.
- Manter as rotas finas, delegando regra para `features`.
- Usar componentes compartilhados apenas quando houver reutilizacao real.

## 10. Stack Tecnica

### MVP

- Next.js.
- TypeScript.
- MDX/Markdown.
- GitHub.
- Vercel.
- ESLint.
- Prettier.
- GitHub Actions.

### Bibliotecas possiveis

- `next-mdx-remote` ou alternativa compatvel com App Router.
- `gray-matter` para frontmatter.
- `date-fns` para datas.
- `next-themes` para dark/light mode.
- `lucide-react` para icones.
- `@vercel/analytics` para analytics, se usado.

## 11. Quality Gates

O projeto deve nascer com verificacoes automaticas.

Comandos esperados:

```txt
npm run lint
npm run typecheck
npm run test
npm run build
```

Workflow basico:

```txt
pull_request:
  - instalar dependencias
  - rodar lint
  - rodar typecheck
  - rodar testes
  - rodar build
```

Regras de qualidade:

- PRs pequenos e segmentados.
- Commits com mensagens claras.
- Arquivos abaixo de 500 linhas.
- Componentes com responsabilidades bem definidas.
- Nenhum segredo no repositorio.
- Nenhuma dependencia pesada sem justificativa.

## 12. Roadmap

### Fase 0 - Preparacao

- Criar repositorio publico.
- Inicializar projeto Next.js.
- Configurar TypeScript, ESLint e Prettier.
- Criar estrutura de pastas.
- Configurar workflow basico de CI.

### Fase 1 - Conteudo Estatico

- Criar modelo de artigos em MDX.
- Implementar leitura dos arquivos em `content/articles`.
- Criar homepage com timeline vertical.
- Ordenar artigos por data de publicacao.
- Criar pagina individual por slug.

### Fase 2 - Identidade e Experiencia

- Implementar navbar publica.
- Adicionar data do ultimo artigo.
- Adicionar icone do GitHub.
- Criar pagina "Sobre mim".
- Implementar dark/light mode.
- Ajustar responsividade mobile.

### Fase 3 - Area Admin MVP

- Criar rota `/admin`.
- Criar rota `/admin/postar`.
- Implementar formulario de criacao de artigo.
- Gerar frontmatter automaticamente.
- Gerar preview/copia do MDX.
- Adicionar validacoes basicas.

### Fase 4 - Deploy e Producao

- Configurar Vercel.
- Configurar variaveis publicas necessarias.
- Adicionar analytics, se usado.
- Validar build de producao.
- Publicar primeira versao.

### Fase 5 - Refinamento

- Melhorar SEO.
- Adicionar Open Graph.
- Melhorar acessibilidade.
- Adicionar testes para parse de artigos.
- Adicionar testes para componentes principais.
- Melhorar experiencia visual da timeline.

## 13. Backlog Futuro

### Conteudo

- Categorias.
- Tags filtraveis.
- Busca por artigos.
- Artigos relacionados.
- Serie de artigos.
- Drafts locais.
- Preview mais fiel de MDX.

### Admin

- Login real para `/admin`.
- Salvamento de rascunhos.
- Publicacao direta via GitHub API.
- Criacao automatica de PR para novo artigo.
- Edicao de artigos existentes pelo painel.
- Upload de imagens.
- Gerenciamento de metadados SEO.

### Metricas

- Integracao com Vercel Analytics.
- Dashboard com artigos mais acessados.
- Media de visitantes por periodo.
- Visualizacoes por artigo.
- Origem de trafego.
- Eventos de leitura.

### Plataforma

- Banco de dados, se necessario.
- CMS externo, se o fluxo por Git deixar de ser suficiente.
- Newsletter.
- Comentarios.
- RSS feed.
- Sitemap automatico.
- Internacionalizacao.

### Qualidade

- Testes E2E com Playwright.
- Lighthouse CI.
- Verificacao automatica de tamanho de arquivos.
- Validacao automatica de frontmatter.
- Checagem de links quebrados.
- Conventional commits.
- Release notes automatizadas.

## 14. Criterios de Sucesso do MVP

O MVP sera considerado pronto quando:

- A homepage listar artigos reais vindos de arquivos MDX.
- Cada artigo tiver pagina propria.
- A timeline estiver ordenada por data.
- A navbar mostrar titulo, GitHub e data do ultimo artigo.
- O tema claro/escuro funcionar.
- A pagina "Sobre mim" estiver publicada.
- A pagina `/admin/postar` gerar um arquivo MDX valido.
- O projeto estiver publicado na Vercel.
- O repositorio estiver publico.
- O CI estiver passando.

## 15. Riscos

- Publicar por commit pode ser menos pratico do que um CMS.
- Sem banco, nao ha rascunhos persistentes online.
- Metricas proprias ficam limitadas no MVP.
- A area admin pode parecer menos poderosa no inicio.
- Se o volume de artigos crescer muito, sera necessario revisar a estrategia de build e leitura dos arquivos.

## 16. Recomendacao Final

Para o MVP, a melhor decisao e seguir sem banco de dados e sem Strapi. A combinacao Next.js, MDX, GitHub e Vercel oferece custo quase zero, excelente performance, versionamento natural dos artigos e uma base tecnica simples de manter.

O projeto deve nascer preparado para evoluir, mas sem antecipar complexidade. Quando houver necessidade real de edicao online, rascunhos persistentes, multiplos autores ou metricas avancadas, o time pode introduzir banco de dados ou CMS externo com menor risco, pois o dominio de artigos ja estara bem isolado.
