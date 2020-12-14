const fs = require('fs');
const text = fs.readFileSync("./input.txt", "utf-8");
let [departure, ids] = text.split("\n");
ids = ids.split(',');

let picky_busses = ids.filter(id => id !== 'x').map(BigInt);
let product_busses = picky_busses.reduce((a, b) => a * b )

let t = BigInt(0)
ids.forEach((bus, index) => {
	if (bus !== 'x'){
		bus = BigInt(bus)
		index = BigInt(index)
		let blub = BigInt(product_busses / bus)
		let remainder = BigInt(bus - index) 
		console.log(`bus ${bus} on index ${index} with blub ${blub}`)
		let x0 = BigInt(0)
		let x1 = BigInt(1)
		let a = blub
		let b = bus
		let q = BigInt(0)
		if (bus !== 1){
			while (a > 1) {
				q = a/b
				let new_a = b
				let new_b = a % b 
				a = new_a
				b = new_b
				let new_x0 = x1 - (q*x0)
				let new_x1 = x0
				x0 = new_x0
				x1 = new_x1
			}
			if (x1 < 0) {
				x1 += bus
			}
			// console.log(`a ${a}, b ${b}, x0 ${x0}, x1 ${x1}`)
		}
		t += remainder * blub * x1
	}
})
console.log(`Final value `, t % product_busses)

// BRUTE FORCE
// let filtered_ids = ids.filter((id, index) =>  (id == 'x') || (t + index) % id == 0 )
// if (filtered_ids.length == ids.length) {
// 	solved = true
// } else {
// 	t += minimal_step
// }