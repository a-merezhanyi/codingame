/** Chuck Norris (easy) https://www.codingame.com/training/easy/chuck-norris
 * Solving this puzzle makes you convert characters into their digital values
 * and also digits into binary values.
 * You have to go through a list of bits of a digital value.
 *
 * Statement:
 * Your program must encode a string into a series of zeros.
 * A string is an encoded form of digital values and you have to transform
 * those values into a new format.
 *
 * Story:
 * Binary is good! But unary is much better!
 * Test your encoding skills in this easy puzzle where you will be asked to
 * transform a string into a “unary” string such as 0 00 000 0...
**/
var MESSAGE = readline();

// Write an action using print()
// To debug: printErr('Debug messages...');
printErr(MESSAGE, MESSAGE.charCodeAt(0), parseInt(MESSAGE.charCodeAt(0), 10).toString(2));

var inpMessage = '';
for (var i = 0; i < MESSAGE.length; i++) {
    var ch = parseInt(MESSAGE.charCodeAt(i), 10).toString(2);
    inpMessage += (ch.length == 7) ? ch : '0' + ch;
}

var msg = '';
var prevChar = null;
 for (var i = 0; i < inpMessage.length; i++) {
        printErr(inpMessage[i], prevChar, msg);
        if (inpMessage[i] != prevChar) {
            msg += (inpMessage[i] == '1') ? ' 0 0' : ' 00 0';
            prevChar = inpMessage[i];
        } else {
            msg += '0';
        }
}

print(msg.slice(1));
