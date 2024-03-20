/* Values */
const extensionTime = "min";
const valueTitleRecipe = "Recettes";
const valueTitleIngredients = "Ingredients";
const recipesNumberExtensionNone = "Aucune recette";
const recipesNumberExtensionSingle = " recette";
const recipesNumberExtensionMany = " recettes";

const minSearchLength = 3;

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
	const inputMainSearch = document.getElementById("input-main-search");

	inputMainSearch.addEventListener("input", () => {
		const inputMainSearchValue = inputMainSearch.value;
		const inputMainSearchLength = inputMainSearchValue.length;
		if (inputMainSearchLength >= minSearchLength) {
			const filteredArr = recipes.filter(obj =>
				JSON.stringify(obj)
					.toLowerCase()
					.includes(inputMainSearchValue.toString().toLowerCase())
			);

			displayData(filteredArr);
			updateRecipesNumber(filteredArr);

			setIngredientsListSelect(getFullIngredientsList(filteredArr));

			setUstensilsListSelect(getFullUstensilsList(filteredArr));

			setAppliancesListSelect(getFullAppliancesList(filteredArr));

			selectOptionClick();

			// const filteredArr = fullRecipesComponentsListOrdered["ingredients"].filter(val=>val.toLowerCase().includes(inputIngredientsValue));
			//  console.log(filteredArr);
			//  setIngredientsListSelect(filteredArr);
			//  selectOptionClick();
		} else {
			displayData(recipes);
			updateRecipesNumber(recipes);
		}
	});
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
	searchIntoIngredientsOptions();
	searchIntoUstensilsOptions();
	searchIntoAppliancesOptions();
}

init();
