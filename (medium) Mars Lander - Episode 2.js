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
const toDegrees = radians => radians * 180 / Math.PI;
let [lastX, lastY, startX, endX, landingY] = [-1, -1, -1, -1, -1];
let surfaceN = +readline(); // the number of points used to draw the surface of Mars.

while (surfaceN--) {
    // landX - X coordinate of a surface point. (0 to 6999)
    // landY - Y coordinate of a surface point. By linking all the points together in a sequential fashion, you form the surface of Mars.
    const [landX, landY] = readline().split` `.map(Number);
    
    if(lastY === landY && -1 === startX) {
        [startX, landingY] = [lastX, landY];
    } else if (-1 !== startX && -1 === endX) {
        endX = lastX;
    }
    
    [lastX, lastY] = [landX, landY];
}

// game loop
while (true) {
    // hSpeed - the horizontal speed (in m/s), can be negative.
    // vSpeed - the vertical speed (in m/s), can be negative.
    const [X, Y, hSpeed, vSpeed] = readline().split` `.map(Number);
    const speed = Math.sqrt(Math.pow(hSpeed, 2) + Math.pow(vSpeed, 2));
    const aimAngle = toDegrees(Math.acos(G / 4));
    
    let angle = 0;
    let acc = 4;
    
    if (!(startX <= X && X <= endX)) {
        // if it is not over the target
        if ((X < startX && hSpeed < 0) || (endX < X && hSpeed > 0)
        || Math.abs(hSpeed) > 4 * maxHspeed) {
            // if it goes in wrong direction or goes too fast horizontally
            angle = toDegrees(Math.asin(hSpeed / speed)); // if angle is to slow
        } else if (Math.abs(hSpeed) < 2 * maxHspeed) {
            // if it goes too slow horizontally
            angle = (X < startX) ? -aimAngle : (endX < X) ? aimAngle : 0;
        } else if (vSpeed >= 0) {
            acc = 3;
        }
    } else {
        if (Y < 200 + landingY) {
            // is finishing, i.e. Y is < critical height
            acc = 3;
        } else if (Math.abs(hSpeed) <= maxHspeed - 5
                && Math.abs(vSpeed) <= maxVspeed - 5) {
            // has safe speed
            acc = 2;
        } else  {
            // if angle is to slow;
            angle = toDegrees(Math.asin(hSpeed / speed));
        }
    }
    
    print(Math.round(angle), acc);
}
