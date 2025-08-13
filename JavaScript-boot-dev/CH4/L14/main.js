const isSpamMessage = (message) => {
    if (message.toLowerCase().includes("offer")) {
      return true;
    }
    if (message.toLowerCase().includes("free")) {
      return true;
    }
    return false;
  }
  
  // don't touch below this line
  
  const isFunctionType = (f)  => {
    return f.hasOwnProperty("prototype");
  }
  
  test = (msg) => {
    const isSpam = isSpamMessage(msg);
    console.log(`'${msg}' is spam: ${isSpam}`);
  }
  
  test("Get an offer now!");
  test("Free beer in your local area");
  test("Hey mom, sorry I couldn't make it to your birthday...");
  console.log("========================");
  if (isFunctionType(isSpamMessage)) {
    console.log("isSpamMessage is a classic function");
  } else {
    console.log("isSpamMessage is a fat arrow function");
  }
  