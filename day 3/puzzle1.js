const fs = require('fs');
const text = fs.readFileSync("./input.txt", "utf-8");
const textByLine = text.split("\n")

// line is 31 long so up to index 30

let line_number = 0
let column_number = 0
let amount_trees = 0

textByLine.forEach(line => {
	if (line[column_number] == "#") {
		console.log("found a tree at ", line_number, " ", column_number)
		amount_trees += 1
	}
	line_number += 1
	column_number = (column_number + 3) % 31
})

console.log("total amount of trees ", amount_trees)