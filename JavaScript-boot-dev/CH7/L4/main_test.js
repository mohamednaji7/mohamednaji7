import { describe, it, assert, withSubmit } from "./unit_test.js";
import { getMaxMessagesToSend } from "./main.js";

describe("getMaxMessagesToSend gets the correct max message", () => {
  const runCases = [
    { costMultiplier: 1.1, maxCostInPennies: 5, expected: 4 },
    { costMultiplier: 1.3, maxCostInPennies: 10, expected: 5 },
  ];

  const submitCases = runCases.concat([
    { costMultiplier: 1.35, maxCostInPennies: 25, expected: 7 },
  ]);

  let testCases = runCases;
  if (withSubmit) {
    testCases = submitCases;
  }

  testCases.forEach(({ costMultiplier, maxCostInPennies, expected }) => {
    it(`should return ${expected} for costMultiplier: ${costMultiplier}, maxCostInPennies: ${maxCostInPennies}`, () => {
      const result = getMaxMessagesToSend(costMultiplier, maxCostInPennies);
      assert.strictEqual(result, expected);
    });
  });

  const numSkipped = submitCases.length - testCases.length;
  if (numSkipped > 0) {
    console.log(`- Skip: ${numSkipped} test case(s) for submit`);
  }
});
