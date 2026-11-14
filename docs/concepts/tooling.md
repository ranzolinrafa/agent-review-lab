# Ferramentas de apoio

Papéis revisados no M1 (Visão conceitual do sistema), sem configurações definidas.

## Desenvolvimento

Vite fornece o servidor de desenvolvimento da web e gera seu build. Esse servidor
entrega a interface ao navegador; a API Bun recebe operações e executa o trabalho
do sistema. TypeScript verifica tipos; gerar um build não substitui a checagem
estática. Configuração no M2 (Estrutura e ambiente, um passo por vez).

## Interface

Tailwind CSS oferece classes utilitárias para estilos e layout. Radix Primitives
oferece bases de componentes interativos com comportamentos de acessibilidade,
adotadas quando houver necessidade. A aplicação ainda precisa de composição,
rótulos e validação de acessibilidade adequados.

Componentes visuais genéricos podem ficar em `shared/ui`; componentes específicos
de uma ação ficam próximos da funcionalidade. Estilos e componentes não executam
operações da API. Introdução no M4 (Solicitações e backoffice básico).

## Qualidade e testes

Biome cuidará de formatação e lint, enquanto TypeScript fará a verificação de tipos.
O formatador padroniza a apresentação do código; o linter aponta padrões
problemáticos conforme as regras configuradas e pode oferecer correções.
Essas verificações não comprovam o comportamento das regras da aplicação.

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

Cada aplicação terá configuração própria e comandos conhecidos, coordenados na
raiz pelos workspaces. Padronizar comandos não exige compartilhar executores.
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
