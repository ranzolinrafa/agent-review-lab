# API

Servidor do Agent Review Lab, executado pelo Bun.

Esta aplicação receberá operações da interface, manterá os dados em memória e
executará as análises determinísticas, disponibilizando seu progresso ao navegador.

O manifesto identifica esta aplicação como o workspace privado
`@agent-review-lab/api`. Instalação e lockfile são coordenados pela raiz.

## Configuração atual

O template vazio de `bun init` criou `index.ts` e `tsconfig.json` e acrescentou o
script `typecheck` ao manifesto. O ponto de entrada imprime uma mensagem no
terminal e encerra; ainda não existe servidor HTTP.

`@types/bun` 1.4.4 e TypeScript 7.0.2 são dependências de desenvolvimento com
versões explícitas. A configuração foi revisada para a API no
M2 (Estrutura e ambiente, um passo por vez), preservando as verificações de rigor
e removendo opções desnecessárias do template. Consulte os
[fundamentos de TypeScript](../../docs/concepts/typescript.md) para as justificativas.

As exclusões do Git ficam somente no `.gitignore` da raiz; o arquivo local
sugerido pelo gerador foi removido por decisão aprovada.

## Verificação

Execute na raiz do repositório:

```sh
bun install --frozen-lockfile
bun run --filter @agent-review-lab/api typecheck
bun run --cwd apps/api tsc --noEmit
bun run apps/api/index.ts
```

A instalação deve respeitar o lockfile, `typecheck` deve concluir sem erros e o
ponto de entrada deve imprimir `Hello via Bun!`. O script `typecheck` usa
`bun check`, conforme gerado pelo Bun 1.4.4. A execução direta de `tsc --noEmit`
também foi conferida e deve concluir sem erros, normalmente sem saída no terminal.
