/**
 * The Last Crusade - Episode 2
 * https://www.codingame.com/training/hard/the-last-crusade-episode-2
 * Statement:
 * The goal of the puzzle is to select rooms to pivot from a 2 dimensional
 * grid to help Indiana Jones find his way to the exit. This puzzle requires
 * to build the tree of all the possible rotations that can be performed
 * over time, and use some heuristics to perform some predictive
 * optimisations to avoid unnecessary computation.
 * Story:
 * Indiana Jones nevers listens. We told him that forbidden temples are
 * dangerous, but there he is, dashing through a moving labyrinth and
 * risking his life.
 * Dodge the traps, and help him find his way out of this highway to hell.
 * Beware of the rolling stone!
 */
//W - number of columns.
//H - number of rows.
let [W, H] = readline().split` `.map(n => n);
const map = [];

while(H--) {
  map.push(readline().split` `.map(n => +n));
}
//EX - the coordinate along the X axis of the exit.
const [EX, rocksblocked] = [+readline(), []];

const dirs = {
  '1T': {y: 1, dir: 'T'},
  '1L': {y: 1, dir: 'T'},
  '1R': {y: 1, dir: 'T'},
  '2L': {x: 1, dir: 'L'},
  '2R': {x: -1, dir: 'R'},
  '3T': {y: 1, dir: 'T'},
  '4T': {x: -1, dir: 'R'},
  '4R': {y: 1, dir: 'T'},
  '5T': {x: 1, dir: 'L'},
  '5L': {y: 1, dir: 'T'},
  '6L': {x: 1, dir: 'L'},
  '6R': {x: -1, dir: 'R'},
  '7T': {y: 1, dir: 'T'},
  '7R': {y: 1, dir: 'T'},
  '8L': {y: 1, dir: 'T'},
  '8R': {y: 1, dir: 'T'},
  '9T': {y: 1, dir: 'T'},
  '9L': {y: 1, dir: 'T'},
  '10T': {x: -1, dir: 'R'},
  '11T': {x: 1, dir: 'L'},
  '12R': {y: 1, dir: 'T'},
  '13L': {y: 1, dir: 'T'}
};

const turns = {
  '2L': 3,
  '2R': 3,
  '3L': 2,
  '3R': 2,
  '4L': 5,
  '4R': 5,
  '5L': 4,
  '5R': 4,
  '6L': 9,
  '6R': 7,
  '7L': 6,
  '7R': 8,
  '8L': 7,
  '8R': 9,
  '9L': 8,
  '9R': 6,
  '10L': 13,
  '10R': 11,
  '11L': 10,
  '11R': 12,
  '12L': 11,
  '12R': 13,
  '13L': 12,
  '13R': 10
};

const findPos = ({x, y, dir}) => {
  const stone = map[y][x];
  const newPath = [{
    move: dirs[Math.abs(stone) + dir] 
  }];
  
  stone &&
    newPath.push({
      turn: 'LEFT',
      move: dirs[turns[stone + 'L'] + dir]
    }, {
      turn: 'LEFT',
      move: dirs[turns[turns[stone + 'L'] + 'L'] + dir]
    }, {
      turn: 'RIGHT',
      move: dirs[turns[stone + 'R'] + dir]
    });
  
  return newPath.map(({turn, move}) =>
    move
        ? {
          x: x, 
          y: y, 
          dir: dir, 
          turn: turn,
          next: {
            x: x + (move.x || 0), 
            y: y + (move.y || 0), 
            dir: move.dir
          }
        }
        : null
  ).filter(n => n);
};

const findExit = (pos, newPath = []) => {
  if (pos.x === EX && pos.y === map.length) {
    return newPath;
  }
  if (pos.y >= map.length || pos.x < 0 || pos.x > map[0].length) {
    return null;
  }
  for (let move of findPos(pos)) {
    newPath.push(move);
    if (findExit(move.next, newPath)) {
      return newPath;
    }
    newPath.splice(newPath.length - 1, newPath.length);
  }
  return null;
};

const findRockRoute = ({x, y, dir}, newPath = []) => {
  if (y >= map.length || x < 0 || x >= map[0].length) {
    return newPath;
  }
  newPath.push({x: x, y: y, dir: dir});
  const move = dirs[Math.abs(map[y][x]) + dir];
  if (!move) {
    return newPath;
  }
  return findRockRoute({
    x: x + (move.x || 0),
    y: y + (move.y || 0),
    dir: move.dir
  }, newPath);
};

let findStone = (path) => path.slice(1).map(({x, y, dir}) => {
  let stone = map[y][x];
  if (stone > 1) {
    if (!dirs[turns[stone + 'L'] + dir]) {
      return {x:x, y:y, turn: 'LEFT'};
    }
    return {x:x, y:y, turn: 'RIGHT'};
  }
  return null;
}).filter(s => s);

// Game loop
while (true) {
  const [XI, YI, POSI] = readline().split` `;
  const indy = {
    x: +XI,
    y: +YI,
    dir: POSI[0]
  };
  let [R, rocks] = [+readline(), []];

  while(R--) {
    const [XR, YR, POSR] = readline().split` `;
    rocks.push(findRockRoute({x: +XR, y: +YR, dir: POSR[0]}));
  }
  rocks = rocks.map(findStone).filter(x => x.length > 0);

  let path = findExit(indy);
  let turnable = path.find(x => x.turn);
  
  while (rocks.length && path.indexOf(turnable) > 1) {
    const crushed = rocks.sort((a, b) => a.length - b.length)[0];
    const curr = crushed[0];
    (indy.x === curr.x && indy.y === curr.y || rocksblocked.find(({x, y}) => x === curr.x && y === curr.y))
        ? 
          rocks.splice(rocks.indexOf(crushed), 1)
        : (
          turnable = curr,
          rocksblocked.push(turnable)
        );
  }
    
  if (turnable) {
    const {x, y, turn} = turnable;
    map[y][x] = turns[map[y][x] + turn[0]];
    print(x, y, turn);
  } else {
    print('WAIT');
  }
}
