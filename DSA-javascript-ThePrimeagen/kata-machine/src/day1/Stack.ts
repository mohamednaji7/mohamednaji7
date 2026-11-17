interface Node<T>{
    value: T,
    prev?: Node<T>,
}

export default class Stack<T> {
    public length: number;
    
    private head?: Node<T>;    

    constructor() {
        this.head = undefined
        this.length = 0;
    }

    push(item: T): void {
        const node = {value: item} as Node<T>;

        node.prev = this.head;
        this.head = node;

        // bookkeeping
        this.length++;
    }
    pop(): T | undefined {
        if(!this.head) return undefined;
        const toPop = this.head;
        
        this.head = this.head.prev;
        // bookkeeping
        this.length--;

        // free
        toPop.prev = undefined; // help GC
    
        return toPop.value
    }
    peek(): T | undefined {
        return this.head?.value;

    }
}