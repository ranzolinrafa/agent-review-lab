# Comunicação e estado de servidor

Fundamentos revisados no M1 (Visão conceitual do sistema). Exemplos ilustrativos;
não representam contratos ou configurações aprovados para implementação.
O fluxo específico da aplicação fica na [visão geral](../system/overview.md).

## TanStack Query e a função de busca

TanStack Query gerencia estado de servidor no frontend: dados obtidos ou alterados
por operações assíncronas cuja fonte está no servidor. Cache é uma de suas
responsabilidades, junto do acompanhamento de carregamento, resultado e erro.

`useQuery` observa uma consulta identificada pela `queryKey`. A `queryFn` é a
função que busca os dados e retorna uma Promise. Essa função pode usar `fetch`
ou um cliente como tRPC; TanStack Query executa a função e acompanha o resultado.

```tsx
const requestsQuery = useQuery({
  queryKey: ["requests"],
  queryFn: () => api.requests.list.query(),
});
```

O exemplo pressupõe um cliente tRPC e um `QueryClientProvider` configurados.
Montar o componente pode disparar uma busca, conforme cache e configuração.

## Cache e atualização

O `QueryClient` administra o cache. Por padrão, os dados ficam na memória
JavaScript do navegador, sem persistência entre recarregamentos da página.
Componentes que observam a mesma chave compartilham a entrada correspondente.

```text
["requests"]           → lista
["requests", "req-1"]  → detalhe de req-1
["requests", "req-2"]  → detalhe de req-2
```

O registro representa uma consulta e pode sobreviver a várias requisições.
Além dos dados, mantém informações de estado e atualização.

- `staleTime`: período em que os dados são considerados atualizados.
- `gcTime`: tempo de retenção de uma consulta sem consumidores antes da remoção.

Dados desatualizados não são automaticamente apagados. Montagem, foco da janela
e reconexão são exemplos de gatilhos que podem levar a uma busca, conforme as
opções. Polling é a configuração de buscas periódicas. Não ocorre continuamente
por padrão, nem equivale a receber eventos enviados pelo servidor.

## tRPC e Zod

RPC significa chamada de procedimento remoto. O cliente tRPC permite chamar
operações da API com tipos de entrada e saída derivados das definições do servidor.
Na comunicação HTTP, o cliente envia a chamada pela rede; a operação executa na API.
Compartilhar tipos não transporta dados nem incorpora a implementação da API no
navegador.

Zod valida valores durante a execução a partir de schemas. Tipos TypeScript
ajudam no desenvolvimento, mas não validam automaticamente os dados recebidos.

```ts
const requestInput = z.object({
  name: z.string(),
  monthlyIncome: z.number(),
  requestedAmount: z.number(),
});

type RequestInput = z.infer<typeof requestInput>;
```

`requestInput.parse(value)` valida o valor ou lança um erro. O schema acima
verifica tipos; restrições adicionais precisam ser descritas. O tRPC permite
associar um schema à entrada para validar antes de executar a operação.

## Query, mutation e estado do trabalho

Uma query consulta dados. Uma mutation representa uma operação que altera dados
no servidor. Após uma mutation, podemos invalidar consultas relacionadas para
sinalizar que precisam de atualização. Consultas ativas correspondentes podem
então buscar novamente. O resultado da mutation não altera automaticamente o
conteúdo de uma lista no cache.

O estado da requisição é independente do estado do trabalho consultado:

```text
Consulta: concluída com sucesso
Dados recebidos: análise em andamento
```

`isPending` indica que a query ainda não tem um resultado de sucesso disponível;
`isFetching` indica busca em andamento, inclusive com dados anteriores no cache.
Estados como análise em andamento ou aguardando revisão humana são dados do
domínio, retornados pela API. Uma resposta pode terminar enquanto o trabalho no
servidor continua.

## Navegação e consultas compartilhadas

TanStack Router associa URLs a páginas e permite extrair parâmetros do caminho.
O identificador extraído da URL pode alimentar a função de busca e a chave de uma
consulta. Router determina a página e os parâmetros; Query acompanha os dados.

Componentes que usam a mesma `queryKey` no mesmo `QueryClient` observam a mesma
entrada do cache. Atualizações dessa entrada são disponibilizadas aos seus
consumidores. Se houver polling, a função de busca será executada periodicamente
e atualizará essa entrada com o resultado recebido.

Uma query pode fornecer dados para habilitar ações, mas comandos que alteram o
servidor continuam sendo mutations separadas. Solicitação, lista de tentativas
e detalhe de tentativa podem ter consultas distintas, conforme a necessidade.

## Referências

- [Query functions](https://tanstack.com/query/latest/docs/framework/react/guides/query-functions)
- [Cache](https://tanstack.com/query/latest/docs/framework/react/guides/caching)
- [Comportamentos e opções de atualização](https://tanstack.com/query/latest/docs/framework/react/guides/important-defaults)
- [Mutations](https://tanstack.com/query/latest/docs/framework/react/guides/mutations)
- [Cliente tRPC](https://trpc.io/docs/client/vanilla)
- [Validação no tRPC](https://trpc.io/docs/server/validators)
- [Fundamentos do Zod](https://zod.dev/basics)
- [Parâmetros no TanStack Router](https://tanstack.com/router/latest/docs/guide/path-params)
