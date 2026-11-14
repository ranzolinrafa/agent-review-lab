# Agent Review Lab — orientações essenciais

Agent Review Lab é um projeto educacional e de portfólio que simula um backoffice de
análise de crédito. O usuário cria solicitações fictícias, inicia análises,
acompanha etapas e evidências em tempo real e registra uma decisão humana sobre a
recomendação do sistema. O fluxo inclui falha simulada, nova tentativa com histórico
e recuperação após desconexão.

O projeto será um monorepo com frontend React/TypeScript e API Bun, usando tRPC,
Zod, TanStack Query, TanStack Router e SSE. O executor seguirá regras determinísticas,
sem IA real, com dados em memória e execução local.

O objetivo do pairing é compreender os conceitos e o caminho dos dados. O usuário
já domina React, TypeScript e tem experiência com Node/Express; as tecnologias
novas serão ensinadas desde os fundamentos, antes da implementação.
O contexto durável fica nos documentos deste repositório.

## Início de sessão

Antes de conduzir qualquer tarefa, ler integralmente o guia do projeto, as
instruções do agente e o progresso, referenciados na tabela abaixo, nessa ordem.
Essa leitura inicial é obrigatória; não depende do tipo da primeira solicitação.

Na primeira resposta, indicar brevemente o estado atual e a ação que será tratada,
respeitando o checkpoint e a autorização registrados no progresso.
Não reler os três documentos a cada mensagem enquanto estiverem disponíveis e
atualizados no contexto. As demais referências são consultadas conforme a tarefa.

## Referências por situação

Após a leitura inicial obrigatória, consultar somente as seções pertinentes à
tarefa, sem reler conteúdo já disponível e atualizado no contexto. A tabela é uma
instrução de consulta, não um mecanismo de carregamento automático.

| Quando ler                                                              | O que consultar                                      | Referência                                                                                           |
| ----------------------------------------------------------------------- | ---------------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| Ao iniciar sessão; ao discutir escopo, planejar ou implementar um passo | Objetivo, limites e milestone pertinente             | [Guia do projeto](docs/project/guide.md)                                                             |
| Ao iniciar sessão; antes de conduzir um passo                           | Didática, concordância, implementação e revisão      | [Instruções do agente](docs/instructions/agent-instructions.md)                                      |
| Ao iniciar ou retomar sessão                                            | Milestone, passo autorizado, pendências e checkpoint | [Progresso](docs/project/progress.md)                                                                |
| Antes de propor ou alterar decisão arquitetural                         | Critérios, formato e aprovação                       | [Instruções de ADRs](docs/instructions/adrs.md)                                                      |
| Ao definir cenários ou implementar testes                               | Camada adequada, recap e TDD seletivo                | [Testes](docs/instructions/agent-instructions.md#testes)                                             |
| Ao identificar ponto de commit                                          | Conventional Commits, revisão e aprovação            | [Git](docs/instructions/agent-instructions.md#git)                                                   |
| Ao encerrar passo ou sessão                                             | Resultado, validações, impedimentos e próxima ação   | [Retomada](docs/instructions/agent-instructions.md#retomada) e [progresso](docs/project/progress.md) |
| Ao estudar fundamentos das tecnologias                                  | Índice e referências condicionais por assunto        | [Conceitos](docs/concepts/)                                                                          |
| Ao estudar ou alterar fluxos e contratos da aplicação                   | Documentação pertinente ao funcionamento do sistema  | [Sistema](docs/system/)                                                                              |

Manter as referências por assunto no índice de `docs/concepts/`, sem listar cada
nota conceitual neste arquivo. Consultar somente os documentos pertinentes.
Quando houver conteúdo em `docs/adr/` (decisões), adicionar referência condicional
ao diretório. Não criar pastas vazias nem referências para documentos inexistentes.
