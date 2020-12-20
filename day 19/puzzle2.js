console.time('time')
const fs = require('fs');
const text = fs.readFileSync("./input_2.txt", "utf-8");
const blocks = text.split("\n\n");
const rules = blocks[0].split('\n')
const messages = blocks[1].split('\n')

function replaceAll(string, search, replace) {
  return string.split(search).join(replace);
}

ruleObject = {}

rules.forEach(rule => {
	let [key, value] = rule.split(': ')
	value = replaceAll(value, '"', '')
	if (value.includes('|')) {
		if (key === '8') {
			let toRepeat = value.split(' | ')[0]
			value = `( ${toRepeat} | ${toRepeat} + )`
		} else if (key === '11') {
			let toRepeat = value.split(' | ')[0]
			value = `( ${[1,2,3,4,5,6].map(i => `${('42 ').repeat(i)}  ${('31 ').repeat(i)}`).join(" | ") } )`
		} else {
			value = `( ${value} )`
		}
	}
	ruleObject[key] = value
})

while(/\d/.test(ruleObject[0])) {
	Object.keys(ruleObject).forEach((k) => {
		newValue = []
		let splitted = ruleObject[k].split(' ')
		splitted.forEach(value => {
			if(ruleObject[value]) {
				newValue.push(ruleObject[value])
			} else {
				newValue.push(value)
			}
		})
		newValue = newValue.join(' ')
		ruleObject[k] = newValue
	})
}


let regex = new RegExp(`^${replaceAll(ruleObject[0], ' ', '')}$`)

let accepted = 0

messages.forEach(message => accepted += regex.test(message))

console.log(accepted)
console.timeEnd('time')