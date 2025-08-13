function deduplicateEmails(emails) {
  // ?
    // console.log({emails})   
    
    // return new Set([...emails]); // it returns a set not a an JS array

    // const ans = new Set();
    // for(const email of emails){
    //     console.log(email);
    //     ans.add(email);
    // }
    // return ans;

    // const setEmails = new Set(emails);
    // const ans = [];
    // for(const email of setEmails){
    //     ans.push(email);
    // }
    // return ans;

    return [...new Set(emails)];

}

// don't touch below this line

export { deduplicateEmails };
