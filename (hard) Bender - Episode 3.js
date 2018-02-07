/**
 * Bender - Episode 3
 * https://www.codingame.com/training/hard/bender-episode-3
 * Statement:
 * Given a set of data extracted from performance measures, you need to
 * determine the corresponding algorithmic complexity using regression
 * analysis.
 * Story:
 * Bender is back for a new adventure, in which he is presented with a
 * series of programs. But before he installs them, he wants to evaluate
 * their performance. Let's determine the complexity of each algorithm and
 * choose the most optimal one.
 */
let N = +readline();
const diff = {};
const points = [...Array(N)].map(() => {
    const [x, y] = readline().split` `;
    return { x, y, diff: x / y };
});
const [first, middle, last] = [points[1], points[~~(N / 2)], points[N - 1]];

diff.high = ~~((middle.y - first.y) / (middle.x - first.x));
diff.low  = ~~((last.y - middle.y) / (last.x - middle.x));

const complexity = (diff) => {
    const ratio = diff.low / diff.high || 0;
    const inv = diff.high / diff.low || 0;
    const abs = Math.abs(diff.high - diff.low);

    if (diff.low === 0 || diff.high === 0) return '1';
    if (ratio > 50) return '2^n';
    if (ratio === 1 && inv === 1) return 'n';
    if (inv > 2) return 'log n';
    if (ratio > 3) return 'n^3';
    if (ratio > 1 && abs > 1000) return 'n^2 log n';
    if (ratio > 1 && abs > 100) return 'n^2';
    if (ratio > 0) return 'n log n';

    return '1';
};

print(`O(${complexity(diff)})`);
