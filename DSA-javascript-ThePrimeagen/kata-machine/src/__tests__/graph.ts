import { ListFormat } from "typescript";

export const list1: WeightedAdjacencyList = [];

//      (1) --- (4) ---- (5)
//    /  |       |       /|
// (0)   | ------|------- |
//    \  |/      |        |
//      (2) --- (3) ---- (6)
list1[0] = [
    { to: 1, weight: 3 },
    { to: 2, weight: 1 },
];
list1[1] = [
    { to: 0, weight: 3 },
    { to: 2, weight: 4 },
    { to: 4, weight: 1 },
];
list1[2] = [
    { to: 1, weight: 4 },
    { to: 3, weight: 7 },
    { to: 0, weight: 1 },
];
list1[3] = [
    { to: 2, weight: 7 },
    { to: 4, weight: 5 },
    { to: 6, weight: 1 },
];
list1[4] = [
    { to: 1, weight: 1 },
    { to: 3, weight: 5 },
    { to: 5, weight: 2 },
];
list1[5] = [
    { to: 6, weight: 1 },
    { to: 4, weight: 2 },
    { to: 2, weight: 18 },
];
list1[6] = [
    { to: 3, weight: 1 },
    { to: 5, weight: 1 },
];

export const wAdjList1: WeightedAdjacencyList = [];
// (0)<--->(1)
wAdjList1[0] = [{to: 1, weight: 1}]
wAdjList1[1] = [{to: 0, weight: 1}]

export const wAdjList2: WeightedAdjacencyList = [];
// (0)<--->(1)--->(2)
wAdjList2[0] = [{to: 1, weight: 1}]
wAdjList2[1] = [{to: 0, weight: 1}, 
                {to:2, weight: 10}]
wAdjList2[2] = []

export const wAdjList3: WeightedAdjacencyList = [];
// (0)<-----(1)--->(2)
//  ^-_      ^
//     \     |
//      `-->(3) 
wAdjList3[0] = [{to: 3, weight: 1}]
wAdjList3[1] = [{to: 0, weight: 1}, 
                {to: 2, weight: 10}]
wAdjList3[2] = []
wAdjList3[3] = [{to: 0, weight: 1}, 
                {to: 1, weight: 10}]


export const list2: WeightedAdjacencyList = [];

//     >(1)<--->(4) ---->(5)
//    /          |       /|
// (0)   ------<-|<-----' |
//    \  `v      v        v
//     `->(2) -->(3)<----(6)
list2[0] = [
    { to: 1, weight: 3 },
    { to: 2, weight: 1 },
];
list2[1] = [
    { to: 4, weight: 1 },
];
list2[2] = [
    { to: 3, weight: 7 },
];
list2[3] = [ ];
list2[4] = [
    { to: 1, weight: 1 },
    { to: 3, weight: 5 },
    { to: 5, weight: 2 },
];
list2[5] = [
    { to: 2, weight: 18 },
    { to: 6, weight: 1 },
];
list2[6] = [
    { to: 3, weight: 1 },
];

//     >(1)<--->(4) ---->(5)
//    /          |       /|
// (0)     ------|------' |
//    \   v      v        v
//     >(2) --> (3) <----(6)
export const matrix2: WeightedAdjacencyMatrix = [
    [0, 3, 1,  0, 0, 0, 0], // 0
    [0, 0, 0,  0, 1, 0, 0],
    [0, 0, 7,  0, 0, 0, 0],
    [0, 0, 0,  0, 0, 0, 0],
    [0, 1, 0,  5, 0, 2, 0],
    [0, 0, 18, 0, 0, 0, 1],
    [0, 0, 0,  1, 0, 0, 1],
];
