import { initTRPC } from "@trpc/server";
import { z } from "zod";

type ValidationIssue = {
  path: (string | number)[];
  code: string;
  message: string;
};

const t = initTRPC.create({
  errorFormatter({ shape, error }) {
    const validationIssues: ValidationIssue[] | null =
      error.code === "BAD_REQUEST" && error.cause instanceof z.ZodError
        ? error.cause.issues.map((issue) => ({
            path: issue.path.map((segment) =>
              typeof segment === "number" ? segment : String(segment),
            ),
            code: issue.code,
            message: issue.message,
          }))
        : null;

    return {
      code: shape.code,
      message:
        error.code === "INTERNAL_SERVER_ERROR"
          ? "Ocorreu um erro no servidor. Tente novamente."
          : validationIssues
            ? "Verifique os dados informados."
            : shape.message,
      data: {
        code: shape.data.code,
        httpStatus: shape.data.httpStatus,
        path: shape.data.path,
        validationIssues,
      },
    };
  },
});

export const router = t.router;
export const publicProcedure = t.procedure;
