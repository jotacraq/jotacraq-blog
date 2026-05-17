# Spec 03 - Admin Experience

## Objetivo

Definir a area administrativa do MVP. Ela deve apoiar o autor na escrita e organizacao dos artigos sem tentar substituir um CMS completo.

## Rotas Admin

```txt
/admin
/admin/postar
```

## Navbar Admin

Links obrigatorios:

- Home
- Postar

Regras:

- `Home` leva para `/admin`.
- `Postar` leva para `/admin/postar`.
- A navegacao admin deve ser visualmente distinta o suficiente da experiencia publica.

## Admin Home

Rota:

```txt
/admin
```

Objetivo:

Mostrar uma visao basica do estado do blog com dados derivados dos arquivos MDX.

Conteudo:

- total de artigos publicados;
- total de rascunhos, se houver arquivos com `draft: true`;
- data do ultimo artigo publicado;
- lista dos artigos recentes;
- card informando que metricas reais podem ser vistas via Vercel Analytics quando configurado;
- link para `/admin/postar`.

## Postar

Rota:

```txt
/admin/postar
```

Objetivo:

Criar uma interface de apoio para o autor elaborar um artigo e gerar um arquivo MDX valido.

Campos:

- titulo;
- subtitulo;
- slug;
- data de publicacao;
- resumo;
- tags;
- conteudo principal.

## Geracao de MDX

A pagina deve gerar uma saida nesse formato:

```mdx
---
title: "Titulo"
subtitle: "Subtitulo"
slug: "titulo"
publishedAt: "2026-05-16"
excerpt: "Resumo"
tags:
  - tag
draft: false
---

Conteudo do artigo.
```

## Validacoes

Campos obrigatorios:

- titulo;
- subtitulo;
- slug;
- data de publicacao;
- resumo;
- conteudo principal.

Regras:

- slug deve usar letras minusculas, numeros e hifens;
- data deve estar em formato `YYYY-MM-DD`;
- tags devem ser normalizadas como lista;
- conteudo vazio nao deve gerar arquivo valido;
- titulo vazio deve bloquear a geracao.

## Acoes

A pagina deve permitir:

- copiar o MDX gerado;
- baixar o arquivo `.mdx`, se a implementacao inicial permitir;
- limpar formulario;
- visualizar nome sugerido do arquivo.

Nome sugerido:

```txt
YYYY-MM-DD-slug.mdx
```

## Persistencia no MVP

Nao havera persistencia online no MVP. A pagina `/admin/postar` nao salva artigos no servidor, nao cria commits e nao publica automaticamente.

Fluxo oficial:

1. O autor escreve no assistente.
2. O autor copia ou baixa o MDX.
3. O arquivo e colocado em `content/articles`.
4. O autor faz commit.
5. A Vercel publica o novo build.

## Criterios de Aceite

- Admin acessa `/admin` e ve resumo dos artigos locais.
- Admin acessa `/admin/postar`.
- Formulario gera MDX valido.
- Formulario bloqueia campos obrigatorios vazios.
- Slug invalido e data invalida sao indicados ao usuario.
- O nome de arquivo sugerido segue `YYYY-MM-DD-slug.mdx`.
- O fluxo deixa claro que a publicacao acontece por commit.
