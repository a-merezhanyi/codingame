/**
 * Vox Codei - Episode 1
 * https://www.codingame.com/training/hard/vox-codei-episode-1
 * Statement:
 * You need to find the best successive positions to place bombs on a grid,
 * in order to maximize the amount of destroyed blocks while minimizing the
 * amount of bombs used.
 * You will have to foresee the impact of your actions in order to create
 * new opportunities.
 * Story:
 * Help V hack the super-computer, Fate, from his vPad, by strategically
 * placing fork-bombs to destroy its firewall.
 */
class Matrix {
    constructor() {
        this.m = [];
        this.bombs = [];
    }

    init() {
        [this.width, this.height] = readline().split` `.map(Number);
        this.m = [...Array(this.height)].map(_ => readline().split``);
        
        return this;
    }

    burst(x, y) {
        this.m[y][x] = '.';
        const map = this.m;
        this.explosion(x, y, (x, y) => { map[y][x] = '.'; });

        return this;
    }

    explosion(x, y, cb) {
        for(let dx = 1; dx <= 3 && x + dx < this.width && this.m[y][x + dx] != '#'; dx++) {
            cb(x + dx, y);
        }

        for(let dx = 1; dx <= 3 && x - dx >= 0 && this.m[y][x-dx] != '#'; dx++) {
            cb(x - dx, y);
        }

        for(let dy = 1; dy <= 3 && y + dy < this.height && this.m[y+dy][x] != '#'; dy++) {
            cb(x, y + dy);
        }

        for(let dy = 1; dy <= 3 && y - dy >= 0 && this.m[y-dy][x] != '#'; dy++) {
            cb(x, y - dy);
        }
    }

    calculate(x, y) {
        const r = {
            nodes: [],
            bombs: [],
        };

        const map = this.m;
        this.explosion(x, y, (x, y) => {
            if (map[y][x] === '@') {
                return r.nodes.push({x,y});
            } else if (map[y][x] === 'b') {
                return r.bombs.push({x,y});
            }
        });
        
        return r;
    }

    filterPos() {
        const pos = [];

        for(let x = this.width; x--;) {
            for(let y = this.height; y--;) {
                if (this.m[y][x] != '.') {
                    continue;
                }
    
                const r = this.calculate(x, y);
                r.nodes.length && pos.push({ x, y, f: r.nodes.length, r });
            }
        }

        return pos.sort((a, b) => a.f < b.f ? 1 : -1);
    }

    deepCopy(map) {
        [this.width, this.height] = [map.width, map.height];
        
        for (let i = this.height; i--;) {
            this.m.unshift(map.m[i].slice(0));
        }

        for (let i = map.bombs.length; i--;) {
            this.bombs.unshift({
                x: map.bombs[i].x,
                y: map.bombs[i].y,
                delay: map.bombs[i].delay,
            });
        }
            
        return this;
    }

    clone() {        
        return (new Matrix()).deepCopy(this);
    }

    bomb(x, y, delay = 2) {
        this.bombs.push({ x, y, delay });
        this.m[y][x] = 'b';

        const map = this.m;
        this.explosion(x, y, (x, y) => { map[y][x] === '@' && (map[y][x] = 'a'); });

        return this;
    }

    step() {
        for(let k = this.bombs.length; k--;) {
            if(this.bombs[k].delay-- <= 0 ) {
                this.burst( this.bombs[k].x, this.bombs[k].y);
                this.bombs.splice(k, 1);
            }
        }

        return this;
    }

    getNodes() {
        let n = 0;
        for (let k = this.m.length; k--;) {
            for(let i = this.m[k].length; i--;) {
                this.m[k][i] === '@' && n++;
            }
        }
        
        return n;
    }
}

const findSolution = (m0, bombs, max = 99, s) => {
    const list = [{
        m: m0.clone(),
        nBombs: bombs,
        nNodes: m0.getNodes(),
        cmd: [], 
    }];

    while(list.length) {
        s = list.shift();
        if (!s.nNodes) {
            break;
        }
        if (!s.nBombs) {
            continue;
        }
        if (s.cmd.length >= max) {
            continue;
        }

        const ps = s.m.filterPos().slice(0, 3);

        for(let k = ps.length; k--;){
            const m = s.m
                .clone()
                .bomb(ps[k].x, ps[k].y)
                .step();

            list.unshift({
                m,
                nBombs: s.nBombs -1,
                nNodes: s.nNodes - ps[k].r.nodes.length,
                cmd: s.cmd.concat([`${ps[k].x} ${ps[k].y}`])
            });
        }

        list.push({
            m : s.m.clone().step(),
            nBombs: s.nBombs,
            nNodes: s.nNodes,
            cmd: s.cmd.concat(['WAIT'])
        });
    }

    return s.cmd;
};

const theMap = ( new Matrix() ).init();
let cmd;


// game loop
while (true) {
    const inputs = readline();
    
    if( !(inputs) ) {
        break;
    }
    // rounds - number of rounds left before the end of the game
    // bombs - number of bombs left
    const [rounds, bombs] = inputs.split` `.map(Number);
    
    !cmd && (cmd = findSolution(theMap, bombs, rounds));
    print(cmd.length ? cmd.shift() : 'WAIT');
}
