const fs = require('fs');
const text = fs.readFileSync("./input.txt", "utf-8");
const textByLine = text.split("\n")

let amount = 0
let group_size = 0
let answers = []


function isEqual(value) {
    return value == this;
}

textByLine.forEach(line => {
	if (line != '') {
		group_size += 1;
		answers.push(...line)
	} else {
		let unique_answers = new Set(answers)
		unique_answers.forEach( answer => {
			if (answers.filter(isEqual, answer).length == group_size) {
				amount += 1
			}
		})
		answers = []
		group_size = 0
	}
})

console.log(amount)
