const fs = require('fs');
const text = fs.readFileSync("./input.txt", "utf-8");
const instructions = text.split("\n");

const positions = ['N','E', 'S', 'W']
class Ship {
	constructor(facing, position){
		this.facing = facing;
		this.position = position
	}

	rotate(action, amount) {
		let index_facing = positions.lastIndexOf(this.facing)
		let moving = amount / 90
		// let new_facing_index = action == 'L' ? ((index_facing - moving) % 4): ((index_facing + moving) % 4)
		if (action == 'L'){
			let new_facing_index = ((index_facing - moving) % 4)
			new_facing_index = new_facing_index < 0 ? 4 + new_facing_index : new_facing_index;
			this.facing = positions[new_facing_index]
		} else {
			let new_facing_index = ((index_facing + moving) % 4)
			this.facing = positions[new_facing_index]
		}
	}
	move (action, amount) {
		if (action == 'F') {
			if (this.facing == 'N' || this.facing == "E") {
				this.position[this.facing] += parseInt(amount)
			} else {
				let direction = this.facing == 'S' ? 'N' : 'E'
				this.position[direction] -= parseInt(amount)
			}
		} else {
			if (action == 'N' || action == 'E'){
				this.position[action] += parseInt(amount)
			} else {
				let direction = action == 'S' ? 'N' : 'E'
				this.position[direction] -= parseInt(amount)
			}
		}
		console.log(this.position)
	}
}



let ship = new Ship('E', {'E': 0, 'N': 0})
instructions.forEach(instruction => {
	let action = instruction.slice(0,1)
	let amount = instruction.slice(1)
	console.log(`action ${action} amount ${amount}`)
	if (action == 'R' || action == 'L') {
		ship.rotate(action, amount)
		console.log(ship.facing)
	} else {
		ship.move(action, amount)
	}
})

console.log(`the Manhattan distance is ${ship.position['E']} + ${ship.position['N']} = ${Math.abs(ship.position['E']) + Math.abs(ship.position['N'])}`)