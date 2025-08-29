export default function dfs(head: BinaryNode<number>, needle: number): boolean {
    return searchBST(head, needle) !== null;
}

function searchBST(root: BinaryNode<number> | null, val: number): BinaryNode<number> | null {
    if(!root){
        return null
    }
    if(root.value === val){
        return root
    }
    if (root.value < val){
        return searchBST(root.right, val)
    }
    return searchBST(root.left, val)
    
};
// export default function dfs(head: BinaryNode<number>, needle: number): boolean {
//     if (head.value === needle){
//         return true
//     }
//     if (head.value <  needle && head.right){
//         return dfs(head.right, needle)
//     }
//     if (head.value >  needle && head.left){
//         return dfs(head.left, needle)
//     }
//     return false
    
// }
