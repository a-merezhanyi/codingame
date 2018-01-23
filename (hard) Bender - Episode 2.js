/**
 * Bender - Episode 2
 * https://www.codingame.com/training/hard/bender-episode-2
 * 
 * Statement:
 * You have to find a way out of a maze, except you are not looking for the
 * shortest path, but to maximize the combined weight of the nodes you
 * traverse. You can tweak an existing shortest-path algorithm or implement
 * your own weighted graph search.
 * 
 * Story:
 * Jackpot! Bender finds himself in the building of CodinGame, an incredibly
 * vast series of corridors and rooms. The employees at CodinGame being a
 * bit distracted by their work, they accidently drop bank notes every now
 * and then (on the way to the coffee machine, the pool, the billiard table,
 * ?). There's a large amount of cash to grab, and Bender is decided to get
 * his share.
 * Help him to get as much money as he can and leave the building before the
 * angry employees of CodinGame behead him to salvage his RAM.
 */
const N = +readline();
const rooms = [...Array(N + 1)];

for (let i = 0; i < N; i++) {
    const room = readline().split` `;
    
    rooms[i] = {
        id: +room[0],
        money: +room[1],
        total: 0,
        next: [(room[2] == 'E') ? N : +room[2], (room[3] == 'E') ? N : +room[3]],
    };
}

rooms[N] = {id: N, money: 0, total: 0, next: []};

const edge = [0];
const explore = (v, i) => {
    if (rooms[v].money + rooms[v].total  > rooms[rooms[v].next[i]].total) {
        edge.push(rooms[v].next[i]);
        rooms[rooms[v].next[i]].total = rooms[v].money + rooms[v].total;
    }
};

while (edge.length > 0) {
    const current = edge.shift();
    
    if (current < N) {
        explore(current, 0);
        explore(current, 1);
    }
}

print(rooms[N].total);
