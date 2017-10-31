/** Shadows of the Knight - Episode 1 (medium) https://www.codingame.com/training/medium/shadows-of-the-knight-episode-1
 * You have to manage indexes and list of a 2 dimensional array in this
 * puzzle. You also discover the binary search algorithm and finally, it
 * makes you know that batman is really good at cleaning windows.
 * 
 * Statement:
 * The goal of this puzzle is to guess the coordinate of a bomb (line and
 * column of a 2 dimensional array). You will have to make a guess at each
 * step of the puzzle and adjust it from given feedbacks. Of course, you
 * have a limited number of guess.
 * 
 * Story:
 * We love Batman's adventures : The Joker, bombs, hostages, and a hero. But
 * this time, it is you who are the hero. Your job is to find the bombs
 * before they explode! Don't worry, Alfred's got you covered, he's handed
 * you a heat detector set to recognize the thermal signature of the Joker's
 * bombs. Easy? Let's find out.
**/

const [buildingWidth, buildingHeight] = readline().split(' ').map(x => +x);
const N = +readline(); // maximum number of turns before game over.
let [heroX, heroY] = readline().split(' ').map(x => +x);

let above = 0;
let left = 0;
let below = buildingHeight - 1;
let right = buildingWidth - 1;

while (true) {
    const BOMB_DIR = readline();
    // the direction of the bombs from batman's current location (U, UR, R, DR, D, DL, L or UL)
    // BOMB_DIR might contain either L or R.
    BOMB_DIR.includes('L') && (right = heroX - 1);
    BOMB_DIR.includes('R') && (left = heroX + 1);
    BOMB_DIR.includes('U') && (below = heroY - 1);
    BOMB_DIR.includes('D') && (above = heroY + 1);
    heroX = Math.floor((right + left) / 2);
    heroY = Math.floor((above + below) / 2);
    
    print(heroX, heroY);
}
