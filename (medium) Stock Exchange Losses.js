/** Stock Exchange Losses (medium) https://www.codingame.com/training/medium/stock-exchange-losses
 * In this puzzle, you need to compare values and derivatives then memorize
 * this information while traversing a list.
 * 
 * Statement:
 * Given a list of numbers, you have to find not the minimal value but the
 * maximal drop. Be careful that a drop can span on several values!
 * 
 * Story:
 * You sometimes have to take risks buying market shares, and sometimes you
 * have to know when it's time to sell before you lose everything. This is
 * why we propose a little puzzle, to write a program that will do the maths
 * for us, a program in which we can invest all our trust (and money?!).
 * 
 * Don't worry, you won't have to be a market expert, nothing is going to
 * crash.
 */
const inputs = (readline(), readline().split(' ').map(parseFloat));

let max = 0;
let delta = 0;

inputs.forEach((x) => {
  (max - x > delta) && (delta = max - x);
  x > max && (max = x);
});

print(-delta);