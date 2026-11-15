import { greetingInputSchema } from "../schemas/greeting.js";
import { publicProcedure, router } from "../trpc.js";

export const greetingRouter = router({
  hello: publicProcedure
    .input(greetingInputSchema)
    .query(({ ctx, input }) => ctx.greeting.hello(input)),
});
