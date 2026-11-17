import Queue from "./Queue";

// export default function bfs(head: BinaryNode<number>, needle: number): boolean {

//     const q = new Queue<BinaryNode<number>>;
//     q.enqueue(head);

//     let found = false;
//     while(q.length){
//         const curr = q.deque() as BinaryNode<number>;
        
//         // search 
//         if(curr.value===needle){
//             found = true;
//             break
//         }

//         // traverse     
//         if(curr.left){
//             q.enqueue(curr.left)
//         }
//         if(curr.right){
//             q.enqueue(curr.right)
//         }
//     }
//     return found;
// }
export default function bfs(head: BinaryNode<number>, needle: number): boolean {

    const q = [head]; // O(N*N)


    let found = false;
    while(q.length){
        const curr = q.shift() as BinaryNode<number>; // O(N)
        
        // search 
        if(curr.value===needle){
            found = true;
            break
        }

        // traverse     
        if(curr.left){
            q.push(curr.left)
        }
        if(curr.right){
            q.push(curr.right)
        }
    }
    return found;
}