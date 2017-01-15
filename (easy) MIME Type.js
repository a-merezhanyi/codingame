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
var N = parseInt(readline()); // Number of elements which make up the association table.
var Q = parseInt(readline()); // Number Q of file names to be analyzed.
var exts = {};

for (var i = 0; i < N; i++) {
    var inputs = readline().split(' ');
    var EXT = inputs[0]; // file extension
    var MT = inputs[1]; // MIME type.
    exts[EXT.toLowerCase()] = MT;
}
for (var i = 0; i < Q; i++) {
    var FNAME = readline(); // One file name per line.
    var extArr = FNAME.split('.');
    printErr('extArr.length', (extArr.length>1));
    var extNum = (extArr.length > 1) ? (extArr.length - 1) : 1;
    //var extNum = 1;
    var itsExt = ('' + extArr[extNum]).toLowerCase();
    printErr(extArr, extNum, itsExt, FNAME);
    print((exts[itsExt]) ? exts[itsExt] : 'UNKNOWN');
}
