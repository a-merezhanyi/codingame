/** Mars Lander - Episode 2 (medium) https://www.codingame.com/training/medium/mars-lander-episode-2
 * In this puzzle, iterating on a series of 2D coordinates helps you
 * grasp the concepts of comparisons, distance computation, extrapolation.
 * This puzzles works with angle and orientation constraints. You learn to
 * compute the speed of an object using its coordinates at two different
 * times. If you perform well, you can solve this problem using some
 * distance and trajectory optimization.
 * 
 * Statement:
 * The goal of this problem is to make you work with 2D coordinates in a
 * big environnement. You will have to manage and extrapolate the speed of a
 * spaceship and make it land on a flat ground at correct speed.
 * 
 * Story:
 * Your Mars exploration ship takes you above a particularly rocky area.
 * You will have to review and improve your descent technique in order to
 * land your mars rover safely on martian ground.
**/

const G = 3.711;
const maxHspeed = 20;
const maxVspeed = 40;
const diff = 5;
const toDegrees = radians => { return radians * 180 / Math.PI; };

const surfaceN = +readline(); 
let lastX = -1;
let lastY = -1;
let landingStartX = -1;
let landingEndX = -1;
let landingY = -1;

for (let i = 0; i < surfaceN; i++) {
    const inputs = readline().split(' ');
    const landX = +inputs[0];
    const landY = +inputs[1];
    
    if(lastY === landY && landingStartX === -1) {
        landingStartX = lastX;
        landingY = landY;
    } else if (landingStartX !== -1 && landingEndX === -1) {
        landingEndX = lastX;
    }
    lastX = landX;
    lastY = landY;
}

while (true) {
    const inputs = readline().split(' ');
    const X = +inputs[0];
    const Y = +inputs[1];
    const hSpeed = +inputs[2];
    const vSpeed = +inputs[3];
    const speed = Math.sqrt(Math.pow(hSpeed, 2) + Math.pow(vSpeed, 2));
    const aimAngle = toDegrees(Math.acos(G / 4.0));
    
    let angle = 0;
    let acc = 4;
    
    if (!(landingStartX <= X && X <= landingEndX)) {
        if ((X < landingStartX && hSpeed < 0) || (landingEndX < X && hSpeed > 0)
        || Math.abs(hSpeed) > 4 * maxHspeed) {
            angle = toDegrees(Math.asin(hSpeed / speed));
        } else if (Math.abs(hSpeed) < 2 * maxHspeed) {
            angle = (X < landingStartX) ? -aimAngle : (landingEndX < X) ? aimAngle : 0;
        } else if (vSpeed >= 0) {
            acc = 3;
        }
    } else {
        if (Y < 200 + landingY) {
            acc = 3;
        } else if (Math.abs(hSpeed) <= maxHspeed - diff
                && Math.abs(vSpeed) <= maxVspeed - diff) {
            acc = 2;
        } else  {
            angle = toDegrees(Math.asin(hSpeed / speed));
        }
    }
    
    print(Math.round(angle), acc);
}
