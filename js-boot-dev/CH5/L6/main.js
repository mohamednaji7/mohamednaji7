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
    formatMessage(message) {
      return `${super.formatMessage(message)} [SMS]`;
    }
  }
  
  class EmailSender extends Sender {
    // ?
    formatMessage(message) {
      return `${super.formatMessage(message)} [Email]`;
    }
  }
  
  // don't touch below this line
  
  export { Sender, SMSSender, EmailSender };
  