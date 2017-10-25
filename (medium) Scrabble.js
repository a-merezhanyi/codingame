/** Scrabble (medium) https://www.codingame.com/training/medium/scrabble
 * This puzzle makes you use nested loops and combine multiple associative
 * arrays in order to build an efficient solution.
 * 
 * Statement:
 * The goal of this problem is to find a word from a dictionary to get the
 * best score at the popular scrabble game. The solving of this problem
 * relies on associative arrays and the methodology used to compute the
 * best score. A good choice of the data structure is often the key to
 * correctly solve a puzzle.
 * 
 * Story:
 * When you play scrabble on sundays with your family, the situation quickly
 * goes out of hand. What's the best move ? Should you play "pool" or "loop"?
 * What will grandma do ? Here we propose a new puzzle to calculate the
 * best word to play out of a list.
 */

const value = {
    e: 1, a: 1, i: 1, o: 1, n: 1, r: 1, t: 1, l: 1, s: 1, u: 1,
    d: 2, g: 2,
    b: 3, c: 3, m: 3, p: 3,
    f: 4, h: 4, v: 4, w: 4, y: 4,
    k: 5,
    j: 8, x: 8,
    q: 10, z: 10
    };

const Words = [...Array(+readline())].map(_ => readline());

const LETTERS = readline();

let max = -Infinity;
let word = '';

Words.forEach((w) => {
    let sum = 0;
    const currentSet = [...LETTERS];
    [...w].forEach((currentLetter) => {
        sum += (currentSet.includes(currentLetter))
            ? (currentSet[currentSet.indexOf(currentLetter)] = '', value[currentLetter])
            : -Infinity;
    });
    
    sum > max && (word = w, max = sum);
});

print(word);