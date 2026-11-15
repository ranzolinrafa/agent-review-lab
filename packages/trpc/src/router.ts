import { greetingRouter } from "./routers/greeting.js";
import { router } from "./trpc.js";

export const appRouter = router({
  greeting: greetingRouter,
});

export type AppRouter = typeof appRouter;
