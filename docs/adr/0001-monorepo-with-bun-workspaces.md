# ADR 0001 — Monorepo com Bun workspaces e inicialização por aplicação

Data do registro: 2026-11-14.
Status: aprovada; registro retrospectivo revisado e aprovado no encerramento do milestone.

## Contexto

O projeto é educacional, local e composto por uma interface React e uma API Bun.
Precisamos compreender cada configuração, revisar mudanças das duas aplicações
no mesmo repositório e coordenar dependências e comandos sem acrescentar uma
camada de ferramentas de monorepo sem necessidade concreta.

Bun e a organização em monorepo já estavam previstos no guia antes da configuração.
Este registro preserva o alinhamento e a implementação realizados no
M2 (Estrutura e ambiente, um passo por vez); não atribui uma data à escolha prévia
nem presume uma avaliação comparativa completa de runtimes e gerenciadores.

## Alternativas consideradas

- Configurar manifests na raiz e nas aplicações, usando Bun workspaces para a
  coordenação e o gerador pertinente para cada aplicação.
- Executar `bun init` também na raiz e na web para criar uma base genérica Bun
  antes da configuração específica do frontend. Essa opção foi discutida e
  descartada: a raiz não é uma aplicação executável e a web já possui um template
  oficial Vite adequado ao ambiente pretendido.

Yarn apareceu como referência da experiência do usuário. Não houve comparação
prática entre gerenciadores. Nx e Turborepo permanecem fora da fundação prevista,
sem alegação de que tenham sido avaliados ou medidos neste milestone.

## Decisão

Manter `apps/web` e `apps/api` como workspaces privados, cada um com seu manifesto,
e um manifesto privado na raiz declarando `apps/*`. Bun administra as dependências
e os scripts do conjunto, com instalação e lockfile coordenados pela raiz.

Criar o manifesto da raiz diretamente, inicializar a API com o template vazio de
`bun init` e a web com o template oficial React + TypeScript do Vite. Inspecionar
os arquivos gerados antes de adaptá-los.

Ferramentas comuns, como Biome, ficam na raiz; dependências específicas são
declaradas na aplicação que as utiliza. Não criar pacote compartilhado de
contratos antes da discussão prevista no M3 (Primeira comunicação tipada).

### Coordenação e comandos adotados

No encerramento do M2 (Estrutura e ambiente, um passo por vez), os scripts da
raiz coordenam desenvolvimento e qualidade:

```json
{
  "scripts": {
    "dev": "bun run --parallel --filter '@agent-review-lab/*' dev",
    "check": "biome check .",
    "check:fix": "biome check --write .",
    "format": "biome format --write ."
  }
}
```

O filtro seleciona os nomes das duas aplicações, sem selecionar o pacote da raiz.
`--parallel` executa seus scripts `dev` simultaneamente, com saídas identificadas.
Cada script mantém o diretório de trabalho da aplicação: a API inicia Bun em
watch e a web inicia Vite. Isso dispensa um coordenador adicional para este caso.

Para gerenciamento de pacotes, usamos comandos nativos do Bun, sem criar scripts
que apenas os repitam:

```sh
# Instala ou sincroniza as dependências do conjunto e o lockfile
bun install

# Exige uma instalação consistente com o lockfile versionado, sem alterá-lo
bun install --frozen-lockfile
```

Centralizar a instalação não impede operar cada aplicação separadamente:

```sh
bun run --filter @agent-review-lab/api dev
bun run --filter @agent-review-lab/web dev
bun run --filter @agent-review-lab/api check
bun run --filter @agent-review-lab/web check
```

Essa combinação preserva um ponto de entrada comum para o desenvolvimento local
e comandos individuais para verificações ou futuras esteiras por aplicação.
Os exemplos registram a configuração adotada; os manifests são a fonte dos scripts
executáveis e o [README](../../README.md) concentra as instruções atuais de uso.

## Consequências

- Mudanças entre web e API podem ser revisadas juntas; cada aplicação mantém
  seus próprios scripts e dependências.
- A instalação central e o lockfile único facilitam reproduzir o conjunto.
  Uma esteira de uma aplicação ainda precisa dos arquivos compartilhados da raiz.
- Compartilhar armazenamento não autoriza importar dependências não declaradas;
  o local físico dos pacotes não substitui o contrato dos manifests.
- Navegador, servidor Vite e API continuam executando separadamente. Gerenciar
  os scripts com Bun não exige executar o CLI do Vite no runtime Bun.
- Há acoplamento operacional ao repositório e ao lockfile compartilhados. Extrair
  uma aplicação exigiria revisar instalação, comandos e ferramentas comuns.
- A escolha pode ser revista se novas necessidades justificarem outro arranjo;
  uma decisão substituta deve preservar este raciocínio e indicar a substituição.

## Confirmação

O Bun reconheceu os dois workspaces. Instalação congelada, comandos individuais,
qualidade, tipos e build passaram também em uma worktree limpa. O script conjunto
iniciou as aplicações e encerrou seus processos com `Ctrl+C`.

Os comandos atuais estão no [README da raiz](../../README.md) e nos READMEs da
[API](../../apps/api/README.md) e da [web](../../apps/web/README.md).

## Evolução no M3 (Primeira comunicação tipada)

A [ADR 0002](0002-trpc-package-and-service-context.md) complementa a organização
com `packages/trpc`, seu build e os serviços fornecidos pela API. O manifesto da
raiz agora também seleciona `packages/*`. Os exemplos anteriores preservam a
configuração aprovada no M2 (Estrutura e ambiente, um passo por vez); os comandos
vigentes continuam no README da raiz.
