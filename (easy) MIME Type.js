/** MIME Type (easy) https://www.codingame.com/training/easy/mime-type
 * In this puzzle, you have to split a string int separate parts, compare them,
 * and recognize similar strings using a case-insensitive algorithm.
 * You also have to create and use an associative array and go through a large
 * dataset of elements.
 *
 * Statement:
 * Back to basics with this puzzle where you have to associate file names with
 * their MIME type.
 *
 * Story:
 * So many files, so little time... Let's tidy things up!
**/
const N = +readline(); // Number of elements which make up the association table.
const Q = +readline(); // Number Q of file names to be analyzed.

const getType = obj => {
    const x = readline().split` `;
    obj[x[0].toLowerCase()] = x[1];
    return obj;
};

const ext = [...Array(N)].reduce(getType,  {});

print([...Array(Q)]
        .map(_ => {
            const extArr = readline().toLowerCase().split`.`;
            const n = (extArr.length > 1) ? (extArr.length - 1) : 1;
            return (ext[extArr[n]] || 'UNKNOWN');
            })
        .join('\n')
);
