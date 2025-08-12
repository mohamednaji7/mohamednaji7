class Sender {
    constructor(recipient) {
      this.recipient = recipient;
    }
  
    sendMessage(message) {
      throw new Error("sendMessage method must be implemented by subclasses");
    }
  }
  
  // don't touch above this line
  
  // ?
  
  // don't touch below this line
  
  export { Sender, SMSSender, EmailSender };
  