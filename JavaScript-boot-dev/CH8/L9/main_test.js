import { describe, it, assert, withSubmit } from "./unit_test.js";
import { getPrimaryAndBackupMessages } from "./main.js";

describe("getPrimaryAndBackupMessages returns primary and backup messages correctly", () => {
  const runCases = [
    {
      messages: [
        "Welcome to Textio!",
        "Your order has shipped",
        "Reminder: Payment due soon",
      ],
      expected: {
        primary: "Welcome to Textio!",
        backups: ["Your order has shipped", "Reminder: Payment due soon"],
      },
    },
    {
      messages: ["First Message"],
      expected: { primary: "First Message", backups: [] },
    },
    {
      messages: [],
      expected: { primary: undefined, backups: [] },
    },
  ];

  const submitCases = runCases.concat([
    {
      messages: ["Alert", "Update", "Follow up", "Confirmation"],
      expected: {
        primary: "Alert",
        backups: ["Update", "Follow up", "Confirmation"],
      },
    },
  ]);

  let testCases = runCases;
  if (withSubmit) {
    testCases = submitCases;
  }

  testCases.forEach(({ messages, expected }, i) => {
    it(`Test #${i}`, () => {
      const result = getPrimaryAndBackupMessages(messages);
      assert.deepEqual(result, expected);
    });
  });

  const numSkipped = submitCases.length - testCases.length;
  if (numSkipped > 0) {
    console.log(`- Skip: ${numSkipped} test case(s) for submit`);
  }
});
