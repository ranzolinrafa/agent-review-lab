# API

Servidor do Agent Review Lab, executado pelo Bun.

Esta aplicação receberá operações da interface, manterá os dados em memória e
executará as análises determinísticas, disponibilizando seu progresso ao navegador.

O manifesto identifica esta aplicação como o workspace privado
`@agent-review-lab/api`. Instalação e lockfile são coordenados pela raiz.

## Configuração atual

O ponto de entrada `index.ts` inicia o servidor com `Bun.serve` em
`http://127.0.0.1:3000/`. A rota `GET /` responde `Hello World!`; caminhos
inexistentes respondem `404`. O processo permanece ativo aguardando requisições.

`@types/bun` 1.4.4 e TypeScript 7.0.2 são dependências de desenvolvimento com
versões explícitas. A configuração foi revisada para a API no
M2 (Estrutura e ambiente, um passo por vez), preservando as verificações de rigor
e removendo opções desnecessárias do template. As opções efetivas estão no
`tsconfig.json` da aplicação.

As exclusões do Git ficam somente no `.gitignore` da raiz; o arquivo local
sugerido pelo gerador foi removido por decisão aprovada.

## Verificação

Execute na raiz do repositório:

```sh
bun install --frozen-lockfile
bun run --filter @agent-review-lab/api typecheck
bun run --cwd apps/api tsc --noEmit
bun run --filter @agent-review-lab/api check
bun run --filter @agent-review-lab/api dev
```

A instalação deve respeitar o lockfile, as verificações devem passar e `dev` deve
imprimir o endereço do servidor. `dev` usa `bun --watch index.ts`, reiniciando
após mudanças; encerre com `Ctrl+C`. Para executar sem observar mudanças, use
`bun run --filter @agent-review-lab/api start`.

Em outro terminal, execute:

```sh
curl -i http://127.0.0.1:3000/
curl -i http://127.0.0.1:3000/inexistente
```

Confira status `200` com `Hello World!` e `404` com `Not Found`. A
[web](../web/README.md#consulta-à-api) acessa a rota inicial pelo proxy do Vite.

`check` chama o Biome instalado na raiz, abrangendo somente a API. `typecheck`
usa `bun --check`, sem arquivo de entrada, para verificar tipos sem executar o
servidor. Essa forma evita que `bun check` resolva o script homônimo de Biome.
`tsc --noEmit` também foi conferido e deve passar, normalmente sem saída.
