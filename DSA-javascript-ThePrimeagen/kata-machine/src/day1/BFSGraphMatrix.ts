export default function bfs(graph: WeightedAdjacencyMatrix, source: number, needle: number): number[] | null {
    // Given a source vertix find a path to the needle
    // graph is a Weighted Adjacencey Matrix, and if thre is not weight, there is no edge 
    // Do it in Breadth First Search Alogrithm

    // vertix_ptr: start from soure
    // use queue to build breadth BFS  
    // pop out of the queue the top vertix
    //      traverse vertix_ptr childern; 
    //          go over all possiable pathes, and mark what you visisted so that u don't loop for ever
    //      
    //          if found the needle stop building the path 
    //  if needle in the pathes you built
    //      return it   
    //  else return null
    
     
    
    const prev = new Array(graph.length).fill(-1) // pathes, -1 means no prev yet
    const seen = new Array(graph.length).fill(false) // not seen any vertix yet

    // use queue to build breadth BFS   
    const queue: number[] = [];

    // vertix_ptr: start from soure
    seen[source] = true
    queue.push(source)
    do {
        const curr = queue.shift() as number ; // .shift() returns T|undefined 

        if (curr === needle) break

        const row = graph[curr]
        for(let i=0; i< graph.length; i++){ // i is the child if its not 0 
            const weight = row[i] 
            if (weight === 0) continue 

            if (seen[i]) continue ; // first check if its a new vertix

            // Enqueue; BFS
            queue.push(i);

            // build path and mark as seen 
            prev[i] = curr 
            seen[i] = true
        }
    }while (queue.length > 0);
    
    // console.log(prev)
    // console.log(seen)
    if ( prev[needle] === -1  ) return null ;
    
    let out = [needle] ;
    let ptr = needle ;
    while ( prev[ptr] !== -1 ){
        out.push(prev[ptr])
        ptr = prev[ptr];
    }
    // ? does this will include the source? 
    // yeah, the first curr was the source
    // [needle, ...., source]
    // but it doesn't include the needle !
    out = out.reverse()
    // console.log(out)
    return out 
    


}