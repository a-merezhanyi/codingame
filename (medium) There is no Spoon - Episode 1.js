/** There is no Spoon - Ep. 1 (medium) https://www.codingame.com/training/medium/there-is-no-spoon-episode-1
 * In this puzzle, you have to detect special characters from a string. You
 * also have to store input values into a grid to explore it. You have to go
 * through all elements from a grid (certainly using a double loop) and from
 * those points, iterate again on some elements of the grid. Solving this
 * puzzle make you learn the concept of nested loop.
 *
 * Statement:
 * The goal is to find, when they exist, the horizontal and vertical neighbors
 * nodes from a two dimensional array. The difficulty is in the number of
 * nested loops that this puzzle can make you write. Do not get lost!
 *
 * Story:
 * Zion is being attacked from everywhere. The last free humans count on you to
 * enhance the triggering mechanism of the APUs (Armored Personal Unit) in
 * order to give humanity a decisive tactical advantage. First phase: code the
 * initialization mechanism of the APU.
 **/
const width = parseInt(readline()); // the number of cells on the X axis
const height = parseInt(readline()); // the number of cells on the Y axis
let matrix = [];

for (let i = 0; i < height; i++) { // store all rows
    matrix.push(readline()); // width characters, each either 0 or .
}

for (let y1 = 0; y1 < height; y1++) {
    for (let x1 = 0; x1 < width; x1++) {
        if (matrix[y1].charAt(x1) === '.') {
            continue; // stop iterating if this cell is empty
        }

        let x2 = y2 = '-1';
        let x3 = y3 = '-1';

        const nextX = +(matrix[y1].slice(x1 + 1).indexOf('0') + 1); // get the very right Cell X2
        x2 = (nextX && x1 + 1 < width) ? nextX + x1 : '-1';

        for (let j = y1 + 1; j < height; j++) {
            if ('0' === matrix[j].charAt(x1)) { // get the very next below Cell Y3
                y3 = j; // store current position and
                break; // stop irerating if found
            }
        }

        y2 = (x2 !== '-1') ? y1 : '-1'; // add to the result Right Cell X2 Y2
        x3 = (y3 !== '-1') ? x1 : '-1'; // add to the result Below Cell X3 Y3
        // Three coordinates: a node, its right neighbor, its bottom neighbor
        print(`${x1} ${y1} ${x2} ${y2} ${x3} ${y3}`); // print cells
    }
}