function createUserMap(users) {
  // ?
  const usersMap = new Map();
  for(const user of users){
    usersMap.set(user.fname+" "+user.lname , user)
  }
  return usersMap
    }

export { createUserMap };
