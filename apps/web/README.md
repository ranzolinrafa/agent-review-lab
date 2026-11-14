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
`Get started` e um contador interativo. Ainda não consulta a API.

O script `dev` inicia Vite no runtime Node; Bun gerencia os pacotes e aciona os
scripts. React executa no navegador. O ambiente verificado tem Bun 1.4.4 e
Node 24.15.0.

O template atual usa Oxlint no script `lint`. Essa configuração original será
substituída por Biome no passo correspondente. Não há `.gitignore` local: as
exclusões de dependências e build ficam na raiz do repositório.

## Executar e verificar

Execute na raiz do repositório:

```sh
bun install --frozen-lockfile
bun run --filter @agent-review-lab/web build
bun run --filter @agent-review-lab/web lint
bun run --filter @agent-review-lab/web dev
```

O build executa `tsc -b` antes de `vite build`, que gera `apps/web/dist`.
Com o último comando ativo, abra o endereço indicado pelo Vite, normalmente
`http://localhost:5173/`. O botão `Count is 0` deve incrementar ao clicar.
Encerre o servidor com `Ctrl+C`.

Para conferir o build localmente, após gerar `dist`, execute:

```sh
bun run --filter @agent-review-lab/web preview
```

Abra o endereço informado pelo comando. Esse servidor serve o build para
conferência local; `dev` trabalha a partir dos fontes, sem exigir build prévio.

## Arquivos de entrada

`index.html` referencia `src/main.tsx`, que conecta React ao elemento `root`
e renderiza `App.tsx`. Vite transforma os módulos TSX em JavaScript para o
navegador. A configuração de TypeScript separa a aplicação do navegador das
ferramentas executadas na máquina; consulte os
[fundamentos de TypeScript](../../docs/concepts/typescript.md).
