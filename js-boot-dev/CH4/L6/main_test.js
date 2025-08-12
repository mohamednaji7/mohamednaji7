import { describe, it, assert, withSubmit } from "./unit_test.js";
import { getRegion } from "./main.js";

describe("getRegion", () => {
  const runCases = [
    {
      campaign: {
        name: "Welcome Campaign",
        messageCount: 100,
        creator: {
          firstName: "Tim",
          lastName: "Murphy",
          createdAt: "2023-10-01T09:00:00+00:00",
        },
        location: {
          region: "North America",
        },
      },
      expected: "North America",
    },
    {
      campaign: {
        name: "Winter Promo",
        messageCount: 200,
        creator: {
          firstName: "Ray",
          lastName: "Arnold",
          createdAt: "2023-11-15T10:30:00+00:00",
        },
      },
      expected: undefined,
    },
    {
      campaign: {
        name: "Fall Campaign",
        messageCount: 50,
        creator: {
          firstName: "John",
          lastName: "Hammond",
          createdAt: "2023-09-20T08:15:00+00:00",
        },
        location: {
          region: "Asia",
        },
      },
      expected: "Asia",
    },
  ];

  const submitCases = runCases.concat([
    {
      campaign: {
        name: "Security Campaign",
        messageCount: 20,
        creator: {
          firstName: "Ellie",
          lastName: "Satler",
          createdAt: "2023-11-15T10:30:00+00:00",
        },
      },
      expected: undefined,
    },
    {
      campaign: {
        name: "New Year Campaign",
        messageCount: 0,
        creator: {
          firstName: "Lex",
          lastName: "Murphy",
          createdAt: "2023-09-20T08:15:00+00:00",
        },
        location: {
          region: "Europe",
        },
      },
      expected: "Europe",
    },
  ]);

  let testCases = runCases;
  if (withSubmit) {
    testCases = submitCases;
  }

  testCases.forEach(({ campaign, expected }) => {
    it(`campaign "${campaign.name}"`, () => {
      const result = getRegion(campaign);
      assert.strictEqual(result, expected);
    });
  });

  const numSkipped = submitCases.length - testCases.length;
  if (numSkipped > 0) {
    console.log(`- Skip: ${numSkipped} test case(s) for submit`);
  }
});
