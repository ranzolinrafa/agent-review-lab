import { z } from "zod";
import { publicProcedure, router } from "../../trpc";

export const greetingRouter = router({
  hello: publicProcedure
    .input(
      z.object({
        name: z.string().trim().min(1, "Informe um nome."),
      }),
    )
    .query(({ input }) => ({ message: `Olá, ${input.name}!` })),
});
