console.time('time')
const fs = require('fs');
const text = fs.readFileSync("./input.txt", "utf-8");
const [player1, player2] = text.split("\n\n");

const deck1 = player1.split('\n').slice(1).map(Number)
const deck2 = player2.split('\n').slice(1).map(Number)

while( deck1.length > 0 && deck2.length > 0) {
	let card1 = deck1.shift()
	let card2 = deck2.shift()
	if (card1 > card2) {
		deck1.push(card1, card2)
	} else {
		deck2.push(card2, card1)
	}
}

let winnerdeck  = deck1.length > 0 ? deck1 : deck2

let multiplier = winnerdeck.length

let total = winnerdeck.map(a => {
	a = a * multiplier
	multiplier--
	return a
}).reduce((a,b) => a + b)
console.log(total)

console.timeEnd('time')