console.time('time')
const fs = require('fs');
const text = fs.readFileSync("./input.txt", "utf-8");
const blocks = text.split("\n\n");

let blockMap = new Map()

function reverseString(str) {
    return str.split("").reverse().join("");
}

function findSide(array, index) {
	let side = ""
	array.forEach(string => {
		side += string.charAt(index)
	})
	return side
}

blocks.forEach(block => {
	blockLines = block.split('\n')
	blockName = blockLines.slice(0,1)
	blockImage = blockLines.slice(1)
	let blockTop = blockImage[0]
	let blockBottom = blockImage[blockImage.length - 1]
	let blockLeft = findSide(blockImage, 0)
	let blockRight = findSide(blockImage, 9)
	blockMap.set(blockName, [blockTop, blockRight, blockBottom, blockLeft])
})

let corners = []
blockMap.forEach((block, bid) => {
	let blockReversed = block.map(line => reverseString(line))
	block = block.concat(...blockReversed)
	let matched = 0
	blockMap.forEach((secondBlock, sid) => {
		if (bid !== sid){
			block.forEach(line => {
				switch(line) {
					case secondBlock[0]: 
						matched++
						break;
					case secondBlock[1]: 
						matched++
						break;
					case secondBlock[2]: 
						matched++
						break;
					case secondBlock[3]: 
						matched++
						break;
					default: 
						break;
					}
			})	
		}
	})
	if (matched == 2) {
		bid = parseInt(bid[0].substring(5,9))
		corners.push(bid)
	}
})

let answer = corners.reduce((a,b) => a * b)
console.log(answer)
console.timeEnd('time')