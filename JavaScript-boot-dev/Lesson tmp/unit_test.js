// unit_test.js
export const withSubmit = process.env.NODE_ENV === 'submit' || process.argv.includes('--submit');

let currentDescribe = '';
let testCount = 0;
let passedCount = 0;

export function describe(name, callback) {
  currentDescribe = name;
  console.log("Your code logs from main.js will displayedd below 3 `-` and above 10 `-`   ")
  console.log(`\n${name}:\n`);

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
    console.log(" ---")
    callback();
    console.log(" ------------- ")
    console.log(`  ✓ ${name}`);
    passedCount++;
  } catch (error) {
    console.log(" ------------- ")
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

  },
  deepEqual(actual, expected, message) {

    // Helper function to perform deep equality comparison
    function deepEquals(a, b) {
      if (a === b) return true;
      
      if (a == null || b == null) return a === b;
      
      if (Array.isArray(a) && Array.isArray(b)) {
        if (a.length !== b.length) return false;
        for (let i = 0; i < a.length; i++) {
          if (!deepEquals(a[i], b[i])) return false;
        }
        return true;
      }
      
      if (typeof a === 'object' && typeof b === 'object') {
        const keysA = Object.keys(a);
        const keysB = Object.keys(b);
        if (keysA.length !== keysB.length) return false;
        for (let key of keysA) {
          if (!keysB.includes(key) || !deepEquals(a[key], b[key])) return false;
        }
        return true;
      }
      
      return false;
    }

    if (!deepEquals(actual, expected)) {
      throw new Error(message || `Expected ${JSON.stringify(expected)}, but got ${JSON.stringify(actual)}`);
    }
  }
  ,
  greaterThan(actual, expected, message) {
    if(!(actual > expected) ){
      throw new Error(message);
    }
  }
};