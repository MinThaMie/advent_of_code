const fs = require('fs');
const text = fs.readFileSync("./input.txt", "utf-8");
const textByLine = text.split("\n").map(Number)


let sorted_input = [...textByLine]
sorted_input.sort(function(a, b){return a-b})
let current_jolt = 0 
let one_diff = 0
let three_diff = 0
sorted_input.forEach(input =>{
	console.log(`${input} - ${current_jolt} = ${input - current_jolt}`)
	if (input - current_jolt == 1){
		one_diff += 1
		current_jolt = input
	} else if (input - current_jolt == 2){
		current_jolt = input
	} else if (input - current_jolt == 3){
		three_diff += 1
		current_jolt = input
	} else {
			console.log("could not find an adapter")
	}
})
	
console.log(`One difference ${one_diff}, three difference ${three_diff + 1}, answer: ${one_diff * (three_diff + 1)}`)