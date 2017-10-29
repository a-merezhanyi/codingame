/** Mars Lander - Episode 2 (medium) https://www.codingame.com/training/medium/mars-lander-episode-2
 * 
 * 
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
