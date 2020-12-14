const fs = require('fs');
const text = fs.readFileSync("./input.txt", "utf-8");
const inputByLine = text.split("\n");

let memory = []
let mask = ''

function applyMask (bit_value) {
	return [...bit_value].map((bit, index) => {
		if (mask[index] === 'X') {
			return bit
		} else {
			return mask[index]
		}
	})
}

function solver(){
	inputByLine.forEach(line => {
		line = line.split(' = ')
		if (line[0] === 'mask') {
			mask = line[1]
		} else {
			mem_index = line[0].replace('mem', '').replace('[', '').replace(']', '')
			value = line[1]
			bit_value = parseInt(value).toString(2);
			bit_value = "0".repeat(36 - bit_value.length) + bit_value
			let maskedValue = applyMask(bit_value).join('')
			newValue = parseInt(parseInt(maskedValue, 2).toString(10))
			memory[parseInt(mem_index)] = newValue
		}
	})
}

console.time('solver')
solver()
console.timeEnd('solver')

console.log(`Sum memory = ${memory.reduce((a,b) => a+b)}`)