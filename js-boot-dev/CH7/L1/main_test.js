import { describe, it, assert, withSubmit } from "./unit_test.js";
import { bulkSendCost } from "./main.js";

describe("bulkSend calculates the cost correctly", () => {
  const runCases = [
    { input: 10, expected: 10.45 },
    { input: 20, expected: 21.9 },
    { input: 0, expected: 0.0 },
    { input: 1, expected: 1.0 },
  ];

  const submitCases = runCases.concat([
    { input: 5, expected: 5.1 },
    { input: 30, expected: 34.35 },
  ]);

  let testCases = runCases;
  if (withSubmit) {
    testCases = submitCases;
  }

  testCases.forEach(({ input, expected }) => {
    it(`For input: ${input}`, () => {
      const result = bulkSendCost(input);
      assert.strictEqual(parseFloat(result.toFixed(2)), expected);
    });
  });

  const numSkipped = submitCases.length - testCases.length;
  if (numSkipped > 0) {
    console.log(`- Skip: ${numSkipped} test case(s) for submit`);
  }
});
