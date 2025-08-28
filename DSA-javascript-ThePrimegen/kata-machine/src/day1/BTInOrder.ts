function walk(node: BinaryNode<number>): number[]{
    if(!node){
        return []
    }
    // pre recurse
    const out = []

    // recurse; base case -> if condition 
    if(node.left){
        const leftItem = walk(node.left);
        out.push(...leftItem);
    }
    // post recurse 
    out.push(node.value)
    
    // recurse; base case -> if condition 
    if(node.right){
        const rightItem = walk(node.right);
        out.push(...rightItem);
    }
    return out;
}

export default function in_order_search(head: BinaryNode<number>): number[] {
        return walk(head);
}