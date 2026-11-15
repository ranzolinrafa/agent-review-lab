# API

Servidor Bun do Agent Review Lab, identificado pelo workspace privado
`@agent-review-lab/api`. Instalação e lockfile são coordenados pela raiz.

## Responsabilidades atuais

`src/index.ts` inicia `Bun.serve` em `http://127.0.0.1:3000/` e conecta o Fetch
Adapter ao `appRouter` importado de `@agent-review-lab/trpc`. O contexto fornece a
implementação de `src/modules/greeting/service.ts` às procedures do pacote.

O serviço retorna a saudação após dois segundos. O schema da entrada e o router
ficam no pacote; o serviço e os futuros módulos de negócio permanecem na API.
O [percurso da chamada](../../docs/system/overview.md#demonstração-implementada-no-m3)
detalha essa fronteira e o contrato de erros.

`GET /` retorna `Hello World!`; `/trpc` recebe as operações tRPC. Caminhos HTTP
não reconhecidos retornam `404`. Erros internos das procedures são registrados
no terminal; o cliente recebe uma mensagem genérica.

## Executar e verificar

Para desenvolvimento integrado, prefira `bun run dev` na raiz. Para operar somente
a API, execute na raiz:

```sh
bun install --frozen-lockfile
bun run build:trpc
bun run --filter @agent-review-lab/api typecheck
bun run --filter @agent-review-lab/api check
bun test ./apps/api/src
bun run --filter @agent-review-lab/api dev
```

As verificações devem passar e `dev` deve imprimir o endereço do servidor.
Ele usa `bun --watch src/index.ts`; para executar sem watch, use
`bun run --filter @agent-review-lab/api start`. Encerre com `Ctrl+C`.

O teste da API verifica o serviço real. Os testes de router, contexto e erros HTTP
estão em `packages/trpc/tests` e podem ser executados com
`bun test ./packages/trpc/tests` na raiz.

Em outro terminal:

```sh
curl -i http://127.0.0.1:3000/
curl -i http://127.0.0.1:3000/inexistente
curl -i --get --data-urlencode 'input={"name":"Rafael"}' http://127.0.0.1:3000/trpc/greeting.hello
```

Espere `200` com `Hello World!`, `404` com `Not Found` e `200` com a saudação,
respectivamente. O contrato tRPC é o mesmo acessado pela web através do proxy.

`typecheck` usa `bun --check`, sem executar o servidor. O TypeScript também pode
ser acionado com `bun run --cwd apps/api tsc --noEmit`. Os tipos do Bun pertencem
ao ambiente da API; a compilação pública do pacote tRPC não depende deles.

Se alterar o pacote em uma execução individual, recompile com `bun run build:trpc`
ou mantenha seu watcher ativo com `bun run --filter @agent-review-lab/trpc dev`.
O comando integrado da raiz já coordena os três processos.
