# Server-Sent Events (SSE)

Fundamentos revisados no M1 (Visão conceitual do sistema).

## Padrão e API do navegador

SSE é um mecanismo padronizado de envio de eventos sobre HTTP, não uma biblioteca.
O navegador abre uma requisição e o servidor mantém a resposta aberta, enviando
eventos textuais no formato `text/event-stream`.

`EventSource` é a API nativa do navegador para consumir esse fluxo:

```ts
const source = new EventSource("/api/events");

source.onmessage = (event) => {
  console.log(event.data);
};

// Ao encerrar o acompanhamento:
source.close();
```

O servidor precisa implementar o envio no formato esperado. Exemplo de mensagem:

```text
data: {"step":"validation","status":"completed"}

```

Uma linha em branco encerra a mensagem. `event.data` contém texto; JSON é uma
escolha da aplicação, que precisará interpretar e validar seu conteúdo.

## Polling, SSE e WebSocket

Polling faz requisições periódicas para consultar o estado. SSE mantém uma resposta
HTTP aberta para receber eventos do servidor. WebSocket usa um protocolo próprio
para trocar mensagens nos dois sentidos pela mesma conexão, com texto ou binário.
Sua API nativa no navegador se chama `WebSocket`.

SSE combina com atualizações de progresso quando os comandos já usam chamadas
HTTP. WebSocket pode ser útil quando ambos os lados enviam mensagens frequentes.
Os dois exigem gerenciamento do ciclo de vida das conexões e recuperação do estado.
Nenhum é universalmente melhor, mais rápido ou mais escalável.

`EventSource` oferece tentativas automáticas de reconexão em certas interrupções.
O formato prevê identificadores de eventos, mas não garante replay: recuperar
mensagens ou reconciliar o estado depende da implementação do servidor e cliente.
A API nativa `WebSocket` não oferece reconexão automática; a aplicação ou biblioteca
precisa coordená-la.

SSE já tinha documento de trabalho do W3C em abril de 2009; o RFC 6455 de WebSocket
foi publicado em dezembro de 2011. São marcos distintos de especificação, não datas
diretamente comparáveis de criação. A escolha no projeto não depende de popularidade.

## Relação com TanStack Query

Receber eventos não atualiza o cache do Query automaticamente. Nosso código pode
invalidar consultas ou atualizar suas entradas a partir dos eventos. A estratégia
exata depende dos contratos, da ordenação e da recuperação definidos pela aplicação.
Ver os [fundamentos de estado de servidor](server-state.md) e o
[fluxo da aplicação](../system/overview.md).

## Referências

- [SSE e EventSource — padrão HTML](https://html.spec.whatwg.org/multipage/server-sent-events.html)
- [API WebSocket](https://websockets.spec.whatwg.org/)
- [Protocolo WebSocket — RFC 6455](https://datatracker.ietf.org/doc/html/rfc6455)
- [Documento de trabalho SSE de 2009](https://www.w3.org/TR/2009/WD-eventsource-20090423/)
