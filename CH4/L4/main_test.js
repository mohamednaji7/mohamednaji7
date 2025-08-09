import { describe, it, assert, withSubmit } from "./unit_test.js";
import { getCampaignCreator } from "./main.js";

describe("getCampaignCreator", () => {
  const runCases = [
    {
      campaign: {
        name: "Welcome Campaign",
        messageCount: 100,
        creator: {
          firstName: "Dennis",
          lastName: "Nedry",
          createdAt: "2023-10-01T09:00:00+00:00",
        },
      },
      expected: "Dennis",
    },
    {
      campaign: {
        name: "Restaurant Promo",
        messageCount: 200,
        creator: {
          firstName: "Alan",
          lastName: "Grant",
          createdAt: "2023-11-15T10:30:00+00:00",
        },
      },
      expected: "Alan",
    },
    {
      campaign: {
        name: "Test Campaign",
        messageCount: 50,
        creator: {
          firstName: "John",
          lastName: "Hammond",
          createdAt: "2023-09-20T08:15:00+00:00",
        },
      },
      expected: "John",
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
      expected: "Ellie",
    },
    {
      campaign: {
        name: "Offer Letters",
        messageCount: 0,
        creator: {
          firstName: "Lex",
          lastName: "Murphy",
          createdAt: "2023-09-20T08:15:00+00:00",
        },
      },
      expected: "Lex",
    },
  ]);

  let testCases = runCases;
  if (withSubmit) {
    testCases = submitCases;
  }

  testCases.forEach(({ campaign, expected }) => {
    it(`campaign "${campaign.name}"`, () => {
      const result = getCampaignCreator(campaign);
      assert.strictEqual(result, expected);
    });
  });

  const numSkipped = submitCases.length - testCases.length;
  if (numSkipped > 0) {
    console.log(`- Skip: ${numSkipped} test case(s) for submit`);
  }
});
