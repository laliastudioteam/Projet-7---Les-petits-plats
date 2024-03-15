// GO Fetch real user data

function getFullIngredientsList(data) {
	const fullIngredientsListFull = new Array();
	data.forEach(item => {
		item.ingredients.forEach(ingredient => {
			fullIngredientsListFull.push(capitalizeWord(ingredient.ingredient));
		});
	});
	return fullIngredientsListFull
		.filter((x, i) => fullIngredientsListFull.indexOf(x) === i)
		.sort();
}

function getFullUstensilsList(data) {
	const fullUstensilsListFull = new Array();
	data.forEach(item => {
		item.ustensils.forEach(ustensil => {
			fullUstensilsListFull.push(capitalizeWord(ustensil));
		});
	});
	return fullUstensilsListFull
		.filter((x, i) => fullUstensilsListFull.indexOf(x) === i)
		.sort();
}

function getFullAppliancesList(data) {
	const fullAppliancesListFull = new Array();
	data.forEach(item => {
		fullAppliancesListFull.push(capitalizeWord(item.appliance));
	});
	return fullAppliancesListFull
		.filter((x, i) => fullAppliancesListFull.indexOf(x) === i)
		.sort();
}

async function loadData() {


	// Ingredients list load
	const fullIngredientsListOrdered = getFullIngredientsList(recipes);
	// Ustensils list load
	const fullUstensilsListOrdered = getFullUstensilsList(recipes);
	// Applicance list load
    const fullAppliancesListOrdered = getFullAppliancesList(recipes);

	return {
		"ingredients" : fullIngredientsListOrdered, "ustensils" : fullUstensilsListOrdered, "appliances" : fullAppliancesListOrdered
    };
}
