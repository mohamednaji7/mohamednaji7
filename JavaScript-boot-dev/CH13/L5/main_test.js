import { describe, it, assert, withSubmit } from "./unit_test.js";
import { processAnalytics } from "./main.js";

await describe("processAnalytics function concats data", async () => {
  const runCases = [
    {
      data: "Excuse me can I talk to you for a minute",
      expected:
        "Analyzing... - Processing: Excuse me can I talk to you for a minute - Finished!",
    },
    {
      data: "I just wanted to let you know",
      expected:
        "Analyzing... - Processing: I just wanted to let you know - Finished!",
    },
  ];
  const submitCases = runCases.concat([
    {
      data: "The back of your head is ridiculous!",
      expected:
        "Analyzing... - Processing: The back of your head is ridiculous! - Finished!",
    },
  ]);

  let testCases = runCases;
  if (withSubmit) {
    testCases = submitCases;
  }

  for (const { data, expected } of testCases) {
    await it(`analysis of data should match expected`, async () => {
      let result = await processAnalytics(data);
      assert.strictEqual(
        result,
        expected,
        `Expected:\n    "${expected}"\n  Actual:\n    "${result}"`,
      );
    });
  }

  const numSkipped = submitCases.length - testCases.length;
  if (numSkipped > 0) {
    console.log(`- Skip: ${numSkipped} test case(s) for submit`);
  }
});
