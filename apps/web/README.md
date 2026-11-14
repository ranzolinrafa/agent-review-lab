# Web

Interface React do Agent Review Lab, executada no navegador.

Esta aplicação apresentará solicitações, progresso das análises e revisão humana,
comunicando-se com o servidor de `apps/api` pela rede.

O manifesto identifica esta aplicação como o workspace privado
`@agent-review-lab/web`. Instalação e lockfile são coordenados pela raiz.

## Configuração atual

O template oficial `react-ts`, gerado pelo create-vite 9.3.4, foi integrado ao
workspace no M2 (Estrutura e ambiente, um passo por vez). A instalação resolveu
React e React DOM 19.3.1, Vite 8.3.8 e TypeScript 7.0.2.

A página original do Vite foi mantida por aprovação do usuário: apresenta
`Get started` e um contador interativo. A seção **Consulta à API** acrescenta um
botão que consulta o backend e exibe carregamento, resposta ou erro.

O script `dev` inicia Vite no runtime Node; Bun gerencia os pacotes e aciona os
scripts. React executa no navegador. O ambiente verificado tem Bun 1.4.4 e
Node 24.15.0.

Biome substituiu o Oxlint trazido pelo template. `check` verifica formatação,
lint e organização de imports; `lint` verifica somente lint. Ambos usam a
instalação e configuração da raiz, limitando o alcance à web. Não há `.gitignore`
local: as exclusões de dependências e build ficam na raiz do repositório.

## Executar e verificar

Execute na raiz do repositório:

```sh
bun install --frozen-lockfile
bun run --filter @agent-review-lab/web build
bun run --filter @agent-review-lab/web check
bun run --filter @agent-review-lab/web lint
bun run --filter @agent-review-lab/web dev
```

O build executa `tsc -b` antes de `vite build`, que gera `apps/web/dist`.
Com o último comando ativo, abra `http://127.0.0.1:5173/`. O botão `Count is 0`
deve incrementar ao clicar. A porta é fixa; Vite falha se ela estiver ocupada.
Encerre o servidor com `Ctrl+C`.

Para conferir o build localmente, após gerar `dist`, execute:

```sh
bun run --filter @agent-review-lab/web preview
```

Abra o endereço informado pelo comando. Esse servidor serve o build para
conferência local; `dev` trabalha a partir dos fontes, sem exigir build prévio.

## Consulta à API

Para o fluxo completo, prefira `bun run dev` na raiz: ele inicia web e API.
Clique em **Consultar API** e confira `Hello World!`. O contrato e a reescrita
do caminho pelo proxy estão em
[Desenvolvimento local](../../docs/system/local-development.md).

Para conferir erro e recuperação, encerre o comando conjunto e inicie somente a
web com seu script `dev`. Clique no botão e observe a mensagem de erro. Em outro
terminal, inicie `bun run --filter @agent-review-lab/api dev` e clique novamente:
a resposta deve ser apresentada. Encerre os dois processos com `Ctrl+C` em seus
respectivos terminais.

## Arquivos de entrada

`index.html` referencia `src/main.tsx`, que conecta React ao elemento `root`
e renderiza `App.tsx`. Vite transforma os módulos TSX em JavaScript para o
navegador. A configuração de TypeScript separa a aplicação do navegador das
ferramentas executadas na máquina; consulte os
[fundamentos de TypeScript](../../docs/concepts/typescript.md).
