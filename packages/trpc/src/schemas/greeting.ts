import { z } from "zod";

export const greetingInputSchema = z.object({
  name: z
    .string({ error: "O nome deve ser um texto." })
    .trim()
    .min(1, "Informe um nome."),
});

export type GreetingInput = z.infer<typeof greetingInputSchema>;

export type GreetingOutput = {
  message: string;
};
