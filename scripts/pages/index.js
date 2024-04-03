const inputMainSearch = document.getElementById("input-main-search");

async function displayData(recipes) {
	const recipesSection = document.getElementById("recipes-section");
	recipesSection.innerHTML = "";
	recipes.forEach(recipe => {
		const recipeModel = recipeTemplate(recipe);
		const recipeCardDOM = recipeModel.getRecipeCardDOM();
		recipesSection.appendChild(recipeCardDOM);
	});
}

let fullRecipesComponentsListOrdered = new Array();
function updateRecipesNumber(recipes) {
	const recipesNumberInformation = document.getElementById("number-recipes");

	if (Object.values(recipes).length == 0) {
		recipesNumberInformation.innerHTML = recipesNumberExtensionNone;
		displayMessageNone();
	} else if (Object.values(recipes).length == 1) {
		recipesNumberInformation.innerHTML =
			Object.values(recipes).length + recipesNumberExtensionSingle;
		hideMessageNone();
	} else {
		recipesNumberInformation.innerHTML =
			Object.values(recipes).length + recipesNumberExtensionMany;
		hideMessageNone();
	}
}

function displayMessageNone() {
	const messageNone = document.getElementById("message-no-recipe");
	const mainSearchTextInputContent = document.getElementById("input-main-search");
	let valueSearchNoneInformations =
		"Aucune recette ne contient '" +
		mainSearchTextInputContent.value +
		"'<br/>Vous pouvez chercher :</br></br>";
	valueSearchNoneInformations += "<ul class='message-no-recipe__list'>";
	fullRecipesComponentsListOrdered["ingredients"].forEach(ingredient => {
		valueSearchNoneInformations +=
			"<li class='message-no-recipe__list__option'><a href='#' class='linkNone'>" +
			ingredient +
			"</a></li>";
	});
	valueSearchNoneInformations += "</ul>";
	messageNone.innerHTML = valueSearchNoneInformations;
	messageNone.style.display = "block";
}
function hideMessageNone() {
	const messageNone = document.getElementById("message-no-recipe");
	messageNone.innerHTML = "";
	messageNone.style.display = "none";
}
function mainSearch() {
	consoleOutput("Main Search", 1, 1);

	inputMainSearch.addEventListener("input", search);
}

function search() {
	const inputMainSearchValue = inputMainSearch.value.toLowerCase();
	consoleOutput("searching for :" + inputMainSearch.value, 1, 1);
	const inputMainSearchLength = inputMainSearchValue.length;

	// First Search method
	if (searchMethod == 1) {
		// If search min lenght ok
		if (inputMainSearchLength >= minSearchLength) {
			console.log("search avec keyword");
			preFilteredArr = recipes.filter(
				d =>
					d.name.toLowerCase().includes(inputMainSearchValue) ||
					d.description.toLowerCase().includes(inputMainSearchValue) ||
					JSON.stringify(d.ingredients).toLowerCase().includes(inputMainSearchValue)
			);
			changeInformations(
				"Recherche de : " + inputMainSearchValue + " parmi les recettes"
			);

		} else {
			console.log("search sans keyword");
			preFilteredArr = recipes;
		}
		console.log(preFilteredArr );
		//	consoleOutput(preFilteredArr, 1, 1);

				// Method by length
				if (searchMethod1Type == "length") {
					filteredArr = preFilteredArr.filter(
						item =>
						(selectedAppliances.length === 0 || selectedAppliances.includes(item.appliance)) &&
							item.ingredients.filter(
								ingredient => selectedIngredients.indexOf(ingredient.ingredient) + 1
							).length >= selectedIngredients.length &&
							item.ustensils.filter(
								ustensil => selectedUstensils.indexOf(capitalizeWord(ustensil)) + 1
							).length >= selectedUstensils.length
					);
				} else if (searchMethod1Type == "every") {
				const	filteredArr = preFilteredArr.filter(
						item =>
						(selectedAppliances.length === 0 || selectedAppliances.includes(item.appliance)) &&
							selectedIngredients.every(ingredient =>
								item.ingredients.includes(ingredient)
							) &&
							item.ustensils.filter(
								selectedUstensils.every(ustensil => item.ustensils.includes(ustensil))
							)
					);
				}
			

			//	Different try methodes / code
			//	(selectedAppliances.length === 0 || selectedAppliances.includes(item.appliance))
			//	selectedIngredients.every(ingredient => item.ingredients.includes(ingredient));

			consoleOutput("Après second filtre", 1, 1);
			consoleOutput(filteredArr, 1, 1);

			// Simple Methode through whole data
			//const filteredArr = recipes.filter(obj =>
			//		JSON.stringify(obj)
			//			.toLowerCase()
			//			.includes(inputMainSearchValue.toString().toLowerCase())
			//	);

			filterSelectListOptionsSelected(filteredArr);

			displayData(filteredArr);

			updateRecipesNumber(filteredArr);
			clearSelectOptionsListeners();
			setIngredientsListSelect(getFullIngredientsList(filteredArr));

			setUstensilsListSelect(getFullUstensilsList(filteredArr));

			setAppliancesListSelect(getFullAppliancesList(filteredArr));
		
		// Second Search method
	} else if (searchMethod == 2) {
		// If search min lenght ok
		if (inputMainSearchLength >= minSearchLength) {
			let preFilteredArr = new Array();
			//const preFilteredArr = recipes.filter(
			//d =>
			//		d.name.toLowerCase().includes(inputMainSearchValue) ||
			//		d.description.toLowerCase().includes(inputMainSearchValue) ||
			//		JSON.stringify(d.ingredients).toLowerCase().includes(inputMainSearchValue)
			//	);

			recipes.forEach(item => {
				if (item.name.toLowerCase().indexOf(inputMainSearchValue) !== -1) {
					preFilteredArr.push(item);
				}
			});

			consoleOutput("Apres filter", 1, 1);
			consoleOutput(preFilteredArr, 1, 1);
			changeInformations(
				"Recherche de : " + inputMainSearchValue + " parmi les recettes"
			);

			const filteredArr = preFilteredArr;
		} else {
		}
	}

	consoleOutput("Après second filtre", 1, 1);
	consoleOutput(filteredArr, 1, 1);
	displayData(filteredArr);
	updateRecipesNumber(filteredArr);
	setIngredientsListSelect(getFullIngredientsList(filteredArr));

	setUstensilsListSelect(getFullUstensilsList(filteredArr));

	setAppliancesListSelect(getFullAppliancesList(filteredArr));

	selectOptionClick();
}
async function init() {
	// Load Data - Ingredients - Ustensils - Appliances
	fullRecipesComponentsListOrdered = await loadData();

	// Ingredients list select render
	setIngredientsListSelect(fullRecipesComponentsListOrdered["ingredients"]);
	// Ustensils list select render
	setUstensilsListSelect(fullRecipesComponentsListOrdered["ustensils"]);
	// Appliances list select render
	setAppliancesListSelect(fullRecipesComponentsListOrdered["appliances"]);
	// display recipe cards
	displayData(recipes);
	updateRecipesNumber(recipes);
	selectOptionClick();
	clickInsideSelect();
	clickOutsideSelect();
	mainSearch();
	// Init ingredients listener input
	searchIntoIngredientsOptions();
	// Init ustensils listener input
	searchIntoUstensilsOptions();
	// Init appliances listener input
	searchIntoAppliancesOptions();
}

init();
