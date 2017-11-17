/**
 * Mayan Calculation (medium) https://www.codingame.com/training/medium/mayan-calculation
 * Solving this puzzle validates that you can manage string manipulation
 * (split, concatenation, conversion), array arithmetics. You may discover
 * the vigesimal (base twenty numeral) system.
 * 
 * Statement:
 * The goal of this puzzle is to make you compute an arithmetic operation
 * from two mayan number. This puzzle make you discover computation in base
 * 20 (used by mayans). It will make you play a lot with string to digits
 * conversions and mechanics to store their values in associative arrays.
 * 
 * Story:
 * We all know now that the world did not end on December 21st 2012. But
 * it's true that it is easy to misread mayan calculations, because their
 * numeral system is so complicated!
 * Help us find the date of the next apocalypse, decyphering messages from
 * an other time.
 */
const [L, H] = readline().split` `.map(n=>+n);
const numbers = [];

for (let i = 0; i < H; i++) {
    const x = readline();
    
    for (let j = 0; j < 20; j++) {
        numbers[j] = (numbers[j] || '') + x.slice(j * L, (j + 1) * L);
    }
}

const numStr = '0123456789abcdefghij';
const strToNum = (s) => {
    let ss = '';
    for (let i=0; i<s.length/(L*H); i++) {
        ss += numStr[numbers.indexOf(s.slice(i*L*H, (i+1)*(L*H)))];
    }
    return parseInt(ss, 20);
};
const numToStr = num => num.toString(20).split('').map(e => numbers[numStr.indexOf(e)]).join``;


const n1 = strToNum([...Array(+readline())].map( _ => readline()).reduce((sum, a) => sum + a, '' ));
const n2 = strToNum([...Array(+readline())].map( _ => readline()).reduce((sum, a) => sum + a, '' ));

const operation = readline();
const operations = {
        '+': (a, b) => a + b,
        '-': (a, b) => a - b,
        '*': (a, b) => a * b,
        '/': (a, b) => a / b | 0,
    };

const result = numToStr(operations[operation](n1, n2));

for (let i = 0; i < result.length / L; i++) {
    print(result.slice(i*L, (i+1)*L));
}
