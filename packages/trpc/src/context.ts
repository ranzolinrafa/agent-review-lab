import type { GreetingInput, GreetingOutput } from "./schemas/greeting.js";

export type GreetingService = {
  hello(input: GreetingInput): Promise<GreetingOutput>;
};

export type Context = {
  greeting: GreetingService;
};
