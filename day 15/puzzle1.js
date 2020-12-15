const fs = require('fs');
const text = fs.readFileSync("./test_input.txt", "utf-8");
const inputNumbers = text.split(",").map(Number);

console.log(inputNumbers)

while (inputNumbers.length <= 2020){
	let currentTurn = inputNumbers.length
	let lastNumber = inputNumbers.pop()
	let indexNumber = inputNumbers.lastIndexOf(lastNumber)
	if (indexNumber == -1){
		inputNumbers.push(lastNumber)
		inputNumbers.push(0)
	} else {
		let turnsAgo = currentTurn - (indexNumber + 1)
		inputNumbers.push(lastNumber)
		inputNumbers.push(turnsAgo)
	}
}
console.log(inputNumbers[inputNumbers.length - 2])