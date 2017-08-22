/** Onboarding (Easy) https://www.codingame.com/training/easy/onboarding
 * Solving this puzzle helps you understand how the puzzles work on CodinGame
 * (standard input parsing, game loop, writing to the standard output).
 * You can discover the platform with this simple exercise of basic 
 * comparison of values and try up to 25 programming languages.
 *
 * Statement:
 * our program must destroy the enemy ships by shooting the closest enemy
 * on each turn.
**/
while (true) {
    const enemy1 = readline(); // name of enemy 1
    const dist1 = +readline(); // distance to enemy 1
    const enemy2 = readline(); // name of enemy 2
    const dist2 = +readline(); // distance to enemy 2

    print(dist1 < dist2 ? enemy1 : enemy2);
}