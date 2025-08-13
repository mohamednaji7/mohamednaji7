// async function sleep(ms) {
//   // ?
//   const promise = new Promise((resolve) => {
//       setTimeout(resolve, ms); 
//   })
//   await promise;

// }
function sleep(ms) {
  // ?
  // return new Promise((resolve) => {
  //     setTimeout(resolve, ms); 
  // })
  return new Promise((resolve) => setTimeout(resolve, ms))

}

// don't touch below this line

export { sleep };
