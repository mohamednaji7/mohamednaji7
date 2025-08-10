import { describe, it, assert, withSubmit } from "./unit_test.js";
import { SMSSender, EmailSender } from "./main.js";

describe("Sender with super", () => {
  const runCases = [
    {
      senderType: "SMS",
      recipient: "555-1234",
      message: "Hello via SMS",
      expected: "To: 555-1234, Message: Hello via SMS [SMS]",
    },
    {
      senderType: "Email",
      recipient: "john@example.com",
      message: "Hello via Email",
      expected: "To: john@example.com, Message: Hello via Email [Email]",
    },
  ];

  const submitCases = runCases.concat([
    {
      senderType: "SMS",
      recipient: "555-5678",
      message: "Another SMS message",
      expected: "To: 555-5678, Message: Another SMS message [SMS]",
    },
    {
      senderType: "Email",
      recipient: "jane@example.com",
      message: "An email message for Jane",
      expected:
        "To: jane@example.com, Message: An email message for Jane [Email]",
    },
  ]);

  let testCases = runCases;
  if (withSubmit) {
    testCases = submitCases;
  }

  testCases.forEach(({ senderType, recipient, message, expected }, i) => {
    it(`Test ${i}`, () => {
      let sender;
      if (senderType === "SMS") {
        sender = new SMSSender(recipient);
      } else if (senderType === "Email") {
        sender = new EmailSender(recipient);
      }

      const result = sender.formatMessage(message);
      assert.strictEqual(result, expected);
    });
  });

  const numSkipped = submitCases.length - testCases.length;
  if (numSkipped > 0) {
    console.log(`- Skip: ${numSkipped} test case(s) for submit`);
  }
});
