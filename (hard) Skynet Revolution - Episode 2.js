/**
 * Skynet Revolution - Episode 2 (hard)
 * https://www.codingame.com/training/hard/skynet-revolution-episode-2
 * Statement:
 * This problem plays out on a graph where a “virus” moves from nodes to
 * nodes, looking for an exit. There are several exits and you have to cut
 * access to these exits by finding the best link to cut each turn, from the
 * limited amount of cutable links. You will manage complex data structure
 * like a tree where all nodes can store a graph.
 * 
 * Story:
 * The Skynet network is still active, although the Resistance's virus is
 * spreading. Help the virus spread by cutting out Skynet's resources. The
 * fate of Humanity depends on you.
 */
let [nodeNb, linkNb, exitNb] = readline().split` `.map(n => +n);
const nodes = [];

for (let i = 0 ; i < nodeNb ; i++) {
  nodes[i] = {
      idx: i,
      links: []
  };
}
while (linkNb--) {
  const [i, j] = readline().split` `.map(n => +n);
  nodes[i].links.push(j);
  nodes[j].links.push(i);
}

const exits = [];
while (exitNb--) {
  exits.push(+readline());
}

const findPath = (start, end) => {
  // Dijkstra algorithm
  const analyzed = [];
  const result = [];
  
  nodes.forEach(node => {
    [node.weight, node.previous] = [Infinity, null];
    analyzed.push(node);
  });
  
  start.weight = 0;
  while (analyzed.length > 0) {
    const next = analyzed.reduce((min, node) => node.weight < min.weight ? node : min);
    
    analyzed.splice(analyzed.indexOf(next), 1);
    next.links.forEach(i => {
      let child = nodes[i];
      
      if (exits.indexOf(i) === -1 && child.weight > next.weight + 1) {
        [child.weight, child.previous] = [next.weight + 1, next];
      }
    });
  }
  
  for (let node = end; node; node = node.previous) {
    result.unshift(node);
  }
  
  return result;
};

const findExits = (exits, virus) => exits.map(e =>
    findPath(nodes[e], nodes[virus]))
    .filter(p => p.length > 1)
    .sort((a, b) => a.length - b.length);
const findDoubles = x => exits.indexOf(x) >= 0;
const filterNodes = node => node.links.filter(findDoubles).length === 2;
const mapDoubles = (doubles, virus) => doubles.map(n => findPath(n, nodes[virus]));
const findGateway = paths => paths.map(p => p.map(n => n.links.some(findDoubles) ? 1 : -1).reduce((a, n) => a + n));

while (true) {
  const virus = +readline();
  const paths = findExits(exits, virus);
  let path = paths[0];
  
  if (path.length >= 3) {
    const doubles = nodes.filter(filterNodes);
    
    if (doubles.length > 0) {
      const paths = mapDoubles(doubles, virus);
      const weight = findGateway(paths);
      const max = Math.max(...weight);
      
      path = {length: Infinity};
      for (let i = 0; i < weight.length; i++) {
        if (weight[i] === max && paths[i].length < path.length) {
          path = paths[i];
        }
      }
      path.unshift(nodes[path[0].links.find(findDoubles)]);
    }
  }
  
  if (path.length >= 2) {
    const [start, end] = [path[0], path[1]];
    
    start.links.splice(start.links.indexOf(end.idx), 1);
    end.links.splice(end.links.indexOf(start.idx), 1);
    print(`${start.idx} ${end.idx}`);
  }
}
