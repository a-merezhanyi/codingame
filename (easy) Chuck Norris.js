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
print(
    readline()
        .split('')
        .map( char => parseInt(char.charCodeAt(0), 10).toString(2).padStart(7, '0'))
        .join('')
        .match(/(\d)\1*/g)
        .map(char => (char[0] === '1' ? '0 ' : '00 ') + '0'.repeat(char.length))
        .join(' ')
);
