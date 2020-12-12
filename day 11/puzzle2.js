const fs = require('fs');
const text = fs.readFileSync("./input.txt", "utf-8");
const text_input = text.split("\n");

const directions = [{dx:-1,dy:-1,},{dx:0,dy: -1,},{dx:1,dy:-1},
					{dx:-1,dy:0},				  {dx:1,dy:0},
					{dx:-1,dy:1},  {dx:0,dy:1},	  {dx:1,dy:1}];


const arrayed_input = text_input.map(row => {
	return row.split('');
});

//If a seat is empty (L) and there are no occupied seats adjacent to it, the seat becomes occupied.
//If a seat is occupied (#) and four or more seats adjacent to it are also occupied, the seat becomes empty.

function shouldChange (x, y, cell, input) {
	neighbours = [];
	for (let i = 0; i < 8; i++) {
		let neigh_x = x + directions[i].dx
		let neigh_y = y + directions[i].dy
		let neighbour = input[neigh_y]?.[neigh_x];
		if (neighbour){
			while (neighbour == '.') {
				neigh_x += directions[i].dx;
				neigh_y += directions[i].dy	;
				neighbour = input[neigh_y]?.[neigh_x];
			}
			neighbours.push(neighbour);
		}
	}
	if ((cell === 'L' && !neighbours.includes("#")) || (cell === '#' && neighbours.filter(v => v === '#').length >= 5)){
		return true;
	} else {
		return false;
	}

}

function simulateSeating (input) {
	let copy = input.map(row => [...row]);

	input.forEach((row, y) => {
		row.forEach((cell, x) => {
			if (cell !== '.' && shouldChange(x, y, cell, input)) {
				copy[y][x] = cell === 'L' ? '#' : 'L';
			}
		})
	})

	const string_input = input.reduce((result, row) => `${result}${row.join('')}`, '');
	const string_copy = copy.reduce((result, row) => `${result}${row.join('')}`, '');

	if (string_input === string_copy) {
		 console.log(`Stable seats ${copy.reduce((result, row) => row.filter(cell => cell === "#").length + result, 0)}`);
	} else {
		simulateSeating(copy);
	}
}

simulateSeating(arrayed_input)