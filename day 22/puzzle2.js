console.time('time')
const fs = require('fs');
const text = fs.readFileSync("./input.txt", "utf-8");
const [player1, player2] = text.split("\n\n");

const deck1 = player1.split('\n').slice(1).map(Number)
const deck2 = player2.split('\n').slice(1).map(Number)


function play(deck1,deck2) {
	let rounds = new Set()
	let roundNO = 1
	while( deck1.length > 0 && deck2.length > 0) {
		let round = [...deck1,'$' ,...deck2].join(',')
		if (rounds.has(round)) {
			// console.log("Player 1 wins")
			return 1
		}
		rounds.add(round)
		let card1 = deck1.shift()
		let card2 = deck2.shift()
		if(deck1.length >= card1 && deck2.length >= card2) {
			let copy1 = deck1.slice(0, card1)
			let copy2 = deck2.slice(0,card2)
			let winner = play(copy1, copy2)
			if (winner == 1) {
				deck1.push(card1, card2)
			} else {
				deck2.push(card2, card1)
			}
		} else {
			if (card1 > card2) {
				deck1.push(card1, card2)
			} else {
				deck2.push(card2, card1)
			}
		}
		roundNO++
	}
	return deck1.length > 0 ? 1 : 2
}

play(deck1, deck2)
let winnerdeck  = deck1.length > 0 ? deck1 : deck2

let multiplier = winnerdeck.length

let total = winnerdeck.map(a => {
	a = a * multiplier
	multiplier--
	return a
}).reduce((a,b) => a + b)

console.log(total)

console.timeEnd('time')