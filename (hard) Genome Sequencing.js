/**
 * Genome Sequencing (hard)
 * https://www.codingame.com/training/hard/genome-sequencing
 * Statement:
 * The goal of this puzzle is calculate the length of the shortest string
 * sequence that contains all the sub-sequences of the input data. You will
 * have to compute the list of all possible permutations and merge strings
 * together. This is also a good exercise for optimization and to discover
 * dynamic programming.
 * Story:
 * Guanine, Thymine, Cytosine... You might have heard of those things in
 * biology class, but forgot them on the spot. Don't worry, we all have. The
 * goal of this exercise is to find how to combine chains of nucleotides
 * (sorry, characters) in a way in which they take the least possible room.
 */
let N = +readline();
const subseq = [];

while (N--) {
    subseq.push(readline());
}

const results = [];

function mutate(arr, firstpart) {
    if (arr.length) {
        for(let i = 0; i < arr.length; i++) {
            const chain = arr.slice();
            const part = chain.splice(i, 1);
            mutate(chain, (firstpart || []).concat(part));
        }
    } else {
        let totalLength = firstpart.join``.length;
    
        if (firstpart.length === 1) {
            return results.push(firstpart[0].length);
        }
        
        for (let i=1; i<firstpart.length; i++) {
            const [curr, prev] = [firstpart[i], firstpart[i-1]];
            const [cLength, pLength] = [curr.length, prev.length];
    
            if (~prev.indexOf(curr)) {
                totalLength -= cLength;
            } else {
                for(let j = Math.max(0, pLength - cLength); j < pLength; j++) {
                    if (curr.indexOf(prev.slice(j)) === 0) {
                        totalLength -= pLength - j;
                        break;
                    }
                }
            }
        }
        results.push(totalLength);
    }
}

mutate(subseq);
print(Math.min(...results));
