import type { GreetingService } from "@agent-review-lab/trpc";

export const greetingService: GreetingService = {
  async hello({ name }) {
    await new Promise<void>((resolve) => setTimeout(resolve, 2_000));
    return { message: `Olá, ${name}!` };
  },
};
