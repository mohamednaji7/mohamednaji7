import { describe, assert, it, withSubmit } from "./unit_test.js";
import { addID } from "./main.js";

describe("addID", () => {
  const runCases = [
    {
      campaignRecord: {
        campaignName: "Welcome",
        senderName: "Elsa",
        messageCount: 100,
      },
      expected: {
        campaignName: "Welcome",
        senderName: "Elsa",
        messageCount: 100,
        id: "Welcome-Elsa",
      },
    },
    {
      campaignRecord: {
        campaignName: "Holiday",
        senderName: "Anna",
        messageCount: 200,
      },
      expected: {
        campaignName: "Holiday",
        senderName: "Anna",
        messageCount: 200,
        id: "Holiday-Anna",
      },
    },
    {
      campaignRecord: {
        campaignName: "Test",
        senderName: "Olaf",
        messageCount: 50,
      },
      expected: {
        campaignName: "Test",
        senderName: "Olaf",
        messageCount: 50,
        id: "Test-Olaf",
      },
    },
  ];

  const submitCases = runCases.concat([
    {
      campaignRecord: {
        campaignName: "2023-Q4",
        senderName: "Sven",
        messageCount: 300,
      },
      expected: {
        campaignName: "2023-Q4",
        senderName: "Sven",
        messageCount: 300,
        id: "2023-Q4-Sven",
      },
    },
    {
      campaignRecord: {
        campaignName: "Spring",
        senderName: "Hans",
        messageCount: 420,
      },
      expected: {
        campaignName: "Spring",
        senderName: "Hans",
        messageCount: 420,
        id: "Spring-Hans",
      },
    },
  ]);

  let testCases = runCases;
  if (withSubmit) {
    testCases = submitCases;
  }

  testCases.forEach(({ campaignRecord, expected }, i) => {
    it(`Test ${i}`, () => {
      const result = addID(campaignRecord);
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
