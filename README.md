# Agent Review Lab

Projeto educacional e de portfólio que simula um backoffice de análise de crédito,
com execução por etapas, evidências em tempo real e revisão humana.

O objetivo é compreender e explicar o caminho dos dados entre interface, API,
execução no servidor e eventos, construindo a aplicação em passos pequenos e
documentados.

## Estado do projeto

A fundação local está implementada: Bun workspaces, API HTTP mínima, web React
com Vite e Biome compartilhado. Um comando inicia as duas aplicações; a página
preserva o template e seu contador e permite consultar a resposta da API.
Ainda não há funcionalidades de crédito implementadas.

Consulte o [progresso](docs/project/progress.md) para o checkpoint atual e o
[guia do projeto](docs/project/guide.md) para o roteiro completo.

## Instalar e executar

O ambiente verificado utiliza Bun 1.4.4 e Node 24.15.0. Bun gerencia os pacotes e
executa a API; o CLI do Vite usa Node. Com ambos disponíveis no `PATH`, execute na raiz:

```sh
bun install --frozen-lockfile
bun run dev
```

Acesse a web em `http://127.0.0.1:5173/` e clique em **Consultar API**: deve aparecer
`Hello World!`. A API também responde diretamente em `http://127.0.0.1:3000/`.
O comando mantém os processos ativos; `Ctrl+C` encerra ambos. Encerre instâncias
anteriores antes de iniciar, pois as portas são fixas.

Em outro terminal, é possível conferir a API direta e o encaminhamento pelo Vite:

```sh
curl -i http://127.0.0.1:3000/
curl -i http://127.0.0.1:5173/api/
curl -i http://127.0.0.1:3000/inexistente
```

As duas primeiras consultas retornam `200` e `Hello World!`; a última retorna
`404` e `Not Found`. O proxy do Vite encaminha `/api/` para a rota `/` da API.

## Verificações

Execute na raiz:

```sh
bun run check
bun run --filter @agent-review-lab/api typecheck
bun run --filter @agent-review-lab/web build
```

`check` verifica formatação, lint e organização de imports com Biome. `typecheck`
verifica os tipos da API; o build da web verifica seus projetos TypeScript e gera
`apps/web/dist`. Nenhum desses comandos exige servidores em execução.

Para aplicar correções seguras ou somente formatar, respectivamente:

```sh
bun run check:fix
bun run format
```

Os READMEs da [API](apps/api/README.md) e da [web](apps/web/README.md) incluem
execução e qualidade individuais, além da verificação manual de erro e recuperação.
Ainda não há suítes automatizadas instaladas; elas serão introduzidas junto dos
comportamentos previstos no roteiro.

`--frozen-lockfile` exige manifests e lockfile consistentes, sem atualizá-lo. Ao
adicionar ou mudar dependências, use os comandos normais do Bun, revise o diff e
inclua o lockfile gerado no commit. A instalação foi conferida em worktree limpa.

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

React, TypeScript, Vite, Bun workspaces e Biome já estão configurados. As demais
ferramentas serão introduzidas progressivamente, seguindo o roteiro.

## Limites da simulação

O executor seguirá regras determinísticas, sem modelo de IA real. A aplicação
usará dados fictícios em memória: reiniciar a API apagará solicitações e histórico.

O MVP será executado localmente, sem banco de dados, autenticação, integrações
externas ou deploy. As regras terão finalidade didática, sem pretensão de
representar uma política de crédito de produção.

## Documentação

- [Fluxo completo e visão do sistema](docs/system/overview.md): caminho dos dados da criação à decisão humana.
- [Decisão de organização](docs/adr/0001-monorepo-with-bun-workspaces.md): monorepo e inicialização das aplicações.
- [Índice de conceitos](docs/concepts/README.md): fundamentos das tecnologias e organização do código.
- [Guia do projeto](docs/project/guide.md): objetivo, escopo e milestones.
- [Progresso](docs/project/progress.md): estado atual e próxima ação.
- [Instruções do agente](docs/instructions/agent-instructions.md): aprendizado, implementação e revisão.
- [Instruções para ADRs](docs/instructions/adrs.md): registro de decisões arquiteturais.
- [Orientações para agentes](AGENTS.md): contexto e referências para colaboração.
