import { describe, it, assert, withSubmit } from "./unit_test.js";
import { fixUserMap } from "./main.js";

describe("fixUserMap restores order to the user map for Textio", () => {
  const runCases = [
    {
      input: new Map([
        [
          { fname: "Eren", lname: "Yeager", tags: ["Survey Corps"] },
          { fname: "Eren", lname: "Yeager", tags: ["Survey Corps"] },
        ],
      ]),
      expected: new Map([
        [
          "Eren Yeager",
          { fname: "Eren", lname: "Yeager", tags: ["Survey Corps"] },
        ],
      ]),
    },
    {
      input: new Map(),
      expected: new Map(),
    },
  ];

  const submitCases = runCases.concat([
    {
      input: new Map([
        [
          { fname: "Mikasa", lname: "Ackerman" },
          { fname: "Mikasa", lname: "Ackerman", tags: ["Titan Slayer"] },
        ],
        [
          { fname: "Mikasa", lname: "Ackerman" },
          { fname: "Mikasa", lname: "Ackerman", tags: ["Scout Regiment"] },
        ],
      ]),
      expected: new Map([
        [
          "Mikasa Ackerman",
          { fname: "Mikasa", lname: "Ackerman", tags: ["Scout Regiment"] },
        ],
      ]),
    },
  ]);

  let testCases = runCases;
  if (withSubmit) {
    testCases = submitCases;
  }

  testCases.forEach(({ input, expected }) => {
    it(`should restore a sane user map for input: ${JSON.stringify([...input.entries()])}`, () => {
      const result = fixUserMap(input);
      assert.deepEqual([...result.entries()], [...expected.entries()]);
    });
  });

  const numSkipped = submitCases.length - testCases.length;
  if (numSkipped > 0) {
    console.log(`- Skip: ${numSkipped} test case(s) for submit`);
  }
});
