/**
 * Bender - Episode 1 (medium) https://www.codingame.com/training/medium/bender-episode-1
 * In this puzzle, you have to parse, store and manipulate two-dimensional
 * arrays that are the bases for 2D problems. You also have to implement a
 * simple but complete Finite State Machine and learn about this concept.
 * 
 * Statement:
 * The goal of the puzzle is to help Bender the robot to go through the
 * city. You have to decide what movement it will do next, based on its
 * previous moves and the environment (obstacles). Read carefully the rules
 * for the displacement of the robot and how to modelize the map of the city.
 * 
 * Story:
 * Bender, depressed since its artificial intelligence has been diminished,
 * roams on the streets to find the nearest suicide booth. In order to save
 * the robot, you are entrusted with the task of forecasting the path Bender
 * will take, so we can intercept him. You will have at your disposal the
 * logics of the robot's displacements. What are you still doing here ? Run
 * to Bender's rescue !
 */
const map = [];
let [t1X, t1Y, t2X, t2Y] = [-1, -1, -1, -1];

function Node(x, y, val) {
    this.x = x;
    this.y = y;
    this.dir = '';
    this.val = val;
    this.done = false;
}

class Bender {
    constructor() {
        this.x = -1;
        this.y = -1;
        this.current = 'START';
        this.tile = '@';
        this.stuck = false;
        this.priority = false;
        this.loopCounter = 0;
        this.route = [];
    }

    setPos(x, y) {
        [this.x, this.y] = [x, y];
    }

    updPos() {
        switch (this.current) {
            case 'SOUTH': this.x++; break;
            case 'EAST': this.y++; break;
            case 'NORTH': this.x--; break;
            case 'WEST': this.y--; break;
            default: return;
        }

        let tile = map[this.x][this.y];
        
        !tile.done && (tile.done = true, tile.dir = this.current, this.loopCounter--);
        tile.done && tile.dir === this.current && this.loopCounter++;
        this.tile = tile.val;
    }

    buildroute(params) {
        while ('DEAD' !== this.current && 'LOOP' !== this.current) {
            this.updPos();
            this.updState();
        }

        return this.route;
    }

    updState() {
        let next = this.current;

        if (this.loopCounter >= 100) {
            this.route = [];
            this.current = 'LOOP';
            this.route.push(this.current);
            return;
        }

        switch (this.tile) {
            case ' ': break;
            case 'S': next = 'SOUTH'; break;
            case 'N': next = 'NORTH'; break;
            case 'E': next = 'EAST'; break;
            case 'W': next = 'WEST'; break;
            case '$': next = 'DEAD'; break;
            case '@': 'START' === this.current && (next = 'SOUTH'); break;
            case 'X': map[this.x][this.y].val = ' '; break;
            case 'I':
                this.priority = this.priority ? false : true;
                break;
            case 'B':
                this.stuck = this.stuck ? false : true;
                break;
            case 'T':
                this.x === t1X && this.y === t1Y ? this.setPos(t2X, t2Y) : this.setPos(t1X, t1Y);
                break;
            default: next = 'ERROR'; break;
        }

        if ('DEAD' !== next  && 'ERROR' !== next) {
            // get next move
            const nextMove = [];
            const priorities = this.priority
                ? ['WEST', 'NORTH', 'EAST', 'SOUTH'] 
                : ['SOUTH', 'EAST', 'NORTH', 'WEST'];
            
            if (!this.getMove( this.getMap(next) )) {
                for (let priority of priorities) {
                    nextMove.push(priority);
                    if (this.getMove(this.getMap(priority))) {
                        break;
                    }
                }
            } else {
                nextMove.push(next);
            }
            next = nextMove[nextMove.length - 1];
        } else {
            this.current = next;
            return;
        }

        this.current = next;
        this.route.push(this.current);
    }

    getMove(tile) {
        return '#' === tile || 'X' === tile && !this.stuck ? false : true;
    }

    getMap(dir) {
        let [x, y] = [this.x, this.y];

        switch (dir) {
            case 'SOUTH': x++; break;
            case 'EAST': y++; break;
            case 'NORTH': x--; break;
            case 'WEST': y--; break;
            default: break;
        }

        return map[x][y].val;
    }
}

const bender = new Bender();

const [L, C] = readline().split` `.map(Number);
for (let i = 0; i < L; i++) {
    const row = readline();
    map[i] = [];

    for (let j = 0; j < row.length; j++) {
        const val = row[j];
        map[i][j] = new Node(i, j, val);

        '@' === val && bender.setPos(i, j);
        'T' === val && (t1X === -1 ? [t1X, t1Y] = [i, j] : [t2X, t2Y] = [i, j]);
    }
}

bender
    .buildroute()
    .forEach(x => print(x));
