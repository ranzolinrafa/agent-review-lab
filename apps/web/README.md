# Web

Interface React do Agent Review Lab, identificada pelo workspace privado
`@agent-review-lab/web`. Executa no navegador e chama a API por HTTP.

## Estrutura atual

A organização FSD é progressiva, com camadas irmãs em `src`:

- `app`: providers, Router, rotas e estilos globais.
- `pages/home`: formulário e consulta da saudação.
- `pages/greeting`: saudação identificada pela URL.
- `shared/api`: cliente tRPC e opções da consulta reutilizada.

Os arquivos de `app/routes` conectam URLs às páginas. A rota raiz fornece `Outlet`
e o conteúdo de caminho inexistente. `/` abre a home e `/greetings/$name` extrai
o nome para a página de saudação. `routeTree.gen.ts` é gerado pelo plugin do Vite,
versionado e excluído do Biome; não deve ser editado manualmente.

O cliente importa `AppRouter` das declarações públicas de `@agent-review-lab/trpc`,
como tipo. A web não importa fontes internos de `apps/api`.

## Executar e verificar

Na raiz:

```sh
bun install --frozen-lockfile
bun run build
bun run --filter @agent-review-lab/web check
bun run --filter @agent-review-lab/web lint
bun run dev
```

O build da raiz prepara o pacote antes da web. O build individual da web executa
`tsc -b` e `vite build`, exigindo que o pacote já tenha sido compilado. Vite usa
Node e transforma os módulos para o navegador; Bun gerencia e aciona os scripts.

Abra `http://127.0.0.1:5173/`. As portas são fixas; encerre instâncias anteriores
antes de iniciar. `Ctrl+C` encerra os processos do comando integrado.

Para executar somente a web, após `bun run build:trpc`, use
`bun run --filter @agent-review-lab/web dev`. Para conferir seu build, use
`bun run --filter @agent-review-lab/web preview`; a API continua sendo um processo
separado.

## Revisão manual

1. Digite um nome: ainda não deve haver chamada à API.
2. Envie o formulário: confira o carregamento e a saudação após dois segundos.
3. Consulte outro nome e volte ao primeiro dentro de 30 segundos: confira o cache.
4. Envie novamente o mesmo nome: a chamada explícita de `refetch` deve consultar a API.
5. Envie um valor vazio: confira a mensagem de validação.
6. Abra a saudação pelo link, use voltar/avançar e atualize a página de detalhe.
7. Abra `/greetings/Ana%20Maria` diretamente e confira o parâmetro decodificado.
8. Abra um caminho não registrado: confira a mensagem de página não encontrada.

O Query Devtools permite inspecionar as consultas e invalidá-las. A aba Network
mostra as chamadas de `greeting.hello`. Para observar falha de comunicação, execute
somente a web, sem API, e consulte um nome novo; depois inicie a API e tente de novo.
Um resultado fresh em cache pode dispensar a chamada, mesmo sem servidor.

O [funcionamento atual](../../docs/system/overview.md#demonstração-implementada-no-m3)
é a referência dos comportamentos da demonstração. Mutations foram estudadas
conceitualmente; a criação de solicitações será implementada no
M4 (Solicitações e backoffice básico).

## Arquivos de entrada

`index.html` referencia `src/main.tsx`, que renderiza `app/app.tsx`. `QueryProvider`
envolve `RouterProvider`, preservando o cache durante a navegação. O estado local
da home reinicia quando a página é desmontada.

`tsconfig.app.json` configura o navegador e `tsconfig.node.json`, as ferramentas.
`tsconfig.json` coordena ambos. O Biome da raiz verifica formatação, lint e imports.
