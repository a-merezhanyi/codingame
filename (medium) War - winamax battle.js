/** War - winamax battle (medium) https://www.codingame.com/training/medium/winamax-battle
 * Solving this puzzle shows that you can manipulate queues and simulate
 * every step of deterministic card game.
 *
 * Statement:
 * Your program must determine the winner of a game of War, a simple
 * two-player card game.
 *
 * Story:
 * Over at Winamax, card games are all the rage. Why don't you join
 * the party?
 **/
// Test Data
// const cardPlayer1 = ['10', '9', '8', 'K', '7', '5', '6'];
// const cardPlayer2 = ['10', '7', '5', 'Q', '2', '4', '6'];

// read cards & remove cards' suit
const cardPlayer1 = new Array(+readline()).fill().map(() => readline().slice(0, -1));
const cardPlayer2 = new Array(+readline()).fill().map(() => readline().slice(0, -1));
const cardsPower = {2: 1, 3: 2, 4: 3, 5: 4, 6: 5, 7: 6, 8: 7, 9: 8, 10: 9, J: 10, Q: 11, K: 12, A: 13};


let isGameFinished = false;
let playerWon = 1;
let roundIndex = 1;
let result = '';

const war = (stack1, stack2) => {
    let winner = 0;
    let isWarFinished = false;
    let index = 0;
    
    while (!isWarFinished) {
        printErr(`war ${index}:` , stack1[index], stack2[index]);
        if (!stack1[index] || !stack2[index]) {
            return -1;
        } else if (cardsPower[stack1[index]] > cardsPower[stack2[index]]) {
            winner = 1;
            isWarFinished = true;
        } else if (cardsPower[stack1[index]] < cardsPower[stack2[index]]) {
            winner = 2;
            isWarFinished = true;
        }
        index += 1;
    }

    return winner;
}
printErr('initial decks:', cardPlayer1, cardPlayer2);
// cardPlayer1.shift() - from the top
//cardPlayer1.push('a') - to the bottom
while (!isGameFinished) {
    const player1Card = cardPlayer1.shift(); // take P1's card
    const player2Card = cardPlayer2.shift(); // take P2's card
    
    printErr(`round ${roundIndex}:` , player1Card, player2Card);
    printErr('cards:', cardPlayer1, cardPlayer2);
    
    if (cardsPower[player1Card] > cardsPower[player2Card]) {
        cardPlayer1.push(player1Card, player2Card);
    } else if (cardsPower[player1Card] < cardsPower[player2Card]) {
        cardPlayer2.push(player1Card, player2Card);
    } else {
        const player1Stack = cardPlayer1.splice(0, 3);
        const player2Stack = cardPlayer2.splice(0, 3);
        
        const whoWinsWar = war(player1Stack, player2Stack);
        
        printErr('war:', player1Stack, player2Stack)
        printErr('whoWinsWar:', whoWinsWar);
        
        if (whoWinsWar === -1) {
            result = 'PAT';
        } else if (whoWinsWar === 1) {
            cardPlayer1.push(...player1Stack, player1Card, ...player2Stack, player2Card);
        } else if (whoWinsWar === 2) {
            cardPlayer2.push(...player1Stack, player1Card, ...player2Stack, player2Card);
        } else {
            // chained war
        }
    }
    
    printErr(`endOfRound ${roundIndex}:`, cardPlayer1, cardPlayer2, cardPlayer1.length, cardPlayer2.length, !cardPlayer1.length, !cardPlayer2.length);
    
    if (!cardPlayer1.length || !cardPlayer2.length) { // is the battle finished?
        playerWon = (!cardPlayer1.length) ? 2 : 1; // chose the winner
        isGameFinished = true;
        result = result || `${playerWon} ${roundIndex}`; // who's the winner?
    }
    
    roundIndex += 1; // it's time fo the next round
}

print(result);
