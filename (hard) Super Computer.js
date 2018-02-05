/**
 * Super Computer
 * https://www.codingame.com/training/hard/super-computer
 * Statement:
 * The goal of this puzzle is to schedule the planning of different group of
 * users for a super computer, so that as many experiments as possible can
 * be run on it. Keep in mind that efficient solutions are sometime not so
 * complex once the problem has been turned in the right way.
 * Story:
 * Your university research department recently acquired a brand new, shiny
 * super computer. Problem is, everyone wants to use it. Some dude at the
 * chemistry lab wants to run a one week experiment, your colleague Martin
 * needs it for a "real quick try, I promise", etc... It's not going to be
 * easy to have everyone satisfied with the planning.
 * Your task will be to schedule the different experiments running on the
 * computer so that as many experiments as possible can be run.
 */
let N = +readline();
const [calculation, result] = [[], []];

while(N--) {
    const [J, D] = readline().split` `.map(n => +n);

    calculation.push({start: J, end: J + D});
}

calculation
    .sort((a, b) => a.start - b.start ? a.start - b.start : b.start - a.start)
    .forEach(x => {
        const {start, end} = x;
        
        result.push(x);
        for (let j = result.length - 2; j >= 0 && result[j].start <= start && result[j].end >= end; j--) {
            result.splice(j, 1);
        }
    });

print(
    result.reduce((x, y) => {
        y.start >= x[x.length - 1].end && x.push(y);

        return x;
    },
    result.splice(0, 1)).length
);
