const fs = require('fs');
const text = fs.readFileSync("./input.txt", "utf-8");
const textByLine = text.split("\n")

const no_preamble = 25

let preamble = textByLine.slice(0, no_preamble)
let rest_array = textByLine.slice(no_preamble)
let combi = rest_array.splice(0,1)[0]

function findLowestNumber(array, number) {	
		console.log(array, number)
		for (let i = 0; i < array.length - 1; i++) {
			for (let j = 1; j < array.length; j++) {
				if (parseInt(array[i]) + parseInt(array[j]) == parseInt(number)) {
					return true
				}
			}
		}
		return false
		console.log(`Couldn't find combination for ${number} in ${preamble}`)
	}


while (findLowestNumber(preamble, combi)) {
	preamble.splice(0, 1)
	preamble.push(combi)
	combi = rest_array.splice(0,1)[0]
}
console.log(combi)	
