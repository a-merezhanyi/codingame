/** Power of Thor - Episode 1 (easy) https://www.codingame.com/training/easy/power-of-thor-episode-1
 * In this puzzle, you need to compare different values. You have to
 * correlate character variables and integer variables.
 * A straightforward solution uses 8 conditions. There is a way to
 * simplify it and use only 4 conditions.
 *
 * Statement:
 * A basic problem to go a little bit further with conditions and variables:
 * your program must allow Thor to reach the coordinates of the light of
 * power in a 2D field.
 *
 * Story:
 * Thor's hammer, Mjöllnir, has lost all of its powers... Will you be able to
 * guide Thor towards the light of power to make the hammer whole again?
**/
const inputs = readline().split(' ');
const lightX = +inputs[0]; // the X position of the light of power
const lightY = +inputs[1]; // the Y position of the light of power
const ThorX = +inputs[2]; // Thor's starting X position
const ThorY = +inputs[3]; // Thor's starting Y position

let currentX = ThorX, currentY = ThorY;

while (true) { // game loop
    // The level of Thor's remaining energy, representing the number
    // of moves he can still make.
    const E = +readline();
    let move = '';

    if (currentY > lightY && currentY > 0) {
        move += 'N';
        currentY--;
    } else if (currentY < lightY && currentY < 17) {
        move += 'S';
        currentY++;
    }
    if (currentX > lightX && currentX > 0) {
        move += 'W';
        currentX--;
    } else if (ThorX < lightX && ThorY < 39) {
        move += 'E';
        currentX++;
    }

    // A single line providing the move to be made:
    // N NE E SE S SW W or NW
    print(move);
}