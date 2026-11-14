# Agent Review Lab

Projeto educacional e de portfólio que simula um backoffice de análise de crédito,
com execução por etapas, evidências em tempo real e revisão humana.

O objetivo é compreender e explicar o caminho dos dados entre interface, API,
execução no servidor e eventos, construindo a aplicação em passos pequenos e
documentados.

## Estado do projeto

O repositório contém a documentação do projeto e a configuração mínima de Bun
workspaces para `apps/web` e `apps/api`. A API tem o ponto de entrada mínimo e a
configuração TypeScript revisada a partir do template de `bun init`. A web executa
o template oficial React + TypeScript do Vite, com a página original e o contador.
A API ainda não atende HTTP e a web ainda não consulta o backend.

Consulte o [progresso](docs/project/progress.md) para o checkpoint atual e o
[guia do projeto](docs/project/guide.md) para o roteiro completo.

## Verificar a configuração atual

O ambiente verificado utiliza Bun 1.4.4 e Node 24.15.0. Bun gerencia os pacotes e
executa a API; o CLI do Vite usa Node. Execute na raiz:

```sh
bun install --frozen-lockfile
bun run --filter @agent-review-lab/api typecheck
bun run apps/api/index.ts
bun run --filter @agent-review-lab/web build
bun run --filter @agent-review-lab/web lint
bun pm ls --all
```

A instalação deve concluir sem alterar o lockfile e a verificação de tipos deve
passar. O ponto de entrada imprime `Hello via Bun!` e encerra; ele ainda não atende
requisições HTTP. A listagem identifica os dois workspaces e as dependências
instaladas. O build da web também verifica tipos; o lint original usa Oxlint,
que será substituído por Biome no passo previsto. Para abrir a página:

```sh
bun run --filter @agent-review-lab/web dev
```

Acesse o endereço informado pelo Vite, normalmente `http://localhost:5173/`, e
encerre com `Ctrl+C`. Consulte os READMEs da [API](apps/api/README.md) e da
[web](apps/web/README.md) para os comandos e detalhes de cada aplicação.

## Experiência planejada

1. Criar uma solicitação com dados fictícios e abrir seu detalhe por URL.
2. Iniciar manualmente uma análise e acompanhar suas etapas e evidências.
3. Consultar a recomendação produzida pelas regras do sistema.
4. Registrar uma decisão humana com justificativa, inclusive discordando da
   recomendação, preservando os dois registros.
5. Simular falha, iniciar nova tentativa e consultar o histórico.
6. Simular desconexão e recuperar o estado ao reconectar.

## Tecnologias previstas

- **Interface:** React 19, TypeScript e Vite, com TanStack Router para navegação
  e TanStack Query para estado de servidor.
- **API:** Bun, tRPC para operações tipadas e Zod para validação em runtime.
- **Progresso em tempo real:** Server-Sent Events (SSE).
- **Interface visual:** Tailwind CSS e Radix UI conforme a necessidade.
- **Qualidade:** Biome, Bun test, Vitest, Testing Library e Playwright, introduzidos nas
  etapas correspondentes.

Frontend, API e documentação ficarão no mesmo repositório, com Bun workspaces.
As ferramentas serão configuradas progressivamente, seguindo o roteiro.

## Limites da simulação

O executor seguirá regras determinísticas, sem modelo de IA real. A aplicação
usará dados fictícios em memória: reiniciar a API apagará solicitações e histórico.

O MVP será executado localmente, sem banco de dados, autenticação, integrações
externas ou deploy. As regras terão finalidade didática, sem pretensão de
representar uma política de crédito de produção.

## Documentação

- [Fluxo completo e visão do sistema](docs/system/overview.md): caminho dos dados da criação à decisão humana.
- [Índice de conceitos](docs/concepts/README.md): fundamentos das tecnologias e organização do código.
- [Guia do projeto](docs/project/guide.md): objetivo, escopo e milestones.
- [Progresso](docs/project/progress.md): estado atual e próxima ação.
- [Instruções do agente](docs/instructions/agent-instructions.md): aprendizado, implementação e revisão.
- [Instruções para ADRs](docs/instructions/adrs.md): registro de decisões arquiteturais.
- [Orientações para agentes](AGENTS.md): contexto e referências para colaboração.
