/** The Descent (easy) https://www.codingame.com/training/easy/the-descent
 * Solving this puzzle makes you understand the concept of loops and the
 * ways of retrieving the maximum value from a list of integers.
 * This puzzle can also be a playground to experiment the concept of
 * lambdas in different programming languages. It's also an opportunity to
 * discover functional programming.
 *
 * Statement:
 * A simple problem to try out the CodinGame platform: your program must
 * find the highest mountain out of a list of mountains.
 *
 * Story:
 * The Enterprise ship is in danger: drawn towards the surface of an unknown
 * planet, it is at risk of crashing against towering mountains. Help Kirk
 * and Spock destroy the mountains... Save the Enterprise!
**/
while (true) {
    let position = 0;
    let max = 0;
    for (let i = 0; i < 8; i++) {
        let mountainH = +readline();
        if (mountainH >= max) {
            position = i;
            max = mountainH;
        }
    }
    print(position);
}