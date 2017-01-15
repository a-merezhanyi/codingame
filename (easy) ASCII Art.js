/** ASCII Art (easy) https://www.codingame.com/training/easy/ascii-art
 * Solving this puzzle teaches how to manage strings and array arithmetics.
 * You'll know how to split a string into separate parts and concatenate them
 * into a new one.
 * You can use indexes of arrays
 *
 * Statement:
 * The goal of the problem is to simulate an old airport terminal display: your
 * program must display a line of text in ASCII art.
 * You have to split strings, store them and recreate others. You can use data
 * structures like arrays or hash tables.
 *
 * Story:
 * Do you feel you are an artist at heart? Unfortunately you are a programmer :(
 * Why not give a try at ...
 *     __    ___   ___  ____  ____      __    ____  ____ 
 *   /__\  / __) / __)(_  _)(_  _)    /__\  (  _ \(_  _)
 *  /(__)\ \__ \( (__  _)(_  _)(_    /(__)\  )   /  )(  
 * (__)(__)(___/ \___)(____)(____)  (__)(__)(_)\_) (__)
 *
 * In this puzzle, transform strings of characters into ASCII ART.
**/
var L = parseInt(readline());
var H = parseInt(readline());
var T = readline();
var abcIndex = {
    a: 0,
    b: 1,
    c: 2,
    d: 3,
    e: 4,
    f: 5,
    g: 6,
    h: 7,
    i: 8,
    j: 9,
    k: 10,
    l: 11,
    m: 12,
    n: 13,
    o: 14,
    p: 15,
    q: 16,
    r: 17,
    s: 18,
    t: 19,
    u: 20,
    v: 21,
    w: 22,
    x: 23,
    y: 24,
    z: 25
}
var abc = [];
var str = '';

for (var i = 0; i < H; i++) {
    var ROW = readline();
    abc[i] = ROW;
}

// Write an action using print()
// To debug: printErr('Debug messages...');
T = T.toLowerCase();
for (var j = 0; j < H; j++) {
    for (i = 0; i < T.length; i++ ) {
        var index = abcIndex[T[i]] * L;
        if (isNaN(index)) {
            index = 26 * L;
        }
        str += abc[j].slice(index, index + L);
    }
    str += '\n';
}

print(str);
