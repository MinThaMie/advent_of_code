const fs = require('fs');
const text = fs.readFileSync("./input.txt", "utf-8");
const textByLine = text.split("\n")

let collection = new Set();

function includesBag(value) {
	const type_bag = Object.values(this).join('');
	return value.includes(type_bag, type_bag.length);
}

function findBags(type_bag) {
	let found_bags = textByLine.filter(includesBag, type_bag)
	found_bags.forEach(instruction => {
		let [bag, content] = instruction.split('s contain ');
		collection.add(bag);
		findBags(bag);
	})
}

findBags('shiny gold bag')

console.log(collection, collection.size)
