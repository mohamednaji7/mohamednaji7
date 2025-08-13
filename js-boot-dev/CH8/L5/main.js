const getCleanMessages = (messages, badWord) => {
  // ?
  const cleanMessages = [];
  badWord = badWord.toLowerCase();
//   console.log({badWord})
  for(const msg of messages){
    console.log(msg)
    if(!msg.toLowerCase().includes(badWord)){
        cleanMessages.push(msg);
    }
  }
  return cleanMessages;

};

export { getCleanMessages };
