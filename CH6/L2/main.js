const user = {
    name: "Default User",
    type: "user",
};
  
const adminUser = Object.create(user);
adminUser.type = "admin";

// ?
const isAdmin = (obj) =>{
  return Object.getPrototypeOf(obj) === adminUser;
}
// don't touch below this line

export { user, adminUser, isAdmin };
