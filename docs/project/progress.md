# Progresso

Atualizado em: 2026-11-15.

## Milestones

O escopo e os critérios de aceite estão no [guia do projeto](guide.md#roteiro-por-milestones).

| Milestone                                    | Status          |
| -------------------------------------------- | --------------- |
| M0 (Consolidar a descoberta em documentação) | Concluído       |
| M1 (Visão conceitual do sistema)             | Concluído       |
| M2 (Estrutura e ambiente, um passo por vez)  | Concluído       |
| M3 (Primeira comunicação tipada)             | Concluído       |
| M4 (Solicitações e backoffice básico)        | Não iniciado    |
| M5 (Execução simulada e histórico)           | Não iniciado    |
| M6 (Progresso em tempo real e recuperação)   | Não iniciado    |
| M7 (Revisão humana)                          | Não iniciado    |
| M8 (Validação integrada e encerramento)      | Não iniciado    |

## Checkpoint atual

| Campo         | Situação atual                                                                                                                                                                                                                        |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Milestone     | M3 (Primeira comunicação tipada).                                                                                                                                                                                                     |
| Estado        | Concluído; implementação e documentação revisadas e aprovadas. ADRs 0002 e 0003 vigentes, com reavaliação futura solicitada pelo usuário.                                                                                             |
| Concluído     | Saudação tRPC/Zod, erros estruturados, Query/Devtools, Router por arquivos e pacote trpc com contexto e serviços; último commit de implementação 9ee5367.                                                                             |
| Validação     | Instalação congelada, Biome, tipos, builds e nove testes passaram. Chamadas HTTP, watch e consumidor externo por pacote local verificados. Interface e navegação revisadas pelo usuário nos checkpoints.                              |
| Implementação | Home e /greetings/$name compartilham a consulta. Pacote gera seu próprio JavaScript e declarações; web consome tipos públicos e API fornece serviço pelo contexto. Sem funcionalidades de crédito.                                    |
| Aprendizado   | Query e Router revisados; invalidação observada no Devtools e mutations estudadas conceitualmente. Usuário sinalizou compreensão parcial da arquitetura; retomar uma chamada concreta para consolidar contexto, contratos e serviços. |
| Ambiente      | Bun 1.4.4 e Node 24.15.0. Scripts da raiz preparam o pacote antes da web/API e mantêm a compilação em watch no desenvolvimento. Versões das bibliotecas estão nos manifests e lockfile.                                               |
| Publicação    | Encerramento local com tag milestone-m3, sem push realizado pelo agente. Pacote privado validado por tarball local, sem publicação em registro.                                                                                       |
| Próximo passo | Retomar o percurso da chamada para consolidar a arquitetura e alinhar o início do M4 (Solicitações e backoffice básico), antes de implementar funcionalidades de crédito.                                                             |
| Autorização   | Encerramento, commit documental e tag milestone-m3 autorizados. Push e início do M4 (Solicitações e backoffice básico) dependem de autorização separada.                                                                              |
| Pendências    | Reavaliar futuramente as ADRs 0002 e 0003, a pedido do usuário e sem data definida; permanecem vigentes. Publicação depende de autorização separada. Nenhum impedimento técnico identificado.                                         |
