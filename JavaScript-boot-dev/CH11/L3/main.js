function fixUserMap(brokenMap) {
  // ?
  const fixedUserMap = new Map();
  // console.log(brokenMap);
  // for(const x of brokenMap){
  //   // console.log("x: ")
  //   // console.log(x[0]);
  //   // console.log(x[1]);
  //   const user = x[0];
  //   const val = x[1];
    
  //   fixedUserMap.set(`${user.fname} ${user.lname}`, val)
  // }
  for(const [key, val] of brokenMap){
    fixedUserMap.set(`${key.fname} ${key.lname}`, val)
  }
  return fixedUserMap;
}

export { fixUserMap };
