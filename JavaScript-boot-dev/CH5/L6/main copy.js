class Sender {
    constructor(recipient) {
      this.recipient = recipient;
    }
  
    formatMessage(message) {
      return `To: ${this.recipient}, Message: ${message}`;
    }
  }
  
  // don't touch above this line
  
  class SMSSender extends Sender {
    // ?
  }
  
  class EmailSender extends Sender {
    // ?
  }
  
  // don't touch below this line
  
  export { Sender, SMSSender, EmailSender };
  