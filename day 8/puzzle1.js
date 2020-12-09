const fs = require('fs');
const text = fs.readFileSync("./input_fixed.txt", "utf-8");
const textByLine = text.split("\n")

let accumulator = 0;
let instruction_counter = 0
let visited_instructions = []

while (!visited_instructions.includes(instruction_counter)){
	console.log("instruction", textByLine[instruction_counter])
	visited_instructions.push(instruction_counter)
	let [instruction, amount] = textByLine[instruction_counter].split(' ')
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
console.log("acc: ", accumulator)