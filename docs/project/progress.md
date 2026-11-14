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

| Campo         | Situação atual                                                                                                                                                    |
| ------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Milestone     | M2 (Estrutura e ambiente, um passo por vez).                                                                                                                      |
| Estado        | TypeScript da API revisado, aprovado e commitado em b1d31ee; documentação revisada e commit documental autorizado.                                                |
| Concluído     | Dependências de desenvolvimento e tsconfig ajustados. Instalação congelada, bun check, tsc e execução passaram; diferença entre verificar e executar demonstrada. |
| Publicação    | Encerramento do M1 (Visão conceitual do sistema) em main; repositório público ranzolinrafa/agent-review-lab.                                                      |
| Implementação | API imprime Hello via Bun! e encerra; sem HTTP. @types/bun 1.4.4 e TypeScript 7.0.2 em devDependencies com versões explícitas; web ainda sem código.              |
| Próximo passo | Explicar a inicialização da web pelo template oficial React + TypeScript do Vite e aguardar concordância antes da execução.                                       |
| Autorização   | Ajustes TypeScript concluídos e commit documental autorizado. Inicialização da web, tag e push ainda não autorizados.                                             |
| Foco          | Concluir a fundação conforme o roteiro do guia, compreendendo cada configuração; agente e usuário verificam cada checkpoint antes do avanço.                      |
| Pendências    | Shell não interativo do agente usa PATH temporário para Bun. Nenhum impedimento para explicar o próximo passo.                                                    |
