class Message {
    static numberOfMessages = 0;
    static lengthOfAllMessages = 0;

    constructor(recipient, sender, body) {
      this.recipient = recipient;
      this.sender = sender;
      this.body = body;
      Message.numberOfMessages++;
      Message.lengthOfAllMessages += body.length;
    }

    static getAverageMessageLength(){
      let averageMessageLength = Message.lengthOfAllMessages / Message.numberOfMessages;
      return Math.round(averageMessageLength*100)/100;
    }
  }
  
  // don't touch below this line
  
  export { Message };
  