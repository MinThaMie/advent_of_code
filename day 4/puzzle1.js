const fs = require('fs');
const text = fs.readFileSync("./input.txt", "utf-8");
const textByLine = text.split("\n")

let valid_passports = 0
let passports = []
let passport = []

textByLine.forEach(line => {
	if (line != '') {
		const pairs = line.split(" ")
		pairs.forEach(pair => {
			const key = pair.split(":")[0]
			passport.push(key)
		})
	} else {
		passports.push(passport)
		passport = []
	}
})


const mandetory_keys = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"]
const optional_key = "cid"
f_passports = passports.filter(p => (p.length > 6 && p.length <= 8))
f_passports.forEach(passport => {
	if (passport.length == 8){
		valid_passports += mandetory_keys.every(v => passport.includes(v)) && passport.includes(optional_key);
	} else {
		valid_passports += mandetory_keys.every(v => passport.includes(v))
	}
})

console.log(valid_passports)