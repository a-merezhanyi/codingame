/** Onboarding (Easy) https://www.codingame.com/training/easy/onboarding
 * What will I learn?
 * Conditions
 * Solving this puzzle helps you understand how the puzzles work on CodinGame
 * (standard input parsing, game loop, writing to the standard output).
 * You can discover the platform with this simple exercise of basic comparison
 * of values and try up to 25 programming languages.
 * Statement:
 * A tutorial mission for all newcomers: your program must find which of the
 * two targets is the closest.
**/
while (true) {
    var count = parseInt(readline()); // The number of current enemy ships within range
    var closestEnemy = null,
        minDistance = 1000;
    for (var i = 0; i < count; i++) {
        var inputs = readline().split(' ');
        var enemy = inputs[0]; // The name of this enemy
        var dist = parseInt(inputs[1]); // The distance to your cannon of this enemy
        if (dist < minDistance){
            minDistance = dist;
            closestEnemy = enemy;
            printErr(closestEnemy, dist, minDistance);
        }
    }

    print(closestEnemy);
}