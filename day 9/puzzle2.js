// input 556543474

const fs = require('fs');
const text = fs.readFileSync("./input.txt", "utf-8");
const textByLine = text.split("\n").map(Number)

let i = 0
while( i < textByLine.length) {
	let amount = textByLine[i];
	let j = i + 1
	while (amount < 556543474 && j < textByLine.length) {
		amount += textByLine[j]
		j += 1
	}
	if (amount == 556543474) {
		console.log(`found ${textByLine[i]} (${i}) till ${textByLine[j-1]} (${j-1})`)
		let cont_array = textByLine.slice(i, j-1)
		console.log(Math.min(...cont_array) + Math.max(...cont_array));
		break;
	}
	i += 1
}
