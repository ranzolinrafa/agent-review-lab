import { createTRPCClient, httpLink } from "@trpc/client";
import type { AppRouter } from "../../../../api/src/router";

export const api = createTRPCClient<AppRouter>({
  links: [httpLink({ url: "/api/trpc" })],
});
