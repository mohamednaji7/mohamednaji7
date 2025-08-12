import { describe, it, assert, withSubmit } from "./unit_test.js";
import { systemNotification } from "./main.js";

describe("Prototypal Inheritance with System Notification and Broadcast", () => {
  const runCases = [
    {
      method: "notify",
      recipient: "john@example.com",
      message: "Scheduled maintenance at midnight.",
      expectedLog:
        "Notification for john@example.com: Scheduled maintenance at midnight.",
    },
    {
      method: "broadcast",
      message: "System update available tonight.",
      expectedLog: "Broadcast to all users: System update available tonight.",
    },
  ];

  const submitCases = runCases.concat([
    {
      method: "notify",
      recipient: "admin@textio.com",
      message: "Critical update deployment.",
      expectedLog:
        "Notification for admin@textio.com: Critical update deployment.",
    },
    {
      method: "broadcast",
      message: "The system will be offline for maintenance.",
      expectedLog:
        "Broadcast to all users: The system will be offline for maintenance.",
    },
  ]);

  let testCases = runCases;
  if (withSubmit) {
    testCases = submitCases;
  }

  testCases.forEach(({ method, recipient, message, expectedLog }, i) => {
    it(`Test ${i}`, () => {
      let result;
      if (method === "notify") {
        result = systemNotification.notify(recipient, message);
      } else if (method === "broadcast") {
        result = systemNotification.broadcast(message);
      }
      assert.strictEqual(result, expectedLog);
    });
  });

  const numSkipped = submitCases.length - testCases.length;
  if (numSkipped > 0) {
    console.log(`- Skip: ${numSkipped} test case(s) for submit`);
  }
});
