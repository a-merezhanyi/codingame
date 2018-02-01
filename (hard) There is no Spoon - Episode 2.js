/**
 * There is no Spoon - Episode 2
 * https://www.codingame.com/training/hard/there-is-no-spoon-episode-2
 * Statement:
 * You need to solve a game of Hashiwokakero, building bridges between cells
 * of a grid, forming a graph. In order to solve this problem, you will need
 * an efficient way to store possible solutions for each step, and backtrack
 * through this possibilities in order to find the optimal one.
 * Story:
 * Zion is being attacked from everywhere. The last free humans count on you
 * to enhance the triggering mechanism of the APUs (Armored Personal Unit)
 * in order to give humanity a decisive tactical advantage. Second phase:
 * improve the power supply circuit of the APU without making any short
 * circuit or overheating the system.
 */
const [width, height] = [+readline(), +readline()];
const nodes = [];
const grid = [];

for (let y = 0; y < height; y++) {
    grid.push(readline().split``.map((c, x) => {
    if (c !== '.') {
        nodes.push({x:x, y:y, wanted:+c});
        return true;
    }
    
    return false;
  }));
}

const combinations = {
    1: [[0], [1], [2]],
    2: [[0, 1], [0, 2], [1, 2], [0, 0], [1, 1], [2, 2]],
    3: [[0, 1, 2], [0, 0, 1], [0, 0, 2], [1, 1, 0], [1, 1, 2], [2, 2, 0], [2, 2, 1]],
    4: [[0, 0, 1, 2], [1, 1, 0, 2], [2, 2, 0, 1], [0, 0, 1, 1], [0, 0, 2, 2], [1, 1, 2, 2]],
    5: [[0, 0, 1, 1, 2], [0, 0, 2, 2, 1], [1, 1, 2, 2, 0]],
    6: [[0, 0, 1, 1, 2, 3], [0, 0, 1, 2, 2, 3], [0, 0, 1, 2, 3, 3], [0, 1, 1, 2, 2, 3], [0, 1, 1, 2, 3, 3], [0, 1, 1, 2, 2, 3], [0, 0, 1, 1, 2, 2], [0, 0, 1, 1, 3, 3], [3, 3, 1, 1, 2, 2], [0, 0, 3, 3, 2, 2]]
  };
  
const order = (n1, n2) => n1.x > n2.x || (n1.x === n2.x && n1.y > n2.y) ? [n2, n1] : [n1, n2];
const count = (el, arr) => arr.reduce((a, e) => a += e === el ? 1 : 0, 0);

const search = (start, axis, direction = true) => {
    const end = {x:start.x, y:start.y};
    const limit = axis === 'x' ? width : height;
    const findNode = node => node.x === end.x && node.y === end.y && node.wanted > 0;
    
    while(direction ? (++end[axis] < limit) : (--end[axis] >= 0)) {
        if (grid[end.y][end.x]) {
          return nodes.find(findNode) || null;
        }
    }
    
    return null;
};

const isCrossed = (link, links) => {
    const [{x: sx1, y: sy1}, {x: ex1, y:ey1}] = link;
    
    return links.some(([{x: sx2, y: sy2}, {x: ex2, y:ey2}]) => 
        sx1 === ex1
            ? sy2 === ey2 && sx2 < sx1 && ex2 > sx1 && sy2 > sy1 && sy2 < ey1
            : sx2 === ex2 && sy2 < sy1 && ey2 > sy1 && sx2 > sx1 && sx2 < ex1
        );
};

const linksCombination = (node, neighbours, links) =>
  (combinations[node.wanted] || [])
    .filter(N =>
    N.every(i => neighbours[i]) && N.filter(i => count(i, N) == 2).every(i => neighbours[i].wanted >= 2))
    .map(N => N.map(i => order(node, neighbours[i])))
    .filter(x => !x.some(l => isCrossed(l, links)));

const checkCriteria = (nodes, links) => {
    if (nodes.find(n => n.wanted)) {
        return false;
    }
    
    const group = [links[0][0]];
    const uniq = [];
    let node;
    const filterLinks = links => links.filter(([n1, n2]) => n1 === node || n2 === node).map(([n1, n2]) => n1 === node ? n2 : n1);
    
    for (let i = 0; i < group.length; i++) {
        node = group[i];  
        for (let linked of filterLinks(links)) {
            group.indexOf(linked) === -1 && group.push(linked);
        }
    }
    
    links.forEach(link => link.forEach(n => uniq.indexOf(n) === -1 ? uniq.push(n) : null));
    
    return uniq.length === group.length;
};

const fillNode = (node, links = []) => {
    if (!node) {
        return checkCriteria(nodes, links) ? links : null;
    } else if (links.length && checkCriteria(nodes, links)) {
        return links;
    }
    
    const neighbours = [
        search(node, 'x'),    
        search(node, 'y'),
        search(node, 'x', false),
        search(node, 'y', false)
    ].filter(n => n);
    
    for (let newLink of linksCombination(node, neighbours, links)) {
        newLink.forEach(link => link.forEach(node => node.wanted--));
        const result = fillNode(nodes.find(n => n.wanted), links.concat(newLink));
        
        if (result) {
            return result;
        }
        newLink.forEach(link => link.forEach(node => node.wanted++));
    }
    
    return null;
};

print(fillNode(nodes[0]).map(([{x: x1, y: y1}, {x: x2, y:y2}]) => [x1, y1, x2, y2, 1].join` `).join`\n`);
