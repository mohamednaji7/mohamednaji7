export default class MinHeap {
    public length: number;

    private arrList:  number[];

    constructor() {
        this.length = 0;
        this.arrList = [];
    }

    seek(): number|null{
        if (this.length===0){
            return this.arrList[0]
        }
        return null
    }

    insert(value: number): void {
        const idx = this.length
        this.arrList[idx] = value
        this.length++
        this.heapifyUp(idx)
    }
    delete(): number | null {
        if(this.length===0){
            return null
        }
        
        const out = this.arrList[0]
        this.length --;

        if(this.length===0){
            this.arrList = []
            return out 
        }

        const lastVal = this.arrList[this.length]
        // bobble up  
        this.arrList[0] = lastVal;
        // heapify down 
        this.heapifyDown(0)

        return out 
    }

    private leftIdx(idx: number ): number{
        return idx *2 +1 
    }
    private rightIdx(idx: number ): number{
        return idx *2 +2 
    }
    private parentIdx(idx: number ): number{
        if(idx<1) throw new Error("parent index is only for inecies after the root")
        return Math.floor( (idx-1) / 2 )  
    }

    private heapifyDown(idx: number){
        if(idx>=this.length) {
            return // we should do not come to this in the first place  
        }
        const lIdx = this.leftIdx(idx)
        // leaf node 
        if(lIdx>=this.length) {
            return // nothing to heapify , we are done 
        }
        const rIdx = this.rightIdx(idx)

        const lVal = this.arrList[lIdx]
        const rVal = this.arrList[rIdx]

        const val = this.arrList[idx]

        let minIndex: number  = rIdx ;
        let minVal: number = rVal;

        if (lVal < rVal){
            minVal = lVal;
            minIndex = lIdx;
        }

        if(val > minVal){
            // swap 
            this.arrList[idx] = minVal;
            this.arrList[minIndex] = val;
            // heapify
            this.heapifyDown(minIndex);
        }
        
    }
    private heapifyUp(idx: number){
        if(idx>=this.length) throw new Error("How could we heapify up non-exsiting element"); 
        
        if(idx === 0) {
            return // we are done 
        }
        const val = this.arrList[idx]
        const parentIdx = this.parentIdx(idx)
        const parentVal = this.arrList[parentIdx]

        if(parentVal > val){
            // swap 
            this.arrList[idx] = parentVal
            this.arrList[parentIdx] = val
            // heapifyUp
            this.heapifyUp(parentIdx);
        }

    }
    

}