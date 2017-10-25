// Mock data
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

printErr('initial decks:\n', cardPlayer1, '\n', cardPlayer2);
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
    } else { // it's war time!
        if (cardPlayer1.length < 3 || cardPlayer2.length < 3) {
            result = 'PAT';
        } else {
            const player1Stack = cardPlayer1.splice(0, 3);
            const player2Stack = cardPlayer2.splice(0, 3);
            
            // take cards again
            const player1NextCard = cardPlayer1.shift();
            const player2NextCard = cardPlayer2.shift();
            
            printErr('war:', player1Stack, player2Stack, player1NextCard, player2NextCard)
            
            if (!player1NextCard || !player2NextCard) {
                result = 'PAT';
            } else if (cardsPower[player1NextCard] > cardsPower[player2NextCard]) {
                cardPlayer1.push(...player1Stack, player1Card, player1NextCard, ...player2Stack, player2Card, player2NextCard);
            } else if (cardsPower[player1NextCard] > cardsPower[player2NextCard]) {
                cardPlayer2.push(...player1Stack, player1Card, player1NextCard, ...player2Stack, player2Card, player2NextCard);
            } else {
                // chained war
            }
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
