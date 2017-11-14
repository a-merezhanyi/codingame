/**
 * Telephone Numbers (medium) https://www.codingame.com/training/medium/telephone-numbers
 * In this puzzle, you learn new ways and reasons to store data in optimized
 * structures such as tries and get a better understanding of graph/tree
 * theory.
 * 
 * Statement:
 * The goal of this puzzle is to store multiple phone numbers in a compact
 * way, using a tree data structure, then count all the nodes there are in
 * this tree. Be careful that you may need several tree roots.
 * 
 * Story:
 * Dang, all those telephone numbers are impossible to remember! What if we
 * were to invent a new way to store phone numbers so that they take the
 * least memory space? It is your task today to achieve that hard work. Then
 * call me, maybe ?
 */
const telephone = Array.from({length: +readline()}, readline).sort();
let num = telephone[0].length;

for (let i = 1; i < telephone.length; i++) {
    let result = 0;
    const arr1 = telephone[i - 1];
    const arr2 = telephone[i];
    const diff = arr2.length - arr1.length;
    const max = arr2.length - diff;
    
    (diff !== 0) && (result += diff);
    
    for (let j = 0; j < max; j++) {
        if (arr1[j] != arr2[j]) {
            result += max - j;
            break;
        }
    }
    num += result;
}

// The number of elements (referencing a number) stored in the structure.
print(num);
