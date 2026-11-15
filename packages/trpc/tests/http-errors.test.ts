import { describe, expect, test } from "bun:test";
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { z } from "zod";
import type { Context } from "../src/context.js";
import { greetingRouter } from "../src/routers/greeting.js";
import { publicProcedure, router } from "../src/trpc.js";

const testRouter = router({
  greeting: greetingRouter,
  nestedInput: publicProcedure
    .input(
      z.object({
        applicants: z.array(
          z.object({
            monthlyIncome: z.number().positive("A renda deve ser positiva."),
            requestedAmount: z
              .number()
              .positive("O valor solicitado deve ser positivo."),
          }),
        ),
      }),
    )
    .query(() => ({ accepted: true })),
  fail: publicProcedure.query(() => {
    throw new Error("Unexpected failure with private implementation details");
  }),
});

function requestProcedure(path: string, input?: unknown) {
  const url = new URL(`http://localhost/trpc/${path}`);

  if (input !== undefined) {
    url.searchParams.set("input", JSON.stringify(input));
  }

  return fetchRequestHandler({
    endpoint: "/trpc",
    req: new Request(url.toString()),
    router: testRouter,
    createContext: (): Context => ({
      greeting: {
        hello: async ({ name }) => ({ message: `Olá, ${name}!` }),
      },
    }),
  });
}

describe("HTTP error responses", () => {
  test.each([
    { name: "   ", code: "too_small", message: "Informe um nome." },
    { name: 123, code: "invalid_type", message: "O nome deve ser um texto." },
  ])(
    "returns validation issues for name=$name",
    async ({ name, code, message }) => {
      const response = await requestProcedure("greeting.hello", { name });
      const body = await response.json();

      expect(response.status).toBe(400);
      expect(body).toEqual({
        error: {
          code: expect.any(Number),
          message: "Verifique os dados informados.",
          data: {
            code: "BAD_REQUEST",
            httpStatus: 400,
            path: "greeting.hello",
            validationIssues: [{ path: ["name"], code, message }],
          },
        },
      });
    },
  );

  test("preserves an issue concerning the entire input", async () => {
    const response = await requestProcedure("greeting.hello", null);
    const body = await response.json();

    expect(response.status).toBe(400);
    expect(body).toMatchObject({
      error: {
        data: {
          code: "BAD_REQUEST",
          validationIssues: [
            { path: [], code: "invalid_type", message: expect.any(String) },
          ],
        },
      },
    });
  });

  test("preserves multiple issues and complete paths including array positions", async () => {
    const response = await requestProcedure("nestedInput", {
      applicants: [
        { monthlyIncome: -1, requestedAmount: 0 },
        { monthlyIncome: 0, requestedAmount: 100 },
      ],
    });
    const body = await response.json();

    expect(response.status).toBe(400);
    expect(body).toMatchObject({
      error: {
        data: {
          code: "BAD_REQUEST",
          validationIssues: [
            {
              path: ["applicants", 0, "monthlyIncome"],
              code: "too_small",
              message: "A renda deve ser positiva.",
            },
            {
              path: ["applicants", 0, "requestedAmount"],
              code: "too_small",
              message: "O valor solicitado deve ser positivo.",
            },
            {
              path: ["applicants", 1, "monthlyIncome"],
              code: "too_small",
              message: "A renda deve ser positiva.",
            },
          ],
        },
      },
    });
  });

  test("returns a generic internal error without implementation details", async () => {
    const response = await requestProcedure("fail");
    const body = await response.json();

    expect(response.status).toBe(500);
    expect(body).toEqual({
      error: {
        code: expect.any(Number),
        message: "Ocorreu um erro no servidor. Tente novamente.",
        data: {
          code: "INTERNAL_SERVER_ERROR",
          httpStatus: 500,
          path: "fail",
          validationIssues: null,
        },
      },
    });
  });

  test("preserves other error codes without classifying them as validation", async () => {
    const response = await requestProcedure("missing");
    const body = await response.json();

    expect(response.status).toBe(404);
    expect(body).toMatchObject({
      error: {
        data: { code: "NOT_FOUND", validationIssues: null },
      },
    });
  });
});
