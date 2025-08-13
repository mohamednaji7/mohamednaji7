import { describe, it, assert, withSubmit } from "./unit_test.js";
import { uploadNewMessages } from "./main.js";

describe("uploadNewMessages returns the old messages with the new messages", () => {
  const runCases = [
    {
      oldMessages: ["Inconceivable!"],
      newMessages: [
        "You keep using that word. I do not think it means what you think it means.",
      ],
      expected: [
        "Inconceivable!",
        "You keep using that word. I do not think it means what you think it means.",
      ],
    },
    {
      oldMessages: [],
      newMessages: ["Kaladin once soared with winds of change."],
      expected: ["Kaladin once soared with winds of change."],
    },
  ];

  const submitCases = runCases.concat([
    {
      oldMessages: ["Winter is coming"],
      newMessages: [],
      expected: ["Winter is coming"],
    },
    {
      oldMessages: [],
      newMessages: [],
      expected: [],
    },
  ]);

  let testCases = runCases;
  if (withSubmit) {
    testCases = submitCases;
  }

  testCases.forEach(({ oldMessages, newMessages, expected }) => {
    it(`joins old: ${JSON.stringify(oldMessages)} and new: ${JSON.stringify(newMessages)}`, () => {
      const result = uploadNewMessages(oldMessages, newMessages);
      assert.deepEqual(result, expected);
    });
  });

  const numSkipped = submitCases.length - testCases.length;
  if (numSkipped > 0) {
    console.log(`- Skip: ${numSkipped} test case(s) for submit`);
  }
});
