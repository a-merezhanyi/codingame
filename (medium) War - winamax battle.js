/**
 * War - winamax battle (midium) https://www.codingame.com/training/medium/winamax-battle
 * Solving this puzzle shows that you can manipulate queues and simulate
 * every step of deterministic card game.
 * 
 * Statement:
 * Your program must determine the winner of a game of War, a simple
 * two-player card game.
 * 
 * Story:
 * Over at Winamax, card games are all the rage. Why don't you join the
 * party?
 */
class Queue {
    constructor() {
        this.elements = [];
    }

    enqueue(c) {
        this.elements.unshift(c);
    }
    
    dequeue(c) {
        return this.elements.pop(c);
    }
    
    peek(l = 0) {
        return this.elements.length > l;
    }

    enqueueBundle(elements) {
        elements.forEach(x => this.enqueue(x));
    }
}

class Game {
    constructor(p1Deck, p2Deck) {
        this.cards = {'2': 0, '3': 1, '4': 2, '5': 3, '6': 4, '7': 5, '8': 6, '9': 7, '10': 8, 'J': 9, 'Q': 10, 'K': 11, 'A':12};
        this.p1 = p1Deck;
        this.p2 = p2Deck;
        this.atWar = false;
    }

    battle() {
        if (!this.p1.peek()) {
            this.winner = 2;
            
            return false;
        }
        if (!this.p2.peek()) {
            this.winner = 1;
            
            return false;
        }

        const [p1card, p2card] = [this.p1.dequeue(), this.p2.dequeue()];
        // compare cards
        const result =this.cards[p1card] - this.cards[p2card];
        // if pots are empty
        !this.atWar && (this.potP1 = [], this.potP2 = []);
        
        this.potP1.push(p1card);
        this.potP2.push(p2card);
        this.atWar = false;
        
        if (result) {
            const winner = result > 0 ? 'p1' : 'p2';
            
            this[winner].enqueueBundle(this.potP1);
            this[winner].enqueueBundle(this.potP2);
        } else {
            return this.startWar() ? this.battle() : false;
        }
        
        return true;
    }

    startWar() {
        this.atWar = true;

        // First, check If one if the player has not enough cards left
        if(!this.p1.peek(3) || !this.p2.peek(3)) {
            this.winner = 'PAT';
            return false;
        }

        for(let i = 0; i < 3; i++) {
            this.potP1.push(this.p1.dequeue());
            this.potP2.push(this.p2.dequeue());
        }

        return true;
    }

    init() {
        let counter = 0;
        
        while(this.battle()) {
            counter++;
        }
        return counter;
    }
}

const player1Deck = new Queue();
const player2Deck = new Queue();

[...Array(+readline())].forEach(_ => player1Deck.enqueue(readline().slice(0, -1)));
[...Array(+readline())].forEach(_ => player2Deck.enqueue(readline().slice(0, -1)));

const game = new Game(player1Deck, player2Deck);
const steps = game.init();

print( 'PAT' === game.winner ? 'PAT' :`${game.winner} ${steps}` );
