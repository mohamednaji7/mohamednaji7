import { describe, it, assert, withSubmit } from "./unit_test.js";
import { sleep } from "./main.js";

await describe("sleep function delays execution", async () => {
  const allowedDescrepancy = 3;
  const runCases = [10, 40, 30];

  const submitCases = runCases.concat([0]);

  let testCases = runCases;
  if (withSubmit) {
    testCases = submitCases;
  }

  for (const test of testCases) {
    await it(`should block execution for at least ${test}ms`, async () => {
      let [start, end] = [0, 0];
      try {
        start = Date.now();
        await sleep(test);
        end = Date.now();
      } catch (e) {
        console.log(e.message);
      }

      assert.greaterThan(
        end - start,
        test - allowedDescrepancy,
        `Expected at least ${test}ms delay, got ${end - start}ms`,
      );
    });
  }

  const numSkipped = submitCases.length - testCases.length;
  if (numSkipped > 0) {
    console.log(`- Skip: ${numSkipped} test case(s) for submit`);
  }
});
