# Design - Jotacraq Blog Redesign

## Objetivo do Documento

Este documento guia todas as decisões visuais do redesign do Jotacraq Blog. Ele deve ser usado por agentes, revisores e implementadores para manter consistência entre homepage, artigo, sobre e admin incremental.

A regra central: o blog deve parecer um índice técnico de posts, não uma landing page.

## Direção Norte

O Jotacraq Blog deve transmitir:

- ambiente de desenvolvedor;
- leitura técnica;
- simplicidade intencional;
- GitHub Dark;
- Markdown;
- repositório, documentação e terminal;
- foco no conteúdo.

O usuário deve abrir a homepage e entender imediatamente:

```txt
Este é um blog técnico. Aqui estão os artigos.
```

## Personalidade Visual

Palavras que devem orientar o design:

- técnico;
- escuro;
- compacto;
- monoespaçado;
- editorial;
- silencioso;
- preciso;
- legível;
- GitHub-like.

Palavras que não devem orientar o design:

- marketing;
- heroico;
- colorido demais;
- corporativo;
- ornamental;
- dashboard;
- portal;
- landing page.

## Referências Mentais

Usar como referência:

- GitHub Dark;
- README de repositório;
- documentação técnica;
- lista de commits;
- editor de código;
- terminal;
- índice de artigos em Markdown.

Não copiar literalmente o GitHub. A inspiração deve aparecer na linguagem visual: fundo, borda, contraste, densidade, links azuis, listas técnicas e superfícies discretas.

## Anti-Padrões Proibidos

Evitar:

- hero grande;
- H1 gigante na homepage;
- subtítulo promocional;
- CTA chamativo;
- cards grandes para cada artigo;
- sombras fortes;
- gradientes;
- orbes decorativos;
- ilustrações abstratas;
- layout com cara de dashboard SaaS;
- sidebar complexa;
- animações chamativas;
- elementos que atrasem o acesso à lista de artigos.

Se uma decisão visual deixa a página mais parecida com produto de marketing do que com blog técnico, ela deve ser removida.

## Paleta

Tokens principais:

```css
:root {
  --bg-primary: #0d1117;
  --bg-secondary: #010409;
  --surface: #161b22;
  --surface-hover: rgba(88, 166, 255, 0.04);

  --border: #30363d;
  --border-muted: rgba(255, 255, 255, 0.08);

  --text-primary: #e6edf3;
  --text-secondary: #c9d1d9;
  --text-muted: #8b949e;

  --accent: #58a6ff;
  --accent-hover: #79c0ff;

  --danger: #f85149;
  --success: #3fb950;
  --warning: #d29922;
}
```

## Uso de Cor

Fundo:

- `--bg-primary` para a página;
- `--bg-secondary` para header ou áreas mais profundas;
- `--surface` apenas quando uma superfície real precisa existir.

Texto:

- `--text-primary` para títulos;
- `--text-secondary` para leitura;
- `--text-muted` para datas, tempo de leitura, hints e metadados.

Accent:

- usar `--accent` para categoria, links e foco;
- usar pouco;
- nunca transformar o azul em gradiente dominante.

Estados:

- sucesso, warning e danger devem aparecer apenas em contexto administrativo ou feedback real;
- não usar verde/amarelo/vermelho como decoração.

## Tipografia

Fonte base:

```css
font-family: "JetBrains Mono", "Fira Code", "IBM Plex Mono", "Cascadia Code", monospace;
```

Regras:

- usar monoespaçada como identidade principal;
- manter `letter-spacing: 0`;
- não usar fonte escalando com viewport;
- evitar títulos enormes;
- dar line-height generoso nos artigos;
- controlar largura para compensar o cansaço visual da fonte mono.

Escala sugerida:

- texto base: `15px` ou `16px`;
- metadados: `12px` a `13px`;
- título de artigo na lista: `18px` a `22px`;
- título da página de artigo: `32px` a `40px`;
- headings dentro do Markdown: menores que um hero, com espaçamento claro.

## Layout Global

Regras:

- centralizar conteúdo;
- evitar containers largos demais;
- usar bordas em vez de sombras;
- usar espaços consistentes;
- manter a homepage direta.

Larguras:

- homepage: `860px` a `960px`;
- artigo: `760px` a `820px`;
- admin/editor: pode chegar a `1180px` quando houver formulário e preview.

Espaçamento:

- padding horizontal mínimo: `16px`;
- header compacto: altura entre `56px` e `72px`;
- artigo da lista: padding vertical entre `18px` e `24px`;
- seções internas: usar respiro, mas sem cara de landing page.

## Header Público

O header deve ser compacto e utilitário.

Conteúdo esperado:

```txt
Jotacraq Blog      Artigos  Sobre  Projetos      Último artigo: 16/05/2026   [Tema] [GitHub]
```

Regras:

- borda inferior `1px solid var(--border)`;
- fundo próximo de `--bg-secondary` ou transparente sobre `--bg-primary`;
- marca à esquerda;
- navegação central ou próxima da marca;
- último artigo e ações à direita;
- em mobile, quebrar de modo controlado sem sobreposição.

Não fazer:

- header alto demais;
- navbar com botões grandes;
- logo ilustrado;
- menu de dashboard.

## Homepage

O primeiro viewport deve mostrar artigos, não uma apresentação do produto.

Estrutura esperada:

```txt
16/05/2026 · Geral
Primeiro artigo
Uma abertura para o blog. Este artigo inaugura o espaço editorial do Jotacraq Blog.
2 min de leitura · blog · inicio
```

Cada item deve ter:

- data;
- categoria;
- título;
- descrição curta;
- tempo de leitura;
- tags, quando houver.

Comportamento visual:

- item separado por borda inferior;
- sem card pesado;
- hover com fundo muito sutil;
- título muda para accent no hover;
- categoria em accent;
- metadados muted;
- área clicável clara.

CSS de referência:

```css
.article-item {
  border-bottom: 1px solid var(--border);
  padding: 20px 0;
}

.article-item:hover {
  background: var(--surface-hover);
}

.article-item:hover .article-title {
  color: var(--accent);
}
```

## Página de Artigo

Estrutura:

```txt
Categoria · Data · Tempo de leitura

Título do artigo
Descrição curta

------------------------------------------------------------

Conteúdo renderizado em Markdown
```

Regras:

- sem sidebar inicial;
- sem capa/hero;
- título forte, mas não monumental;
- excerpt como apoio curto;
- separador sutil antes do conteúdo;
- link de voltar discreto;
- leitura centralizada.

## Markdown

A classe `.markdown` deve conter a experiência de leitura.

Requisitos visuais:

- parágrafos com `line-height` confortável;
- headings com boa separação vertical;
- links azuis;
- blockquotes com borda esquerda azul;
- código inline com fundo discreto;
- blocos de código com fundo `--surface`, borda e scroll horizontal;
- tabelas com bordas e overflow no mobile;
- imagens responsivas.

CSS de referência:

```css
.markdown p {
  color: var(--text-secondary);
  line-height: 1.8;
}

.markdown a {
  color: var(--accent);
}

.markdown blockquote {
  border-left: 3px solid var(--accent);
  color: var(--text-muted);
  padding-left: 16px;
}

.markdown pre {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 8px;
  overflow-x: auto;
  padding: 16px;
}
```

## Tags e Metadados

Metadados devem parecer informação técnica, não badges promocionais.

Categoria:

- usar `--accent`;
- texto pequeno;
- pode aparecer junto da data.

Tags:

- discretas;
- texto muted ou borda sutil;
- sem preenchimento colorido forte;
- não competir com o título.

Tempo de leitura:

- muted;
- sempre junto dos metadados inferiores ou superiores;
- formato: `1 min de leitura`, `2 min de leitura`.

## Admin

O admin deve seguir a mesma estética, mas pode ser um pouco mais utilitário.

Regras:

- não transformar `/admin` em dashboard visual pesado;
- usar listas e tabelas simples;
- inputs com fonte mono;
- textarea grande e confortável;
- preview/MDX com aparência de editor;
- botões discretos, com borda e estados claros.

O admin atual ainda é um gerador local de MDX. O design não deve prometer persistência real enquanto ela não existir.

## Modo Claro

O modo claro deve funcionar, mas dark é o protagonista.

Regras:

- manter contraste;
- não criar uma paleta bege/creme;
- evitar aparência editorial genérica;
- preservar bordas, accent azul e estrutura técnica.

Se houver conflito de refinamento, priorizar a experiência dark.

## Responsividade

Mobile:

- sem sidebar;
- lista em coluna única;
- data e categoria acima do título;
- header pode quebrar em duas linhas;
- ações de tema/GitHub devem continuar clicáveis;
- textarea do admin ocupa largura total;
- preview aparece abaixo do editor;
- blocos de código têm scroll horizontal;
- nenhum texto deve ultrapassar o container.

Desktop:

- manter densidade elegante;
- não esticar linhas de leitura;
- usar espaço lateral como silêncio visual, não como lugar para decoração.

## Acessibilidade

Obrigatório:

- contraste adequado;
- foco visível;
- labels reais em inputs;
- `aria-label` em botões só com ícone;
- links identificáveis;
- navegação por teclado;
- áreas clicáveis com tamanho confortável;
- conteúdo não dependente apenas de cor.

## Checklist de QA Visual

Antes de considerar o redesign pronto, validar:

- home abre direto na lista de artigos;
- não existe hero;
- não existem gradientes decorativos;
- header não sobrepõe conteúdo;
- lista parece índice técnico;
- hover é discreto;
- categoria e links usam accent azul;
- artigo é legível em desktop;
- artigo é legível em mobile;
- código não quebra layout;
- tabela Markdown não quebra layout;
- blockquote é visível e discreto;
- tema claro continua utilizável;
- admin não parece dashboard pesado;
- botões e ícones têm foco visível;
- E2E público cobre home, artigo e admin.

## Critério Final de Design

O redesign está correto quando alguém olhando a homepage por poucos segundos sente que está em um blog técnico pessoal, próximo de uma documentação/repositório, com acesso imediato aos textos.

Se a tela parecer uma landing page, o design falhou.
