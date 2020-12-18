console.time('time')
const fs = require('fs');
const text = fs.readFileSync("./input.txt", "utf-8");
const homework = text.split("\n");

function solve(string) {
	array = string.split(' ')
	while( array.length > 1) {
		a = parseInt(array[0])
		operator = array[1]
		b = parseInt(array[2])
		partiallySolved = operator === '+' ? a + b : a * b
		array.splice(0, 3, partiallySolved)
	}
	return array[0]
}

let sumSolvedValues = 0

homework.forEach(sum => {
	while (sum.includes('+') || sum.includes('*')) {
		let between_par = sum.match(/\(([^()]+)\)/g);
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