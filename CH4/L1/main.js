// main.js
function createMessage(phoneNumber, message) {
    // ?
    // return "createMessage called with" + phoneNumber +  message;
    return {
        phoneNumber,
        message,
        messageLength: message.length
    }

  }
  
export { createMessage };
  