# ADR 0002 — Pacote tRPC e serviços fornecidos pelo contexto

Data do registro: 2026-11-15.
Status: aprovada para uso atual; reavaliação pendente a pedido do usuário.

## Contexto

No M3 (Primeira comunicação tipada), a web começou importando `AppRouter`
diretamente do fonte de `apps/api`. O import de tipo não levava a implementação ao
JavaScript do navegador, mas fazia seu compilador analisar arquivos internos da
API. O uso temporário de um global do Bun na saudação evidenciou essa dependência.

Precisamos de uma entrada pública, com fronteira de compilação e possibilidade de
distribuição a consumidores externos, preservando a inferência do tRPC. Regras de
negócio e implementação dos serviços devem permanecer na aplicação API.

## Alternativas consideradas

- Manter o import relativo ou expor o fonte da API por um export público:
  simplifica o acesso, mas mantém a dependência de compilação dos fontes.
- Criar um pacote de distribuição gerado a partir da aplicação API: a proposta
  de geração cruzada foi descartada pela divisão de responsabilidades e pela
  coordenação adicional que introduzia.
- Extrair a definição das operações para um pacote com fonte e build próprios,
  recebendo os serviços da API por interfaces explícitas no contexto: escolhida.

## Decisão

Manter routers, schemas públicos, formato de erros e interfaces do contexto em
`packages/trpc`. Seu build gera JavaScript e declarações no próprio `dist`.
`apps/api` importa o router em runtime e fornece implementações compatíveis com
o contexto; `apps/web` importa somente os tipos públicos das declarações.

O pacote não importa `apps/api`. Suas interfaces descrevem os métodos necessários
às procedures, sem depender dos tipos inferidos de serviços concretos da aplicação.
O contexto por requisição pode reutilizar referências de serviços já criados.

Disponibilizar schemas pela entrada separada `@agent-review-lab/trpc/schemas`,
para uso executável sem importar o router. O pacote permanece privado. O consumo
fora do monorepo foi validado por empacotamento local, sem publicação em registro.

## Consequências

- A web depende do contrato público, mas não dos fontes internos da API.
- Routers funcionam como adaptadores de entrada; a API conserva serviços,
  futuras regras, repositórios e execução.
- É necessário compilar o pacote antes dos consumidores e regenerá-lo após
  mudanças. A raiz coordena o primeiro build e o watch durante desenvolvimento.
- Consumidores externos precisam de versões compatíveis do contrato e do tRPC;
  distribuir tipos não atualiza servidores ou aplicações automaticamente.
- As interfaces do contexto acrescentam uma fronteira que precisa continuar
  pequena e justificada pelos casos de uso, sem antecipar abstrações de crédito.

## Reavaliação

O usuário solicitou revisar esta decisão futuramente, sem data definida. A decisão
permanece vigente até novo alinhamento. Na revisão, percorrer uma chamada real e
avaliar se pacote, geração de tipos e interfaces do contexto trazem benefícios
proporcionais ao custo de coordenação, especialmente ao introduzir módulos de
negócio mais complexos ou um consumidor externo real.

O [funcionamento atual](../system/overview.md#demonstração-implementada-no-m3)
descreve o percurso implementado; os [conceitos de comunicação](../concepts/server-state.md)
explicam contexto, validação e estado de servidor.

## Referências

- [Contexto no tRPC](https://trpc.io/docs/server/context).
- [Pacote API do Create T3 Turbo](https://github.com/t3-oss/create-t3-turbo/blob/main/packages/api/package.json).
- [Declarações no próprio pacote](https://github.com/t3-oss/create-t3-turbo/blob/main/tooling/typescript/compiled-package.json).
