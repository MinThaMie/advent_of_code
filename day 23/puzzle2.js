console.time('solve')
const START=10, END=1000001;
let rest = Array.from({length: END-START}, (x, i) => i+START)
let start = [5,3,8,9,1,4,7,6,2]
// let start = [3,9,8,2,5,4,7,1,6] //van Djurre
let input = [...start, ...rest]
let dict = {}
let min = 1
let max = 1000000
function getDestination(cups) {
	let toFind = current - 1
	if (toFind < min) {
		toFind = max
	}
	while(cups.includes(toFind)) {
		toFind--
		if (toFind < min){
			toFind = max
		}
	}
	return toFind
}

input.forEach((v, index) => {
	dict[v] = input[index + 1]
})

dict[1000000] = input[0]

// console.log(dict)


let current = input[0]
for(let i=0; i < 10000000; i++){
	let cups = [dict[current], dict[dict[current]], dict[dict[dict[current]]]]
	
	dict[current] = dict[cups[2]]

	let destination = getDestination(cups) 
	dict[cups[2]] = dict[destination]
	dict[destination] = cups[0]
	current = dict[current]
}

let one = 1
// console.log(dict)
console.log(`First neighbour: ${dict[one]}, second one ${dict[dict[one]]}, answer: ${dict[one] * dict[dict[one]]}`)

console.timeEnd('solve')