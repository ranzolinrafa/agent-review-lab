# Ferramentas de apoio

Papéis introduzidos no M1 (Visão conceitual do sistema), com configuração
progressiva no M2 (Estrutura e ambiente, um passo por vez).

## Desenvolvimento

Vite fornece o servidor de desenvolvimento da web e gera seu build. Esse servidor
entrega a interface ao navegador; a API Bun recebe operações e executa o trabalho
do sistema. TypeScript verifica tipos; gerar um build não substitui a checagem
estática; o script `build` do template React + TypeScript executa `tsc -b` antes de
`vite build`, combinando as duas verificações no mesmo comando.

O `index.html` é a entrada explícita da web. Ele referencia `main.tsx`, que monta
React e renderiza `App.tsx`. No desenvolvimento, Vite transforma os módulos sob
demanda e os entrega ao navegador, sem exigir `dist` pronto. O build gera os
arquivos de saída, e `preview` os serve para conferência local.

O nome `dev` não determina esse comportamento: ele é um script do manifesto.
No template atual, `dev` chama `vite`. Bun aciona o script respeitando o runtime
indicado pelo executável; foi verificado que Vite roda em Node, enquanto React
roda no navegador. Forçar o runtime Bun para o CLI exigiria uma escolha explícita,
que não foi adotada.

## Interface

Tailwind CSS oferece classes utilitárias para estilos e layout. Radix Primitives
oferece bases de componentes interativos com comportamentos de acessibilidade,
adotadas quando houver necessidade. A aplicação ainda precisa de composição,
rótulos e validação de acessibilidade adequados.

Componentes visuais genéricos podem ficar em `shared/ui`; componentes específicos
de uma ação ficam próximos da funcionalidade. Estilos e componentes não executam
operações da API. Introdução no M4 (Solicitações e backoffice básico).

## Qualidade e testes

Biome cuida de formatação e lint, enquanto TypeScript faz a verificação de tipos.
Oxlint, trazido pelo template do Vite, foi inspecionado e substituído por Biome.
O formatador padroniza a apresentação do código; o linter aponta padrões
problemáticos conforme as regras configuradas e pode oferecer correções.
Essas verificações não comprovam o comportamento das regras da aplicação.

Há uma instalação de Biome na raiz, com versão fixa 2.6.7 e configuração
compartilhada. O arquivo gerado oficialmente foi ajustado para dois espaços e
para abranger JavaScript, TypeScript, JSON e CSS. Regras recomendadas e organização
de imports permanecem habilitadas. A integração com Git respeita o `.gitignore`;
documentação, imagens e saídas geradas não são formatadas por esse escopo.

`check` verifica sem escrever; `check:fix` aplica correções consideradas seguras
pela ferramenta e `format` modifica somente formatação. Correções automáticas
ainda exigem revisão do diff. Os scripts individuais usam a configuração da raiz,
mas limitam a análise ao diretório da aplicação. Uma instalação compartilhada não
obriga executar a verificação no repositório inteiro.

Biome não valida automaticamente a arquitetura FSD. Restrições de imports podem
ajudar a impor fronteiras, mas uma verificação específica de FSD exige regras ou
ferramenta apropriadas. Nenhuma automação arquitetural adicional foi adotada;
as divisões serão revisadas conforme a introdução progressiva de FSD.

Testes observarão comportamento nas camadas adequadas, sem repetir todos os
cenários em todas elas:

- Bun test: regras e operações do backend, executadas no runtime da API.
- Vitest: lógica e execução dos testes de componentes do frontend Vite.
- Testing Library: renderização e interação com componentes pelos elementos do DOM,
  em conjunto com Vitest. O ambiente DOM será definido no passo de configuração.
- Playwright: jornada integrada pelo navegador e API.

Testes unitários isolam uma regra; testes de integração verificam partes
colaborando; testes de componentes observam interações na interface; testes de
ponta a ponta percorrem a jornada pela aplicação. O escopo define o tipo de teste,
não apenas a ferramenta.

Cada aplicação terá configuração de testes apropriada e comandos conhecidos,
coordenados na raiz pelos workspaces. Padronizar comandos não exige compartilhar executores.
Vitest foi escolhido para aproveitar o ambiente Vite; Bun test preserva o runtime
do backend nos testes. Não instalar ferramentas antes dos passos correspondentes.

## Referências

- [Vite](https://vite.dev/guide/)
- [Tailwind CSS](https://tailwindcss.com/docs/styling-with-utility-classes)
- [Radix Primitives](https://www.radix-ui.com/primitives/docs/overview/introduction)
- [Biome](https://biomejs.dev/)
- [Bun test](https://bun.sh/docs/test)
- [Vitest](https://vitest.dev/guide/)
- [Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [Playwright](https://playwright.dev/docs/intro)
- [Scripts em workspaces Bun](https://bun.sh/docs/pm/filter)
