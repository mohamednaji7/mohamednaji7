function walk(node: BinaryNode<number>): number[]{
    if(!node){
        return []
    }
    // pre recurse
    const out = []
    out.push(node.value)

    // recurse; base case -> if condition 
    if(node.left){
        const leftItem = walk(node.left);
        // post recurse 
        out.push(...leftItem);
    }
    if(node.right){
        const rightItem = walk(node.right);
        // post recurse 
        out.push(...rightItem);
    }

    return out;

}
export default function pre_order_search(head: BinaryNode<number>): number[] {
    return walk(head);
}