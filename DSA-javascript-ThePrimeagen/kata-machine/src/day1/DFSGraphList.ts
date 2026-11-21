function walk(
    graph: WeightedAdjacencyList, 
    curr: number, 
    needle: number,
    path: number[],
    seen: boolean[],
    ): boolean {
        
    // for a given curr
    //  loop and recurse over childern 
        // if seen; continue // no loops
        // add child to path
        // if child is needle; stop path building 
        // recurse for each child 
            // if stoped path building; backtrack with with noop 
            // else: backtrack with removing that child
    
    const adjs=graph[curr] 
    seen[curr] = true;
    for(let child of adjs ){
        const edge = child.to
        if (seen[edge]) continue 
        path.push(edge);

        if (edge === needle){
            return true
        } 
        if (walk(graph, edge, needle, path, seen) ){
            return true
        }else{
            path.pop()
        }
            
    }
    return false 


}
export default function dfs(graph: WeightedAdjacencyList, source: number, needle: number): number[] | null {
    // Given a source vertix find a path to the needle
    // Do it in Depth First Search Algorithm
    // graph is a Weighted Adjacencey List, and if thre is not weight, there is no edge 
    //      Graph Edge: {to:, weight: }

    // depth first search -- recursive
    const path: number[] = []
    const seen: boolean[] = new Array(graph.length).fill(false)

    // statring from source 
    path.push(source) 
    seen[source] = true;

    const found = walk(graph, source, needle, path, seen);
    
    if (found) return path
    return null

}