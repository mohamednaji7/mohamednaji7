type Node<T> = {
    value: T,
    next?: Node<T>,
    prev?: Node<T>,
}
export default class DoublyLinkedList<T> {
    public length: number;
    private head?: Node<T>; 
    private tail?: Node<T>;     

    constructor() {
        this.length = 0;
        this.head = undefined;
        this.tail = undefined;
    }

    print(): void{
        let curr = this.head
        const items : T[] = [];

        while(curr){
            items.push(curr.value)
            curr = curr.next;  // move to the next node
        }
        console.log(items.join(" -> "));  // or just console.log(items)

        return 
    }
    prepend(item: T): void {
        // make  it 
        const node : Node<T> = {
            value: item,
            next: this.head
        };
        
        // add it
        if(!this.head){
            this.tail = node;
            this.head = node;
        }else{
            
            this.head.prev = node;
            this.head = node;
        }
        // bookkeeping
        this.length +=1;
        return 
    }
    insertAt(item: T, idx: number): void {
        if(idx  > this.length){
            throw new Error("Index out of range")
        }else if(idx===this.length){
            this.append(item);
            return 
        }else if(idx===0){
            this.prepend(item)
            return 
        }
        let curr = this.getAt(idx);
        curr = curr as Node<T>;
        const node:Node<T> = {
            value: item,
            next: curr,
            prev: curr.prev,
        }
        if(curr.prev){
            curr.prev.next = node;
            curr.prev = node;
        }
        // bookkeeping
        this.length +=1;
        return

    }
    append(item: T): void {
        // make  it 
        const node : Node<T> = {
            value: item,
            prev: this.tail
        };
        
        // add it
        if(!this.tail){
            this.tail = node;
            this.head = node;
        }else{
            this.tail.next = node;
            this.tail = node;
        }
        // bookkeeping
        this.length +=1;
        return 

    }
    remove(item: T): T | undefined {
        
        let curr = this.head;
        while(curr){
            if(curr.value===item){
                break 
            }
            curr = curr.next
        }
        if(!curr){
            return;
        }
        return this.unlinkNode(curr);
        
    }
    get(idx: number): T | undefined {
        return this.getAt(idx)?.value;
        
    }
    private getAt(idx: number): Node<T> | undefined {
        let curr = this.head;
        while(idx>0 && curr){
            idx -= 1;
            curr = curr.next
        }
        // curr = curr as Node<T>;
        return curr
    }
    private unlinkNode(node: Node<T>): T | undefined {
        // bookkeeping
        this.length -=1;

        
        if(this.head === node){
            this.head = node.next
        }
        if(this.tail === node){
            this.tail = node.prev
        }
        if(node.prev){
            node.prev.next = node.next;
        }
        if(node.next){
            node.next.prev = node.prev;
        }
        node.prev = node.next = undefined;
        return node.value
    }

    removeAt(idx: number): T | undefined {
        const node = this.getAt(idx);
        if(node){
            return this.unlinkNode(node);
        }
        return 
    }
}