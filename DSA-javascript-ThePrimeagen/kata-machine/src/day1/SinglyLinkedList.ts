type Node<T> = {
    value: T,
    next?: Node<T>,
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
        console.log("head:", this.head?.value, "; tail:", this.tail?.value, "; list:", items.join(" -> "));

        return 
    }
    prepend(item: T): void {
        this.print()
        // make  it 
        const node : Node<T> = {
            value: item,
            next: this.head
        };
        
        // add it
        if(!this.head){
            this.tail = node;
        }
        this.head = node;
        // bookkeeping
        this.length +=1;
        return 
    }
    insertAt(item: T, idx: number): void {
        console.log("insertAt", {item, idx});
        this.print()
        if(idx  > this.length){
            throw new Error("Index out of range")
        }else if(idx===this.length){
            this.append(item);
            return 
        }else if(idx===0){
            this.prepend(item)
            return 
        }
        let before = this.getAt(idx-1);
        before = before as Node<T>;
        const node:Node<T> = {
            value: item,
            next: before.next,
        }
        node.next = before.next,
        before.next = node

        // bookkeeping
        this.length +=1;
        return

    }
    append(item: T): void {
        console.log("append", {item});
        this.print()

        // make  it 
        const node : Node<T> = {
            value: item,
        };
        
        // add it
        if(!this.tail){
            this.head = this.tail= node;
        }else{
            this.tail.next = node;
            this.tail = node;
        }
        // bookkeeping
        this.length +=1;
        this.print()
        return 

    }
    remove(item: T): T | undefined {
        console.log("remove", {item});
        this.print()

        if (!this.head){
            return 
        }
        
        if(this.head && this.head.value===item){
            return this.unlinkHead()
        }
        
        let curr = this.head;

        while(curr.next){
            if(curr.next.value===item){
                break 
            }
            curr = curr.next
        }
        if(curr.next){
            return this.unlinkNextNode(curr);
        }
        return  
        
    }
    get(idx: number): T | undefined {
        console.log("get", {idx});
        this.print()
        return this.getAt(idx)?.value;
        
    }
    private getAt(idx: number): Node<T> | undefined {
        if(idx<0 || idx>this.length){
            throw new Error("Internal implementation Error: idx out of range")
        }
        let curr = this.head;
        while(idx>0 && curr){
            idx -= 1;
            curr = curr.next
        }
        // curr = curr as Node<T>;
        return curr
    }
    private unlinkNextNode(node: Node<T>): T | undefined {
        console.log("unlinkNextNode", "node.value", node.value);
        this.print()
        if(!node.next){
            return
        }
        // bookkeeping
        this.length -=1;
        const toUnlink = node.next 
        node.next = toUnlink.next 

        if(this.tail === toUnlink){
            this.tail = node
        }

        // GC - free mem
        toUnlink.next = undefined
        
        this.print()
        return toUnlink.value
    }
    private unlinkHead() {
        console.log("unlinkHead");
        this.print()
        const node = this.head
        if(!node){
            return
        }
        // bookkeeping
        this.length -=1;
        this.head = node.next 

        if(!this.head){
            this.tail = undefined;
        }

        // GC - free mem
        node.next = undefined
        
        this.print()
        return node.value
    }

    removeAt(idx: number): T | undefined {
        console.log("removeAt", {idx});
        this.print()
        if(idx===0){
            return this.unlinkHead();
        }
        const node = this.getAt(idx-1);
        if(node){
            return this.unlinkNextNode(node);
        }
        return 
    }
}