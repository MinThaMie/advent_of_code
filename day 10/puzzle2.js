const fs = require('fs');
const text = fs.readFileSync("./input.txt", "utf-8");
const textByLine = text.split("\n").map(Number)


let sorted_input = [...textByLine]
sorted_input.sort(function(a, b){return a-b});

//[ 1,  4,  5,  6,  7, 10, 11, 12, 15, 16, 19]
//[ 0,  1,  2,  3,  4,  5,  6,  7,  8,  9, 10]
let current_jolt = 0 
let one_diff = 0
let three_diff = 0
let weigthed_array = []

for (let i = 0; i < sorted_input.length; i++) {
	let weight = 0	
	if ( i < 3) {
		if ( i == 0) { // value 1
			weight = 1
		} else if (i <= 2) { // value 4  stel je voor value 2 
			if ((sorted_input[i] - 3) <= 0) {
				// optel wieght ervoor
				if (i == 1 ){
					weight = weigthed_array[i - 1] + 1
				} else {
					weight = weigthed_array[i -2 ] + weigthed_array[i - 1] + 1
				}
			} else {
				weight = weigthed_array[i - 1]
			}
		}

	} else {
		for (let j = 3; j > 0; j--){
			if (sorted_input[i] - sorted_input[i - j] <= 3) {
				weight += weigthed_array[i-j]
			} 
		}
	}
	 weigthed_array.push(weight)
}
console.log(weigthed_array.pop())