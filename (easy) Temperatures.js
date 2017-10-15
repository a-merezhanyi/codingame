/** Temperatures (easy) https://www.codingame.com/training/easy/temperatures
 * Solving this puzzle validates that the loop concept is understood and that
 * you can compare a list of values.
 * This puzzle is also a playground to experiment the concept of lambdas in
 * different programming languages. It's also an opportunity to discover
 * functional programming.
 *
 * Statement:
 * Your program must analyze records of temperatures to find the closest to
 * zero.
 *
 * Story:
 * It's freezing cold out there! Will you be able to find the temperature
 * closest to zero in a set of temperatures readings?
**/
const N = parseInt(readline()); // the number of temperatures to analyse
const TEMPS = readline(); // the N temperatures expressed as integers ranging from -273 to 5526

// Write an action using print()
// To debug: printErr('Debug messages...');
let min = 1000000,
    temp = [],
    i;

temp = TEMPS.split(' ');
printErr(temp);
for (i=0; i<N; i++) {
    printErr(temp[i], min);
    if (Math.abs(parseInt(temp[i])) <= Math.abs(parseInt(min))) {
        if (Math.abs(parseInt(temp[i])) == Math.abs(parseInt(min))) {
            if (parseInt(temp[i]) < 0 && parseInt(min) < 0) {
                min = parseInt(temp[i]);
            } else {
                min = Math.abs(parseInt(temp[i]));
            }
        } else {
            min = parseInt(temp[i]);
        }
        
        printErr(min);
    }
}
if (min == 1000000) {
    min = 0;
}
print(min);
