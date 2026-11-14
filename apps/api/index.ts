const server = Bun.serve({
  hostname: "127.0.0.1",
  port: 3000,
  routes: {
    "/": {
      GET: () => new Response("Hello World!"),
    },
  },
  fetch() {
    return new Response("Not Found", { status: 404 });
  },
});

console.log(`API running at ${server.url}`);
