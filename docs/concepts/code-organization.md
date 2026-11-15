# Monorepo e Feature-Sliced Design

Fundamentos introduzidos no M1 (Visão conceitual do sistema) e aplicados
progressivamente no M3 (Primeira comunicação tipada). A árvore mais preenchida
abaixo continua ilustrativa; não é uma lista de pastas a criar.

## Monorepo

Monorepo reúne projetos no mesmo repositório. Facilita revisar mudanças que
envolvem frontend, backend e documentação. Não une os processos em execução:
navegador e servidor continuam separados e se comunicam pela rede.

No projeto, `apps/web` contém o frontend React, `apps/api` o servidor Bun,
`packages/trpc` a biblioteca de comunicação e `docs` a documentação. Cada
workspace tem manifesto, dependências e comandos próprios;
Bun workspaces administra o conjunto a partir da raiz. A organização foi
configurada no M2 (Estrutura e ambiente, um passo por vez), com justificativas na
[ADR 0001](../adr/0001-monorepo-with-bun-workspaces.md). A fronteira do pacote
está na [ADR 0002](../adr/0002-trpc-package-and-service-context.md), e a escolha de
rotas por arquivos, na [ADR 0003](../adr/0003-file-based-routing.md).

## Manifests e instalação com Bun workspaces

O `package.json` da raiz declara `workspaces: ["apps/*", "packages/*"]`. Cada diretório
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

`bun pm ls` identifica os workspaces registrados no lockfile; `bun pm ls --all`
também permite examinar as dependências transitivas. A listagem não substitui a
inspeção dos arquivos e links físicos.

Na instalação atual, os pacotes externos ficam em `node_modules/.bun`, com links
para as dependências das aplicações em seus diretórios `node_modules`. Esse é o
armazenamento da instalação no repositório, distinto do cache global em
`~/.bun/install/cache`, cujo caminho pode ser consultado com `bun pm cache`.
O cache reaproveita downloads entre instalações e repositórios; não substitui os
manifests nem o lockfile.

Novos workspaces com `configVersion: 1` usam por padrão a estratégia isolada do
Bun. Pacotes com resoluções compatíveis podem compartilhar armazenamento, enquanto
versões ou conjuntos de peers distintos podem coexistir. A estratégia hoisted
organiza dependências de forma mais plana na raiz. A disposição física deve ser
inspecionada, sem presumir que todo pacote encontrado pertença a toda aplicação.

Bun é o gerenciador de pacotes; o registro npm é a fonte padrão dos downloads,
sem exigir executar o gerenciador npm. Bun também aceita registros privados,
dependências locais e Git. Cada aplicação deve declarar o que usa mesmo que a
mesma dependência já esteja instalada para outra.

Uma `devDependency` declara uma ferramenta necessária ao desenvolvimento do
projeto. Uma `peerDependency` expressa uma expectativa de compatibilidade com o
ambiente que utiliza o pacote, comum em bibliotecas. O template do Bun declara
TypeScript como peer; na API, ele foi classificado como ferramenta de
desenvolvimento da aplicação. A categoria da declaração não determina sozinha
a localização física dos arquivos instalados.

Referências: [Workspaces](https://bun.com/docs/pm/workspaces),
[instalações isoladas](https://bun.com/docs/pm/isolated-installs) e
[cache global](https://bun.com/docs/pm/global-cache).

## Pacote compilado e fronteira de tipos

Um pacote pode disponibilizar JavaScript e declarações TypeScript por entradas
públicas no campo `exports` do manifesto. Um consumidor importa pelo nome do
pacote, sem conhecer sua organização interna. `workspace:*` declara uma
dependência de um workspace local; não elimina a necessidade de preparar seus
artefatos quando a entrada aponta para `dist`.

`import type` desaparece do JavaScript, mas o compilador ainda precisa resolver o
tipo. Apontar para fontes permite que ele siga os arquivos internos do produtor;
apontar para declarações `.d.ts` estabelece uma fronteira de compilação. Isso não
elimina a dependência do contrato nem a necessidade de verificar compatibilidade.

O build pertence ao pacote e escreve em seu próprio `dist`. No projeto, ele gera
JavaScript e declarações; o desenvolvimento conjunto prepara a primeira saída e
mantém o compilador em watch. Comandos atuais ficam no [README](../../README.md).

Schemas são valores executáveis. Uma entrada específica para schemas permite
importá-los no navegador sem importar o router do servidor. Exportar um tipo
não substitui disponibilizar o JavaScript de um schema usado em runtime.

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
As camadas são irmãs em `src`: `app` representa composição e inicialização, não
um diretório que contém todas as outras camadas. Arquivos de rota em `app` podem
conhecer os nomes das páginas e conectá-las às URLs, delegando sua apresentação
a `pages`.

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
de schemas de solicitações será avaliado ao definir seus contratos.

## Adoção no projeto

O M3 (Primeira comunicação tipada) introduziu `app`, `pages` e `shared`. A
configuração de rotas conecta as páginas por suas APIs públicas; páginas irmãs
não importam implementações umas das outras. O M4 (Solicitações e backoffice
básico) continuará a adoção conforme surgirem assuntos de produto. Não criar
a árvore ilustrativa antecipadamente nem confundir pastas com transporte de dados.

Referência: [Visão geral oficial do FSD](https://feature-sliced.design/docs/get-started/overview).
