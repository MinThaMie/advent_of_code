const fs = require('fs');
const text = fs.readFileSync("./input.txt", "utf-8");
const textByLine = text.split("\n")

let seat_ids = []

textByLine.forEach(line => {
	let min_row = 0;
	let max_row = 127;
	let min_chair = 0;
	let max_chair = 7;
	let row = line.slice(0,7);
	let column = line.slice(-3);

	[...row].forEach(chr => {
		if (chr == "B") {
			min_row = Math.ceil((min_row + max_row)/2)
		} else {
			max_row = Math.floor((min_row + max_row)/2)
		} 
	});

	[...column].forEach(chr => {
		if (chr == "R") {
			min_chair = Math.ceil((min_chair + max_chair)/2)
		} else {
			max_chair = Math.floor((min_chair + max_chair)/2)
		} 
	});

	let seat_id = (min_row * 8) + min_chair
	seat_ids.push(seat_id)
})

const sorted_ids = seat_ids.sort(function(a, b){return a-b})

let high = 1
let low = 0
while (sorted_ids[high] - sorted_ids[low] == 1) {
	high += 1
	low += 1
}
console.log(`Your chair is between ${sorted_ids[low]} and ${sorted_ids[high]} and the seat ID is ${sorted_ids[low] + 1}`)
