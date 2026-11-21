import dfs from "@code/DFSGraphList";
import { list2, 
     wAdjList1, wAdjList2, wAdjList3,  
} from "./graph";
test("DFS - Graph: 2 nodes", function (){
    expect(dfs(wAdjList1, 0, 1)).toEqual([
        0, 1
    ]);

    expect(dfs(wAdjList1, 0, 2)).toEqual(null);
})

test("DFS - Graph: 3 nodes", function (){
    expect(dfs(wAdjList2, 0, 1)).toEqual([
        0, 1
    ]);
    expect(dfs(wAdjList2, 0, 2)).toEqual([
        0, 1, 2
    ]);

    expect(dfs(wAdjList2, 2, 1)).toEqual(null);
})


test("DFS - Graph: 4 nodes", function (){
    expect(dfs(wAdjList3, 0, 1)).toEqual([
        0, 3, 1
    ]);
    expect(dfs(wAdjList3, 0, 2)).toEqual([
        0, 3,  1, 2
    ]);

    expect(dfs(wAdjList3, 2, 1)).toEqual(null);

    expect(dfs(wAdjList3, 3, 2)).toEqual([
        3, 1, 2
    ]);
})

test("dfs - graph", function () {
    expect(dfs(list2, 0, 6)).toEqual([
        0,
        1,
        4,
        5,
        6,
    ]);

    expect(dfs(list2, 6, 0)).toEqual(null);
});


