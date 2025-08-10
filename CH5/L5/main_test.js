import { describe, it, assert, withSubmit } from "./unit_test.js";
import { Sender, SMSSender, EmailSender } from "./main.js";

describe("Sender Inheritance", () => {
  const runCases = [
    {
      senderType: "SMS",
      recipient: "555-1234",
      message: "Hello via SMS",
      expectedLog: "Sending SMS to 555-1234: Hello via SMS",
    },
    {
      senderType: "Email",
      recipient: "john@example.com",
      message: "Hello via Email",
      expectedLog: "Sending email to john@example.com: Hello via Email",
    },
  ];

  const submitCases = runCases.concat([
    {
      senderType: "SMS",
      recipient: "555-5678",
      message: "Another SMS message",
      expectedLog: "Sending SMS to 555-5678: Another SMS message",
    },
    {
      senderType: "Email",
      recipient: "jane@example.com",
      message: "An email message for Jane",
      expectedLog:
        "Sending email to jane@example.com: An email message for Jane",
    },
  ]);

  let testCases = runCases;
  if (withSubmit) {
    testCases = submitCases;
  }

  testCases.forEach(({ senderType, recipient, message, expectedLog }, i) => {
    it(`Test ${i}`, () => {
      let sender;
      let loggedMessage = "";

      const originalLog = console.log;
      console.log = (msg) => (loggedMessage = msg);

      if (senderType === "SMS") {
        sender = new SMSSender(recipient);
      } else if (senderType === "Email") {
        sender = new EmailSender(recipient);
      }

      sender.sendMessage(message);

      // Restore console.log after the test
      console.log = originalLog;

      assert.strictEqual(loggedMessage, expectedLog);
    });
  });

  const numSkipped = submitCases.length - testCases.length;
  if (numSkipped > 0) {
    console.log(`- Skip: ${numSkipped} test case(s) for submit`);
  }
});
