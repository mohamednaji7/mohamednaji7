function getPrimaryAndBackupMessages(messages) {
  // ?
  let [primary, ...backups] = messages;
  const ans =  {
    primary,
    backups
  }
  
  console.log(ans);
  return ans;
}

export { getPrimaryAndBackupMessages };
