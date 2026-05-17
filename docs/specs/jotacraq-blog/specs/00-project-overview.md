# Spec 00 - Project Overview

## Objetivo

Construir o Jotacraq Blog como um MVP gratuito, publico e simples de manter, usando Next.js, arquivos MDX versionados no GitHub e deploy na Vercel.

## Decisao de Arquitetura do MVP

O MVP nao tera banco de dados, Strapi ou CMS externo. O conteudo sera armazenado em arquivos `.mdx` dentro do repositorio.

Essa decisao favorece:

- custo inicial proximo de zero;
- deploy simples;
- versionamento natural do conteudo;
- revisao por PR;
- menor superficie de seguranca;
- menos infraestrutura para manter.

## Produto

O produto sera um blog pessoal de autor unico, com foco em leitura e publicacao de artigos autorais.

O visitante acessa uma homepage publica, visualiza uma timeline de artigos e abre paginas especificas para leitura completa.

O autor acessa uma area administrativa simples para consultar o estado do blog e usar um assistente de escrita que gera conteudo MDX.

## Escopo MVP

O MVP deve entregar:

- homepage publica;
- timeline vertical de artigos;
- pagina individual de artigo;
- pagina "Sobre mim";
- dark mode e light mode;
- link para GitHub pessoal;
- area admin basica;
- pagina de criacao/geracao de artigo MDX;
- leitura de conteudo a partir de `content/articles`;
- deploy na Vercel;
- CI basico no GitHub Actions.

## Fora do Escopo MVP

Nao sera implementado no MVP:

- banco de dados;
- CMS;
- comentarios;
- newsletter;
- busca avancada;
- multiplos autores;
- upload de imagens pelo painel;
- dashboard real de metricas proprias;
- publicacao direta sem commit.

## Principais Rotas

```txt
/                    Homepage publica
/artigos/[slug]      Pagina especifica de artigo
/sobre               Pagina sobre o autor
/admin               Home administrativa
/admin/postar        Assistente de criacao de artigo
```

## Criterios de Aceite

- O projeto pode ser publicado na Vercel sem servicos pagos obrigatorios.
- O conteudo dos artigos vem de arquivos MDX no repositorio.
- Visitantes conseguem ler artigos sem login.
- A area admin existe, mas nao precisa persistir dados online no MVP.
- O fluxo de publicacao por commit esta documentado.
- A estrutura do projeto favorece PRs pequenos e modulos bem definidos.
