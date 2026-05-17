# Spec 02 - Visual System

## Objetivo

Definir a linguagem visual GitHub Dark do redesign: cores, tipografia, espaçamento, bordas, estados e responsividade base.

## Direção Visual

A interface deve parecer:

- um índice técnico;
- uma página de documentação;
- uma lista de commits ou arquivos;
- um ambiente de leitura para desenvolvedores;
- simples, escura, precisa e sem marketing.

Não deve parecer:

- landing page;
- dashboard corporativo;
- portal de notícias;
- página com hero;
- interface ornamental.

## Tokens de Cor

Tokens recomendados para `app/globals.css`:

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

O modo claro pode existir, mas a identidade principal é dark. Ele deve ser funcional e legível, sem competir com a direção GitHub Dark.

## Tipografia

Fonte base:

```css
font-family: "JetBrains Mono", "Fira Code", "IBM Plex Mono", "Cascadia Code", monospace;
```

Regras:

- usar monoespaçada como identidade principal;
- evitar texto hero-scale;
- manter `letter-spacing: 0`;
- não escalar fonte com viewport;
- usar line-height confortável em artigos;
- limitar largura de leitura para evitar linhas longas demais.

## Layout Base

Conteúdo público:

- largura máxima recomendada: 860px a 960px;
- padding horizontal mínimo: 16px;
- header compacto com borda inferior;
- sem cards grandes envolvendo a página inteira;
- listas separadas por borda inferior.

Artigo individual:

- largura máxima recomendada: 760px a 820px;
- conteúdo centralizado;
- metadados acima do título;
- separador sutil antes do conteúdo.

## Componentes Visuais

### Links

- cor padrão: `var(--accent)`;
- hover: `var(--accent-hover)`;
- sem botões chamativos para links editoriais.

### Bordas

- usar `1px solid var(--border)`;
- evitar sombras;
- radius máximo de 8px para controles e superfícies reais;
- listas podem não ter radius.

### Hover

Para item de artigo:

```css
.article-item:hover {
  background: var(--surface-hover);
}

.article-item:hover .article-title {
  color: var(--accent);
}
```

## Markdown

Classe base recomendada:

```css
.markdown {
  color: var(--text-secondary);
  line-height: 1.8;
}
```

Elementos obrigatórios:

- `h1`, `h2`, `h3`;
- `p`;
- `a`;
- `ul`, `ol`, `li`;
- `blockquote`;
- `code`;
- `pre`;
- `table`, `th`, `td`;
- `img`.

Blocos de código:

- fundo `var(--surface)`;
- borda `var(--border)`;
- overflow horizontal;
- fonte monoespaçada;
- padding confortável.

## Responsividade

Mobile:

- header pode quebrar em duas linhas se necessário;
- lista em coluna única;
- metadados acima do título;
- botões e ícones com área de toque adequada;
- sem sidebar;
- sem texto ultrapassando container;
- pre/code com scroll horizontal.

## Critérios de Aceite

- Home e artigo passam visualmente como GitHub Dark.
- Não há hero, gradiente ornamental ou card pesado.
- Texto é legível em desktop e mobile.
- Código e blockquotes são visualmente distintos.
- Hover de item de artigo é discreto.
- Tema claro não quebra contraste básico.
