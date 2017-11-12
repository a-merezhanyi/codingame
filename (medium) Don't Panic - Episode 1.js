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
let inputs = readline().split(' ')
const nbFloors = +inputs[0] // number of floors
const exitFloor = +inputs[3] // floor on which the exit is found
const exitPos = +inputs[4] // position of the exit on its floor
const nbElevators = +inputs[7] // number of elevators
const elevators = []

for (let i = 0; i < nbElevators; i++) {
    inputs = readline().split(' ')
    const elevatorFloor = parseInt(inputs[0]) // floor on which this elevator is found
    const elevatorPos = parseInt(inputs[1]) // position of the elevator on its floor
    
    elevators[parseInt(inputs[0])] = parseInt(inputs[1]) // portals' positions into an array 
}
// game loop
while (true) {
    inputs = readline().split(' ')
    const cloneFloor = parseInt(inputs[0]) // floor of the leading clone
    const clonePos = parseInt(inputs[1]) // position of the leading clone on its floor
    const direction = inputs[2] // direction of the leading clone: LEFT or RIGHT
    const currentExitPos = (cloneFloor === exitFloor) ? exitPos : elevators[cloneFloor];
    const goingFalseDirection = ( // detect false direction
        clonePos > currentExitPos && direction === 'RIGHT' ||
        clonePos < currentExitPos && direction === 'LEFT')
        ? true
        : false
    
    print(goingFalseDirection ? 'BLOCK' : 'WAIT')
}
