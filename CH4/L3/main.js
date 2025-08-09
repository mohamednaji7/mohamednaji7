function addID(campaignRecord) {
  // ?
  // return {
  //   ...campaignRecord, 
  //   id: `${campaignRecord.campaignName}-${campaignRecord.senderName}`
  // }
  campaignRecord.id = campaignRecord.campaignName + "-" + campaignRecord.senderName;
  return campaignRecord;
}

// don't touch below this line

export { addID };
