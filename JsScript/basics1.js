console.log("Hello, World!")

var scores1 = [12, 003, 19, 16, 14, 14, 12];

// console.log(scores1.sort())

console.log(scores1.sort((a, b) => a - b));
console.log(scores1.sort((a, b) => b - a));