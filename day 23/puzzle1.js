class Cups {
	constructor(arr, startIntex) {
		this.arr = arr;
	  	this.currentIndex = startIntex || 0;
	  	this.maximum = Math.max(...arr)
	}
  	next() {
  		let i = this.currentIndex, arr = this.arr;
		this.currentIndex = i < arr.length-1 ? i+1 : 0;
		this.currentIndex = this.currentIndex % 9;
		return this.current();
  	}
  	getNextIndex(index) {
  		let i = index, arr = this.arr;
		index = (i+1) % 9;
		return index;
  	}
  	getNextCurrentValue(index) {
  		let i = index, arr = this.arr;
		index = (i + 4) % 9;
		return arr[index];
  	}
  	prev() {
  		let i = i = this.currentIndex, arr = this.arr;
		this.currentIndex = i > 0 ? i-1 : arr.length-1;
		return this.current();
  	}
  	current() {
  		return this.arr[this.currentIndex];
  	}
  	pickUp() {
  		let cups = []
  		if (this.currentIndex + 4 < this.arr.length - 1) {
  			cups = this.arr.splice(this.currentIndex + 1, 3)
  		} else {
  			console.log("I'll wrap")
  			let cupsIndexs = []
  			for(let i = 0; i < 3; i++){
  				cupsIndexs.push(this.getNextIndex(this.currentIndex + i))
  			}
  			cupsIndexs.forEach(index => {
  				cups.push(this.arr[index])
  			})
  			this.arr = this.arr.filter(v => !cups.includes(v))
  		}
  		return cups
  	}
  	findDestination(active) {
  		let toFind = active - 1
  		let destinationIndex = this.arr.indexOf(toFind)
  		while (destinationIndex == -1 ) {
  			if(toFind >= 0) {
  				toFind--
  			} else {
  				toFind = this.maximum
  			}
  			destinationIndex = this.arr.indexOf(toFind)
  		}
  		console.log(`des index ${destinationIndex} should have value ${toFind} and has ${this.arr[destinationIndex]}`)
  		return destinationIndex
  	}
  	placeCups(cups, destination) {
  		this.arr.splice(destination + 1, 0, ...cups);
  	}
}

let input = [5,3,8,9,1,4,7,6,2]
let game = new Cups(input, 0)

for (let i = 1; i <= 100; i++){
	console.log(`--move ${i}--`)
	let active = game.current()
	let nextValue = game.getNextCurrentValue(game.currentIndex)
	let cups = game.pickUp()
	let destination = game.findDestination(active)
	game.placeCups(cups, destination)
	game.currentIndex = game.arr.indexOf(nextValue)
}

console.log(game.arr.join(''))

