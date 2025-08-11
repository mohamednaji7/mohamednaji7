const printMatchingProperties = (messageLog, searchTerm) => {
  // ?
  for(const key in messageLog){
    if(key.startsWith(searchTerm)){
      console.log(key, messageLog[key])
    }
  }
};

// don't touch below this line

const messageLogs = [
  {
    messageId: "abc123",
    messageText: "Your order has shipped",
    timestamp: "2025-02-06T12:34:56Z",
    sender: "TextioBot",
  },
  {
    messageId: "def456",
    messageSender: "Textio",
  },
  {
    tomsBrilliantIdea: "Messages now have unique tracking codes",
    trackingCode: "trk-555888",
    loggedAt: "2025-02-07T09:30:00Z",
  },
];

for (const log of messageLogs) {
  printMatchingProperties(log, "message");
  printMatchingProperties(log, "log");
}
