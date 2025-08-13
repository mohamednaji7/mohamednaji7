function splitLogs(logs, slug) {
  // ?
  let before = [];
  let after = [];
  let i = -1;
  slug = slug.toLowerCase();
  console.log({slug})
  console.log({logs})
  for(let idx =0; idx< logs.length; idx++){
    if(logs[idx].toLowerCase().includes(slug)){
        before = logs.slice(0, idx)
        i = idx;
        after = logs.slice(idx+1)
        break;
    }
  }
  const ans = {before, i, after};
  console.log(ans);
  return ans;
}

export { splitLogs };
