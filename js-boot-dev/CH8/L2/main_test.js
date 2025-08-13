import { describe, it, assert, withSubmit } from "./unit_test.js";
import { getMostRecentUser } from "./main.js";

describe("getMostRecentUser returns the most recent user", () => {
  const runCases = [
    { inputArr: ["Frodo", "Gandalf", "Legolas"], expected: "Legolas" },
    { inputArr: ["DoomGuy", "MasterChief", "Geralt"], expected: "Geralt" },
    { inputArr: ["DoomGuy", "MasterChief", undefined], expected: undefined },
    { inputArr: ["Sephiroth"], expected: "Sephiroth" },
  ];

  const submitCases = runCases.concat([{ inputArr: [], expected: null }]);

  let testCases = runCases;
  if (withSubmit) {
    testCases = submitCases;
  }

  testCases.forEach(({ inputArr, expected }) => {
    it(`should return ${expected} for ${JSON.stringify(inputArr)}`, () => {
      const result = getMostRecentUser(inputArr);
      assert.strictEqual(result, expected);
    });
  });

  const numSkipped = submitCases.length - testCases.length;
  if (numSkipped > 0) {
    console.log(`- Skip: ${numSkipped} test case(s) for submit`);
  }
});
