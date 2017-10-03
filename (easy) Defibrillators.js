/** Defibrillators (easy) https://www.codingame.com/training/easy/defibrillators
 * This puzzle makes you split a string into substrings, replace a character of
 * a string and convert it into floats. You also have to convert degrees into
 * radians and use mathematical operations like square root or cosinus.
 * Finally you have to apply multiple computations (addition, multiplication...)
 * on floating numbers.
 *
 * Statement:
 * The goal of this exercise is to make you find the closest point to given
 * geographic coordinates (latitude and longitude). Your program must print the
 * associated location name.
 * In this puzzle you will play a lot with conversion (degree to radian,
 * coordinates to distance, string to float).
 *
 * Story:
 * Want to save lives? Good! So help us find the closest defibrillator from a
 * given position in the city of Montpellier, France.
**/
const longtitudeA = parseFloat(readline().replace(',', '.'));
const latitudeA = parseFloat(readline().replace(',', '.'));
const N = parseInt(readline());
let defibs = [];
let minDestination = Infinity;
let nearestPoint = -1;
let x = 0;
let y = 0;
let d = 0;
let longtitudeB = 0;
let latitudeB = 0;

for (let i = 0; i < N; i++) {
    defibs[i] = readline().split(';');
    defibs[i][4] = parseFloat(defibs[i][4].replace(',', '.'));
    defibs[i][5] = parseFloat(defibs[i][5].replace(',', '.'));
    
    longtitudeB = defibs[i][4];
    latitudeB = defibs[i][5];
    x = (longtitudeB - longtitudeA) * Math.cos((latitudeA + latitudeB)/2);
    y = latitudeB - latitudeA;
    d = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2)) * 6371;
    
    if (d < minDestination) {
        minDestination = d;
        nearestPoint = i;
    }
    printErr(`${i}: ${x}, ${y}, ${d}, ${minDestination}, ${nearestPoint}`);
}

print(defibs[nearestPoint][1]);
