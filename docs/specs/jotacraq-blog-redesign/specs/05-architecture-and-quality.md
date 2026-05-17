# Spec 05 - Architecture and Quality

## Objetivo

Garantir que o redesign seja implementado com escopo controlado, módulos pequenos, testes atualizados e sem regressões nas rotas já entregues.

## Arquitetura

Manter boundaries atuais:

```txt
app/                 Rotas e composição
content/             MDX versionado
features/articles/   Domínio e UI de artigos
features/admin/      Admin local e geração de MDX
features/author/     Conteúdo do autor
features/theme/      Tema
shared/              Config e UI compartilhada
```

## Regras de Implementação

- Rotas em `app/` devem continuar finas.
- Lógica de leitura e validação fica em `features/articles/lib`.
- Componentes visuais de artigos ficam em `features/articles/components`.
- UI compartilhada genérica pode ir para `shared/ui`.
- Não criar abstrações amplas sem necessidade.
- Não renomear `articles` para `posts` nesta etapa.
- Não introduzir dependências pagas ou infraestrutura externa.
- Arquivos de aplicação devem ficar abaixo de 500 linhas.

## Estratégia de Testes

### Unitários

Cobrir:

- parsing de frontmatter com `category`;
- filtro de rascunhos;
- ordenação por data;
- lookup por slug;
- tempo de leitura;
- geração MDX do admin.

### Build e Typecheck

Obrigatórios:

```bash
npm run typecheck
npm run build
```

### E2E

Cobrir:

- fluxo de leitura público;
- home para artigo;
- ausência de rascunho;
- página sobre;
- editor admin gerando MDX com categoria.

### Visual QA Manual

Validar em desktop e mobile:

- home sem hero;
- header sem quebra incoerente;
- lista sem overflow;
- artigo com código e blockquote legíveis;
- tema claro funcional;
- botões clicáveis em mobile.

## Quality Gate

Antes de abrir ou atualizar PR:

```bash
npm run format:check
npm run lint
npm run typecheck
npm run test
npm run build
npm run test:e2e
```

CI deve continuar rodando os mesmos checks.

## Acessibilidade

Requisitos mínimos:

- links com texto acessível;
- botões com `aria-label` quando forem somente ícone;
- contraste adequado no dark mode;
- foco visível;
- inputs com labels reais;
- navegação básica por teclado.

## Performance

Requisitos:

- manter páginas estáticas sempre que possível;
- evitar client components desnecessários;
- manter theme/admin interativos isolados;
- não carregar bibliotecas pesadas para Markdown se o stack atual já atende;
- evitar imagens externas obrigatórias.

## Riscos

- O uso de fonte mono em artigos longos pode cansar. Mitigar com line-height alto, largura controlada e contraste confortável.
- A inclusão de `/projetos` no header sem rota quebraria UX. Mitigar criando rota ou omitindo link.
- Adicionar `category` sem atualizar MDX existentes quebra parsing. Mitigar com migração e testes.
- Estilizar Markdown globalmente pode afetar outras páginas. Mitigar usando classe `.markdown`.

## Critérios de Aceite

- Todos os comandos da quality gate passam.
- CI passa no PR.
- Nenhuma rota atual é removida.
- Componentes seguem boundaries de feature.
- Specs e README ficam atualizados com o novo fluxo.
