import { describe, it, assert, withSubmit } from "./unit_test.js";
import { getCleanMessages } from "./main.js";

describe("getCleanMessages filters out messages containing the bad word, considering case insensitivity", () => {
  const runCases = [
    {
      inputMessages: [
        "I am a man of constant sorrow",
        "I've seen trouble all my days",
        "Parched and dusty",
        "nuthin' a hot bath won't cure",
      ],
      badWord: "trouble",
      expected: [
        "I am a man of constant sorrow",
        "Parched and dusty",
        "nuthin' a hot bath won't cure",
      ],
    },
    {
      inputMessages: [
        "Damn, we're in a tight spot!",
        "Well, ain't this place a geographical oddity.",
        "Two weeks from everywhere!",
      ],
      badWord: "damn",
      expected: [
        "Well, ain't this place a geographical oddity.",
        "Two weeks from everywhere!",
      ],
    },
  ];

  const submitCases = runCases.concat([
    {
      inputMessages: [
        "Them sirens did this to Pete. They loved him up and turned him into a horny toad.",
        "Pete's a Toad.",
        "Do not seek the treasure!",
      ],
      badWord: "toAd",
      expected: ["Do not seek the treasure!"],
    },
    {
      inputMessages: [
        "We thought you was a toad!",
        "Well, ain't you just my cross to bear?",
        "Come on in boys, the water is fine.",
      ],
      badWord: "ToAD",
      expected: [
        "Well, ain't you just my cross to bear?",
        "Come on in boys, the water is fine.",
      ],
    },
    {
      inputMessages: [],
      badWord: "any",
      expected: [],
    },
  ]);

  let testCases = runCases;
  if (withSubmit) {
    testCases = submitCases;
  }

  testCases.forEach(({ inputMessages, badWord, expected }, index) => {
    it(`Test #${index}: Filtering word '${badWord}' from input messages`, () => {
      const result = getCleanMessages(inputMessages, badWord);
      assert.deepEqual(result, expected);
    });
  });

  const numSkipped = submitCases.length - testCases.length;
  if (numSkipped > 0) {
    console.log(`- Skip: ${numSkipped} test case(s) for submit`);
  }
});
