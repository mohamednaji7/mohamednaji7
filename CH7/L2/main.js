function maxMessagesWithinBudget(budget) {
  // ?
  let total = 0;
  let i=0 
  for(; i<budget; i++){
    total += 1 + i/100;
    if( total > budget){
      break;
    }
  }
  return i;
}

export { maxMessagesWithinBudget };
