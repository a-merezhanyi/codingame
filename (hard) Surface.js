/**
 * Surface
 * https://www.codingame.com/training/hard/surface
 * Statement:
 * The goal of this puzzle is to find in a grid the list of adjacents cells
 * that are from the same type (water or ground) and compute the size of the
 * surface. The complexity of the problem is related to the size of the grid
 * and the need to optimize the number of iteration. You will also have to
 * count cells only once during your traversal.
 * Story:
 * Did you know that the distance between your thumb and your little finger
 * is roughly 20cm? Quite useful to evaluate distances, don't you think?
 * Speaking of evaluating distances, take out your geometry tools, because
 * you will have to measure and compare surface areas with this puzzle.
 */
const [width, height] = [+readline(), +readline()];
const surface = Array(height).fill().map(_ => readline().split``.map(c => c === 'O'));
const N = +readline();
const points = Array(N).fill().map(_ => {
        let [x, y] = readline().split` `.map(n => +n);
        return {x, y};
    });

const findPath = (start, surface, height, width) => {
    const [lake, stack, maxHeight, maxWidth] = [[], [start], surface.length - 2, surface[0].length - 2];
    let i = 0;
    
    while(i < stack.length) {
        const point = stack[i++];

        if (surface[point.y][point.x]) {
            surface[point.y][point.x] = false;
            lake.push(point);
            point.y <= maxHeight && stack.push({x: point.x, y: point.y + 1});
            point.y >= 1 && stack.push({x: point.x, y: point.y - 1});
            point.x <= maxWidth && stack.push({x: point.x + 1, y: point.y});
            point.x >= 1 && stack.push({x: point.x - 1, y: point.y});
        }
    }
    
    return lake;
};

const lakes = [];

points.forEach(({x, y}) => {
    let lake = lakes.find(lake => lake.find(p => p.x === x && p.y === y));
    
    if (!lake) {
        lake = findPath({x: x, y: y}, surface);
        lake.length && lakes.push(lake);
    }
    
    print(lake.length);
});