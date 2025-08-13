import { describe, it, assert, withSubmit } from "./unit_test.js";
import { deduplicateEmails } from "./main.js";

describe("deduplicateEmails dedupes emails", () => {
  const runCases = [
    {
      input: [
        "wayne.lagner@dev.boot",
        "heckmann@what.de",
        "heckmann@what.de",
        "a.liar@pants.fire",
      ],
      expected: [
        "wayne.lagner@dev.boot",
        "heckmann@what.de",
        "a.liar@pants.fire",
      ],
    },
  ];

  const submitCases = runCases.concat([{ input: [], expected: [] }]);

  let testCases = runCases;
  if (withSubmit) {
    testCases = submitCases;
  }

  testCases.forEach(({ input, expected }) => {
    it(`should return ${JSON.stringify(expected)} for input: ${JSON.stringify(input)}`, () => {
      const result = deduplicateEmails(input);
      assert.deepEqual(result, expected);
    });
  });

  const numSkipped = submitCases.length - testCases.length;
  if (numSkipped > 0) {
    console.log(`- Skip: ${numSkipped} test case(s) for submit`);
  }
});
