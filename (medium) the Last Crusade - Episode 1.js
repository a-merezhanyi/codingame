/** the Last Crusade - Ep. 1 (medium) https://www.codingame.com/training/medium/the-last-crusade-episode-1
 * This puzzle makes you use an associative array that make a link between
 * arbitrary types and directions. You also need to store some values in a
 * 2D array.
 * 
 * Statement:
 * The goal of this puzzle is to predict the path that a character will take
 * in a labyrinth according to the topology of the rooms. The resolution
 * of this exercise intensively focus on the correct usage of associative
 * arrays. If you can manage them correctly and creates the right
 * associations, your final code could be quite short.
 * 
 * Story:
 * Indiana is trapped in a tunnel, help him escape!
 * In this first level, you just have to get familiar with how the tunnel
 * works: your goal is simply to predict Indiana movements within this
 * tunnel.
 **/
// W - Number of columns.
// H - Number of rows.
let [W, H] = readline().split` `.map(Number); 
const maze = []; // Maze

while (H--) {
    // Represents a line in the grid and contains W integers.
    // Each integer represents one room of a given type.
    maze.push(readline());
}
// The coordinate along the X axis of the exit
// (not useful for this first mission, but must be read).
const EX = +readline();

// game loop
while (true) {
    inputs = readline().split` `;
    const [XI, YI, POS] = [+inputs[0], +inputs[1], inputs[2]];
    const currentLevel = maze[YI].split` `;
    let [XT, YT] = [XI, YI];
    
    switch(currentLevel[XI]) {
        case '1':
        case '3':
        case '7':
        case '8':
        case '9':
        case '12':
        case '13':
            YT += 1;
            break;
        case '2':
            XT += POS === 'LEFT' ? 1 : -1;
            break;
        case '4':
            (POS === 'TOP') ? XT -= 1 : YT +=1;
            break;
        case '5':
            (POS === 'TOP') ? XT += 1 : YT +=1;
            break;
        case '6':
            XT += (POS === 'TOP' && EX > XI) || POS === 'LEFT' ? 1 : -1;
            break;
        case '10':
            XT -= 1;
            break;
        case '11':
            XT += 1;
            break;
        default:
            break;
    }

    // One line containing the X Y coordinates of the room 
    // in which you believe Indy will be on the next turn.
    print(`${XT} ${YT}`);
}
