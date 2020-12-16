console.time('solve')
const fs = require('fs');
const text = fs.readFileSync("./input.txt", "utf-8");
const inputByBlock = text.split("\n\n");

let rules = inputByBlock[0].split('\n')
let ownTicket = inputByBlock[1].split('\n').slice(1)
ownTicket = ownTicket[0].split(',').map(Number)
let nearbyTickets = inputByBlock[2].split('\n').slice(1)

function inRange(x, [start, end]) {
    return ((x-start)*(x-end) <= 0);
}
let ranges = []
let ruleBook = {}
let fields = []
rules.forEach(rule => {
	let field = rule.substring(0, rule.indexOf(':'))
	fields.push(field)
	let range = rule.substring(rule.indexOf(":") + 2).split(' or ');
	ruleBook[field] = {}
	ruleBook[field]["range"] = range
	ruleBook[field]["positions"] = []
	range.forEach(range => {
		let [min, max] = range.split('-')
		ranges.push([parseInt(min), parseInt(max)])
	})
})

let nearbyValidTickets = nearbyTickets.filter(ticket => {
	let ticketValue = ticket.split(',').map(Number)
	let valid = true
	ticketValue.forEach(value => {
		let isInRange;
		for (let i = 0; i < ranges.length; i++){
			isInRange = inRange(value, ranges[i])
			if(isInRange){
				break;
			}
		}
		if (!isInRange) {
		 	valid = false
		}
	})
	return valid
})

rulesArray = Object.keys(ruleBook)
let rulePosition = 0
let ticketPosition = 0

function checkRuleForTickets(ticketPosition, rulePosition) {
	let i = 0
	while (i < nearbyValidTickets.length){
		let ticketToCheck = nearbyValidTickets[i]
		let ticketValue = ticketToCheck.split(',').map(Number)
		let ruleToCheck = rulesArray[rulePosition]
		let ruleApplies = false
		let range1 = ruleBook[ruleToCheck]["range"][0].split('-').map(Number)
		let range2 = ruleBook[ruleToCheck]["range"][1].split('-').map(Number)
		ruleApplies = inRange(ticketValue[ticketPosition], range1) || inRange(ticketValue[ticketPosition], range2)
		if (ruleApplies) {
			i++;
		} else {
			break;
		}
	}
	if (i === nearbyValidTickets.length) {
		return true
	} else {
		return false
	}
}
let positions = new Map();

while (rulePosition < rulesArray.length) {
	if (!checkRuleForTickets(ticketPosition, rulePosition) && ticketPosition < rulesArray.length){
		ticketPosition++;
	} else {
		if (ticketPosition < rulesArray.length - 1) {
			ruleBook[rulesArray[rulePosition]]["positions"].push(ticketPosition)
			if (positions.has(ticketPosition)){
				let currentPositions = positions.get(ticketPosition)
				currentPositions.push(rulePosition)
				positions.set(ticketPosition, currentPositions) 
			} else {
				positions.set(ticketPosition, [rulePosition])
			}
			ticketPosition++
		} else {
			ruleBook[rulesArray[rulePosition]]["positions"].push(ticketPosition)
			if (positions.has(ticketPosition)){
				let currentPositions = positions.get(ticketPosition)
				currentPositions.push(rulePosition)
				positions.set(ticketPosition, currentPositions) 
			} else {
				positions.set(ticketPosition, [rulePosition])
			}
			ticketPosition = 0
			rulePosition++;
		}
	}
}

function removePosition(positions, value){
	let newPositions = new Map()
	positions.forEach((rules, position) => {
		if (rules.length != 1) {
			newPositions.set(position, rules.filter((el) => {
				return el !== value
			}))
		}
	})
	return newPositions
}

let stablePos = []

function solve(positions) {
	let toRemove = -1
	positions.forEach((rules, position) => {
		if ((rules.length == 1) && (toRemove <= 0)) {
			toRemove = rules[0]
			stablePos.push({position, rule: fields[toRemove]})
		}
	})
	if(toRemove >= 0){
		let newPositions = removePosition(positions, toRemove)
		solve(newPositions)
	}	
}

solve(positions)

toReseach = stablePos.filter(sp => {
	return sp.rule.startsWith('departure')
})

positionsWithDeparture = toReseach.map(sp => {
	return sp.position
})

let result = 1

positionsWithDeparture.forEach(pos => {
	result *= ownTicket[pos]
})
console.log(result)
console.timeEnd('solve')
