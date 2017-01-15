/** Power of Thor - Episode 1 (easy) https://www.codingame.com/training/easy/power-of-thor-episode-1
 * In this puzzle, you need to compare different values. You have to correlate
 * character variables and integer variables.
 A straightforward solution uses 8 conditions. There is a way to simplify it
 * and use only 4 conditions.
 *
 * Statement:
 * A basic problem to go a little bit further with conditions and variables:
 * your program must allow Thor to reach the coordinates of the light of power
 * in a 2D field.
 *
 * Story:
 * Thor's hammer, Mjöllnir, has lost all of its powers... Will you be able to
 * guide Thor towards the light of power to make the hammer whole again?
**/
var inputs = readline().split(' ');
var LX = parseInt(inputs[0]); // the X position of the light of power
var LY = parseInt(inputs[1]); // the Y position of the light of power
var TX = parseInt(inputs[2]); // Thor's starting X position
var TY = parseInt(inputs[3]); // Thor's starting Y position

var CX = TX, CY = TY, index = 0;
// game loop
while (true) {
    var E = parseInt(readline()); // The level of Thor's remaining energy, representing the number of moves he can still make.
    // Write an action using print()
    // To debug: printErr('Debug messages...');
    var move = '';
    if (CY > LY && CY > 0) {
        move += 'N';
        CY--;
    } else if (CY < LY && CY < 17) {
        move += 'S';
        CY++;
    }
    if (CX > LX && CX > 0) {
        move += 'W';
        CX--;
    } else  if (TX < LX && TY < 39) {
        move += 'E';
        CX++;
    }
    printErr('TX='+CX, 'TY='+CY, 'LX='+LX, 'LY='+LY, 'index=' + index++);

    print(move); // A single line providing the move to be made: N NE E SE S SW W or NW
    move = '';
}