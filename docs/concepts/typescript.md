# TypeScript: execução e verificação

Fundamentos estudados no M2 (Estrutura e ambiente, um passo por vez).

## Executar não equivale a verificar

Bun transforma TypeScript e executa o código. Anotações não validam valores em
runtime nem convertem dados. Por padrão, executar um arquivo não exige que a
verificação estática passe.

```ts
const message: string = 42;
console.log(message);
```

Na demonstração temporária, executar esse código imprimiu `42`; verificar seus
tipos reportou `TS2322`. O exemplo não permanece no código da aplicação.

O script `typecheck` da API usa `bun check`, que lê `tsconfig.json`, reporta erros
e não executa o programa. No Bun 1.4.4, o verificador integrado tem comportamento
compatível com TypeScript 7, independentemente da versão instalada do pacote
`typescript`. O editor usa seu próprio serviço TypeScript; a versão instalada no
projeto pode ser selecionada no editor para manter a análise alinhada.

Também podemos executar `tsc --noEmit` para verificar com o compilador instalado,
sem gerar JavaScript. Ambas as verificações foram conferidas na API.

## Configuração da API

`@types/bun` descreve as APIs do runtime para a análise estática; não instala o
executável Bun. Ele e TypeScript são ferramentas de desenvolvimento da API,
declaradas em `devDependencies`. Versões explícitas no manifesto e a resolução
registrada no lockfile tornam as atualizações deliberadas. Após mudar declarações,
`bun install` sincroniza o lockfile; `--frozen-lockfile` exige que ele já esteja
consistente, sem atualizá-lo.

As opções de ambiente e módulos foram mantidas para corresponder ao runtime Bun:

- `lib: ["ESNext"]` e `target: "ESNext"`: declarações modernas de JavaScript e alvo
  da linguagem. A configuração não adiciona recursos ao runtime.
- `types: ["bun"]`: declarações do ambiente, incluindo o global `Bun`.
- `module: "Preserve"`: preserva a forma dos módulos.
- `moduleDetection: "force"`: trata arquivos como módulos, evitando globais
  acidentais entre arquivos sem imports ou exports.
- `allowImportingTsExtensions`: permite imports com extensão `.ts`.
- `verbatimModuleSyntax`: distingue imports de tipos dos imports de valores;
  tipos devem ser importados com `import type` quando necessário.
- `noEmit`: deixa a produção do código executável a cargo do Bun, sem saída do
  compilador neste fluxo.

O modo de resolução `bundler` não significa que a API ganhou um bundler. Ele
define regras de localização dos módulos e é inferido com nossa configuração
na versão instalada do TypeScript. Por isso não foi declarado explicitamente.

## Rigor e valores padrão

`strict` reúne verificações rigorosas e permanece explícito como intenção do
projeto, embora já seja padrão no TypeScript 7.0.2. Os padrões devem ser conferidos
na versão usada, sem presumir comportamento de versões anteriores.

`noUncheckedIndexedAccess` considera que um acesso por índice pode retornar
`undefined`; `noFallthroughCasesInSwitch` detecta passagem acidental entre casos;
`noImplicitOverride` exige explicitar sobrescritas de métodos. Essas verificações
adicionais foram preservadas. `skipLibCheck` evita verificar internamente arquivos
de declaração, reduzindo custo, mas podendo ocultar problemas nessas declarações.

JSX não é necessário nesta API. `allowJs` foi omitido, aproveitando seu padrão
desabilitado nesta configuração, assim como outras opções do template que apenas
repetiam padrões. Repetir um padrão pode ser útil quando comunica uma política
importante; não é obrigatório declarar todas as opções.

`include` seleciona arquivos TypeScript da aplicação; `exclude` filtra
`node_modules` e `dist` dessa seleção inicial. Isso não constitui uma barreira de
imports: arquivos importados podem integrar a análise mesmo fora dessa seleção.

## Configurações da web

O template oficial do Vite separa os ambientes em três arquivos:

- `tsconfig.json`: coordena as referências aos dois projetos abaixo.
- `tsconfig.app.json`: abrange `src`, com declarações de DOM, tipos do cliente Vite
  e configuração JSX para React, correspondendo ao código do navegador.
- `tsconfig.node.json`: abrange `vite.config.ts`, com tipos de Node e resolução
  de módulos apropriada às ferramentas executadas na máquina.

O script `build` executa `tsc -b`, que segue essas referências e verifica os
projetos antes de Vite gerar os arquivos de saída. Os arquivos de informação
incremental do compilador ficam em `node_modules/.tmp`, fora do versionamento.
O TypeScript 7 habilita `strict` por padrão, mesmo quando o template não o declara.
Não compartilhar automaticamente o tsconfig da API: navegador e runtime do
servidor disponibilizam APIs diferentes.

## Referências

- [TypeScript com Bun](https://bun.com/docs/runtime/typescript).
- [Verificação integrada do Bun](https://bun.com/docs/runtime/check).
- [Referência de opções do TypeScript](https://www.typescriptlang.org/tsconfig/).

Os comandos atuais ficam no [README da API](../../apps/api/README.md).
