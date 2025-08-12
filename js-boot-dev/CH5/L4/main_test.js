import { describe, it, assert, withSubmit } from "./unit_test.js";
import { Contact } from "./main.js";

describe("Contact", () => {
  const runCases = [
    {
      name: "Patrick",
      phoneNumber: "1234567890",
      expectedFormatted: "(123) 456-7890",
    },
    {
      name: "Sandy",
      phoneNumber: "5555555555",
      expectedFormatted: "(555) 555-5555",
    },
  ];

  const submitCases = runCases.concat([
    {
      name: "Plankton",
      phoneNumber: "9876543210",
      expectedFormatted: "(987) 654-3210",
    },
  ]);

  let testCases = runCases;
  if (withSubmit) {
    testCases = submitCases;
  }

  testCases.forEach(({ name, phoneNumber, expectedFormatted }, i) => {
    it(`Should return ${expectedFormatted} for ${phoneNumber}`, () => {
      const contact = new Contact(name, phoneNumber);
      assert.strictEqual(contact.phoneNumber, expectedFormatted);

      // test valid setter update
      contact.phoneNumber = "1112223333";
      assert.strictEqual(contact.phoneNumber, "(111) 222-3333");
    });
  });

  it("Should throw error on invalid phone number", () => {
    const contact = new Contact("ErrorTest", "1234567890");

    assert.throws(() => {
      contact.phoneNumber = "123";
    }, "Invalid phone number.");
  });

  const numSkipped = submitCases.length - testCases.length;
  if (numSkipped > 0) {
    console.log(`- Skip: ${numSkipped} test case(s) for submit`);
  }
});
