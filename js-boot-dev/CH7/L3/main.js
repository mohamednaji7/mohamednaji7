
function printPrimes(max) {
  // ?
  let ans = "";
  // don't touch above this line

  for(let n=2; n<=max; n++){
    if(n===2){
      // console.log(2);
      ans += "2\n"
      continue;
    }
    if(n%2===0){
      continue 
    }
    let prime = true;
    for(let i = 3; i <= Math.sqrt(n); i+=2){
      if(n%i===0){
        prime = false;
        break;
      }
    }
    if(prime){
      ans += `${n}\n`
      // console.log(n)
    }
  }
  // console.log("ans")
  // console.log(ans)

  // don't touch below this line
  return ans;
}


function test(max) {
  console.log(`Primes up to ${max}:`);
  printPrimes(max);
  console.log(
    "===============================================================",
  );
}

test(10);
test(20);
test(30);

export {printPrimes};