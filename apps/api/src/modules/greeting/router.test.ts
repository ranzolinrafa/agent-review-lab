import { describe, expect, test } from "bun:test";
import { greetingRouter } from "./router";

const caller = greetingRouter.createCaller({});

describe("greeting", () => {
  test("returns a greeting using the trimmed name", async () => {
    expect(await caller.hello({ name: "  Rafael  " })).toEqual({
      message: "Olá, Rafael!",
    });
  });

  test("rejects a name containing only spaces", async () => {
    await expect(caller.hello({ name: "   " })).rejects.toMatchObject({
      code: "BAD_REQUEST",
    });
  });
});
