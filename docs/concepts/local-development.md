# HTTP, origens e desenvolvimento local

Fundamentos estudados no M2 (Estrutura e ambiente, um passo por vez).
Os endereços e o contrato do projeto estão em
[Desenvolvimento local](../system/local-development.md).

## Requisição e resposta

O cliente envia uma requisição com método, endereço, cabeçalhos e, quando
necessário, corpo. O servidor escolhe um handler e devolve status, cabeçalhos e
corpo. `GET` consulta um recurso; uma rota associa caminho e método a um
comportamento. `200` indica sucesso e `404`, recurso não encontrado.

Em Express, usamos um handler que chama `res.send`. Com `Bun.serve`, o handler
retorna um objeto `Response`. Iniciar o servidor mantém o processo aguardando
requisições, diferentemente de imprimir uma mensagem no terminal e encerrar.

`curl -i` mostra cabeçalhos e corpo, permitindo conferir o contrato sem a interface.
Tipos estáticos não substituem essa observação do comportamento HTTP.

## Porta e origem

A porta identifica onde um processo recebe conexões. Uma origem combina
protocolo, host e porta; serviços em portas diferentes têm origens diferentes,
mesmo na mesma máquina. `localhost` e `127.0.0.1` também são hosts distintos para
essa comparação. Estar no mesmo monorepo não altera essas regras.

O navegador aplica políticas de acesso entre origens, incluindo CORS. Um proxy
local permite que ele chame o servidor da própria página, que encaminha a
requisição ao backend. Esse encaminhamento ocorre no servidor, não dentro do
bundle React, e não transforma frontend e backend em um processo único.

## Scripts e processos

`dev`, `start`, `check` e `build` são nomes definidos nos manifests. O conteúdo do
script determina o que executam; o nome sozinho não exige build ou servidor.
Um script pode acionar outra ferramenta, cujo runtime também precisa estar
disponível. Bun gerenciar dependências não significa que todo executável usará
seu runtime.

`--filter` seleciona workspaces por nome ou padrão. O script roda no diretório
do pacote selecionado; `.` passa a significar aquele diretório. Isso permite
comandos individuais na mesma instalação, inclusive em esteiras que preservem
os arquivos compartilhados do monorepo. `--parallel` coordena scripts simultâneos,
sem instalar um executor adicional.

`--watch` do Bun reinicia o processo após mudanças. `--hot` recarrega código sem o
mesmo reinício e pode preservar estado global; escolhemos watch para manter o
ciclo de desenvolvimento explícito. Essa escolha não altera o HMR do Vite no
navegador.

## Referências

- [Servidor HTTP do Bun](https://bun.com/docs/runtime/http/server).
- [Watch do Bun](https://bun.com/docs/runtime/watch-mode).
- [Filtros e scripts paralelos](https://bun.com/docs/pm/filter).
- [Proxy do Vite](https://vite.dev/config/server-options#server-proxy).
