# Spec 05 - Roadmap and Backlog

## Objetivo

Organizar a evolucao do projeto em fases claras, separando o MVP gratuito das melhorias futuras.

## Roadmap MVP

### Fase 0 - Preparacao

Objetivo:

Criar a base tecnica do projeto.

Entregas:

- repositorio publico;
- projeto Next.js inicializado;
- TypeScript configurado;
- ESLint configurado;
- Prettier configurado;
- estrutura inicial de pastas;
- CI basico.

### Fase 1 - Conteudo MDX

Objetivo:

Permitir que o site leia artigos do repositorio.

Entregas:

- pasta `content/articles`;
- artigo de exemplo;
- parse de frontmatter;
- listagem de artigos publicados;
- filtro de rascunhos;
- ordenacao por data;
- busca por slug.

### Fase 2 - Experiencia Publica

Objetivo:

Entregar a experiencia principal para visitantes.

Entregas:

- homepage;
- timeline vertical;
- navbar publica;
- data do ultimo artigo;
- link para GitHub;
- pagina individual de artigo;
- pagina "Sobre mim".

### Fase 3 - Tema e Polimento

Objetivo:

Garantir boa experiencia visual em diferentes contextos.

Entregas:

- dark mode;
- light mode;
- persistencia de preferencia;
- responsividade mobile;
- ajustes de leitura;
- estados vazios.

### Fase 4 - Area Admin MVP

Objetivo:

Criar assistente de escrita para o autor.

Entregas:

- rota `/admin`;
- resumo dos artigos;
- rota `/admin/postar`;
- formulario de artigo;
- validacoes;
- geracao de MDX;
- copia do MDX gerado;
- sugestao de nome de arquivo.

### Fase 5 - Producao

Objetivo:

Publicar a primeira versao em producao.

Entregas:

- projeto conectado a Vercel;
- build de producao validado;
- analytics configurado, se disponivel;
- README com fluxo de publicacao;
- primeiro artigo publicado.

## Backlog Futuro

### Conteudo

- Tags clicaveis.
- Categorias.
- Busca textual.
- Artigos relacionados.
- Series de artigos.
- RSS feed.
- Sitemap automatico.
- Open Graph por artigo.

### Admin

- Login real para `/admin`.
- Rascunhos persistentes no navegador.
- Edicao de artigos existentes.
- Criacao de PR via GitHub API.
- Publicacao direta por painel.
- Upload de imagens.
- Preview MDX completo.
- Gerenciamento de SEO por artigo.

### Metricas

- Vercel Analytics no dashboard.
- Artigos mais acessados.
- Media de visitantes por periodo.
- Visualizacoes por artigo.
- Origem de trafego.
- Eventos de leitura.

### Plataforma

- Banco de dados se publicacao via painel virar prioridade.
- CMS externo se o fluxo por Git ficar insuficiente.
- Newsletter.
- Comentarios.
- Internacionalizacao.
- CDN ou estrategia dedicada para imagens.

### Qualidade

- Testes E2E com Playwright.
- Lighthouse CI.
- Validacao automatica de frontmatter.
- Checagem de links quebrados.
- Conventional commits.
- Release notes automatizadas.
- Protecao de branch `main`.

## Marcos de Produto

### Marco 1 - Blog Navegavel

O visitante acessa a homepage, ve artigos e abre uma pagina individual.

### Marco 2 - Blog Publicavel

O autor consegue adicionar um novo artigo por arquivo MDX e ver a Vercel publicar automaticamente.

### Marco 3 - Blog Autoravel

O autor consegue usar `/admin/postar` para gerar o arquivo MDX com menos friccao.

### Marco 4 - Blog Polido

O blog tem tema claro/escuro, pagina sobre, SEO basico, responsividade e CI passando.

## Criterios de Priorizacao

Priorizar tarefas que:

- mantem o MVP gratuito;
- melhoram diretamente a leitura dos artigos;
- reduzem friccao para publicar;
- fortalecem qualidade e manutencao;
- evitam infraestrutura desnecessaria.

Adiar tarefas que:

- exigem banco antes da necessidade real;
- adicionam autenticacao complexa;
- dependem de servicos pagos;
- aumentam escopo sem melhorar o primeiro uso do blog.

