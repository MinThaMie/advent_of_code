const fs = require('fs');
const text = fs.readFileSync("./input.txt", "utf-8");
const inputByLine = text.split("\n");

let memory = []
let mask = ''
let total = 0;

function applyMask (bit_value) {
	return [...bit_value].map((bit, index) => {
		if (mask[index] === 'X') {
			return mask[index]
		} else if (mask[index] === '0') {
			return bit
		} else {
			return mask[index]
		}
	})
}

function replaceX (string, index) {
	let arrayed_string = [...string]
	arrayed_string[index] = "1"
	return arrayed_string.join('').replace(/X/g, '0')
}

function getCombinations(array) {   
	var result = [];   
	var f = function(prefix=[], array) { 
	    for (var i = 0; i < array.length; i++) { 
	        	result.push([...prefix,array[i]]); 
	            	f([...prefix,array[i]], array.slice(i + 1));  
	        	}  
	    	} 
		f('', array); 
	return result; 
}

function calculateMemPossibility (maskedMemory) {
	let memSlots = [];
	let toFlip = [];
	[...maskedMemory].forEach((v,index) => {
		if (v === 'X'){
			toFlip.push(index)
		}
	})
	let combinations = getCombinations(toFlip)
	combinations.forEach(combi => {
		tmp_maskedMemory = maskedMemory
		combi.forEach(index => {
			tmp_maskedMemory = replaceX(tmp_maskedMemory, index)
		})
		memSlots.push(tmp_maskedMemory)
	})
	memSlots.push(maskedMemory.replace(/X/g, 0))
	memSlots = memSlots.map(slot => parseInt(parseInt(slot, 2).toString(10)))
	return memSlots
}

function solver() {
	inputByLine.forEach(line => {
		line = line.split(' = ')
		if (line[0] === 'mask') {
			mask = line[1]
		} else {
			mem_index = line[0].replace('mem', '').replace('[', '').replace(']', '')
			value = line[1]
			bit_mem = parseInt(mem_index).toString(2);
			bit_mem = "0".repeat(36 - bit_mem.length) + bit_mem
			let maskedMemory = applyMask(bit_mem).join('')
			let memSlots = calculateMemPossibility(maskedMemory)
			memSlots.forEach(slot => {
				if (memory[slot]){
					total -= memory[slot]
					memory[slot] = parseInt(value)
					total += parseInt(value)
				} else {
					memory[slot] = parseInt(value)
					total += parseInt(value)
				}
			})
		}
	})
}

console.time('solver')

solver() // Whatever is timed goes between the two "console.time"

console.timeEnd('solver')

// console.log(memory)
console.log(total)