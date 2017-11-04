/**  Conway sequence (medium) https://www.codingame.com/training/medium/conway-sequence
 * This puzzle validates that you can manage creation and update of lists.
 * It also uses nested loops.
 * 
 * Statement:
 * The goal of this puzzle is to make you work with a mathematical series:
 * The Conway Sequence. Discover how to generate terms of a series
 * interatively.
 * 
 * Story:
 * A Conway Sequence is a funny mathematical object where an element
 * describes the previous one, and recursively. Beware of cognitive exertion
 * on this one!
**/
let [R, L] = [String(readline()), +readline()];

for (let i=1; i < L; i++) {
    R = R
        .match(/(\d+)( \1)*/g)
        .map( n=>(n = n.trim().split` `, `${n.length} ${n[0]}`) )
        .join` `;
}

print(R);