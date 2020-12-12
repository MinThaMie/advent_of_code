const fs = require('fs');
const text = fs.readFileSync("./input.txt", "utf-8");
const instructions = text.split("\n");
//				[N, E]
//				[y, x]
let waypoint =  [1, 10]
let ship = [0, 0]
instructions.forEach(instruction => {
	let action = instruction.slice(0,1)
	let amount = parseInt(instruction.slice(1))
	switch (action) {
		case 'F':
			let movement = waypoint.map(v => v * amount)
			ship = [movement[0] + ship[0], movement[1] + ship[1]]
			break;
		case 'N':
			waypoint = [waypoint[0] + amount, waypoint[1]]
			break;
		case 'E':
			waypoint = [waypoint[0], waypoint[1] + amount]
			break;
		case 'S':
			waypoint = [waypoint[0] - amount, waypoint[1]]
			break;
		case 'W':
			waypoint = [waypoint[0], waypoint[1] - amount]
			break;
		case 'L':
			amount = amount / 90
			for (let i = 1; i <= amount; i++) {
				// x,y wordt -y, x
				waypoint = [waypoint[1], -waypoint[0]]
			}
			break;
		case 'R':
			//(y,x) ( x, -y)
			amount = amount / 90
			for (let i = 1; i <= amount; i++) {
				waypoint = [-waypoint[1], waypoint[0]]
			}
			break;



	}
})
console.log(`the Manhattan distance is ${ship[0]} + ${ship[1]} = ${Math.abs(ship[0]) + Math.abs(ship[1])}`)