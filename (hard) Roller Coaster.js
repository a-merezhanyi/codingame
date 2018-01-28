/**
 * Roller Coaster (hard)
 * https://www.codingame.com/training/hard/roller-coaster
 * Statement:
 * The goal of this puzzle is to simulate the ride of a queue of people on a
 * rollercoaster. The queue forms a cycle so there is something to exploit
 * there in order to speed up your simulation.
 * Story:
 * We all like roller coasters. But there are people who like people who
 * like roller coasters. Today, you are one of them, as you have to check
 * the profit of an attraction in an amusement park. Let's hope there will
 * be more ups than downs.
 */
const [L, C, N] = readline().split` `.map(Number);
let [ridesTaken, money, next, remaining] = [0, 0, 0, L];
const groups = [...Array(N)].fill().map(x => +readline());
let resetIndex = groups.length;

while (ridesTaken < C) {
    while (next < groups.length && groups[next] <= remaining) {
        remaining -= groups[next++];
        if (next == resetIndex) break;
        next == groups.length && (next = 0);
    }
    ridesTaken++;
    money += L - remaining;
    [remaining, resetIndex] = [L, next];
    next == groups.length && (next = 0);
}

print(money);