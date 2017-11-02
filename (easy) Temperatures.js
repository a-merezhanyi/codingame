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
const N = +readline();
const tC = readline().split` `.map(x => +x);

let min = Infinity;

for (let i in tC) {
    (Math.abs(tC[i]) < Math.abs(min) || tC[i] === -min && tC[i] > 0) && (min = tC[i]);
}

print(min || 0);
