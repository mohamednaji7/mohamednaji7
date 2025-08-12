// main_test.js
import { describe, assert, it, withSubmit } from "./unit_test.js";
import { createMessage } from "./main.js";

describe("createMessage", () => {
  const runCases = [
    {
      phoneNumber: 148255510981,
      message: "Thanks for signing up",
      expected: {
        phoneNumber: 148255510981,
        message: "Thanks for signing up",
        messageLength: 21,
      },
    },
    {
      phoneNumber: 148255510982,
      message: "Love to have you aboard!",
      expected: {
        phoneNumber: 148255510982,
        message: "Love to have you aboard!",
        messageLength: 24,
      },
    },
    {
      phoneNumber: 148255510983,
      message: "We're so excited to have you",
      expected: {
        phoneNumber: 148255510983,
        message: "We're so excited to have you",
        messageLength: 28,
      },
    },
  ];

  const submitCases = runCases.concat([
    {
      phoneNumber: 148255510984,
      message: "",
      expected: { phoneNumber: 148255510984, message: "", messageLength: 0 },
    },
    {
      phoneNumber: 148255510985,
      message: "Kunkaaaaa",
      expected: {
        phoneNumber: 148255510985,
        message: "Kunkaaaaa",
        messageLength: 9,
      },
    },
  ]);

  let testCases = runCases;
  if (withSubmit) {
    testCases = submitCases;
  }

  testCases.forEach(({ phoneNumber, message, expected }, i) => {
    it(`Test ${i}`, () => {
      const result = createMessage(phoneNumber, message);
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
