import two_crystal_balls from "@code/TwoCrystalBalls";

test("two crystal balls", function () {

    const data2 = new Array(100).fill(false);
    data2[data2.length-1] = true;

    let idx = Math.floor(Math.random() * 10000);
    const data = new Array(10000).fill(false);

    for (let i = idx; i < 10000; ++i) {
        data[i] = true;
    }

    expect(two_crystal_balls(new Array(1).fill(true))).toEqual(0);
    expect(two_crystal_balls(new Array(1).fill(false))).toEqual(-1);
    expect(two_crystal_balls(new Array(10).fill(true))).toEqual(0);
    expect(two_crystal_balls(data2)).toEqual(data2.length-1);
    expect(two_crystal_balls(new Array(821).fill(false))).toEqual(-1);
    expect(two_crystal_balls(data)).toEqual(idx);
});

