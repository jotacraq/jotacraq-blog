# Spec 03 - Public Experience

## Objetivo

Redesenhar as superfícies públicas para leitura técnica: header compacto, homepage em formato de índice e página individual de artigo otimizada para Markdown.

## Header Público

Componente: `features/articles/components/public-navbar.tsx`.

Conteúdo:

- `Jotacraq Blog`;
- link para `/` com texto `Artigos`;
- link para `/sobre`;
- link futuro para `/projetos` apenas se a rota existir ou se for criado placeholder;
- data do último artigo publicado;
- botão de tema;
- link GitHub.

Comportamento:

- compacto;
- borda inferior sutil;
- alinhamento horizontal em desktop;
- responsivo em telas pequenas;
- não deve parecer menu de dashboard.

## Homepage

Rota: `app/page.tsx`.

Objetivo: listar posts publicados imediatamente, sem hero.

Estrutura:

```txt
[Header]

16/05/2026 · Geral
Primeiro artigo
Uma abertura para o blog. Este artigo inaugura o espaço editorial.
2 min de leitura · blog · inicio

------------------------------------------------------------

14/05/2026 · IA
Terminando minha maratona de IA
...
```

Regras:

- não exibir rascunhos;
- ordenar por data decrescente;
- cada item inteiro deve levar ao artigo ou conter link claro;
- título deve ganhar destaque no hover;
- categoria deve usar accent azul;
- data e tempo de leitura devem usar texto muted;
- tags devem ser discretas.

Componentes recomendados:

- `ArticleIndex`;
- `ArticleIndexItem`;
- `ArticleMeta`;
- `TagList`;
- `EmptyArticlesState`.

## Página de Artigo

Rota: `app/artigos/[slug]/page.tsx`.

Estrutura:

```txt
[Header]

Categoria · Data · Tempo de leitura

Título do artigo
Descrição curta

------------------------------------------------------------

Conteúdo MDX
```

Regras:

- usar `notFound()` para slug inexistente ou rascunho;
- gerar metadata com título e excerpt;
- renderizar MDX por `ArticleContent`;
- aplicar classe `.markdown`;
- limitar largura de leitura;
- manter link discreto de volta para artigos.

## Página Sobre

Rota: `app/sobre/page.tsx`.

Escopo do redesign:

- aplicar visual GitHub Dark;
- manter conteúdo vindo de `content/author.mdx`;
- manter link GitHub;
- evitar layout hero;
- manter texto legível e compacto.

## Página Projetos

`/projetos` é desejável, mas não obrigatório nesta etapa.

Se o link entrar no header, a rota deve existir como placeholder refinado. Se a rota não for criada, o link não deve aparecer.

## Estados

### Nenhum Artigo Publicado

Texto:

```txt
Nenhum artigo publicado ainda.
Crie seu primeiro post para iniciar o blog.
```

Visual:

- simples;
- sem card pesado;
- texto muted;
- pode conter link para admin local se fizer sentido, mas não como CTA de marketing.

### Artigo Não Encontrado

Usar comportamento padrão de `notFound`, com experiência visual coerente se houver customização futura.

### Erro ao Carregar

Como os arquivos são locais, erros devem ser raros. Ainda assim, falhas de parsing devem ser cobertas por testes do domínio e não gerar homepage quebrada silenciosamente.

## E2E Esperado

Atualizar smoke tests para validar:

- home renderiza título do artigo publicado;
- home mostra categoria;
- home mostra tempo de leitura;
- rascunho não aparece;
- clique abre artigo individual;
- artigo individual mostra conteúdo MDX;
- navegação para `/sobre` funciona;
- GitHub link existe;
- botão de tema responde.

## Critérios de Aceite

- Visitante entende imediatamente que está em um blog técnico.
- Home não tem hero ou chamada de marketing.
- Lista tem aparência de índice técnico.
- Página de artigo é legível e estiliza Markdown comum.
- Header funciona em desktop e mobile.
