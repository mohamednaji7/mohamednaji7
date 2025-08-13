import { describe, it, assert, withSubmit } from "./unit_test.js";
import { createUserMap } from "./main.js";

describe("createUserMap sets a sane user map", () => {
  const runCases = [
    {
      input: [
        { fname: "Clark", lname: "Kent", promotions: ["promo1", "promo2"] },
      ],
      expected: new Map([
        [
          "Clark Kent",
          { fname: "Clark", lname: "Kent", promotions: ["promo1", "promo2"] },
        ],
      ]),
    },
    {
      input: [],
      expected: new Map(),
    },
  ];

  const submitCases = runCases.concat([
    {
      input: [
        { fname: "Peter", lname: "Parker", promotions: ["promoA"] },
        { fname: "Peter", lname: "Parker", promotions: ["promoB"] },
      ],
      expected: new Map([
        [
          "Peter Parker",
          { fname: "Peter", lname: "Parker", promotions: ["promoB"] },
        ],
      ]),
    },
  ]);

  let testCases = runCases;
  if (withSubmit) {
    testCases = submitCases;
  }

  testCases.forEach(({ input, expected }) => {
    it(`should return a correct user map for input: ${JSON.stringify(input)}`, () => {
      const result = createUserMap(input);
      assert.deepEqual(
        Array.from(result.entries()),
        Array.from(expected.entries()),
      );
    });
  });

  const numSkipped = submitCases.length - testCases.length;
  if (numSkipped > 0) {
    console.log(`- Skip: ${numSkipped} test case(s) for submit`);
  }
});
