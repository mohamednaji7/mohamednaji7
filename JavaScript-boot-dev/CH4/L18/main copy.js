function calculateCampaignMetrics(sent, opened, clicked) {
    const openRate = opened / sent;
    const clickRate = clicked / sent;
    const conversionRate = clicked / opened;
    return {
      openRate,
      clickRate,
      conversionRate,
    };
  }
  
  // don't touch above this line
  
  calculateCampaignMetrics(1000, 800, 200);
  
  // don't touch below this line
  
  console.log(`Open Rate:       ${openRate}`);
  console.log(`Click Rate:      ${clickRate}`);
  console.log(`Conversion Rate: ${conversionRate}`);
  