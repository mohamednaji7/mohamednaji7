interface TrieNode{
    c: string,
    children: (TrieNode | null)[],
    isWord: boolean,
    numShares: number,
}

export default class Trie {
    
    private roots: (null | TrieNode)[];
    

    constructor() {
        // this.roots = [];
        this.roots = new Array(26).fill(null);

    }

    insert(item: string): void {
        item = item.toLocaleLowerCase();
        let lvl = this.roots
        for (let i =0 ; i<item.length; i++){
            const c = item.charAt(i);
            const idx = this.getCharIdx(c);
            const elmnt = lvl[idx]
            if (elmnt == null){ 
                const node : TrieNode = {
                    c: c,
                    children:  new Array(26).fill(null),
                    numShares:  1,
                    isWord:  (i == item.length-1),
                }
                lvl[idx] = node
                lvl = node.children
            } else {
                lvl = elmnt.children;
                elmnt.numShares += 1;
            }

        }

    }
    find(partial: string): string[] {
        let lvl = this.roots;
        let node = null; // starting Node
        for(let c of partial ){
            const idx = this.getCharIdx(c)
            
            node = lvl[idx]
            if (node == null){
                break                
            }
            else{
                lvl = node.children

            }
        }
        const result: string[] = [];
        if (node != null){ // starting Node
            if (node.isWord) result.push(partial+node.c) 
            const res = this.getWords(node, partial) 
            // console.log(res)
            result.push(...res)

        }
        // console.log(result)
        return result;
    }
    getWords(node: TrieNode, pre: string): string[]{
        const result : string[] = [];

        for (let child of node.children){
            if (child) {
                const partial = pre + child.c 
                if (child.isWord) {
                    result.push(partial)
                }
                const x = this.getWords(child, partial)
                result.push(...x)

            }
        }
        return result;
    }
    getCharIdx(c: string): number{
        const idx = c.charCodeAt(0) - "a".charCodeAt(0) 
        return idx

    }

    delete(item: string): void {
        let lvl = this.roots;
        let node = null; // starting Node
        for(let c of item ){
            const idx = this.getCharIdx(c)
            
            node = lvl[idx]
            if (node == null){
                break                
            }
            else{
                lvl = node.children

            }
        }
        if (node && node.isWord) node.isWord = false 

    }

}

