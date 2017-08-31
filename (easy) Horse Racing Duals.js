/** Horse Racing Duals (easy) https://www.codingame.com/training/easy/horse-racing-duals
 * This puzzle shows that sometimes, the simplest solution is not performant
 * enough. You will also learn to handle large arrays and gain experience
 * with their processing time.
 *
 * STATEMENT:
 * In this problem you have to find the two numbers that are closest to each
 * other among a list of numbers. The list might be really large and force
 * you to search for the best possible algorithmic complexity for your
 * solution.
 *
 * STORY:
 * To make a race between two horses interesting, you will have to find the
 * horses with the closest strength.
**/
print(
    new Array(+readline()) // Read Number of horses
        .fill()              // and
        .map(() => +readline())      // read an initial array
        .sort((a, b) => a > b) // sort this array and
        .map((x, i, arr) => Math.abs(x - arr[i + 1])) // calculate the differences
        .sort((a, b)  => a > b) // sort it again
        [0] // and print the very first element - min value
    );