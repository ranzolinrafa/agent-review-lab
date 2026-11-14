# Monorepo e Feature-Sliced Design

Fundamentos revisados no M1 (Visão conceitual do sistema). As divisões internas
abaixo são exemplos para aprendizado, não uma estrutura aprovada para criação.

## Monorepo

Monorepo reúne projetos no mesmo repositório. Facilita revisar mudanças que
envolvem frontend, backend e documentação. Não une os processos em execução:
navegador e servidor continuam separados e se comunicam pela rede.

No projeto, `apps/web` conterá o frontend React, `apps/api` o servidor Bun, e `docs`
a documentação. Cada aplicação terá manifesto, dependências e comandos próprios;
Bun workspaces ajudará a administrá-las a partir da raiz. A configuração será
estudada no M2 (Estrutura e ambiente, um passo por vez).

## Manifests e instalação com Bun workspaces

O `package.json` da raiz declara `workspaces: ["apps/*"]`. Cada diretório
selecionado que contém um manifesto com nome identifica um projeto do conjunto.
Cada aplicação declara suas próprias dependências e scripts quando introduzidos;
a raiz pode declarar ferramentas comuns e comandos de coordenação.

`private: true` impede publicar o pacote no registro, sem controlar a visibilidade
do repositório Git. `packageManager: "bun@1.4.4"` registra a ferramenta esperada;
esse campo não instala o executável. O prefixo `@agent-review-lab/` agrupa os nomes
dos pacotes locais, sem exigir cadastro de organização no npm.

`bun install` na raiz resolve o conjunto e produz o `bun.lock` compartilhado.
O manifesto declara as dependências desejadas; o lockfile registra suas resoluções.
`bun install --frozen-lockfile` exige que a instalação respeite o lockfile existente,
sem atualizá-lo. Ambos os arquivos são versionados; `node_modules` é gerado e fica
fora do Git.

No checkpoint inicial do M2 (Estrutura e ambiente, um passo por vez), os manifests
ainda não declaram dependências externas. `bun pm ls` identifica os workspaces
locais registrados no lockfile; essa listagem não prova que já existam pacotes
externos ou links físicos para cada aplicação. A organização da instalação e o
cache serão inspecionados quando houver dependências instaladas.

Referência: [Workspaces do Bun](https://bun.com/docs/pm/workspaces).

## Layers, slices e segments

FSD é uma metodologia de organização do frontend por responsabilidades e assuntos
do produto, com regras de dependência. Ajuda a manter código relacionado próximo,
em vez de distribuir toda funcionalidade entre pastas globais de componentes,
hooks e serviços.

- Layer: responsabilidade ampla, como páginas ou funcionalidades.
- Slice: assunto dentro da camada, como criação de solicitação ou revisão.
- Segment: finalidade técnica, como interface, comunicação ou estado.

```text
features/                  ← layer
  review-analysis/         ← slice
    ui/                    ← segment
    api/                   ← segment
    model/                 ← segment
```

As camadas têm estes papéis:

- `app`: entrada, providers, roteamento e configurações globais.
- `pages`: composição das páginas completas.
- `widgets`: blocos maiores de interface com responsabilidade própria.
- `features`: ações do usuário que entregam valor ao produto.
- `entities`: assuntos do domínio, como solicitação e tentativa.
- `shared`: recursos genéricos, como cliente HTTP, botões e formatação monetária.

```text
app → pages → widgets → features → entities → shared
```

Módulos podem importar camadas inferiores sem passar por todas as intermediárias.
Slices de uma mesma camada não devem importar diretamente umas às outras.
`app` e `shared` são exceções à divisão em slices: contêm segmentos diretamente.

## Exemplo mais preenchido

```text
apps/web/src/
  app/
    providers/query-provider.tsx
    routes/router.tsx
    styles/globals.css
  pages/
    request-list/
      ui/request-list-page.tsx
    request-detail/
      ui/request-detail-page.tsx
      model/use-selected-attempt.ts
  widgets/
    requests-table/
      ui/requests-table.tsx
      ui/requests-table-row.tsx
    analysis-progress/
      ui/analysis-progress.tsx
      ui/step-timeline.tsx
      model/build-timeline-items.ts
  features/
    create-request/
      ui/create-request-form.tsx
      api/use-create-request.ts
      model/request-form-schema.ts
    start-analysis/
      ui/start-analysis-button.tsx
      api/use-start-analysis.ts
    review-analysis/
      ui/review-analysis-form.tsx
      api/use-review-analysis.ts
      model/review-form-schema.ts
  entities/
    credit-request/
      api/request-queries.ts
      ui/request-summary.tsx
      lib/format-request-label.ts
    analysis-attempt/
      api/attempt-queries.ts
      api/subscribe-to-attempt.ts
      ui/attempt-status.tsx
      ui/recommendation-summary.tsx
      model/attempt-status-labels.ts
  shared/
    api/trpc.ts
    ui/button.tsx
    ui/input.tsx
    lib/format-currency.ts
    config/environment.ts
```

`ui` reúne apresentação; `model`, estado, schemas e lógica do frontend; `api`,
integração com o servidor; `lib`, auxiliares; `config`, configurações. Não é preciso
criar todos os segmentos em cada slice. Uma divisão pequena pode começar na página
e ser extraída quando houver motivo. Nomes, caminhos e localização exata dos hooks
serão discutidos na implementação.

## O segmento api não é o servidor

`shared/api/trpc.ts` configura o cliente comum. O segmento `api` de uma entidade
pode definir consultas, e o de uma feature pode conter mutations. Tudo isso é
código frontend que chama o servidor.

```ts
// Exemplo: entities/credit-request/api/request-queries.ts
export function requestDetailOptions(requestId: string) {
  return queryOptions({
    queryKey: ["requests", requestId],
    queryFn: () => api.requests.getById.query({ id: requestId }),
  });
}
```

Um componente pode chamar `useQuery(requestDetailOptions(requestId))`, reutilizando
chave e função de busca. O exemplo pressupõe cliente e imports configurados.

Executor, regras da análise e memória do servidor ficam em `apps/api`. Lógica de
apresentação no frontend não executa a análise. Schemas de formulário podem validar
campos no navegador, mas não substituem a validação na API. Eventual compartilhamento
de schemas será avaliado posteriormente.

## Adoção no projeto

Usaremos FSD adaptado e progressivo, justificando divisões conforme surgirem
necessidades no M4 (Solicitações e backoffice básico). Não criar esta árvore
antecipadamente nem confundir organização de arquivos com transporte de dados.

Referência: [Visão geral oficial do FSD](https://feature-sliced.design/docs/get-started/overview).
