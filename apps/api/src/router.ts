import { greetingRouter } from "./modules/greeting/router";
import { router } from "./trpc";

export const appRouter = router({
  greeting: greetingRouter,
});

export type AppRouter = typeof appRouter;
