import { describe, it, assert, withSubmit } from "./unit_test.js";
import { updateMessageStatus } from "./main.js";

await describe("updateMessageStatus function (Textio theme)", async () => {
  const runCases = [
    {
      messageId: "M123",
      currentStatus: "Sending",
      isDelivered: true,
      expected: "Textio Message M123 has been delivered successfully.",
    },
    {
      messageId: "M456",
      currentStatus: "Sending",
      isDelivered: false,
      expectedError:
        "Textio Message M456 is still sending and cannot be marked as delivered.",
    },
    {
      messageId: "M789",
      currentStatus: "Queued",
      isDelivered: false,
      expected: "Textio Message M789 status updated to Queued.",
    },
  ];

  const submitCases = runCases.concat([
    {
      messageId: "M101",
      currentStatus: "Sending",
      isDelivered: true,
      expected: "Textio Message M101 has been delivered successfully.",
    },
  ]);

  let testCases = runCases;
  if (withSubmit) {
    testCases = submitCases;
  }

  for (const {
    messageId,
    currentStatus,
    isDelivered,
    expected,
    expectedError,
  } of testCases) {
    await it(`update status for message ${messageId} (status: "${currentStatus}", isDelivered: ${isDelivered})`, async () => {
      try {
        const result = await updateMessageStatus(
          messageId,
          currentStatus,
          isDelivered,
        );
        assert.strictEqual(result, expected);
      } catch (err) {
        assert.strictEqual(err, expectedError);
      }
    });
  }
  const numSkipped = submitCases.length - testCases.length;
  if (numSkipped > 0) {
    console.log(`- Skip: ${numSkipped} test case(s) for submit`);
  }
});
