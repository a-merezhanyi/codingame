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
const N = +readline(); // the number of points used to draw the surface of Mars.

for (let i = 0; i < N; i++) {
    readline();
}

while (true) {
    print( readline().split(' ')[3] < -39 ? '0 4' : '0 0' );
}
