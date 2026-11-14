# Progresso

Atualizado em: 2026-11-14.

## Milestones

O escopo e os critérios de aceite de cada milestone estão no [guia do projeto](guide.md#roteiro-por-milestones).

| Milestone                                    | Status       |
| -------------------------------------------- | ------------ |
| M0 (Consolidar a descoberta em documentação) | Concluído    |
| M1 (Visão conceitual do sistema)             | Concluído    |
| M2 (Estrutura e ambiente, um passo por vez)  | Em andamento |
| M3 (Primeira comunicação tipada)             | Não iniciado |
| M4 (Solicitações e backoffice básico)        | Não iniciado |
| M5 (Execução simulada e histórico)           | Não iniciado |
| M6 (Progresso em tempo real e recuperação)   | Não iniciado |
| M7 (Revisão humana)                          | Não iniciado |
| M8 (Validação integrada e encerramento)      | Não iniciado |

## Checkpoint atual

| Campo         | Situação atual                                                                                                                                                |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Milestone     | M2 (Estrutura e ambiente, um passo por vez).                                                                                                                  |
| Estado        | Workspaces configurados, verificados pelo agente e revisados e aprovados pelo usuário.                                                                        |
| Concluído     | Manifests mínimos, exclusões do Git e lockfile único criados. Bun reconhece web e API; instalação com --frozen-lockfile passou, sem dependências externas.    |
| Publicação    | Encerramento do M1 (Visão conceitual do sistema) em main; repositório público ranzolinrafa/agent-review-lab.                                                  |
| Implementação | Dois workspaces privados, sem código de aplicação ou scripts. Bun 1.4.4 disponível; Git e origin configurados.                                                |
| Próximo passo | Explicar a inicialização da API com o template vazio de bun init, apresentar os arquivos esperados e aguardar concordância antes da execução.                 |
| Autorização   | Commit intermediário dos workspaces autorizado. Inicialização da API depende de alinhamento; sem autorização para tag ou push.                                |
| Foco          | Concluir a fundação conforme o roteiro do guia, compreendendo cada configuração; agente e usuário verificam cada checkpoint antes do avanço.                  |
| Pendências    | Shell não interativo do agente usa o caminho absoluto do Bun; dependências externas ainda não instaladas.                                                     |
