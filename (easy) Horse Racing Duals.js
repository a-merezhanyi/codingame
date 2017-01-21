/** Horse Racing Duals (easy) https://www.codingame.com/training/easy/horse-racing-duals
 * This puzzle shows that sometimes, the simplest solution is not performant
 * enough. You will also learn to handle large arrays and gain experience with
 * their processing time.
 *
 * STATEMENT:
 * In this problem you have to find the two numbers that are closest to each
 * other among a list of numbers. The list might be really large and force you
 * to search for the best possible algorithmic complexity for your solution.
 *
 * STORY:
 * To make a race between two horses interesting, you will have to find the
 * horses with the closest strength.
**/
let arr = [];
const N = parseInt(readline());
for (let i = 0; i < N; i++) {
    // read an initial array
    arr.push(parseInt(readline()));
}

let min = 10000; // set Min
arr.sort(); // sort the initial array
for (let i = 0; i < N; i++) {
    // look for a new Min
    if (Math.abs(arr[i + 1] - arr[i]) < min) {
        min = Math.abs(arr[i + 1] - arr[i]);
    }
}

print(min);