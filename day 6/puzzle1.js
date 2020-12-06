const fs = require('fs');
const text = fs.readFileSync("./input.txt", "utf-8");
const textByLine = text.split("\n")

let set = new Set()
let amount = 0
textByLine.forEach(line => {
	if (line != '') {
		[...line].forEach(chr => {
			set.add(chr)
		})
	} else {
		console.log(set)
		amount += set.size
		set = new Set()
	}
})

console.log(amount)

