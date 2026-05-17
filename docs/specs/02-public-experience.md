# Spec 02 - Public Experience

## Objetivo

Definir a experiencia publica do blog para visitantes: homepage, timeline, navbar, artigo individual, pagina sobre o autor e tema claro/escuro.

## Homepage

Rota:

```txt
/
```

A homepage deve ser direta, editorial e focada em leitura.

Elementos obrigatorios:

- navbar no topo;
- titulo do site no lado esquerdo;
- data do ultimo artigo no lado direito;
- icone do GitHub no lado direito;
- alternador de tema;
- timeline vertical centralizada;
- artigos ordenados por data de publicacao.

## Timeline de Artigos

Cada item da timeline deve exibir:

- titulo;
- subtitulo;
- data de publicacao;
- resumo;
- link para artigo completo.

Comportamento:

- artigos mais recentes aparecem primeiro;
- a linha vertical deve funcionar bem em desktop e mobile;
- textos nao devem se sobrepor;
- cada artigo deve ter area clicavel clara.

## Navbar Publica

Conteudo:

```txt
[Titulo do site]                         [Ultimo artigo: DD/MM/YYYY] [Tema] [GitHub]
```

Regras:

- O titulo deve levar para `/`.
- A data deve refletir o `publishedAt` do artigo mais recente.
- O icone do GitHub deve abrir o perfil do autor.
- O botao de tema deve alternar entre light e dark mode.

## Pagina de Artigo

Rota:

```txt
/artigos/[slug]
```

Elementos:

- titulo;
- subtitulo;
- data de publicacao;
- tempo estimado de leitura;
- conteudo completo;
- link de retorno para homepage.

Regras:

- Slugs inexistentes devem retornar 404.
- Conteudo MDX deve renderizar headings, paragrafos, listas, links e blocos de codigo.
- A largura do texto deve favorecer leitura confortavel.

## Pagina Sobre Mim

Rota:

```txt
/sobre
```

Elementos:

- nome do autor;
- headline;
- biografia;
- interesses;
- link para GitHub.

## Tema Claro e Escuro

Requisitos:

- O usuario pode alternar tema manualmente.
- A preferencia deve persistir no navegador.
- O tema inicial pode respeitar a preferencia do sistema.
- Ambos os temas devem ter contraste adequado.

## Estados Vazios

Homepage sem artigos:

- exibir mensagem simples informando que ainda nao ha artigos publicados;
- manter navbar e estrutura visual funcionando.

Autor sem GitHub configurado:

- ocultar o icone ou desabilitar o link de forma acessivel.

## Criterios de Aceite

- Visitante acessa `/` e ve os artigos publicados.
- Visitante abre um artigo em `/artigos/[slug]`.
- Visitante acessa `/sobre`.
- Navbar mostra a data do ultimo artigo.
- GitHub abre o perfil configurado.
- Tema claro/escuro funciona e persiste.
- A interface se adapta a mobile e desktop sem sobreposicao visual.

