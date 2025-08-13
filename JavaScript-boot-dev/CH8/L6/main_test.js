import { describe, it, assert, withSubmit } from "./unit_test.js";
import { splitLogs } from "./main.js";

describe("splitLogs function splits logs around a given slug", () => {
  const runCases = [
    {
      logs: [
        "error at line 10",
        "warning at line 15",
        "the dev who wrote line 21 should be fired",
        "debug info",
        "error at line 20",
        "user login",
      ],
      slug: "debug",
      expected: {
        before: [
          "error at line 10",
          "warning at line 15",
          "the dev who wrote line 21 should be fired",
        ],
        i: 3,
        after: ["error at line 20", "user login"],
      },
    },
    {
      logs: [
        "start",
        "process 1: WARMING",
        "this is the end",
        "wait some more stuff happened here",
      ],
      slug: "process 1",
      expected: {
        before: ["start"],
        i: 1,
        after: ["this is the end", "wait some more stuff happened here"],
      },
    },
    {
      logs: ["error: bug found", "other log"],
      slug: "bug",
      expected: {
        before: [],
        i: 0,
        after: ["other log"],
      },
    },
  ];

  const submitCases = runCases.concat([
    {
      logs: [],
      slug: "not found",
      expected: {
        before: [],
        i: -1,
        after: [],
      },
    },
    {
      logs: ["only log"],
      slug: "nonexistent",
      expected: {
        before: [],
        i: -1,
        after: [],
      },
    },
  ]);

  let testCases = runCases;
  if (withSubmit) {
    testCases = submitCases;
  }

  testCases.forEach(({ logs, slug, expected }, i) => {
    it(`Test #${i}: "${slug}"`, () => {
      const { before, i: index, after } = splitLogs(logs, slug);
      const {
        before: expectedBefore,
        i: expectedI,
        after: expectedAfter,
      } = expected;

      assert.deepEqual(
        before,
        expectedBefore,
        `Expected before:
[${expectedBefore}]
  got
[${before}]`,
      );
      assert.strictEqual(
        index,
        expectedI,
        `Expected i: ${expectedI} but got ${index}`,
      );
      assert.deepEqual(
        after,
        expectedAfter,
        `Expected after:
[${expectedAfter}]
  got
[${after}]`,
      );
    });
  });

  const numSkipped = submitCases.length - testCases.length;
  if (numSkipped > 0) {
    console.log(`- Skip: ${numSkipped} test case(s) for submit`);
  }
});
