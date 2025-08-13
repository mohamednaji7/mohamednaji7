import { describe, it, assert, withSubmit } from "./unit_test.js";
import { getMessageHash } from "./main.js";

await describe("getMessageHash function", async () => {
  const runCases = [
    {
      sender: "Ballan",
      content: "So what are we having for lunch?",
      expected:
        "Sender (Ballan): 47b045048b911386483903fc092fbaf722bbf7489c6ff2238755f1df05fcf0aa",
    },
  ];

  const submitCases = runCases.concat([
    {
      sender: "Boots",
      content: "Baked salmon!!!",
      expected:
        "Sender (Boots): 3b0f0e7e1fc90dd54e79524710b7da1fa45e1a2c74cce72a1a2c24e25b69399f",
    },
  ]);

  let testCases = runCases;
  if (withSubmit) {
    testCases = submitCases;
  }

  for (const { sender, content, expected } of testCases) {
    await it(`get message data (sender: "${sender}", content: "${content}")`, async () => {
      const result = await getMessageHash(sender, content);
      assert.strictEqual(result, expected);
    });
  }
  const numSkipped = submitCases.length - testCases.length;
  if (numSkipped > 0) {
    console.log(`- Skip: ${numSkipped} test case(s) for submit`);
  }
});
