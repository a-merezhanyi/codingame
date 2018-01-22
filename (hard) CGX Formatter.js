/**
 * CGX Formatter
 * https://www.codingame.com/training/hard/cgx-formatter
 * 
 * Statement:
 * You have to format an input file to a JSON-like format. You will want to
 * watch out for indentation rules and read the statement carefully, and use
 * regular expressions to find patterns to parse the content in order to
 * decide how to format it.
 * 
 * Story:
 * At CodinGame we like to reinvent things. XML, JSON etc. that's great, but
 * for a better web, we've invented our own text data format (called CGX) to
 * represent structured information.
 * In this puzzle, you'll be asked to write a program capable of indenting
 * blocks of text in accordance to the CGX formatting rules.
 */
const N = +readline();
const cgx = [...Array(N)].map(readline).join``;

const [arr, cleanCGX] = [[], []];
let [str, openQuotes] = ["", false];

cgx.split``.forEach(c => {
    c === '\'' && (openQuotes = !openQuotes);
    (openQuotes || (c !== ' ' && c !== '\t')) && cleanCGX.push(c);
});

for (let i = 0; i < cleanCGX.length; i++) {
    const c = cleanCGX[i];
    
    c === '\'' && (openQuotes = !openQuotes);
    if (c === '(' && !openQuotes) {
        str.length > 0 && arr.push(str);
        str = '';
        arr.push(c);
    } else if (c === ')' && !openQuotes) {
        str.length > 0 && arr.push(str);
        str = ')';
        (i < cleanCGX.length - 1 && cleanCGX[i+1] === ';') && (i++, str += ';');
        str.length > 0 && arr.push(str);
        str = '';
    } else {
        str += c;
        (c === ';' && !openQuotes) && (arr.push(str), str = '');
    }
}

str.length > 0 && arr.push(str);

let [count, result] = [0, ""];

arr.forEach (c => {
    (c === ')' || c === ');') && count--;
    result += `${' '.repeat(4 * count)}${c}\n`;
    c === '(' && count++;
});

print(result);
