import { describe, it, assert, withSubmit } from "./unit_test.js";
import { getProviderCount } from "./main.js";

describe("getProviderCount", () => {
  const runCases = [
    {
      provider: "Verizon",
      counts: { Verizon: 5, "AT&T": 3, "T-Mobile": 10 },
      expected: 5,
    },
    {
      provider: "AT&T",
      counts: { Verizon: 5, "AT&T": 3, "T-Mobile": 10 },
      expected: 3,
    },
    {
      provider: "Sprint",
      counts: { Verizon: 5, "AT&T": 3, "T-Mobile": 10 },
      expected: 0,
    },
  ];

  const submitCases = runCases.concat([
    {
      provider: "T-Mobile",
      counts: { Verizon: 5, "AT&T": 3, "T-Mobile": 10 },
      expected: 10,
    },
    {
      provider: "Google Fi",
      counts: { Verizon: 5, "AT&T": 3, "T-Mobile": 10 },
      expected: 0,
    },
  ]);

  let testCases = runCases;
  if (withSubmit) {
    testCases = submitCases;
  }

  testCases.forEach(({ provider, counts, expected }) => {
    it(`provider = "${provider}"`, () => {
      const result = getProviderCount(provider, counts);
      assert.strictEqual(result, expected);
    });
  });

  const numSkipped = submitCases.length - testCases.length;
  if (numSkipped > 0) {
    console.log(`- Skip: ${numSkipped} test case(s) for submit`);
  }
});
