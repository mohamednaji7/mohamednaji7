function updateMessageStatus(messageId, currentStatus, isDelivered) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // ?
      if(currentStatus === "Sending" && isDelivered){
        resolve(`Textio Message ${messageId} has been delivered successfully.`);
      }
      if(currentStatus === "Sending" && ! isDelivered){
        reject(`Textio Message ${messageId} is still sending and cannot be marked as delivered.`);
      }
      if(currentStatus!=="Sending"){
        resolve(`Textio Message ${messageId} status updated to ${currentStatus}.`);
      }
      

    }, 500);
  });
}

// don't touch below this line

export { updateMessageStatus };
