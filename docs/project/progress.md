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
| Estado        | Web revisada, aprovada e commitada em aece8af; documentação revisada e commit documental autorizado.                                                              |
| Concluído     | Template React + TypeScript do Vite integrado. Instalação congelada, tipos, build e lint passaram; usuário confirmou página e contador no navegador.              |
| Publicação    | Encerramento do M1 (Visão conceitual do sistema) em main; repositório público ranzolinrafa/agent-review-lab.                                                      |
| Implementação | API ainda imprime mensagem no terminal; web mantém a página padrão aprovada. Vite 8.3.8 em Node, React 19.3.1 e TypeScript 7.0.2; lint temporário com Oxlint.     |
| Próximo passo | Explicar o servidor HTTP mínimo da API e sua rota GET inicial; aguardar concordância antes de implementar.                                                        |
| Autorização   | Scaffold da web concluído e commit documental autorizado. Servidor HTTP, tag e push ainda não autorizados.                                                        |
| Foco          | Concluir a fundação conforme o roteiro do guia, compreendendo cada configuração; agente e usuário verificam cada checkpoint antes do avanço.                      |
| Pendências    | Substituir Oxlint por Biome no passo previsto. Script conjunto e consulta da web à API ainda pendentes. Shell do agente usa PATH temporário para Bun.             |
