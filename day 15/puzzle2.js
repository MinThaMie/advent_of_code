const fs = require('fs');
const text = fs.readFileSync("./input.txt", "utf-8");
const inputNumbers = text.split(",").map(Number);

console.time('Solver')

let dict = new Map()

inputNumbers.forEach((v, i) => {
	dict.set(v, i + 1)
})

let no_number = 30000000
let currentTurn = inputNumbers.length + 1
let lastNumber = inputNumbers.pop()
dict.delete(lastNumber); 

while (currentTurn <= no_number){
	let previousTurn = currentTurn - 1
	if(dict.has(lastNumber)){
		let occuredTurn = dict.get(lastNumber)
		let turnsAgo = (previousTurn - occuredTurn)
		turnsAgo = turnsAgo > 0 ? turnsAgo : 1
		dict.set(lastNumber, previousTurn )
		lastNumber = turnsAgo
	} else {
		dict.set(lastNumber, previousTurn)
		lastNumber = 0
	}
	if (currentTurn === no_number) {
		console.log(`${lastNumber} the ${currentTurn}th spoken`)
	}
	currentTurn++
}

console.timeEnd('Solver')