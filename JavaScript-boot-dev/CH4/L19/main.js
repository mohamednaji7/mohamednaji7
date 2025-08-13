const campaign = {
    name: "Welcome Campaign",
    maxMessages: 100,
    sentMessages: 30,
    sendMessage() {
      this.sentMessages++;
    },
  };
  
  function sendWelcome(name, callback) {
    callback();
    console.log(`Sending: "Welcome ${name}! We are so glad you are here."`);
  }
  
  console.log("Campaign Messages:", campaign.sentMessages);
  
  // don't touch above this line

  
  // sendWelcome("Tyler", campaign.sendMessage);
  // // solution 1
  // sendWelcome("Tyler", campaign.sendMessage);
  // campaign.sendMessage();

  // solution 2
  campaign.sendMessage = campaign.sendMessage.bind(campaign);
  sendWelcome("Tyler", campaign.sendMessage);

  // // solution 3
  // const sendMessageBounded = campaign.sendMessage.bind(campaign);
  // sendWelcome("Tyler", sendMessageBounded);

  // don't touch below this line
  
  console.log("Campaign Messages:", campaign.sentMessages);
  