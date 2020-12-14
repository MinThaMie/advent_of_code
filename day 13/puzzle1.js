const fs = require('fs');
const text = fs.readFileSync("./input.txt", "utf-8");
let [departure, ids] = text.split("\n");

console.log(departure)
ids = ids.split(',')
let available_busses = ids.filter(id => id !== 'x')
console.log(available_busses)
let chosen_bus = 0
let difference = departure
available_busses.forEach(bus => {
	time = Math.ceil(departure / bus) * bus
	if (time - departure < difference) {
		chosen_bus = bus
		difference = time - departure
	}
})

console.log(`chosen bus ${chosen_bus} leaves ${difference} later. Answer: ${chosen_bus * difference}`)