function getMessageHash(sender, content) {
    const hash = await sha256Hex(content);
    return `Sender (${sender}): ${hash}`;
  }
  
  // don't touch below this line
  
  async function sha256Hex(str) {
    const encoder = new TextEncoder();
    const data = encoder.encode(str);
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
    return hex;
  }
  
  export { getMessageHash };
  