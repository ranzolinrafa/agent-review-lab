# Agent Review Lab

Projeto educacional e de portfólio que simula um backoffice de análise de crédito,
com execução por etapas, evidências em tempo real e revisão humana.

O objetivo é compreender e explicar o caminho dos dados entre interface, API,
execução no servidor e eventos, construindo a aplicação em passos pequenos e
documentados.

## Estado do projeto

O repositório contém a documentação do projeto e a configuração mínima de Bun
workspaces para `apps/web` e `apps/api`. A API tem o ponto de entrada mínimo e a
configuração original gerados por `bun init`; a web ainda tem apenas seu manifesto.
Ainda não há servidor HTTP ou página web.

Consulte o [progresso](docs/project/progress.md) para o checkpoint atual e o
[guia do projeto](docs/project/guide.md) para o roteiro completo.

## Verificar a configuração atual

Com Bun 1.4.4 disponível, execute na raiz:

```sh
bun install --frozen-lockfile
bun run --filter @agent-review-lab/api typecheck
bun run apps/api/index.ts
bun pm ls --all
```

A instalação deve concluir sem alterar o lockfile e a verificação de tipos deve
passar. O ponto de entrada imprime `Hello via Bun!` e encerra; ele ainda não atende
requisições HTTP. A listagem identifica os dois workspaces e as dependências
instaladas para a API. Consulte o [README da API](apps/api/README.md) para os
detalhes do scaffold e da próxima revisão.

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
