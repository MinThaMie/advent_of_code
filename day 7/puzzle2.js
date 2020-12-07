const fs = require('fs');
const text = fs.readFileSync("./input.txt","utf-8");
const textByLine = text.split("\n")

let amount = 0;

class Child {
	constructor(name, count){
		this.name = name;
		this.count = count
	}
}

class Bag {
  constructor(name) {
    this.name = name;
    this.children = [];
    this.included_bags = 0
  }
  setChild(child) {
  	this.children.push(child)
  }
  setIncludedBags(no) {
  	this.included_bags += no
  }
  resetIncludedBags() {
  	this.included_bags = 0
  }
}

let bags = []
textByLine.forEach(instruction => {
	let [bag, content] = instruction.split(' contain ');
	bag = new Bag(bag);
	content = content.split(', ');
	content.forEach(type_bag => { 
		if (type_bag.substring(0,2) == 'no') {
			// console.log(`${type_bag} has no childern`)
		} else {
			bag.setChild(new Child(type_bag.slice(2).replace('.', ''), type_bag[0]))
		}
	})
	bags.push(bag)
})

function compareNames(value) {
	return value.name.includes(Object.values(this).join(''))
}

function countBags(bag_name) {
	let bag = bags.find(compareNames, bag_name)
	if (!bag.children.length) {
		return 1
	}
	bag.resetIncludedBags() 
	bag.children.forEach( child => {
		let amount = countBags(child.name)
		bag.setIncludedBags(amount * child.count)
	})
	bag.setIncludedBags(1)
	return bag.included_bags
}

console.log(countBags("shiny gold bags") - 1 )
