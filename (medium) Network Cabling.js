/**
 * Network Cabling (medium) https://www.codingame.com/training/medium/network-cabling
 * This puzzle makes you grasp the basics of optimizing a value, and handle
 * mathematical concepts (average, median, distances, ...).
 * 
 * Statement:
 * Given a list of houses and their position on a grid, find an optimal
 * layout of cabling in order to connect all houses while using the minimum
 * length of cable possible.
 * 
 * Story:
 * Today you're in charge of linking a series of individual houses to the
 * general network. Problem is, before leaving the facility, your
 * scatterbrain of a collegue has forgotten a major part of the cable coils.
 * *Sigh*, guess you'll have to manage to use the shortest possible length
 * of cable.
 */
const coodinates = [...Array(+readline())].map(() => readline().split` `.map(Number));
const xs = coodinates.map(c => c[0]);
const ys = coodinates.map(c => c[1]).sort((a, b) => a - b);

print(
    Math.max(...xs) - Math.min(...xs) + ys.reduce(
        (l,c) => l + Math.abs(c - ys[ys.length / 2 | 0]), 0
    )
);
