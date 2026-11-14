# Instruções para ADRs

Uma ADR (Architecture Decision Record) registra uma decisão arquitetural e seus motivos.

## Quando criar

Registrar escolhas que afetem responsabilidades, dependências, comunicação ou
comportamento estrutural, especialmente com alternativas relevantes ou custo de mudança.
Exemplos: organização do monorepo, compartilhamento de tipos e recuperação após desconexão.

Não criar uma ADR por ferramenta, passo, ajuste visual ou componente rotineiro.
Em caso de dúvida, discutir sua relevância antes de escrever.

## Processo

1. Apresentar contexto, alternativas e consequências; obter concordância antes da implementação.
2. Registrar a decisão na etapa documental após o commit da implementação,
   distinguindo proposta de aprovação e preservando os motivos discutidos antes
   do código. Se a tarefa for exclusivamente documental, seguir seu próprio
   ciclo de revisão e commit, sem exigir implementação.
3. Consultar as ADRs relacionadas antes de alterar a área afetada.

Registros retrospectivos devem ser identificados, sem inventar datas ou justificativas.
Revisões de decisões devem preservar o raciocínio anterior e indicar sua substituição.

## Armazenamento

Usar `docs/adr/`, criado com o primeiro registro. Nomes sequenciais em inglês:
`0001-monorepo-with-bun-workspaces.md`, por exemplo; conteúdo em pt-BR.
Adicionar referência condicional ao `AGENTS.md` quando houver a primeira ADR.

## Formato curto

```markdown
# ADR NNNN — Título

Data: data conhecida, distinguindo registro de decisão quando necessário.
Status: proposta ou aprovada.

## Contexto
Problema e restrições relevantes.

## Alternativas consideradas
Opções efetivamente discutidas.

## Decisão
Escolha e motivo.

## Consequências
Benefícios, custos e limitações.
```
