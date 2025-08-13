import { describe, it, assert, withSubmit } from "./unit_test.js";
import { campaign } from "./main.js";

describe("getRemainingMessages", () => {
  const runCases = [
    {
      maxMessages: 100,
      sentMessages: 30,
      expected: 70,
    },
    {
      maxMessages: 200,
      sentMessages: 150,
      expected: 50,
    },
    {
      maxMessages: 50,
      sentMessages: 50,
      expected: 0,
    },
  ];

  const submitCases = runCases.concat([
    {
      maxMessages: 420,
      sentMessages: 69,
      expected: 351,
    },
    {
      maxMessages: 1000,
      sentMessages: 800,
      expected: 200,
    },
  ]);

  let testCases = runCases;
  if (withSubmit) {
    testCases = submitCases;
  }

  testCases.forEach(({ maxMessages, sentMessages, expected }) => {
    it(`maxMessages = ${maxMessages}, sentMessages = ${sentMessages}`, () => {
      campaign.maxMessages = maxMessages;
      campaign.sentMessages = sentMessages;

      const result = campaign.getRemainingMessages();
      assert.strictEqual(result, expected);
    });
  });

  const numSkipped = submitCases.length - testCases.length;
  if (numSkipped > 0) {
    console.log(`- Skip: ${numSkipped} test case(s) for submit`);
  }
});
