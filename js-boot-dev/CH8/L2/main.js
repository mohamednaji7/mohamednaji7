const getMostRecentUser = (usernames) => {
  // ?
//   return usernames[usernames.length-1] ?? null; 
  return usernames.length ? usernames[usernames.length-1] : null ; 
};

export { getMostRecentUser };
