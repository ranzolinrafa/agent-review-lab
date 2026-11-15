# ADR 0003 — Rotas por arquivos e composição de páginas

Data do registro: 2026-11-15.
Status: aprovada para uso atual; reavaliação pendente a pedido do usuário.

## Contexto

O M3 (Primeira comunicação tipada) introduziu URLs, parâmetros e navegação usando
a saudação existente. Precisamos conectar páginas sem misturar configuração de
rotas com apresentação, respeitando a adoção progressiva de FSD.

TanStack Router suporta declaração explícita da árvore por código e geração da
árvore a partir de arquivos. A presença de código gerado e a localização das rotas
em `app` foram discutidas antes da aprovação do checkpoint.

## Alternativas consideradas

- Rotas por código: montar explicitamente a árvore, sem plugin de geração,
  mantendo manualmente as relações entre rotas.
- Rotas por arquivos: usar convenções de nomes e o plugin do Vite para gerar as
  relações e os tipos, acrescentando uma etapa de geração: escolhida.

## Decisão

Manter arquivos de rota pequenos em `apps/web/src/app/routes`. Eles associam URLs
às páginas e extraem os parâmetros necessários. A apresentação permanece em
`pages`, consumida por suas exportações públicas. A direção é `app → pages → shared`;
a presença do nome de uma página em um arquivo de rota não transfere sua lógica
para a camada de composição.

O plugin `@tanstack/router-plugin` executa antes do plugin React no Vite e gera
`app/routeTree.gen.ts`. O arquivo é versionado para estar disponível à verificação
TypeScript que precede o build Vite. Ele é excluído do Biome e não é editado
manualmente. O plugin também configura a separação automática do código das rotas.

Manter QueryProvider acima de RouterProvider, preservando a instância do cache
durante a navegação. Reconhecer uma rota não substitui consultar ou validar os
dados correspondentes na API.

## Consequências

- Navegação e parâmetros recebem tipos derivados da árvore de rotas.
- As páginas não precisam importar os arquivos de rota da camada `app`;
  parâmetros podem ser fornecidos por props.
- Convenções de nomes, plugin e arquivo gerado passam a fazer parte do fluxo de
  desenvolvimento. Alterações nas rotas precisam regenerar a árvore.
- A configuração por arquivos reduz composição manual, mas não elimina a
  necessidade de compreender a árvore e inspecionar o código gerado.
- Voltar a uma página pode remontar seu estado local; o cache compartilhado
  permanece no provider. Comportamentos são descritos no documento do sistema.

## Reavaliação

O usuário solicitou revisar esta decisão futuramente, sem data definida. A decisão
permanece vigente até novo alinhamento. Na revisão, comparar a clareza e o custo
de manutenção das rotas por arquivos com a alternativa por código, considerando
o crescimento das páginas e a separação entre configuração e apresentação no FSD.

O [funcionamento atual](../system/overview.md#demonstração-implementada-no-m3)
descreve a navegação implementada. Os [conceitos de organização](../concepts/code-organization.md)
explicam as responsabilidades das camadas.

## Referências

- [Rotas por arquivos no TanStack Router](https://tanstack.com/router/latest/docs/routing/file-based-routing).
- [Integração com Vite](https://tanstack.com/router/latest/docs/installation/with-vite).
- [Camadas do FSD](https://feature-sliced.design/docs/reference/layers).
