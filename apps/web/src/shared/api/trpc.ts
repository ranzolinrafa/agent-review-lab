import { createTRPCClient, httpLink, TRPCClientError } from "@trpc/client";
import type { AppRouter } from "../../../../api/src/router";

export const api = createTRPCClient<AppRouter>({
  links: [httpLink({ url: "/api/trpc" })],
});

export function isApiClientError(
  error: unknown,
): error is TRPCClientError<AppRouter> {
  return error instanceof TRPCClientError;
}
