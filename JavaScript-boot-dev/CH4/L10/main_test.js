import { describe, it, assert, withSubmit } from "./unit_test.js";
import { campaign } from "./main.js";

describe("sendMessage", () => {
  const runCases = [
    {
      initialSentMessages: 30,
      expected: 31,
    },
    {
      initialSentMessages: 50,
      expected: 51,
    },
    {
      initialSentMessages: 0,
      expected: 1,
    },
  ];

  const submitCases = runCases.concat([
    {
      initialSentMessages: 99,
      expected: 100,
    },
  ]);

  let testCases = runCases;
  if (withSubmit) {
    testCases = submitCases;
  }

  testCases.forEach(({ initialSentMessages, expected }) => {
    it(`sentMessages = ${initialSentMessages}`, () => {
      campaign.sentMessages = initialSentMessages;
      campaign.sendMessage();
      assert.strictEqual(campaign.sentMessages, expected);
    });
  });

  const numSkipped = submitCases.length - testCases.length;
  if (numSkipped > 0) {
    console.log(`- Skip: ${numSkipped} test case(s) for submit`);
  }
});
