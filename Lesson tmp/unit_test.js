// unit_test.js
export const withSubmit = process.env.NODE_ENV === 'submit' || process.argv.includes('--submit');

let currentDescribe = '';
let testCount = 0;
let passedCount = 0;

export function describe(name, callback) {
  currentDescribe = name;
  console.log(`\n${name}:`);
  callback();
  
  console.log(`\nResults: ${passedCount}/${testCount} tests passed`);
  if (passedCount === testCount) {
    console.log('✅ All tests passed!');
  } else {
    console.log('❌ Some tests failed');
    process.exit(1);
  }
}

export function it(name, callback) {
  testCount++;
  try {
    callback();
    console.log(`  ✓ ${name}`);
    passedCount++;
  } catch (error) {
    console.log(`  ✗ ${name}`);
    console.log(`    ${error.message}`);
  }
}

export const assert = {
  strictEqual(actual, expected, message) {
    if (actual !== expected) {
      throw new Error(message || `Expected ${expected}, but got ${actual}`);
    }
  },
  throws(fn, expectedErrMessage) {
    let threw = false;
    try{
      fn();
    }catch (error) {
      threw = true;
      if(error.message!==expectedErrMessage){
        throw new Error(`Expected error message "${expectedErrMessage}", but got "${error.message}"`);
      }
    }
    if (!threw) {
      throw new Error(`Function didn't throw an error.`);
    }

  }
};