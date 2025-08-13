function bulkSendCost(numMessages) {
  // ?
  let total = numMessages ;
  for(let i=0; i<numMessages; i++){
    
    total += i / 100
  }
  return total;
}

export { bulkSendCost };
