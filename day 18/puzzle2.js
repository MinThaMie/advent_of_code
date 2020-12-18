console.time('time')
const fs = require('fs');
const text = fs.readFileSync("./input.txt", "utf-8");
const homework = text.split("\n");

function solve(string) {
	array = string.split(' ')
	while( array.length > 1) {
		let first_add = array.findIndex(value => value === '+')
		if (first_add > 0) {
			a = parseInt(array[first_add - 1])
			b = parseInt(array[first_add + 1])
			partiallySolved = a + b
			array.splice(first_add - 1, 3, partiallySolved)
		} else {
			a = parseInt(array[0])
			b = parseInt(array[2])
			partiallySolved = a * b
			array.splice(0, 3, partiallySolved)
		}
	}
	return array[0]
}

let sumSolvedValues = 0

homework.forEach(sum => {
	while (sum.includes('+') || sum.includes('*')) {
		let between_par = sum.match(/\(([^()]+)\)/g );
		if (between_par) {
			between_par.forEach(par => {
				par_without_par = par.slice(1,par.length - 1)
				solved_par = solve(par_without_par)
				sum = sum.replace(par, solved_par)
				return sum
			})
		} else {
			sum = solve(sum)
			break;
		}
	}
	sumSolvedValues += sum
})
console.log(sumSolvedValues)
console.timeEnd('time')