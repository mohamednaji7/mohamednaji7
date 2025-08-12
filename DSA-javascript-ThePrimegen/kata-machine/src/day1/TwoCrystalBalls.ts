export default function two_crystal_balls(breaks: boolean[]): number {
    const N = breaks.length


    // // method 1 - O(N)
    // for(let i =0; i<N; i++){
    //     // if(i>N-10){
    //     //     console.log(i, breaks[i])
    //     // }
    //     if(breaks[i]){
    //         return i;
    //     }
    // }
    // return -1;


    // // method 2 - O(sqrt(N))
    // const jumpAmount  = Math.floor(Math.sqrt(N));
    // console.log("jumpAmount", jumpAmount )
    // let i=jumpAmount;
    // for(; i<N; i+=jumpAmount){
    //     if(breaks[i]){  
    //         console.log("Jumping found idx:", i);
    //         break;  
    //     }  
    // }
    // i -= jumpAmount;
    // for(let j=0;j < jumpAmount;j++){
    //     // console.log("linear: ",i+j)
    //     if(breaks[i+j]){
    //         return i+j;
    //     }
    // }
    // return -1;


    // method 3 - O(log(N))
    let lo = 0;
    let hi = breaks.length-1;
    if(breaks[lo]){
        return 0;
    }
    while( lo <= hi ){
        const m = Math.floor((lo+hi)/2)
        const mv = breaks[m];
        // console.log({m})
        if(mv && !breaks[m-1]){
            return m;
        }else if(mv){
            hi = m-1;
        }else{
            lo = m + 1;
        }
    }
    return -1;

}