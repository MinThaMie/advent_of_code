const fs = require('fs');
const text = fs.readFileSync("./input.txt", "utf-8");
const textByLine = text.split("\n")

function validateLoop (instructions){
	let accumulator = 0;
	let instruction_counter = 0
	let visited_instructions = []

	while (!visited_instructions.includes(instruction_counter)){
		visited_instructions.push(instruction_counter)
		let [instruction, amount] = instructions[instruction_counter].split(' ')
		switch(instruction) {
		  	case "nop":
		   	 	instruction_counter++
		   	break;
		  	case "acc":
		    	accumulator += parseInt(amount)
		    	instruction_counter++
		    break;
		    case "jmp":
		    	instruction_counter += parseInt(amount)
		    break;
		  	default:
		    	console.log("this does not happen");
		}
	}
	return {accumulator, instruction_counter}
}

for (let i = 0; i < textByLine.length; i++){
	let [instruction, amount] = textByLine[i].split(' ')
	if (instruction == "nop" || instruction == "jmp") {
		let instructions = [...textByLine]
		instructions[i] = (instruction == "nop" ? "jmp " : "nop ") + amount
		let result = validateLoop(instructions)
		if (result.instruction_counter == instructions.length - 1 ) {
			console.log("jahooooooooeee", result.accumulator)
			break;
		}
	}
}