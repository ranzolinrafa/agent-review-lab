import { createRootRoute, Link, Outlet } from "@tanstack/react-router";

export const Route = createRootRoute({
  component: Outlet,
  notFoundComponent: () => (
    <main className="not-found">
      <h1>Página não encontrada</h1>
      <Link to="/">Voltar para a home</Link>
    </main>
  ),
});
