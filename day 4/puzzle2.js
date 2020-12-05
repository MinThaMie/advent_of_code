const fs = require('fs');
const text = fs.readFileSync("./input.txt", "utf-8");
const textByLine = text.split("\n")

let valid_passports = 0
let passports = []
let passport = {}

textByLine.forEach(line => {
	if (line != '') {
		let pairs = line.split(" ")
		pairs.forEach(pair => {
			let [key, value] = pair.split(":")
			passport[key] = value
		})	
	} else {
		passports.push(passport)
		passport = {}
	}
})

function validate_heights(height) {
	const type_height = height.slice(-2)
	if (type_height == "cm") {
		const lenght = parseInt(height.slice(0,3))
	 	return lenght >= 150 && lenght <= 193
	} else if (type_height == "in") {
		const lenght = height.slice(0,2)
	 	return lenght >= 59 && lenght <= 76
	} else {
		return false
	}
}

function validate_keys (passport) {
	const eye_colors = ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"]
	return 	(passport["byr"] >= 1920 && passport["byr"] <= 2002) &&
		   	(passport["iyr"] >= 2010 && passport["iyr"] <= 2020) &&
		   	(passport["eyr"] >= 2020 && passport["eyr"] <= 2030) &&
		   	(/^#([0-9a-f]{6})$/.test(passport["hcl"])) &&
			(/^([0-9]{9})$/.test(passport["pid"])) &&
			validate_heights(passport["hgt"]) &&
			eye_colors.includes(passport["ecl"])
}

const mandetory_keys = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"]
const optional_key = "cid"

function validate_passport (passport) {
	const passport_keys = Object.keys(passport)
	if (passport_keys.length == 8){
		return mandetory_keys.every(v => passport_keys.includes(v)) && passport_keys.includes(optional_key) && validate_keys(passport);;
	} else if (passport_keys.length == 7) {
		return mandetory_keys.every(v => passport_keys.includes(v)) && validate_keys(passport);
	} else {
		return false
	}
}

f_passports = passports.filter(p => validate_passport(p))
console.log(f_passports.length)
