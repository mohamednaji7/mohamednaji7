function getCleanRank(reviewWords) {
  // ?
    const badWords = ["dang", "shoot", "heck"];
    let rank  = 0;
    for (const badWord of badWords){
        if ( reviewWords.includes(badWord)){
            rank ++;
        }
    }
    switch(rank){

        case 0:
            return "clean";
        case 1:
            return "dirty";
        default:
            return "filthy";
    }

}

export { getCleanRank };
