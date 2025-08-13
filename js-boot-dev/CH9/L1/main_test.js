import { describe, it, assert, withSubmit } from "./unit_test.js";
import { createError } from "./main.js";

describe("createError returns a standardized", () => {
  const runCases = [
    {
      input: "Connection to Textio lost",
      expected: new Error("Error: Connection to Textio lost"),
    },
  ];

  const submitCases = runCases.concat([
    {
      input: "Error: Invalid Textio token",
      expected: new Error("Error: Error: Invalid Textio token"),
    },
    {
      input: "TODO: write this",
      expected: new Error("Error: TODO: write this"),
    },
  ]);

  let testCases = runCases;
  if (withSubmit) {
    testCases = submitCases;
  }

  testCases.forEach(({ input, expected }) => {
    it(`creates a new Error object with 'Error: ' in front of ${input}`, () => {
      const result = createError(input);
      assert.strictEqual(typeof result, typeof expected);
      assert.strictEqual(result.message, expected.message);
    });
  });

  const numSkipped = submitCases.length - testCases.length;
  if (numSkipped > 0) {
    console.log(`- Skip: ${numSkipped} test case(s) for submit`);
  }
});
