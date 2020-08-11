const winners = [14, 12, 9, 2, 5, 10];
const myNumbers = [2, 3, 4, 5, 9, 14];

let diff = winners.filter((n) => myNumbers.includes(n));

console.log(diff);
