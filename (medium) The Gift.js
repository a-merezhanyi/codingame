/**
 * The Gift https://www.codingame.com/training/medium/the-gift
 * In this puzzle, you have to manipulate large lists and use simple math
 * concepts (e.g. min, max, average) to optimize the value of a variable.
 * 
 * Statement:
 * Given a list of persons and their budgets, and the price of the present
 * they wish to buy, you have to find the amount each person gives. You have
 * to find this optimal distribution that minimize the highest contribution.
 * 
 * Story:
 * The TARDIS time-and-space-ship lands on a strange planet. The local
 * aliens, the Oods, want to make a present for a fellow Ood, but they can't
 * seem a way to figure out how to manage everyone's budget. Help the Doctor
 * find a system to decide the contribution of each Ood.
 */
let N = +readline();
let C = +readline();

const wallets = [...Array(N)].map(_ => +readline()).sort((a, b) => a - b);
const arraySum = (arr) => arr.reduce((a, b) => a + b, 0);

C > arraySum(wallets)
    ? print('IMPOSSIBLE')
    : (
        wallets.forEach((wallet) => {
        let part = Math.floor(C / N);
        let contrib = Math.min(part, wallet);

        C -= contrib;
        N   -= 1;

        print(contrib);
        })
    );