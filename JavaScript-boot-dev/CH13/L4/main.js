function processMessages(messages) {
  let success = true;
  console.log(`Processing messages: ${messages}`);
  setTimeout(() => {
      finalizeJob(success, messages);
  }, 0);
  if (messages < 0) {
    console.log("invalid data: how do we have negative messages??");
    success = false;
    return;
  }
  if (messages > 100) {
    console.log("invalid data: way too many messages");
    success = false;
    return;
  }

  console.log("Doing more stuff...");
}

function finalizeJob(success, messages) {
    const msg = success
        ? `Processed ${messages} successfully!`
        : `Failed to process messages!`;
    console.log(msg);
}

// don't touch below this line

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

processMessages(42);
await sleep(0);
console.log("---");
processMessages(-1);
await sleep(0);
console.log("---");
processMessages(9001);
