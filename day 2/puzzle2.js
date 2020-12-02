const fs = require('fs');
const text = fs.readFileSync("./input_1.js", "utf-8");
const textByLine = text.split("\n")

let total = 0 
textByLine.forEach(line => {
	let chopped_line = line.split(' ')
	let first_position = parseInt(chopped_line[0].split('-')[0]) - 1
	let second_position = parseInt(chopped_line[0].split('-')[1]) - 1
	let letter = chopped_line[1][0]
	let password = chopped_line[2]

	if (password[first_position] == letter || password[second_position] == letter){
		if (password[first_position] != password[second_position]) {
			total += 1
		}
	}
});

console.log(total)