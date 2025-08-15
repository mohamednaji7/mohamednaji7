import Queue from "@code/Queue";

test("queue", function () {
    const list = new Queue<number>();

    list.enqueue(5);
    list.enqueue(7);
    list.enqueue(9);

    expect(list.deque()).toEqual(5);
    expect(list.length).toEqual(2);

    // this must be wrong..?
    debugger;

    // i hate using debuggers
    list.enqueue(11);
    debugger;
    expect(list.deque()).toEqual(7);
    expect(list.deque()).toEqual(9);
    expect(list.peek()).toEqual(11);
    expect(list.deque()).toEqual(11);
    expect(list.deque()).toEqual(undefined);
    expect(list.length).toEqual(0);

    // just wanted to make sure that I could not blow up myself when i remove
    // everything
    list.enqueue(69);
    expect(list.peek()).toEqual(69);
    expect(list.length).toEqual(1);
});
function runTest(commands: string[], args: any[], expected: any[]) {
    let q: Queue<number> | null = null;

    commands.forEach((cmd, i) => {
        let result: any;

        switch (cmd) {
            case "MyQueue":
                q = new Queue<number>();
                result = null;
                break;
            case "enqueue":
                q!.enqueue(args[i][0]);
                result = null;
                break;
            case "deque":
                result = q!.deque();
                break;
            case "peek":
                result = q!.peek();
                break;

            case "empty":
                if ("isEmpty" in Queue.prototype &&
                    typeof (Queue.prototype as unknown as Record<string, unknown>)["isEmpty"] === "function") {
                    const fn = (q as unknown as Record<string, unknown>)["isEmpty"] as Function;
                    result = fn.call(q);
                } else {
                    result = undefined;
                }
                break;
            default:
                throw new Error(`Unknown command: ${cmd}`);
        }
        if(cmd == "empty"){
            if ("isEmpty" in Queue.prototype &&
                typeof (Queue.prototype as unknown as Record<string, unknown>)["isEmpty"] === "function") {

                expect(result).toEqual(expected[i]);
            } else {
                expect(undefined).toEqual(undefined);
            }
            
        }else{

            expect(result).toEqual(expected[i]);
        }
    });
}

test("Case 1", () => {
    runTest(
        ["MyQueue","enqueue","enqueue","enqueue","enqueue","enqueue","peek","enqueue","enqueue","enqueue","enqueue","peek","deque","deque","deque","deque","peek","deque","deque","peek","deque"],
        [[],[1],[4],[9],[2],[2],[],[1],[2],[7],[1],[],[],[],[],[],[],[],[],[],[]],
        [null,null,null,null,null,null,1,null,null,null,null,1,1,4,9,2,2,2,1,2,2]
    );
});

test("Case 2", () => {
    runTest(
        ["MyQueue","enqueue","enqueue","enqueue","enqueue","enqueue","enqueue","enqueue","enqueue","enqueue","enqueue","peek","deque","deque","deque","deque","deque","deque","deque","peek","deque"],
        [[],[5],[6],[7],[6],[1],[8],[2],[5],[4],[7],[],[],[],[],[],[],[],[],[],[]],
        [null,null,null,null,null,null,null,null,null,null,null,5,5,6,7,6,1,8,2,5,5]
    );
});




type QueueTestCase = [string[], any[], any[]];

const all_test_cases_include_empty: QueueTestCase[] = [
    [
        ["MyQueue","enqueue","enqueue","peek","deque","empty"],
        [[],[1],[2],[],[],[]],
        [null,null,null,1,1,false]
    ]
    ,
    [
        ["MyQueue","empty","enqueue","enqueue","empty","peek","enqueue","enqueue","peek","deque","empty","peek","deque","empty"]
        ,[[],[],[1],[1],[],[],[5],[5],[],[],[],[],[],[]]
        ,[null,true,null,null,false,1,null,null,1,1,false,1,1,false]
    ]
    ,
    [
        ["MyQueue","enqueue","deque","enqueue","empty","enqueue","deque","peek","enqueue","empty","deque","deque","enqueue","enqueue","peek","empty","empty","empty","deque","deque","enqueue","enqueue","deque","empty","empty","deque","enqueue","empty","enqueue","deque","enqueue","peek","empty","deque","peek","enqueue","empty","enqueue","empty","enqueue","peek","deque","empty","empty","deque","enqueue","deque","deque","empty","enqueue","deque","enqueue","enqueue","empty","empty","empty","peek","peek","peek","empty","deque","empty","deque","enqueue","empty","deque","deque","enqueue","empty","enqueue","deque","empty","deque","enqueue","peek","deque","enqueue","enqueue","enqueue","enqueue","empty","deque","peek","deque","deque","enqueue","peek","deque","deque","enqueue","deque","enqueue","peek","enqueue","empty","enqueue","empty","enqueue","peek","deque","deque"]
        ,[[],[7],[],[8],[],[4],[],[],[4],[],[],[],[5],[7],[],[],[],[],[],[],[9],[8],[],[],[],[],[9],[],[4],[],[5],[],[],[],[],[6],[],[7],[],[5],[],[],[],[],[],[5],[],[],[],[2],[],[7],[5],[],[],[],[],[],[],[],[],[],[],[2],[],[],[],[8],[],[2],[],[],[],[2],[],[],[1],[7],[9],[5],[],[],[],[],[],[8],[],[],[],[7],[],[6],[],[7],[],[4],[],[2],[],[],[]]
        ,[null,null,7,null,false,null,8,4,null,false,4,4,null,null,5,false,false,false,5,7,null,null,9,false,false,8,null,false,null,9,null,4,false,4,5,null,false,null,false,null,5,5,false,false,6,null,7,5,false,null,5,null,null,false,false,false,2,2,2,false,2,false,7,null,false,5,2,null,false,null,8,false,2,null,2,2,null,null,null,null,false,1,7,7,9,null,5,5,8,null,7,null,6,null,false,null,false,null,6,6,7]

    ]
    ,
    [

        ["MyQueue","enqueue","enqueue","enqueue","enqueue","enqueue","enqueue","enqueue","enqueue","enqueue","enqueue","peek","deque","deque","deque","deque","deque","deque","empty","peek","deque"]
        ,[[],[4],[5],[6],[7],[8],[1],[1],[2],[3],[4],[],[],[],[],[],[],[],[],[],[]]
        ,[null,null,null,null,null,null,null,null,null,null,null,4,4,5,6,7,8,1,false,1,1]
    ]
    ,
    [
        ["MyQueue","empty","enqueue","enqueue","enqueue","enqueue","enqueue","empty","enqueue","enqueue","enqueue","peek","empty","peek","deque","deque","empty","deque","deque","peek","deque"]
        ,[[],[],[1],[1],[1],[1],[1],[],[3],[4],[5],[],[],[],[],[],[],[],[],[],[]]
        ,[null,true,null,null,null,null,null,false,null,null,null,1,false,1,1,1,false,1,1,1,1]
    ]
    ,
    [

        ["MyQueue","enqueue","deque","empty","enqueue","deque","enqueue","deque","enqueue","peek","empty","deque","enqueue","deque","enqueue","peek","deque","empty","enqueue","deque","enqueue"]
        ,[[],[1],[],[],[2],[],[3],[],[4],[],[],[],[5],[],[6],[],[],[],[7],[],[8]]
        ,[null,null,1,true,null,2,null,3,null,4,false,4,null,5,null,6,6,true,null,7,null]
    ]
    ,
    [

        ["MyQueue","enqueue","enqueue","peek","deque","enqueue","empty","deque","deque","enqueue","enqueue","empty","enqueue","empty","deque","deque","peek","peek","peek","empty","empty","enqueue","deque","deque","enqueue","peek","deque","enqueue","empty","deque","enqueue","empty","empty","deque","enqueue","empty","deque","enqueue","empty","deque","enqueue","peek","enqueue","empty","deque","empty","deque","enqueue","deque","enqueue","empty","deque","enqueue","empty","deque","enqueue","deque","enqueue","peek","deque","enqueue","empty","deque","enqueue","deque","enqueue","enqueue","empty","enqueue","enqueue","deque","empty","deque","enqueue","deque","peek","deque","deque","enqueue","peek","peek","enqueue","empty","enqueue","enqueue","empty","empty","peek","empty","enqueue","deque","deque","deque","peek","empty","deque","enqueue","peek","empty","empty","peek"]
        ,[[],[9],[3],[],[],[5],[],[],[],[3],[8],[],[8],[],[],[],[],[],[],[],[],[4],[],[],[4],[],[],[8],[],[],[3],[],[],[],[4],[],[],[8],[],[],[2],[],[6],[],[],[],[],[1],[],[7],[],[],[8],[],[],[5],[],[6],[],[],[3],[],[],[9],[],[2],[6],[],[3],[5],[],[],[],[6],[],[],[],[],[9],[],[],[2],[],[3],[4],[],[],[],[],[3],[],[],[],[],[],[],[1],[],[],[],[]]
        ,[null,null,null,9,9,null,false,3,5,null,null,false,null,false,3,8,8,8,8,false,false,null,8,4,null,4,4,null,false,8,null,false,false,3,null,false,4,null,false,8,null,2,null,false,2,false,6,null,1,null,false,7,null,false,8,null,5,null,6,6,null,false,3,null,9,null,null,false,null,null,2,false,6,null,3,5,5,6,null,9,9,null,false,null,null,false,false,9,false,null,9,2,3,4,false,4,null,3,false,false,3]
    ]
]


let i = 0
for(const testCase of all_test_cases_include_empty){
    test(`Case ${i+1} (includes empty)`, () => {
        runTest(
            testCase[0],
            testCase[1],
            testCase[2],
            
        );
    });
    i++;
}