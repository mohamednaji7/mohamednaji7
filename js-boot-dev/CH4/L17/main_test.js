import { describe, it, assert, withSubmit } from "./unit_test.js";
import { calculateCampaignMetrics } from "./main.js";

describe("calculateCampaignMetrics", () => {
  const runCases = [
    {
      sent: 1000,
      opened: 800,
      clicked: 200,
      expected: {
        openRate: 0.8,
        clickRate: 0.2,
        conversionRate: 0.25,
      },
    },
    {
      sent: 500,
      opened: 400,
      clicked: 100,
      expected: {
        openRate: 0.8,
        clickRate: 0.2,
        conversionRate: 0.25,
      },
    },
  ];

  const submitCases = runCases.concat([
    {
      sent: 2000,
      opened: 1500,
      clicked: 500,
      expected: {
        openRate: 0.75,
        clickRate: 0.25,
        conversionRate: 0.3333333333333333,
      },
    },
  ]);

  let testCases = runCases;
  if (withSubmit) {
    testCases = submitCases;
  }

  testCases.forEach(({ sent, opened, clicked, expected }, i) => {
    it(`Test ${i}`, () => {
      const result = calculateCampaignMetrics(sent, opened, clicked);
      for (const prop of Object.keys(expected)) {
        assert.strictEqual(
          result[prop],
          expected[prop],
          `expected property "${prop}" to be: ${expected[prop]}, got: ${result[prop]}`,
        );
      }
    });
  });

  const numSkipped = submitCases.length - testCases.length;
  if (numSkipped > 0) {
    console.log(`- Skip: ${numSkipped} test case(s) for submit`);
  }
});
