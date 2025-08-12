class Sender {
    constructor(recipient) {
      this.recipient = recipient;
    }
  
    sendMessage(message) {
      throw new Error("sendMessage method must be implemented by subclasses");
    }
  }
  
  // don't touch above this line  
class EmailSender extends Sender {
  sendMessage(msg){
    console.log(`Sending email to ${this.recipient}: ${msg}`)
  }
}

class SMSSender extends Sender {
  sendMessage(msg){
    console.log(`Sending SMS to ${this.recipient}: ${msg}`)
  }
} 
 
  // ?
  
  // don't touch below this line
  
  export { Sender, SMSSender, EmailSender };
  