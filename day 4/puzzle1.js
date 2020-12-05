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

function validate_passport (passport) {
	if (passport.length == 8){
		return mandetory_keys.every(v => passport.includes(v)) && passport.includes(optional_key);
	} else if (passport.lengt == 7) {
		return mandetory_keys.every(v => passport.includes(v))
	} else {
		return false
	}
}

f_passports = passports.filter(p => validate_passport(p))
console.log(f_passports.length)
