/** Don't Panic - Ep. 1 (medium) https://www.codingame.com/training/medium/don't-panic-episode-1
 * In this puzzle, you learn to position an object on a one-dimensional grid.
 * 
 * Statement:
 * Guide the clones towards the exit of the maze, stop when you’re going away
 * from the exit, continue if you are going the right way. You are given the
 * position and direction of your clones.
 * 
 * Story:
 * Marvin is stuck inside the core of the Infinite Improbability Drive! Grab
 * your towel and help him (or them) escape by blocking the right clones to
 * allow others to reach the exit by going through the right Happy Vertical
 * People Transporters.
 **/
let i = readline().split` `;
// nbFloors - number of floors
// exitFloor - floor on which the exit is found
// exitPos - position of the exit on its floor
const [nbFloors, exitFloor, exitPos] = [+i[0], +i[3], +i[4]];
let nbElevators = +i[7]; // number of elevators
const elevators = [];

while(nbElevators--) {
    i = readline().split` `;
    // elevatorFloor - floor on which this elevator is found
    // elevatorPos - position of the elevator on its floor
    const [elevatorFloor, elevatorPos] = [+i[0], +i[1]];
    
    elevators[+i[0]] = +i[1]; // portals' positions into an array 
}
// game loop
while (true) {
    i = readline().split` `;
    // cloneFloor - floor of the leading clone
    // clonePos - position of the leading clone on its floor
    // direction - direction of the leading clone: LEFT or RIGHT
    const [cloneFloor, clonePos, direction] = [+i[0], +i[1], i[2]]; 
    const currentExitPos = cloneFloor === exitFloor ? exitPos : elevators[cloneFloor];
    const goingFalseDirection = ( // detect false direction
        clonePos > currentExitPos && direction === 'RIGHT' ||
        clonePos < currentExitPos && direction === 'LEFT')
        ? true
        : false;
    
    print(goingFalseDirection ? 'BLOCK' : 'WAIT');
}
