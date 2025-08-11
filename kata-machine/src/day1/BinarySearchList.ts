export default function bs_list(haystack: number[], needle: number): boolean {
    let lo = 0;
    let hi = haystack.length-1;
    while( lo <= hi ){
        const m = Math.floor((lo+hi)/2)
        const mv = haystack[m];
        if(mv===needle){
            return true;
        }else if(mv < needle ){
            lo = m + 1;
        }else{
            hi = m-1;
        }
    }
    return false;
}