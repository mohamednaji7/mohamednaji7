import { describe, it, assert, withSubmit } from "./unit_test.js";
import { getCleanRank } from "./main.js";

describe("getCleanRank returns the correct rank", () => {
  const runCases = [
    {
      input: ["avril", "lavigne", "has", "best", "dang", "tour"],
      expected: "dirty",
    },
    { input: ["what", "a", "bad", "film"], expected: "clean" },
    { input: ["oh", "my", "heck", "I", "hated", "it"], expected: "dirty" },
    { input: ["ripoff"], expected: "clean" },
    { input: ["That", "was", "a", "pleasure"], expected: "clean" },
  ];

  const submitCases = runCases.concat([
    {
      input: [
        "shoot!",
        "I",
        "cant",
        "say",
        "I",
        "liked",
        "the",
        "dang",
        "thing",
      ],
      expected: "dirty",
    },
    { input: ["shoot", "dang", "heck"], expected: "filthy" },
  ]);

  let testCases = runCases;
  if (withSubmit) {
    testCases = submitCases;
  }

  testCases.forEach(({ input, expected }) => {
    it(`should return ${expected} for: ${JSON.stringify(input)}`, () => {
      const result = getCleanRank(input);
      assert.strictEqual(result, expected);
    });
  });

  const numSkipped = submitCases.length - testCases.length;
  if (numSkipped > 0) {
    console.log(`- Skip: ${numSkipped} test case(s) for submit`);
  }
});
