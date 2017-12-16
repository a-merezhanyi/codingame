/** (medium) Skynet Revolution - Episode 1 https://www.codingame.com/training/medium/skynet-revolution-episode-1/
 * In this puzzle, you will learn to store data in a graph data structure.
 * Searching through and updating the graph you’ve created will help you get
 * to grips with Graph Theory.
 * 
 * Statement:
 * This problem plays out on a graph where a “virus” moves from node to node,
 * in search of an exit. There are several exits and you have to cut access
 * to these exits by finding the best link to cut each turn.
 * 
 * Story:
 * The virus from the resistance is spreading through the Skynet network.
 * But Skynet is sending its agents to fight back! Prevent Skynet from
 * destroying the virus by severing the right network links...
 */
// N - the total number of nodes in the level, including the gates
// L - the number of links
// E - the number of exit gates
let [N, L, E] = readline().split` `.map(Number);
const nodes = new Array(N).fill().map(_ => []);

while (L--) {
    const [N1, N2] = readline().split` `.map(Number);
    // N1 and N2 defines a link between these nodes
    // create a Graph
    nodes[N1][N2] = N2;
    nodes[N2][N1] = N1;
}

// the index of a gate node
const EI = new Array(E).fill().map(_ => +readline());

// game loop
while (1) {
    const SI = +readline();
    // SI is the index of the node on which the Skynet agent is positioned this turn
    for (let i = 0; i < E; i++) {
        const node = nodes[SI]; 
        const gate = EI[i];
        
        if (node[gate]) {
            print(`${SI} ${gate}`);
            delete node[gate];
            break;
        } else if (E - 1 === i) {
            print(`${SI} ${node[Object.keys(node)[0]]}`);
            delete node[Object.keys(node)[0]];
        }
    }
}
