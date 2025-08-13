import { describe, it, assert, withSubmit } from "./unit_test.js";
import { addToPhonebook } from "./main.js";

describe("addToPhonebook adds a new entry to the phone book", () => {
  const runCases = [
    {
      phoneBook: new Map(),
      phoneNumber: "555-1111",
      name: "Geralt",
      expected: new Map([["555-1111", "Geralt"]]),
    },
    {
      phoneBook: new Map([["555-2222", "Ciri"]]),
      phoneNumber: "555-3333",
      name: "Yennefer",
      expected: new Map([
        ["555-2222", "Ciri"],
        ["555-3333", "Yennefer"],
      ]),
    },
  ];

  const submitCases = runCases.concat([
    {
      phoneBook: new Map([["555-4444", "Triss"]]),
      phoneNumber: "555-4444",
      name: "Vesemir",
      expected: new Map([["555-4444", "Vesemir"]]),
    },
  ]);

  let testCases = runCases;
  if (withSubmit) {
    testCases = submitCases;
  }

  testCases.forEach(({ phoneBook, phoneNumber, name, expected }) => {
    it(`should add "${phoneNumber}: ${name}" to the phone book`, () => {
      const originalPhoneBook = new Map(phoneBook);
      const result = addToPhonebook(phoneNumber, name, phoneBook);

      assert.deepEqual(
        Array.from(result.entries()),
        Array.from(expected.entries()),
      );
      assert.deepEqual(
        Array.from(phoneBook.entries()),
        Array.from(originalPhoneBook.entries()),
        "mutated the original phonebook",
      );
    });
  });

  const numSkipped = submitCases.length - testCases.length;
  if (numSkipped > 0) {
    console.log(`- Skip: ${numSkipped} test case(s) for submit`);
  }
});
