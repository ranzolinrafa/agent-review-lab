# Metodologia de desenvolvimento guiado

## Ciclo de cada passo

1. **Problema:** explicar a necessidade concreta no projeto.
2. **Fundamentos:** ensinar conceitos e funcionamento da tecnologia.
3. **Conexões:** usar exemplos, diagramas simples e comparações com Express quando úteis.
4. **Proposta:** delimitar a alteração e justificar dependências e configurações.
5. **Concordância:** aguardar o usuário sinalizar compreensão e concordância.
6. **Implementação:** executar somente o passo combinado.
7. **Validação e revisão:** observar o resultado e explicar o que foi verificado.

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

Antes de implementar uma mudança relevante, obter concordância e atualizar o plano
ou os critérios de aceite afetados. Antes de concluir o passo, conferir se o
comportamento entregue corresponde à documentação e atualizar as referências
afetadas. Documentação pertinente atualizada faz parte da conclusão do passo.

Manter uma fonte por informação, conforme a organização dos documentos. Revisar
notas conceituais se algum exemplo deixar de ser válido. Git preserva versões;
ADRs explicam decisões relevantes. Não criar histórico paralelo de cada alteração
nem manter pendências já resolvidas no progresso.

## Testes

- Definir cenários e critérios de aceite antes de escolher a camada do teste.
- Fazer recap de testes unitários, integração e ponta a ponta antes de aplicá-los.
- TDD seletivo em regras e transições: teste falhando, implementação e refatoração.
- Bun test em backend/regras; Testing Library em componentes; Playwright em fluxos
  integrados, conforme introduzidos.
- Entregar código e testes no mesmo passo de comportamento; discutir a ordem em
  componentes e integração conforme o aprendizado.
- Não criar testes artificiais para configuração ou métricas, nem repetir todos
  os cenários em todas as camadas.

## Git

Usar Conventional Commits em inglês. Ao identificar um bom ponto de commit,
explicar o conteúdo e sugerir mensagem; aguardar aprovação após revisão do passo.
Inicialização de Git, commit, repositório remoto e push são ações separadas.

## Retomada

Manter a tabela de [progresso](../project/progress.md) como retrato atual: milestone,
estado, resultado relevante, próxima ação, autorização e pendências. Atualizar as
células quando o estado mudar; não acrescentar uma entrada para cada edição.
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

