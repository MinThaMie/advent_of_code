const fs = require('fs');
const text = fs.readFileSync("./input_1.js", "utf-8");
const textByLine = text.split("\n")

let total = 0 
textByLine.forEach(line => {
	let chopped_line = line.split(' ')
	let min_max = chopped_line[0].split('-')
	let min = parseInt(min_max[0])
	let max = parseInt(min_max[1])
	let letter = chopped_line[1][0]
	let password = chopped_line[2]
	let amount = 0;
	[...password].forEach(c => {
		if (c == letter) {
			amount += 1
		}
	})

	if (amount <= max && amount >= min){
		total += 1
	}
});

console.log(total)