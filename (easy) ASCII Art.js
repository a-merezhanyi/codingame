/** ASCII Art (easy) https://www.codingame.com/training/easy/ascii-art
 * Solving this puzzle teaches how to manage strings and array arithmetics.
 * You'll know how to split a string into separate parts and concatenate them
 * into a new one.
 * You can use indexes of arrays
 *
 * Statement:
 * The goal of the problem is to simulate an old airport terminal
 * display: your program must display a line of text in ASCII art.
 * You have to split strings, store them and recreate others. You can us\
 * data structures like arrays or hash tables.
 *
 * Story:
 * Do you feel you are an artist at heart? Unfortunately you are
 * a programmer :(
 * Why not give a try at ...
 *     __    ___   ___  ____  ____      __    ____  ____ 
 *   /__\  / __) / __)(_  _)(_  _)    /__\  (  _ \(_  _)
 *  /(__)\ \__ \( (__  _)(_  _)(_    /(__)\  )   /  )(  
 * (__)(__)(___/ \___)(____)(____)  (__)(__)(_)\_) (__)
 *
 * In this puzzle, transform strings of characters into ASCII ART.
**/
const L = parseInt(readline());
const H = parseInt(readline());
const T = readline().toLowerCase();

for (let i = 0; i < H; i++) {
    let row = readline(); // Read one row
    let str = '';
    
    for (let j = 0; j < T.length; j++ ) {
        // Define the position of current letter
        // In the current alphabet
        let index = (T[j].charCodeAt(0) - 97) * L;
        
        // If it's not in the current alphabet
        // Then select "?" mark
        (index < 0) && (index = 26 * L);
        // Add current piece of selected letter
        str += row.slice(index, index + L);
    }
    
    print(str); // Print current line
}
