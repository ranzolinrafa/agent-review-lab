import { describe, expect, mock, test } from "bun:test";
import { appRouter } from "../src/index.js";
import type { GreetingInput } from "../src/schemas/index.js";

describe("greeting procedure", () => {
  test("delegates validated input to the supplied service", async () => {
    const hello = mock(async ({ name }: GreetingInput) => ({
      message: `Service received ${name}`,
    }));
    const caller = appRouter.createCaller({ greeting: { hello } });

    expect(await caller.greeting.hello({ name: "  Rafael  " })).toEqual({
      message: "Service received Rafael",
    });
    expect(hello).toHaveBeenCalledTimes(1);
    expect(hello).toHaveBeenCalledWith({ name: "Rafael" });
  });

  test("rejects invalid input before calling the service", async () => {
    const hello = mock(async () => ({ message: "Should not be called" }));
    const caller = appRouter.createCaller({ greeting: { hello } });

    await expect(caller.greeting.hello({ name: "   " })).rejects.toMatchObject({
      code: "BAD_REQUEST",
    });
    expect(hello).not.toHaveBeenCalled();
  });
});
