
function qs(arr: number[], lo: number, hi: number):void{
    if( lo < hi){
        const pivotIdx = partition(arr, lo, hi);
        qs(arr, lo, pivotIdx-1);
        qs( arr , pivotIdx+1, hi  );
    }
}  


function partition(arr: number[], lo: number, hi: number) : number{
    // const pivot = arr[ Math.floor(lo + (hi-lo)/2) ];
    const pivot = arr[hi];
    
    let pivotIdx = lo
    for(let i = lo; i<hi; i++ ){
        if(arr[i] <= pivot){
            const tmp = arr[i];
            arr[i] = arr[pivotIdx];
            arr[pivotIdx] = tmp;
            pivotIdx++;
        }
    }
    
    arr[hi] = arr[pivotIdx]
    arr[pivotIdx] = pivot;

    return pivotIdx; 
}

export default function quick_sort(arr: number[]): void {
    qs(arr, 0, arr.length-1);

}