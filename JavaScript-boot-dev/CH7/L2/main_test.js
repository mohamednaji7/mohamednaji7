import { describe, it, assert, withSubmit } from "./unit_test.js";
import { maxMessagesWithinBudget } from "./main.js";

describe("maxMessagesWithinBudget returns the correct message count", () => {
  const runCases = [
    { input: 5.0, expected: 4 },
    { input: 10.0, expected: 9 },
    { input: 0.99, expected: 0 },
    { input: 1.0, expected: 1 },
  ];

  const submitCases = runCases.concat([
    { input: 3.03, expected: 3 },
    { input: 15.0, expected: 14 },
  ]);

  let testCases = runCases;
  if (withSubmit) {
    testCases = submitCases;
  }

  testCases.forEach(({ input, expected }) => {
    it(`For budget: ${input}`, () => {
      const result = maxMessagesWithinBudget(input);
      assert.strictEqual(result, expected);
    });
  });

  const numSkipped = submitCases.length - testCases.length;
  if (numSkipped > 0) {
    console.log(`- Skip: ${numSkipped} test case(s) for submit`);
  }
});
