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
const inputs = readline().split` `;
const [N, L, E] = [+inputs[0], +inputs[1], +inputs[2]];
// N - the total number of nodes in the level, including the gateways
// L - the number of links
// E - the number of exit gateways

const nodes = new Array(N).fill().map(_ => []);

for (let i = 0; i < L; i++) {
    const inputs = readline().split` `;
    const [N1, N2] = [+inputs[0], +inputs[1]];
    // N1 and N2 defines a link between these nodes
    // create a hashmap
    nodes[N1][N2] = N2;
    nodes[N2][N1] = N1;
}

// the index of a gateway node
const EI = new Array(E).fill().map(_ => +readline());

// game loop
while (true) {
    const SI = +readline();
    // SI is the index of the node on which the Skynet agent is positioned this turn
    for (let i = 0; i < E; i++) {
        if (nodes[SI][EI[i]]) {
             print(`${SI} ${EI[i]}`);
             delete nodes[SI][EI[i]];
            break;
        } else if (i === E - 1) {
             print(`${SI} ${nodes[SI][Object.keys(nodes[SI])[0]]}`);
            delete nodes[SI][Object.keys(nodes[SI])[0]];
        }
    }
}