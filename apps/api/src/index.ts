import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { appRouter } from "./router";

const server = Bun.serve({
  hostname: "127.0.0.1",
  port: 3000,
  routes: {
    "/": {
      GET: () => new Response("Hello World!"),
    },
  },
  fetch(request) {
    const { pathname } = new URL(request.url);

    if (pathname === "/trpc" || pathname.startsWith("/trpc/")) {
      return fetchRequestHandler({
        endpoint: "/trpc",
        req: request,
        router: appRouter,
        createContext: () => ({}),
      });
    }

    return new Response("Not Found", { status: 404 });
  },
});

console.log(`API running at ${server.url}`);
