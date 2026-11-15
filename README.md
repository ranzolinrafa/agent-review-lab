# Agent Review Lab

Projeto educacional e de portfólio que simula um backoffice de análise de crédito,
com execução por etapas, evidências em tempo real e revisão humana.

O objetivo é compreender o caminho dos dados entre interface, API, execução no
servidor e eventos, construindo a aplicação em passos pequenos e revisados.

## Estado do projeto

O M3 (Primeira comunicação tipada) implementou uma demonstração de saudação com
tRPC, validação Zod, TanStack Query e TanStack Router. A home permite consultar um
nome e abrir a saudação por URL. Ainda não há funcionalidades de crédito.

```text
apps/web       Interface React, navegação e cache de consultas
apps/api       Servidor Bun e implementação dos serviços
packages/trpc  Routers, schemas, interfaces do contexto e tipos públicos
docs           Guia, conceitos, funcionamento e decisões
```

Consulte o [progresso](docs/project/progress.md) para o checkpoint e o
[guia do projeto](docs/project/guide.md) para o roteiro completo.

## Instalar e executar

O ambiente verificado utiliza Bun 1.4.4 e Node 24.15.0. Bun gerencia os pacotes e
executa a API; o CLI do Vite usa Node. Com ambos no `PATH`, execute na raiz:

```sh
bun install --frozen-lockfile
bun run dev
```

`dev` primeiro compila `packages/trpc` e depois inicia web, API e compilador do
pacote em watch. `Ctrl+C` encerra os processos iniciados pelo comando. Encerre
instâncias anteriores, pois as portas são fixas.

Abra `http://127.0.0.1:5173/`, envie um nome fictício e confira a saudação após
aproximadamente dois segundos. O link **Abrir saudação por URL** navega para
`/greetings/<nome>`, que também pode ser aberto diretamente. O Query Devtools fica
disponível pelo botão flutuante em desenvolvimento.

A rota técnica `GET /` da API continua respondendo `Hello World!` em
`http://127.0.0.1:3000/`. Para inspecionar a operação tRPC em outro terminal:

```sh
curl -i --get --data-urlencode 'input={"name":"Rafael"}' http://127.0.0.1:5173/api/trpc/greeting.hello
curl -i --get --data-urlencode 'input={"name":123}' http://127.0.0.1:5173/api/trpc/greeting.hello
```

Espere `200` com a saudação na primeira chamada e `400` com problemas de validação
na segunda. O [percurso da chamada](docs/system/overview.md#demonstração-implementada-no-m3) descreve o contrato e a divisão de responsabilidades.

## Verificações

Execute na raiz, nesta ordem, após instalar:

```sh
bun run build
bun run check
bun run --filter @agent-review-lab/trpc typecheck
bun run --filter @agent-review-lab/api typecheck
bun test ./packages/trpc/tests ./apps/api/src
```

`build` gera JavaScript e declarações em `packages/trpc/dist`, depois verifica os
tipos da web e gera `apps/web/dist`. A API é executada diretamente pelo Bun.
Os nove testes cobrem delegação pelo contexto, validação, respostas HTTP de erro
e o serviço de saudação. Esses comandos não exigem servidores em execução.

`check` executa Biome. Para aplicar correções seguras ou somente formatar:

```sh
bun run check:fix
bun run format
```

Para preparar somente o pacote antes de executar ou verificar uma aplicação
individualmente, use `bun run build:trpc`. `dist` é gerado e não é versionado.
Os READMEs da [API](apps/api/README.md) e da [web](apps/web/README.md) detalham seus
comandos individuais.

`--frozen-lockfile` exige manifests e lockfile consistentes. Ao mudar dependências,
use os comandos normais do Bun e revise o lockfile junto dos manifests.

## Experiência planejada

1. Criar uma solicitação com dados fictícios e abrir seu detalhe por URL.
2. Iniciar manualmente uma análise e acompanhar suas etapas e evidências.
3. Consultar a recomendação produzida pelas regras.
4. Registrar uma decisão humana com justificativa, preservando a recomendação.
5. Simular falha, iniciar nova tentativa e consultar o histórico.
6. Simular desconexão e recuperar o estado ao reconectar.

## Tecnologias

React 19, TypeScript, Vite, Bun workspaces, tRPC, Zod, TanStack Query, TanStack
Router, Biome e Bun test já são utilizados. SSE, Tailwind CSS, Radix UI, Vitest,
Testing Library e Playwright serão introduzidos conforme o roteiro.

## Limites da simulação

O executor seguirá regras determinísticas, sem modelo de IA real. Os dados serão
fictícios e mantidos em memória: reiniciar a API apagará solicitações e histórico.

O MVP será local, sem banco de dados, autenticação, integrações externas ou deploy.
As regras serão didáticas, sem pretensão de política de crédito de produção.
O pacote tRPC permanece privado; foi validado por empacotamento local, sem
publicação em registro.

## Documentação

- [Visão do sistema](docs/system/overview.md): demonstração atual e fluxo de crédito previsto.
- [Decisões arquiteturais](docs/adr/): organização e justificativas das escolhas.
- [Índice de conceitos](docs/concepts/README.md): fundamentos por assunto.
- [Guia do projeto](docs/project/guide.md): objetivo, escopo e milestones.
- [Progresso](docs/project/progress.md): estado atual e próxima ação.
- [Instruções do agente](docs/instructions/agent-instructions.md): aprendizado e checkpoints.
- [Instruções para ADRs](docs/instructions/adrs.md): registro de decisões.
- [Orientações para agentes](AGENTS.md): contexto e referências de colaboração.
