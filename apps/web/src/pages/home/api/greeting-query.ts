import { queryOptions } from "@tanstack/react-query";
import { api } from "../../../shared/api/trpc";

export function greetingQueryOptions(name: string | null) {
  return queryOptions({
    queryKey: ["greeting", name],
    queryFn: () => api.greeting.hello.query({ name: name ?? "" }),
    enabled: name !== null,
    staleTime: 30_000,
    retry: false,
  });
}
