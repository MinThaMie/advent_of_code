const fs = require('fs');
const text = fs.readFileSync("./input.txt", "utf-8");
const inputByBlock = text.split("\n\n");

let rules = inputByBlock[0].split('\n')
let ownTicket = inputByBlock[1].split('\n')
let nearbyTickets = inputByBlock[2].split('\n').slice(1)

function inRange(x, [start, end]) {
    return ((x-start)*(x-end) <= 0);
}
let ranges = []
rules.forEach(rule => {
	let range = rule.substring(rule.indexOf(":") + 2).split(' or ');
	range.forEach(range => {
		let [min, max] = range.split('-')
		ranges.push([parseInt(min), parseInt(max)])
	})
})

let invalid = 0
nearbyTickets.forEach(ticket => {
	let ticketValue = ticket.split(',').map(Number)
	let isInvalid = false
	ticketValue.forEach(value => {
		let isInRange;
		for (let i = 0; i < ranges.length; i++){
			isInRange = inRange(value, ranges[i])
			if(isInRange){
				break;
			}
		}
		if (!isInRange) {
			invalid += value
		}

	})
})
console.log(invalid)