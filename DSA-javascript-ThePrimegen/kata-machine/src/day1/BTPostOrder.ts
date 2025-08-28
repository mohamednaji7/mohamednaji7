function walk(node: BinaryNode<number>): number[]{
    if(!node){
        return []
    }
    const out = []
    if(node.left){
        const leftItem = walk(node.left);
        out.push(...leftItem);
    }
    if(node.right){
        const rightItem = walk(node.right);
        out.push(...rightItem);
    }
    out.push(node.value)
    return out;
}
export default function post_order_search(head: BinaryNode<number>): number[] {
    return walk(head);
}