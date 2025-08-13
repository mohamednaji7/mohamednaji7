import { describe, it, assert, withSubmit } from "./unit_test.js";
import { sendMessage } from "./main.js";

describe("sendMessage processes messages", () => {
  const expectErrMsg = "Message is too long";
  const runCases = [
    {
      input: "Inconceivable!",
      expectErr: undefined,
    },
    {
      input:
        "You keep using that word. I do not think it means what you think it means.",
      expectErr: expectErrMsg,
    },
  ];

  const submitCases = runCases.concat([
    {
      input:
        "Hello. My name is Inigo Montoya. You killed my father. Prepare to die.",
      expectErr: undefined,
    },
  ]);

  let testCases = runCases;
  if (withSubmit) {
    testCases = submitCases;
  }

  testCases.forEach(({ input, expectErr }) => {
    it(`input: ${input}`, () => {
      let actualErrMsg = undefined;
      let result = "";
      try {
        result = sendMessage(input);
      } catch (err) {
        actualErrMsg = err.message;
      }
      if (!expectErr) {
        assert.strictEqual(result, input);
      }
      assert.strictEqual(actualErrMsg, expectErr);
    });
  });

  const numSkipped = submitCases.length - testCases.length;
  if (numSkipped > 0) {
    console.log(`- Skip: ${numSkipped} test case(s) for submit`);
  }
});
