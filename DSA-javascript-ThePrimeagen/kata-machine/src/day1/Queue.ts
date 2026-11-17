interface Node<T>{
    value: T,
    next?: Node<T>,
}
export default class Queue<T> {
    public length: number;

    private first?: Node<T>;
    private last?: Node<T>;

    constructor() {
        this.first = this.last = undefined;
        this.length = 0;
    }

    enqueue(item: T): void {
        const newNode = {value: item} as Node<T>;
        
        // add it 
        if(!this.last){
            this.first = this.last = newNode;
        }else{
            this.last.next = newNode;
            this.last = newNode;
        }
        //book keeping
        this.length++;
    }
    deque(): T | undefined {
        if(!this.first) return undefined;
        const toExit = this.first;
        
        // exit it
        if(this.last===this.first) this.last = undefined;
        
        this.first = this.first.next;
        
        //book keeping
        this.length--

        //free ; help GC
        toExit.next = undefined;

        // return its value
        return toExit.value;
    }
    peek(): T | undefined {
        return this.first?.value;
    }
}