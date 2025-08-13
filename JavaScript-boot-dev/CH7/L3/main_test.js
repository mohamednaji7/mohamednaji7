import { describe, it, assert, withSubmit } from "./unit_test.js";
import { printPrimes } from "./main.js";

describe("getPrimes returns the correct message count", () => {
  const testCases = [
    { input: 10, expected: `2
3
5
7
` },
    { input: 20, expected: `2
3
5
7
11
13
17
19
` },
    { input: 30, expected: `2
3
5
7
11
13
17
19
23
29
` },
  ];
  const submitCases = [];


  testCases.forEach(({ input, expected }) => {
    it(`For max: ${input}`, () => {
      const result = printPrimes(input);
      assert.strictEqual(result, expected);
    });
  });

  const numSkipped = submitCases.length - testCases.length;
  if (numSkipped > 0) {
    console.log(`- Skip: ${numSkipped} test case(s) for submit`);
  }
});
