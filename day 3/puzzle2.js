const fs = require('fs');
const text = fs.readFileSync("./input.txt", "utf-8");
const textByLine = text.split("\n")

function findTheTrees(right, down) {
	let amount_trees = 0
	let line_number = 0
	let column_number = 0
	textByLine.forEach(line => {
		if (line_number < textByLine.length){
			amount_trees += textByLine[line_number][column_number] == "#" ? 1 : 0
			line_number += down
			column_number = (column_number + right) % 31
		}
	})
	return amount_trees
}

const a = findTheTrees(1,1)
const b = findTheTrees(3,1)
const c = findTheTrees(5,1)
const d = findTheTrees(7,1)
const e = findTheTrees(1,2)

console.log("Answer is ", a, "*", b, "*", c, "*", d, "*", e, "=", (a*b*c*d*e))