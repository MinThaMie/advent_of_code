console.time('time')
const fs = require('fs');
const text = fs.readFileSync("./input.txt", "utf-8");
const foods = text.split("\n");

function intersection(a) {
    if (a.length > 2)
        return intersection([intersection(a.slice(0, a.length / 2)), intersection(a.slice(a.length / 2))]);

    if (a.length == 1)
        return a[0];

    return a[0].filter((item) => a[1].includes(item));
}

let allergenMap = new Map()
let allIngredients = []
foods.forEach(food => {
	let [ingredients, allergens] = food.replace(')', '').split(' (contains ')
	allergens = allergens.split(', ')
	ingredients = ingredients.split(' ')
	allIngredients.push(...ingredients)
	allergens.forEach(allergen => {
		if (allergenMap.has(allergen)){
			let possibleIngredients = allergenMap.get(allergen)
			allergenMap.set(allergen, [...possibleIngredients, ingredients])
		} else {
			allergenMap.set(allergen, [ingredients])
		}
	})
})

let possibleSolution = new Map()
let foundSolution = new Map()
let allergicIngredients = []
let shouldGoAgain = true

while (foundSolution.size !== allergenMap.size){
	allergenMap.forEach((ingredients, key) => {
	if (ingredients[0].constructor === Array) {
		let ingredient = intersection(ingredients)
		if (ingredient.lenght === 1) {
			foundSolution.set(key, ...ingredient)
			allergicIngredients.push(...ingredient)
		} else {
			let stillPossibleIngredients = ingredient.filter(i => !allergicIngredients.includes(i))
			if (stillPossibleIngredients.length === 1) {
				foundSolution.set(key, ...stillPossibleIngredients)
				allergicIngredients.push(...stillPossibleIngredients)
			} else {
				possibleSolution.set(key, stillPossibleIngredients)
			}
		}
	} else {
		let stillPossibleIngredients = ingredients.filter(i => !allergicIngredients.includes(i))
		if (stillPossibleIngredients.length === 1) {
			foundSolution.set(key, ...stillPossibleIngredients)
			allergicIngredients.push(...stillPossibleIngredients)
		} else {
			possibleSolution.set(key, stillPossibleIngredients)
		}
	}
})
}

console.log(allIngredients.filter(i => !allergicIngredients.includes(i)).length)
console.timeEnd('time')