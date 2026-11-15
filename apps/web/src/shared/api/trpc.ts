import type { AppRouter } from "@agent-review-lab/trpc";
import { createTRPCClient, httpLink, TRPCClientError } from "@trpc/client";

export const api = createTRPCClient<AppRouter>({
  links: [httpLink({ url: "/api/trpc" })],
});

export function isApiClientError(
  error: unknown,
): error is TRPCClientError<AppRouter> {
  return error instanceof TRPCClientError;
}
