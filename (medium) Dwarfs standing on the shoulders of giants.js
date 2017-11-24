/**
 * Dwarfs standing on the shoulders of giants (medium)
 * This puzzle uses the oriented graph data structure. You can solve it
 * using recursive function to go through nodes of a tree using a Depth
 * First Search Algorithm.
 * 
 * Statement:
 * The goal of the puzzle is to make you compute the height of a tree data
 * structure. It will make you discover how to build a tree and use
 * recursive algorithm to compute the longest chain of nodes. The graph
 * theory behind the algorithm of this puzzle is one of the most important
 * aspects of programming and is at the base for a lot of tools and
 * application today (like google, facebook, twitter, …).
 * 
 * Story:
 * It is sometimes interesting to find what authors has influenced our
 * favorite writer. What if we tried to find out who herited from whom, with
 * the help of an influence graph?
 */
let N = +readline(); // the number of relationships of influence

const persons = {};
const influencers = {};
let relations = 0;
const find = (x) => {
    !influencers[x] && (influencers[x] = persons[x].reduce((p, y) => Math.max(p, find(y) + 1), 1));
    return influencers[x];
};

while(N--) { // for (let i = 0; i < N; i++)
    const inputs = readline().split` `;
     // a relationship of influence between two people (x influences y)
    const [x, y] = [+inputs[0], +inputs[1]];
    [persons[x], persons[y]] = [persons[x] || [], persons[y] || []];
    persons[x].push(y);
}


for(let person in persons) {
    relations = Math.max(relations, find(person));
}

print(relations);