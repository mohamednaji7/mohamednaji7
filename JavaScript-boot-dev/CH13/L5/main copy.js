async function processAnalytics(data) {
  let analysis = "";

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(analysis);
    }, 100);

    setTimeout(() => {
      analysis += " - Finished!";
    }, 0);

    // don't touch above this line

    // ?

    // don't touch below this line

    analysis += "Analyzing...";
  });
}

export { processAnalytics };
