# Instruções do agente de desenvolvimento

## Ciclo de cada passo

1. **Problema:** explicar a necessidade concreta no projeto.
2. **Fundamentos:** ensinar conceitos e funcionamento da tecnologia.
3. **Conexões:** usar exemplos, diagramas simples e comparações com Express quando úteis.
4. **Proposta:** delimitar a alteração e justificar dependências e configurações.
5. **Concordância:** aguardar o usuário sinalizar compreensão e concordância.
6. **Implementação:** executar somente o passo combinado.
7. **Validação e revisão:** observar o resultado e explicar o que foi verificado.
8. **Aprovação e commit da implementação:** aguardar a revisão e aprovação do
   usuário; apresentar o conteúdo e a mensagem e obter autorização explícita para
   criar o commit dos arquivos do projeto.
9. **Documentação ao final do milestone:** após concluir e commitar os checkpoints
   de implementação, atualizar a documentação pertinente e o progresso; revisar e
   obter autorização explícita para um commit documental separado.

Durante o desenvolvimento do checkpoint, manter o diff focado nos arquivos do
projeto, incluindo os testes pertinentes. Adiar alterações em `docs/`, READMEs e
instruções de agentes para o encerramento do milestone, sem misturá-las aos commits
de implementação. As explicações, propostas e acordos anteriores à implementação
continuam acontecendo na conversa; registrar os resultados na etapa documental
final. Checkpoints intermediários mantêm explicação, concordância, revisão e
autorização própria para commit, sem exigir uma atualização documental a cada passo.

Se a sessão terminar antes do milestone, apresentar na conversa o resultado,
pendências, commits e próxima ação, avisando que os documentos ainda retratam o
último fechamento documental. Não atualizá-los antecipadamente sem novo alinhamento
do usuário. Na retomada, conferir o Git e os arquivos atuais junto dos documentos.

Tarefas exclusivamente documentais, como planejamento ou mudança de metodologia,
seguem revisão e commit próprios, sem exigir um commit de implementação vazio.
Quando uma entrevista for necessária, fazer uma pergunta por vez e usar a resposta
para orientar a próxima; não aplicar perguntas de avaliação.

Pastas, Bun/workspaces, TypeScript e Vite são passos separados. Edições dentro de
um passo aprovado não exigem nova confirmação; novas ferramentas ou decisões, sim.
O usuário sinaliza compreensão, sem avaliações ou entrevista simulada. Silêncio
não é aprovação. Uma sessão pode cobrir parte de um milestone, sem meta de horas.

React e TypeScript são base conhecida. Explicar novidades do React 19 quando
usadas; revisar outros conceitos dessas tecnologias quando solicitado.

## Apresentação dos documentos

- Nomes de arquivos/diretórios, código, testes e commits em en-US; conteúdo
  documental, explicações e PRs em pt-BR. Preservar nomes como `AGENTS.md`.
- Sempre formatar todas as tabelas Markdown criadas ou alteradas, inclusive nas
  respostas: alinhar as colunas e os separadores `|` com espaços, ajustar a linha
  de cabeçalho e conferir o alinhamento no texto-fonte antes de concluir a edição.
- Citar milestones pelo identificador seguido do nome entre parênteses, usando
  os nomes do guia, em documentos e respostas.
- Registrar somente o que ajuda a compreender o projeto, uma decisão ou a próxima
  ação. Não narrar correções de links, formatação ou outras edições rotineiras.
- Distinguir conteúdo relevante para o projeto de dúvidas pontuais da conversa.
  Não documentar automaticamente toda explicação; registrar dúvidas somente quando
  a resposta ajudar a compreender, implementar ou retomar o projeto, ou por pedido
  do usuário.
- Antes de criar um arquivo documental, julgar se há valor durável para o projeto,
  explicar o que precisa ser preservado e por que os documentos existentes não
  bastam; aguardar concordância explícita do usuário antes de criá-lo. Isso vale
  para notas conceituais, guias, especificações, ADRs e READMEs. A concordância pode
  abranger um conjunto delimitado de arquivos apresentado na proposta.
- Preferir explicações na conversa para fundamentos simples ou facilmente
  consultáveis nas referências oficiais. Não criar uma nota por tecnologia ou
  etapa. Manter instruções essenciais de instalação, execução e verificação nos
  READMEs, evitando documentos paralelos para o mesmo assunto.

## Impedimentos e checkpoints

Se faltar ferramenta ou uma instalação falhar, parar para análise conjunta.
Não continuar em outras etapas nem substituir ferramentas sem discussão.
Distinguir observações atuais, hipóteses e condições históricas do ambiente.

Validar cada passo com verificações pertinentes; apresentar resultados e limitações.
Ao concluir um milestone, registrar seu estado e aguardar aprovação antes de avançar.

## Mudanças durante o desenvolvimento

Demandas inesperadas não entram automaticamente no escopo. Discutir se precisam
ser tratadas agora ou ficar pendentes e qual é o impacto no passo atual.

| Situação                        | Tratamento e registro                                                         |
| ------------------------------- | ----------------------------------------------------------------------------- |
| Ajuste técnico dentro do escopo | Discutir no passo; atualizar documentação do sistema e ADR quando pertinente. |
| Passo necessário não previsto   | Explicar necessidade e impacto; ajustar roteiro e progresso se necessário.    |
| Mudança de escopo               | Alinhar o que entra ou sai; atualizar guia e critérios de aceite afetados.    |
| Demanda fora do passo atual     | Decidir juntos quando tratar; manter no progresso enquanto estiver pendente.  |
| Correção editorial ou menor     | Corrigir no passo autorizado, sem acrescentar histórico da edição.            |

Antes de implementar uma mudança relevante, obter concordância sobre o plano e
os critérios de aceite afetados na conversa. Validar a entrega contra o que foi
combinado. No encerramento do milestone, após os commits da implementação,
atualizar os documentos e referências afetados em etapa separada. Documentação
pertinente atualizada e seu commit autorizado fazem parte desse encerramento.

Manter uma fonte por informação, conforme a organização dos documentos. Revisar
notas conceituais se algum exemplo deixar de ser válido. Git preserva versões;
ADRs explicam decisões relevantes. Não criar histórico paralelo de cada alteração
nem manter pendências já resolvidas no progresso.

## Testes

- Definir cenários e critérios de aceite antes de escolher a camada do teste.
- Fazer recap de testes unitários, integração e ponta a ponta antes de aplicá-los.
- TDD seletivo em regras e transições: teste falhando, implementação e refatoração.
- Bun test em backend/regras; Vitest com Testing Library em componentes e Vitest
  em lógica do frontend; Playwright em fluxos integrados, conforme introduzidos.
- Entregar código e testes no mesmo passo de comportamento; discutir a ordem em
  componentes e integração conforme o aprendizado.
- Não criar testes artificiais para configuração ou métricas, nem repetir todos
  os cenários em todas as camadas.

## Git

Em cada checkpoint, criar o commit da implementação revisada e aprovada mediante
autorização explícita. Somente ao final do milestone editar a documentação e criar
seu commit separado, também mediante autorização explícita. Aprovar um commit de
implementação não autoriza o documental de encerramento. Após cada commit,
verificar a working tree e informar eventuais alterações restantes, sem incluir
mudanças alheias ao passo.

Usar Conventional Commits em inglês. A partir dos próximos encerramentos, usar
ambos os marcos abaixo:

- Commit com o identificador do milestone como escopo, em minúsculas, e descrição
  explícita da conclusão. Escolher o tipo conforme o conteúdo, por exemplo:
  `docs(m1): complete system conceptual overview` ou
  `chore(m2): complete project foundation`.
- Tag anotada no formato `milestone-mN`, como `milestone-m2`, apontando para o
  commit de encerramento com o progresso atualizado. A anotação deve identificar
  o milestone e resumir o resultado aprovado. Não mover a tag automaticamente se
  houver ajustes posteriores.

Ao concluir um milestone revisado e aprovado pelo usuário:

1. Concluir a revisão, as verificações e o commit autorizado da implementação do
   último checkpoint, caso haja alterações de implementação pendentes.
2. Na etapa documental seguinte, atualizar o status e o checkpoint em
   [progresso](../project/progress.md), removendo pendências resolvidas, e revisar
   os demais documentos pertinentes.
3. Apresentar o conteúdo e a mensagem do commit documental de encerramento e a
   tag anotada proposta, apontando para esse commit com o progresso atualizado.
   Aguardar autorização explícita antes de criar o commit e a tag.
4. Antes de fazer push, apresentar os commits e a tag que serão enviados e aguardar
   autorização explícita para o envio. Autorizar criação não autoriza publicação;
   push de branch não publica tags automaticamente.
5. Informar o hash do commit, a tag e o resultado da publicação quando executados,
   além do próximo passo, aguardando alinhamento antes de iniciar
   o milestone seguinte.

Sempre confirmar com o usuário antes de criar commit, criar tag ou fazer push, inclusive em
encerramentos de milestones e pontos intermediários. Aprovar um passo ou concluir
um milestone não autoriza essas ações automaticamente. Inicialização de Git e
configuração de repositório remoto também são ações separadas.

## Retomada

Ao encerrar uma tarefa importante, apresentar um resumo do status do projeto em
uma ou duas frases: milestone atual (com nome), resultado relevante, próximo passo
e eventual impedimento ou aprovação pendente. Não repetir esse resumo para cada
pequeno ajuste editorial.

Manter o [progresso](../project/progress.md) como retrato atual: uma tabela com o
status de todos os milestones e outra com o checkpoint detalhado, incluindo
milestone atual, estado, resultado relevante, próxima ação, autorização e
pendências. Atualizar as células na etapa documental de encerramento do milestone,
após os commits da implementação; não acrescentar uma
entrada para cada edição nem repetir o escopo de cada milestone.
Remover pendências resolvidas e não repetir escopo ou procedimentos de outros arquivos.

Executar verificações normalmente, mas registrar no progresso apenas resultados que
influenciem a retomada: falhas, limitações, impedimentos ou validações que encerrem
uma etapa funcional. Não listar conferências editoriais rotineiras.

Consultar referências pela tabela do [AGENTS.md](../../AGENTS.md). Se uma referência
necessária estiver ausente, discutir a lacuna antes da ação dependente.

Organizar por assunto, sem arquivos por sessão; criar pastas somente com conteúdo:

- `docs/concepts/`: fundamentos e exemplos de aprendizado.
- `docs/system/`: fonte dos fluxos e contratos específicos da aplicação.
- `docs/adr/`: justificativas das decisões, seguindo as [instruções de ADRs](adrs.md).

Notas podem usar exemplos do projeto, com links para especificações em vez de cópias.
Ao criar conteúdo de uma categoria nova, adicionar referência condicional ao `AGENTS.md`.
Especificar comportamentos antes do código e registrar decisões após discussão.

