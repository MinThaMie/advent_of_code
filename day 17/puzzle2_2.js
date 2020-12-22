console.time('solve')
const fs = require('fs');
const text = fs.readFileSync("./input.txt", "utf-8");
const text_input = text.split("\n");

const directions = [{dx:-1,dy:-1, dz: 0, dw: 0},{dx:0,dy: -1, dz: 0, dw: 0},{dx:1,dy:-1, dz: 0, dw: 0},{dx:-1,dy:0, dz: 0, dw: 0},{dx:1,dy:0, dz: 0, dw: 0},{dx:-1,dy:1, dz: 0, dw: 0},{dx:0,dy:1, dz: 0, dw: 0},{dx:1,dy:1, dz: 0, dw: 0},
					{dx:-1,dy:-1, dz: -1, dw: 0},{dx:0,dy: -1, dz: -1, dw: 0},{dx:1,dy:-1, dz: -1, dw: 0},{dx:-1,dy:0, dz: -1, dw: 0},{dx:1,dy:0, dz: -1, dw: 0},{dx:-1,dy:1, dz: -1, dw: 0},{dx:0,dy:1, dz: -1, dw: 0},{dx:1,dy:1, dz: -1, dw: 0},
					{dx:-1,dy:-1, dz: 1, dw: 0},{dx:0,dy: -1, dz: 1, dw: 0},{dx:1,dy:-1, dz: 1, dw: 0},{dx:-1,dy:0, dz: 1, dw: 0},{dx:1,dy:0, dz: 1, dw: 0},{dx:-1,dy:1, dz: 1, dw: 0},{dx:0,dy:1, dz: 1, dw: 0},{dx:1,dy:1, dz: 1, dw: 0},
					{dx:0, dy: 0, dz: -1, dw: 0}, {dx:0, dy: 0, dz: 1, dw: 0},
					{dx:-1,dy:-1, dz: 0, dw: -1},{dx:0,dy: -1, dz: 0, dw: -1},{dx:1,dy:-1, dz: 0, dw: -1},{dx:-1,dy:0, dz: 0, dw: -1},{dx:1,dy:0, dz: 0, dw: -1},{dx:-1,dy:1, dz: 0, dw: -1},{dx:0,dy:1, dz: 0, dw: -1},{dx:1,dy:1, dz: 0, dw: -1},
					{dx:-1,dy:-1, dz: -1, dw: -1},{dx:0,dy: -1, dz: -1, dw: -1},{dx:1,dy:-1, dz: -1, dw: -1},{dx:-1,dy:0, dz: -1, dw: -1},{dx:1,dy:0, dz: -1, dw: -1},{dx:-1,dy:1, dz: -1, dw: -1},{dx:0,dy:1, dz: -1, dw: -1},{dx:1,dy:1, dz: -1, dw: -1},
					{dx:-1,dy:-1, dz: 1, dw: -1},{dx:0,dy: -1, dz: 1, dw: -1},{dx:1,dy:-1, dz: 1, dw: -1},{dx:-1,dy:0, dz: 1, dw: -1},{dx:1,dy:0, dz: 1, dw: -1},{dx:-1,dy:1, dz: 1, dw: -1},{dx:0,dy:1, dz: 1, dw: -1},{dx:1,dy:1, dz: 1, dw: -1},
					{dx:0, dy: 0, dz: -1, dw: -1}, {dx:0, dy: 0, dz: 1, dw: -1},
					{dx:-1,dy:-1, dz: 0, dw: 1},{dx:0,dy: -1, dz: 0, dw: 1},{dx:1,dy:-1, dz: 0, dw: 1},{dx:-1,dy:0, dz: 0, dw: 1},{dx:1,dy:0, dz: 0, dw: 1},{dx:-1,dy:1, dz: 0, dw: 1},{dx:0,dy:1, dz: 0, dw: 1},{dx:1,dy:1, dz: 0, dw: 1},
					{dx:-1,dy:-1, dz: -1, dw: 1},{dx:0,dy: -1, dz: -1, dw: 1},{dx:1,dy:-1, dz: -1, dw: 1},{dx:-1,dy:0, dz: -1, dw: 1},{dx:1,dy:0, dz: -1, dw: 1},{dx:-1,dy:1, dz: -1, dw: 1},{dx:0,dy:1, dz: -1, dw: 1},{dx:1,dy:1, dz: -1, dw: 1},
					{dx:-1,dy:-1, dz: 1, dw: 1},{dx:0,dy: -1, dz: 1, dw: 1},{dx:1,dy:-1, dz: 1, dw: 1},{dx:-1,dy:0, dz: 1, dw: 1},{dx:1,dy:0, dz: 1, dw: 1},{dx:-1,dy:1, dz: 1, dw: 1},{dx:0,dy:1, dz: 1, dw: 1},{dx:1,dy:1, dz: 1, dw: 1},
					{dx:0, dy: 0, dz: -1, dw: 1}, {dx:0, dy: 0, dz: 1, dw: 1},
					{dx:0, dy: 0, dz: 0, dw: -1}, {dx:0, dy: 0, dz:0, dw: 1}
					];

let initialMap = {}

text_input.forEach((row, y) => {
	[...row].forEach((val, x) => {
		initialMap[[x,y, 0, 0]] = val
	})
})

function findNeighbours(x, y, z, w) {
	neighbours = [];
	for (let i = 0; i < 80; i++) {
		const neighbour = `${x + directions[i].dx},${y + directions[i].dy},${z + directions[i].dz},${w + directions[i].dw}`
		neighbours.push(neighbour);
	}
	return neighbours
}

function makeSpace(input) {	
	let spaceSet = new Set()

	for(let key in input) {
		key = key.split(',').map(Number)
		spaceSet.add(`${key[0]},${key[1]},${key[2]},${key[3]}`)
		let array = findNeighbours(...key)
		array.forEach(item => spaceSet.add(item))
	}
	return spaceSet
}

function shouldChange (x, y, z, w, cell, input) {
	neighbours = [];
	for (let i = 0; i < 80; i++) {
		const neighbour = input[`${x + directions[i].dx},${y + directions[i].dy},${z + directions[i].dz},${w + directions[i].dw}`];
		if (neighbour === undefined){
			neighbours.push('.')
		} else {
			neighbours.push(neighbour);
		}
	}
	let amount_of_neighbours = neighbours.filter(v => v === '#').length;
	return (cell === '.' && amount_of_neighbours === 3) || (cell === '#' && (amount_of_neighbours < 2 || amount_of_neighbours > 3))
}

function simulateSeating (input) {
	let copy = {...input}
	coordinatesToCheck = makeSpace(input)

	coordinatesToCheck.forEach(coordinate => {
		let coordinates = coordinate.split(',').map(Number)
		if (input[coordinate] === undefined) {
			cell = '.'
		} else {
			cell = input[coordinate]
		}
		if (shouldChange(...coordinates, cell, input)) {
			copy[coordinate] = cell === '.' ? '#' : '.';
		}
	})

	return copy
}

let i = 1
let input = simulateSeating(initialMap)
while (i <= 5){
	input = simulateSeating(input)
	i++
}

console.log(Object.values(input).filter(val => val === '#').length)

console.timeEnd('solve')