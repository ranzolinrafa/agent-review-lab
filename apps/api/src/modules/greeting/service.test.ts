import { describe, expect, test } from "bun:test";
import { greetingService } from "./service";

describe("greeting", () => {
  test("returns a greeting for the supplied name", async () => {
    expect(await greetingService.hello({ name: "Rafael" })).toEqual({
      message: "Olá, Rafael!",
    });
  });
});
