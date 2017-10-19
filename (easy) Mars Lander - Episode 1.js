/** Mars Lander - Episode 1 (easy) https://www.codingame.com/training/easy/mars-lander-episode-1
 * This puzzle teaches you how to compare values using a simple condition.
 *
 * Statement:
 * The goal of this puzzle is to safely land the spaceship on the platform.
 * It's an simple introduction to the « Mars Lander - Episode 2 ». Some data is
 * useless and solving this problem only requires a simple condition.
 *
 * Story:
 * You have been promoted to commander of the Mars Lander mission ! The goal of
 * the operation is to land an exploration rover on martian ground. Your
 * superiors at NASA expect very much of you for this mission, and you'll have
 * to prove that you have what it takes to become a great intersideral
 * commander. You will have to land the space ship on mars, making sure that
 * the landing is done smoothly.
**/
const N = parseInt(readline()); // the number of points used to draw the surface of Mars.
const X1 = -1, X2 = -1, Y1 = -1, xp = -1, Xmiddle, Ymiddle;

for (let i = 0; i < N; i++) {
    const inputs = readline().split(' ');
    const LAND_X = parseInt(inputs[0]); // X coordinate of a surface point. (0 to 6999)
    const LAND_Y = parseInt(inputs[1]); // Y coordinate of a surface point. By linking all the points together in a sequential fashion, you form the surface of Mars.
    if (LAND_Y == Y1) {
        X1 = xp;
        X2 = LAND_X;
        Ymiddle = LAND_Y;
    }
    xp = LAND_X;
    Y1 = LAND_Y;
}

Xmiddle = X2 - (X2 - X1)/2;
// game loop
while (true) {
    const inputs = readline().split(' ');
    const X = parseInt(inputs[0]);
    const Y = parseInt(inputs[1]);
    const HS = parseInt(inputs[2]); // the horizontal speed (in m/s), can be negative.
    const VS = parseInt(inputs[3]); // the vertical speed (in m/s), can be negative.
    const F = parseInt(inputs[4]); // the quantity of remaining fuel in liters.
    const R = parseInt(inputs[5]); // the rotation angle in degrees (-90 to 90).
    const P = parseInt(inputs[6]); // the thrust power (0 to 4).

    // Write an action using print()
    // To debug: printErr('Debug messages...');
    let angle, acc;
    if (X < Xmiddle) {
        angle = -45;
        
        if (HS < 10) {
            acc = 4;
        } else {
            acc = 0;
        }
    }
    if (X > Xmiddle) {
        angle = 45;
        
        if (HS > -10) {
            acc = 4;
        } else {
            acc = 0;
        }
        
    }
    if (X == Xmiddle) {
        angle = 0;
    }
    
    if (Y - Ymiddle < 100) {
        angle = 0;
    }
    
    if (VS < -20) {
        angle = 0;
        acc = 4;
    }
    print(angle, acc);
}
