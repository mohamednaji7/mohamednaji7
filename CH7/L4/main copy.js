function getMaxMessagesToSend(costMultiplier, maxCostInPennies) {
  let actualCostInPennies = 1.0;
  let maxMessagesToSend = 1;
  let balance = maxCostInPennies - actualCostInPennies;
  while () {
    actualCostInPennies *= costMultiplier;
    balance -= actualCostInPennies;
    maxMessagesToSend++;
  }
  if (balance < 0) {
    maxMessagesToSend--;
  }
  return maxMessagesToSend;
}

export { getMaxMessagesToSend };
