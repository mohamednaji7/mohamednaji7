const START = 1
const END = 2
const EMPTY = 0
const OBSTACLE = -1
const VISITED = 3

const DEBUG = false

const dirs = [
    [0, 1],
    [0, -1],
    [-1, 0],
    [1, 0],
]

function findStart(grid){
    for(let i=0; i<grid.length; i++){
        const row = grid[i]
        for (let j=0; j<grid[i].length; j++){
            if(grid[i][j] === START){
                return [i, j]
            }
        }
    }
    throw new Error("Start not found!")
};
function countEmpty(grid) {
    let count = 0; 
    for(let i=0; i<grid.length; i++){
        for (let j=0; j<grid[i].length; j++){
            if(grid[i][j] === EMPTY){
                count += 1;
            }
        }
    }
    return count ;
};

function inGrid(grid,  i, j)  {
    if ( -1<i && i<grid.length &&  -1<j && j<grid[0].length ){
        return true
    }
    return false
}
function walk(grid, i, j, empty ) {
    // if(DEBUG) console.log("empty", empty)
    if(empty<0) throw new Error("Why empy is less than zero")

    
    // OUT OF RANGE
    if ( ! inGrid(grid, i, j) ){
        return 0
    }

    // that walk over every sqaure non-obstacle square exactly. 
    if(grid[i][j] === OBSTACLE || grid[i][j] === VISITED ){
        return 0
    }
    
    // 4-directional walks from the starting square to the ending square, that walk over every sqaure.
    if(grid[i][j] === END && empty === 0 ){
        return 1
    }
    // id it END but not visited all pathed then 0
    if(  grid[i][j] === END ){
        // if(DEBUG) console.log("we got to an end; grid:", grid)
        return 0
    }
    


    //else is EMPTY 
    if (grid[i][j]!==EMPTY){
        // throw new Error("cell should be empty, but its" + grid[i][j])
        throw new Error("cell should be empty, but its not")
    }
    

    // walk in
    grid[i][j] = VISITED

    let allPaths = 0
    for(const [x, y] of dirs){
        const paths = walk(grid, i+x, j+y, empty-1)
        allPaths += paths;        
    }

    grid[i][j] =  EMPTY  


    return allPaths

}
/**
 * @param {number[][]} grid
 * @return {number}
 */
var uniquePathsIII = function(grid) {
    let empty = countEmpty(grid)
    const [i, j] = findStart(grid)
    
    if(DEBUG) console.log("findStart: ", [i, j])
    if(DEBUG) console.log("countEmpty: ", empty)
    
    empty += 1;
    grid[i][j] = EMPTY

    if(DEBUG) console.log("grid:", grid)
    const paths =  walk(grid,i, j, empty)
    if(DEBUG) console.log("grid:", grid)
    if(DEBUG) console.log("uniquePathsIII:", paths)

    return paths
};

if(DEBUG) console.log('TS')

const grids = [
    [[1,2]],
    [[1, 0, 2]],
    [[0,1],[2,0]],
    [[1, 0, 0],[0, 0, 2]],
    [[1,0,0,0],[0,0,0,0],[0,0,2,-1]] ,
    [[1,0,0,0],[0,0,0,0],[0,0,0,2]]  ,
]
for(const grid of grids){

    console.log("grid:", grid)
    console.log("uniquePathsIII:", uniquePathsIII(grid))
    console.log("----------------------------------")

}

// for(const grid of grids){

//     console.log("grid:", grid)
//     console.log(findStart(grid))
//     console.log(countEmpty(grid))
//     console.log("----------------------------------")

// }
const fullSized =  Array.from( {length: 4 } , () => new Array(5).fill(EMPTY))
const noPath = Array.from( {length: 4 } , () => new Array(5).fill(EMPTY))
fullSized[0][0] = START
fullSized[3][4] = END
noPath[0][0] = START
noPath[0][1] = OBSTACLE
noPath[1][0] = OBSTACLE
noPath[3][4] = END

console.log("fullSized:", fullSized)
console.log("noPath:", noPath)
console.log("fullSized:", uniquePathsIII(fullSized))
console.log("noPath:", uniquePathsIII(noPath))


// [ [ 1, 0, 0, 0, 0 ], [ 0, 0, 0, 0, 0 ],[ 0, 0, 0, 0, 0 ],[ 0, 0, 0, 0, 2 ]]
// [[ 1, -1, 0, 0, 0 ],[ -1, 0, 0, 0, 0 ],[ 0, 0, 0, 0, 0 ],[ 0, 0, 0, 0, 2 ]]