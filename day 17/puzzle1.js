console.time('solve')
const fs = require('fs');
const text = fs.readFileSync("./test_input.txt", "utf-8");
const text_input = text.split("\n");


const directions = [{dx:-1,dy:-1, dz: 0},{dx:0,dy: -1, dz: 0},{dx:1,dy:-1, dz: 0},{dx:-1,dy:0, dz: 0},{dx:1,dy:0, dz: 0},{dx:-1,dy:1, dz: 0},{dx:0,dy:1, dz: 0},{dx:1,dy:1, dz: 0},
					{dx:-1,dy:-1, dz: -1},{dx:0,dy: -1, dz: -1},{dx:1,dy:-1, dz: -1},{dx:-1,dy:0, dz: -1},{dx:1,dy:0, dz: -1},{dx:-1,dy:1, dz: -1},{dx:0,dy:1, dz: -1},{dx:1,dy:1, dz: -1},
					{dx:-1,dy:-1, dz: 1},{dx:0,dy: -1, dz: 1},{dx:1,dy:-1, dz: 1},{dx:-1,dy:0, dz: 1},{dx:1,dy:0, dz: 1},{dx:-1,dy:1, dz: 1},{dx:0,dy:1, dz: 1},{dx:1,dy:1, dz: 1},
					{dx:0, dy: 0, dz: -1}, {dx:0, dy: 0, dz: 1}];


let test = [text_input.map(row => { return row.split('') })]

//If a cube is active and exactly 2 or 3 of its neighbors are also active, the cube remains active. Otherwise, the cube becomes inactive.
// If a cube is inactive but exactly 3 of its neighbors are active, the cube becomes active. Otherwise, the cube remains inactive.

function makeSpace(input) {
	input =	input.map(plane => {
		let newPlane = plane.map(row => {
			row.unshift('.')
			row.push('.')
			return row;
		})
		newPlane.unshift(('.').repeat(newPlane[0].length).split(''));
		newPlane.push(('.').repeat(newPlane[0].length).split(''));
		return newPlane
	})
	let empty_plane = input[0].map(row => {
		return ('.').repeat(row.length).split('')
	})
	return [empty_plane, ...input, empty_plane]
}

function shouldChange (x, y, z, cell, input) {
	neighbours = [];
	for (let i = 0; i < 26; i++) {
		const neighbour = input[z + directions[i].dz]?.[y + directions[i].dy]?.[x + directions[i].dx];
		if (neighbour === undefined){
			neighbours.push('.')
		} else {
			neighbours.push(neighbour);
		}
	}
	let amount_of_neighbours = neighbours.filter(v => v === '#').length;
	if ((cell === '.' && amount_of_neighbours === 3) || (cell === '#' && (amount_of_neighbours < 2 || amount_of_neighbours > 3))){
		return true;
	} else {
		return false;
	}}

function simulateSeating (input) {
	input = makeSpace(input)
	let copy = input.map(plane => {
		return plane.map(row => {
			return [...row]
		})});

	input.forEach((plane, z) =>{
		plane.forEach((row, y) => {
			row.forEach((cell, x) => {
				if (shouldChange(x, y, z, cell, input)) {
					copy[z][y][x] = cell === '.' ? '#' : '.';
				}
			})
		})
	})

	return copy
}
let i = 1
let input =  simulateSeating(test)
// while (i <= 6){
// 	input = simulateSeating(input)
// 	i++
// }

input.forEach((plane, z) => {
	console.log(`z ${z}`)
	console.log(plane)
})

let flattend = input.flat(6)

console.log(flattend.filter(val => val === "#").length)

console.timeEnd('solve')