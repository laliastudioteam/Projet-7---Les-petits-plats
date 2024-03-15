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
function updateRecipesNumber(recipes){

const recipesNumberInformation = document.getElementById("number-recipes");

if(Object.values(recipes).length == 0){
	recipesNumberInformation.innerHTML=recipesNumberExtensionNone;
}else if(Object.values(recipes).length == 1){
	recipesNumberInformation.innerHTML= Object.values(recipes).length + recipesNumberExtensionSingle;

}else{
	recipesNumberInformation.innerHTML= Object.values(recipes).length + recipesNumberExtensionMany;
	}


}

function mainSearch() {

	const inputMainSearch = document.getElementById("input-main-search");

	inputMainSearch.addEventListener("input", () => {
		console.log("tapé");
		const inputMainSearchValue = inputMainSearch.value;
		const inputMainSearchLength = inputMainSearchValue .length;
console.log(inputMainSearchLength);
		if (inputMainSearchLength >= minSearchLength) {
			console.log(
				"Filtrage possible : " + inputMainSearchLength + " caractères entrés"
			);

			console.log("Main Search for : " + inputMainSearchValue);


            const filteredArr = recipes.filter((obj) => JSON.stringify(obj).toLowerCase().includes(inputMainSearchValue.toString().toLowerCase()));
console.log(filteredArr);



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
			///    setIngredientsListSelect(fullRecipesComponentsListOrdered["ingredients"]);
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
    openSelectList();
    closeSelect();
	mainSearch();
	searchIntoIngredientsOptions();
}

init();
